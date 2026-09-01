import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Sliders, 
  MessageSquare, 
  Share2, 
  Save, 
  Wand2, 
  Send,
  Zap,
  ArrowRight,
  SplitSquareVertical
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, BrandKit, DestinationChannel, TextLength, DescriptionLength, ToneOfVoice, GeneratedMaterial } from '../types';
import { AIGeneratorService } from '../services/aiGenerator';

interface DescriptionStudioViewProps {
  selectedProduct: Product;
  brandKit: BrandKit;
  onSaveMaterial: (material: GeneratedMaterial) => void;
}

export const DescriptionStudioView: React.FC<DescriptionStudioViewProps> = ({
  selectedProduct,
  brandKit,
  onSaveMaterial
}) => {
  const [channel, setChannel] = useState<DestinationChannel>('WhatsApp');
  const [length, setLength] = useState<DescriptionLength>('media');
  const [tone, setTone] = useState<ToneOfVoice>('Comercial');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [customInstructions, setCustomInstructions] = useState('');
  const [variations, setVariations] = useState<string[]>([]);
  const [showVariations, setShowVariations] = useState(false);

  const channels: { id: DestinationChannel; label: string }[] = [
    { id: 'WhatsApp', label: 'WhatsApp' },
    { id: 'Catálogo WhatsApp', label: 'Catálogo WhatsApp' },
    { id: 'Instagram', label: 'Instagram' },
    { id: 'Facebook', label: 'Facebook' },
    { id: 'Site', label: 'Site Oficial' },
    { id: 'Página de Vendas', label: 'Página de Vendas' },
    { id: 'Google', label: 'Google Search / Ads' },
    { id: 'E-mail', label: 'E-mail Marketing' },
    { id: 'Anúncio Meta', label: 'Anúncio Meta Ads' },
    { id: 'Marketplace', label: 'Marketplace' },
    { id: 'Folder', label: 'Folder / Flyer' },
    { id: 'Portfólio', label: 'Portfólio Impresso' },
    { id: 'Apresentação Comercial', label: 'Apresentação B2B' },
    { id: 'Banner', label: 'Banner Promocional' },
    { id: 'Vídeo', label: 'Roteiro de Vídeo' }
  ];

  const lengths: { id: DescriptionLength; label: string }[] = [
    { id: 'micro', label: 'Micro (1 frase)' },
    { id: 'curta', label: 'Curta (2-3 parágrafos)' },
    { id: 'media', label: 'Média (Completa)' },
    { id: 'completa', label: 'Detalhada (Com Ementa)' },
    { id: 'seo', label: 'SEO (Otimizada)' }
  ];

  const tones: ToneOfVoice[] = [
    'Comercial',
    'Profissional',
    'Direto',
    'Educativo',
    'Institucional',
    'Premium',
    'Urgente',
    'Inspirador',
    'Autoridade',
    'Popular',
    'Informativo',
    'Persuasivo',
    'Humanizado'
  ];

  // Auto generate on selection or on button
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let text = AIGeneratorService.generateDescription(
        selectedProduct,
        brandKit,
        channel as any,
        length as any,
        tone as any
      );
      if (customInstructions) {
        text += `\n\n📌 Observação Adicional: ${customInstructions}`;
      }
      setGeneratedText(text);
      setIsGenerating(false);
    }, 250);
  };

  useEffect(() => {
    handleGenerate();
  }, [selectedProduct, channel, length, tone]);

  const handleRefine = (action: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      let modified = generatedText;
      if (action === 'encurtar') {
        modified = modified.split('\n\n').slice(0, 2).join('\n\n') + `\n\nGaranta sua vaga hoje com a ${brandKit.name}!`;
      } else if (action === 'mais-comercial') {
        modified = `🚨 CONDIÇÃO ESPECIAL EXCLUSIVA — ${selectedProduct.name.toUpperCase()}!\n\n` + modified + `\n\n⚡ ${selectedProduct.installments || 'Parcelamento facilitado'} no cartão ou Pix com desconto!\n👉 Clique e inicie seu curso hoje mesmo!`;
      } else if (action === 'mais-direto') {
        modified = `🎯 ${selectedProduct.name}\n\n• Carga horária: ${selectedProduct.workloadHours}h (${selectedProduct.modality})\n• Certificado: ${selectedProduct.certification}\n• Conclusão: ${selectedProduct.completionDeadline}\n• Valor: ${selectedProduct.promoPrice ? `R$ ${selectedProduct.promoPrice.toFixed(2)}` : 'Consulte'}\n\nFale conosco e matricule-se agora.`;
      } else if (action === '3-opcoes') {
        setVariations([
          `Opção 1 (Foco em Carreira):\n"Eleve seu nível profissional com o curso ${selectedProduct.name}. Certificado homologado e estudo 100% online!"`,
          `Opção 2 (Foco em Rapidez & Praticidade):\n"Conclua sua capacitação de ${selectedProduct.workloadHours}h ${selectedProduct.completionDeadline} direto no celular pela Prime Excelência!"`,
          `Opção 3 (Foco em Oferta & Condição):\n"Oportunidade única: Matricule-se no curso de ${selectedProduct.name} por apenas ${selectedProduct.installments || 'parcelas reduzidas'}!"`
        ]);
        setShowVariations(true);
      }
      setGeneratedText(modified);
      setIsGenerating(false);
    }, 200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToLibrary = () => {
    const mat: GeneratedMaterial = {
      id: `mat-${Date.now()}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      title: `Descrição ${channel} — ${selectedProduct.name}`,
      category: 'Comercial',
      type: channel,
      content: generatedText,
      createdAt: new Date().toISOString(),
      isFavorite: false,
      tags: [channel, length, tone, selectedProduct.codeSKU]
    };
    onSaveMaterial(mat);
    setSaved(true);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#00ff88] uppercase tracking-wider mb-1">
            Description Studio
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#f0fdf4] font-heading">
            Gerador Inteligente de Descrições
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1">
            Produza textos perfeitamente calibrados para 15+ canais e formatos com controle total de tom e tamanho.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Settings Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Channel Selector */}
          <div className="studio-card rounded-xl p-5 space-y-3">
            <label className="text-xs font-bold text-[#00ff88] uppercase tracking-wider flex items-center justify-between">
              <span>1. Canal de Destino</span>
              <span className="text-[10px] text-[#64748b] font-normal">15 formatos</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setChannel(ch.id)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer truncate ${
                    channel === ch.id
                      ? 'bg-[#00d26a]/25 text-[#00ff88] border border-[#00d26a]/40 shadow-sm'
                      : 'bg-[#080d0b] text-[#64748b] hover:text-[#f0fdf4] border border-[#192720]'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>

          {/* Length & Tone Selectors */}
          <div className="studio-card rounded-xl p-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-[#00ff88] uppercase tracking-wider block mb-2">
                2. Tamanho do Texto
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {lengths.map((len) => (
                  <button
                    key={len.id}
                    onClick={() => setLength(len.id)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold text-center transition-all cursor-pointer truncate ${
                      length === len.id
                        ? 'bg-[#00d26a]/25 text-[#00ff88] border border-[#00d26a]/40'
                        : 'bg-[#080d0b] text-[#64748b] hover:text-[#f0fdf4] border border-[#192720]'
                    }`}
                  >
                    {len.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#192720]">
              <label className="text-xs font-bold text-[#00ff88] uppercase tracking-wider block mb-2">
                3. Tom de Voz
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold text-center transition-all cursor-pointer truncate ${
                      tone === t
                        ? 'bg-[#00d26a]/25 text-[#00ff88] border border-[#00d26a]/40'
                        : 'bg-[#080d0b] text-[#64748b] hover:text-[#f0fdf4] border border-[#192720]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#192720]">
              <label className="text-xs font-semibold text-[#94a3b8] block mb-1">
                Instrução Adicional Opcional
              </label>
              <input
                type="text"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Ex: Focar na promoção que encerra sexta-feira..."
                className="w-full rounded-lg studio-input px-3 py-1.5 text-xs text-[#f0fdf4]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Output & Live Refinements (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="studio-card rounded-xl p-5 space-y-4">
            {/* Action Bar */}
            <div className="flex items-center justify-between border-b border-[#192720] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#00ff88] uppercase tracking-wider">
                  {channel} • {length} • {tone}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  title="Gerar novamente"
                  className="p-1.5 rounded-lg bg-[#16251e] text-[#64748b] hover:text-[#f0fdf4] transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin text-[#00ff88]' : ''}`} />
                </button>

                <button
                  id="btn-copy-description"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16251e] text-xs font-bold text-[#00ff88] hover:bg-[#1f3329] transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>

                <button
                  id="btn-save-description"
                  onClick={handleSaveToLibrary}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg emerald-gradient-bg text-[#080d0b] text-xs font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  {saved ? 'Salvo!' : 'Salvar'}
                </button>
              </div>
            </div>

            {/* Editable Text Area */}
            <textarea
              rows={14}
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              className="w-full rounded-xl bg-[#080d0b] border border-[#192720] p-4 text-xs text-[#cbd5e1] font-mono leading-relaxed focus:border-[#00d26a] focus:outline-none resize-y"
            />

            {/* Refinement Action Buttons (Quick AI actions) */}
            <div className="space-y-2 pt-2 border-t border-[#192720]">
              <div className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
                Refinar com IA:
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleRefine('encurtar')}
                  className="px-2.5 py-1 rounded bg-[#121f18] hover:bg-[#192f23] text-[11px] text-[#94a3b8] hover:text-[#00ff88] border border-[#192720] cursor-pointer"
                >
                  ✂️ Encurtar
                </button>
                <button
                  onClick={() => handleRefine('mais-comercial')}
                  className="px-2.5 py-1 rounded bg-[#121f18] hover:bg-[#192f23] text-[11px] text-[#94a3b8] hover:text-[#00ff88] border border-[#192720] cursor-pointer"
                >
                  💼 Mais Comercial
                </button>
                <button
                  onClick={() => handleRefine('mais-direto')}
                  className="px-2.5 py-1 rounded bg-[#121f18] hover:bg-[#192f23] text-[11px] text-[#94a3b8] hover:text-[#00ff88] border border-[#192720] cursor-pointer"
                >
                  🎯 Mais Direto
                </button>
                <button
                  onClick={() => handleRefine('3-opcoes')}
                  className="px-2.5 py-1 rounded bg-[#121f18] hover:bg-[#192f23] text-[11px] text-[#94a3b8] hover:text-[#00ff88] border border-[#192720] cursor-pointer"
                >
                  💡 Criar 3 Opções
                </button>
              </div>
            </div>

            {/* 3 Variations Popup Card */}
            {showVariations && (
              <div className="mt-4 p-4 rounded-xl bg-[#0c1611] border border-[#00d26a]/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#00ff88]">
                  <span>3 Opções Alternativas de Abordagem:</span>
                  <button
                    onClick={() => setShowVariations(false)}
                    className="text-[#64748b] hover:text-[#f0fdf4]"
                  >
                    Fechar
                  </button>
                </div>
                {variations.map((v, i) => (
                  <div key={i} className="p-3 bg-[#080d0b] rounded-lg border border-[#192720] text-xs text-[#cbd5e1] space-y-2">
                    <p className="whitespace-pre-wrap">{v}</p>
                    <button
                      onClick={() => {
                        setGeneratedText(v);
                        setShowVariations(false);
                      }}
                      className="text-[11px] text-[#00ff88] font-semibold hover:underline"
                    >
                      Usar esta versão →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
