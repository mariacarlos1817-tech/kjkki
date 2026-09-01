import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  FolderPlus, 
  Layers, 
  MessageSquare, 
  Megaphone, 
  Palette, 
  Calendar, 
  Globe,
  Award,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, BrandKit, GeneratedMaterial, Project } from '../types';
import { AIGeneratorService } from '../services/aiGenerator';

interface SuperKitViewProps {
  selectedProduct: Product;
  brandKit: BrandKit;
  onSaveToProject?: (project: Partial<Project>) => void;
}

export const SuperKitView: React.FC<SuperKitViewProps> = ({
  selectedProduct,
  brandKit,
  onSaveToProject
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'copies' | 'ads10' | 'whatsapp' | 'carousel' | 'creative' | 'frameworks'>('overview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Generate kit
  const kit = React.useMemo(() => {
    return AIGeneratorService.generateSuperKit(selectedProduct, brandKit);
  }, [selectedProduct, brandKit]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadKitJSON = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(kit, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SuperKit-${selectedProduct.codeSKU}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSaveProject = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setIsSaved(true);
    if (onSaveToProject) {
      onSaveToProject({
        name: `Kit de Vendas — ${selectedProduct.name}`,
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        description: `Kit completo de divulgação com 20+ materiais gerados em ${new Date().toLocaleDateString('pt-BR')}`,
        status: 'Ativo'
      });
    }
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Super Kit Header */}
      <div className="bg-gradient-to-r from-[#0c1a13] via-[#0a1510] to-[#09120e] border border-[#193b29] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl shadow-[#00d26a]/5">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d26a]/20 border border-[#00d26a]/40 text-[#00ff88] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            GERAÇÃO COMPLETA EM 1 CLIQUE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f0fdf4] font-heading">
            Super Kit de Vendas & Divulgação
          </h1>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Kit multimaterial completo gerado exclusivamente a partir dos dados do curso <strong className="text-[#00ff88]">{selectedProduct.name}</strong> ({selectedProduct.workloadHours}h). Peças de alta conversão prontas para uso comercial imediato.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="btn-superkit-save-project"
            onClick={handleSaveProject}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1f3b2c] bg-[#0c1a13] text-xs font-bold text-[#00ff88] hover:bg-[#00d26a]/20 transition-all cursor-pointer whitespace-nowrap"
          >
            {isSaved ? <Check className="w-4 h-4 text-[#00ff88]" /> : <FolderPlus className="w-4 h-4" />}
            {isSaved ? 'Salvo nos Projetos!' : 'Salvar como Projeto'}
          </button>
          
          <button
            id="btn-superkit-download-json"
            onClick={handleDownloadKitJSON}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg emerald-gradient-bg text-[#080d0b] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Exportar Kit (JSON)
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#192720] bg-[#0a120e] rounded-xl overflow-x-auto scrollbar-hide p-1 gap-1">
        {[
          { id: 'overview', label: 'Visão Geral do Kit', icon: Layers },
          { id: 'creative', label: 'Prompts & Criativos HD', icon: Palette },
          { id: 'ads10', label: '10 Variações de Ads', icon: Megaphone },
          { id: 'whatsapp', label: 'WhatsApp & Vendedor', icon: MessageSquare },
          { id: 'copies', label: 'Cópias & Canais', icon: Globe },
          { id: 'carousel', label: 'Carrossel (8 Slides)', icon: Layers },
          { id: 'frameworks', label: 'Frameworks de Copy', icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#00d26a]/20 text-[#00ff88] border border-[#00d26a]/40 shadow-sm'
                  : 'text-[#64748b] hover:text-[#f0fdf4] hover:bg-[#121f18]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="studio-card rounded-xl p-6 space-y-4">
              <h2 className="text-base font-bold text-[#f0fdf4] font-heading flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00d26a]" />
                Resumo do Material Gerado
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-[#080d0b] p-3.5 rounded-lg border border-[#192720]">
                  <div className="text-2xl font-extrabold text-[#00ff88]">6+</div>
                  <div className="text-xs text-[#64748b] mt-0.5">Descrições por Canal</div>
                </div>
                <div className="bg-[#080d0b] p-3.5 rounded-lg border border-[#192720]">
                  <div className="text-2xl font-extrabold text-[#00ff88]">10</div>
                  <div className="text-xs text-[#64748b] mt-0.5">Variações de Anúncios</div>
                </div>
                <div className="bg-[#080d0b] p-3.5 rounded-lg border border-[#192720]">
                  <div className="text-2xl font-extrabold text-[#00ff88]">5</div>
                  <div className="text-xs text-[#64748b] mt-0.5">Scripts Modo Vendedor</div>
                </div>
                <div className="bg-[#080d0b] p-3.5 rounded-lg border border-[#192720]">
                  <div className="text-2xl font-extrabold text-[#00ff88]">8</div>
                  <div className="text-xs text-[#64748b] mt-0.5">Slides de Carrossel</div>
                </div>
                <div className="bg-[#080d0b] p-3.5 rounded-lg border border-[#192720]">
                  <div className="text-2xl font-extrabold text-[#00ff88]">HD</div>
                  <div className="text-xs text-[#64748b] mt-0.5">Prompts de Imagem</div>
                </div>
                <div className="bg-[#080d0b] p-3.5 rounded-lg border border-[#192720]">
                  <div className="text-2xl font-extrabold text-[#00ff88]">3</div>
                  <div className="text-xs text-[#64748b] mt-0.5">Frameworks de Copy</div>
                </div>
              </div>
            </div>

            {/* Quick Copy Snippet */}
            <div className="studio-card rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#f0fdf4] font-heading">
                  Texto Principal para WhatsApp
                </h3>
                <button
                  onClick={() => handleCopy(kit.descriptions.whatsapp, 'desc-wa')}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#16251e] text-xs font-semibold text-[#00ff88] hover:bg-[#1f3329] transition-all cursor-pointer"
                >
                  {copiedKey === 'desc-wa' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'desc-wa' ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
              <pre className="bg-[#080d0b] p-4 rounded-lg text-xs text-[#cbd5e1] font-mono whitespace-pre-wrap border border-[#192720] max-h-60 overflow-y-auto leading-relaxed">
                {kit.descriptions.whatsapp}
              </pre>
            </div>
          </div>

          {/* Right Product Card */}
          <div className="space-y-4">
            <div className="studio-card rounded-xl p-5 space-y-3">
              <img
                src={selectedProduct.coverImage}
                alt={selectedProduct.name}
                className="w-full h-36 object-cover rounded-lg border border-[#192720]"
              />
              <div className="text-xs font-bold text-[#00ff88]">{selectedProduct.codeSKU}</div>
              <h3 className="text-sm font-bold text-[#f0fdf4] font-heading">
                {selectedProduct.name}
              </h3>
              <div className="text-xs text-[#94a3b8] space-y-1 pt-2 border-t border-[#192720]">
                <div>• Carga Horária: {selectedProduct.workloadHours}h ({selectedProduct.modality})</div>
                <div>• Conclusão: {selectedProduct.completionDeadline}</div>
                <div>• Acesso: {selectedProduct.accessPeriod}</div>
                <div>• Certificado: {selectedProduct.certification}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Copies */}
      {activeTab === 'copies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Descrição para WhatsApp / Catálogo', key: 'c-wa', content: kit.descriptions.whatsapp },
            { title: 'Publicação para Instagram / Facebook', key: 'c-ig', content: kit.descriptions.instagram },
            { title: 'Texto Principal Anúncio Meta Ads', key: 'c-meta', content: kit.descriptions.metaAds },
            { title: 'Estrutura para Página de Vendas', key: 'c-sp', content: kit.descriptions.salesPage },
            { title: 'Descrição Curta / Bio', key: 'c-bio', content: kit.descriptions.shortBio },
            { title: 'Otimização SEO (Meta tags e keywords)', key: 'c-seo', content: kit.descriptions.seo }
          ].map((item) => (
            <div key={item.key} className="studio-card rounded-xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-[#00ff88] uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => handleCopy(item.content, item.key)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#16251e] text-xs font-semibold text-[#00ff88] hover:bg-[#1f3329] transition-all cursor-pointer"
                  >
                    {copiedKey === item.key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === item.key ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <pre className="bg-[#080d0b] p-3.5 rounded-lg text-xs text-[#cbd5e1] font-mono whitespace-pre-wrap border border-[#192720] max-h-56 overflow-y-auto leading-relaxed">
                  {item.content}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 3: 10 Ad Variations */}
      {activeTab === 'ads10' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kit.adVariations.map((ad, idx) => (
            <div key={idx} className="studio-card rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#00d26a]/20 text-[#00ff88] border border-[#00d26a]/30">
                  {idx + 1}. {ad.angle}
                </span>
                <button
                  onClick={() => handleCopy(`${ad.headline}\n\n${ad.hook}\n\n${ad.primaryText}\n\nCTA: ${ad.cta}`, `ad-${idx}`)}
                  className="p-1.5 rounded bg-[#16251e] text-[#00ff88] hover:bg-[#1f3329] cursor-pointer"
                  title="Copiar anúncio"
                >
                  {copiedKey === `ad-${idx}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div>
                <div className="text-xs text-[#64748b] uppercase font-bold">Headline:</div>
                <div className="text-sm font-bold text-[#f0fdf4] font-heading mt-0.5">{ad.headline}</div>
              </div>

              <div>
                <div className="text-xs text-[#64748b] uppercase font-bold">Gancho (Hook):</div>
                <div className="text-xs text-[#00ff88] font-medium mt-0.5 italic">"{ad.hook}"</div>
              </div>

              <div>
                <div className="text-xs text-[#64748b] uppercase font-bold">Texto Principal:</div>
                <p className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed">{ad.primaryText}</p>
              </div>

              <div className="pt-2 border-t border-[#192720] flex items-center justify-between text-xs">
                <span className="text-[#64748b]">Botão CTA:</span>
                <span className="text-[#00ff88] font-bold bg-[#080d0b] px-2 py-0.5 rounded border border-[#192720]">
                  {ad.cta}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 4: WhatsApp & Seller Mode */}
      {activeTab === 'whatsapp' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Quando o Cliente Pergunta o Preço', key: 'w-pr', text: kit.whatsappSellerMode.priceResponse },
            { label: 'Quando o Cliente Pergunta se é 100% Online', key: 'w-on', text: kit.whatsappSellerMode.onlineResponse },
            { label: 'Quando o Cliente Pergunta sobre o Certificado / Homologação', key: 'w-cert', text: kit.whatsappSellerMode.certificateResponse },
            { label: 'Quando o Cliente Acha Caro / Pede Desconto', key: 'w-obj', text: kit.whatsappSellerMode.objectionResponse },
            { label: 'Script de Fechamento Imediato (Início Hoje)', key: 'w-close', text: kit.whatsappSellerMode.closingScript }
          ].map((item) => (
            <div key={item.key} className="studio-card rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#00ff88] uppercase tracking-wider">
                  {item.label}
                </h3>
                <button
                  onClick={() => handleCopy(item.text, item.key)}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-[#16251e] text-xs font-semibold text-[#00ff88] hover:bg-[#1f3329] cursor-pointer"
                >
                  {copiedKey === item.key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === item.key ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
              <pre className="bg-[#080d0b] p-3.5 rounded-lg text-xs text-[#cbd5e1] font-mono whitespace-pre-wrap border border-[#192720] max-h-52 overflow-y-auto leading-relaxed">
                {item.text}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 5: Carousel */}
      {activeTab === 'carousel' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#f0fdf4] font-heading">
              Estrutura Completa de Carrossel (8 Slides de Alta Retenção)
            </h2>
            <button
              onClick={() => handleCopy(kit.carouselSlides.map(s => `[SLIDE ${s.slide} - ${s.type}]\n${s.content}\n${s.subtext}`).join('\n\n'), 'all-slides')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#16251e] text-xs font-bold text-[#00ff88] hover:bg-[#1f3329] cursor-pointer"
            >
              {copiedKey === 'all-slides' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copiar Todos os 8 Slides
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kit.carouselSlides.map((slide) => (
              <div key={slide.slide} className="studio-card rounded-xl p-4 flex flex-col justify-between space-y-3 border-[#192720]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#00ff88] font-mono">Slide {slide.slide}/8</span>
                    <span className="text-[10px] bg-[#16251e] text-[#64748b] px-2 py-0.5 rounded uppercase font-bold">
                      {slide.type}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#f0fdf4]">{slide.title}</h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed whitespace-pre-wrap">{slide.content}</p>
                </div>
                <div className="pt-2 border-t border-[#192720] text-[11px] text-[#00ff88] italic">
                  "{slide.subtext}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 6: Creative Concepts */}
      {activeTab === 'creative' && (
        <div className="studio-card rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#f0fdf4] font-heading">
              {kit.creativeConcept.title}
            </h3>
            <button
              onClick={() => handleCopy(kit.creativeConcept.fullPrompt, 'prompt-full')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16251e] text-xs font-bold text-[#00ff88] hover:bg-[#1f3329] cursor-pointer"
            >
              {copiedKey === 'prompt-full' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copiar Prompt Midjourney/Flux
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#080d0b] p-4 rounded-lg border border-[#192720] space-y-2">
              <div><strong className="text-[#00ff88]">Personagem:</strong> {kit.creativeConcept.character}</div>
              <div><strong className="text-[#00ff88]">Ambiente & Veículo:</strong> {kit.creativeConcept.environment} / {kit.creativeConcept.vehicleOrEquipment}</div>
              <div><strong className="text-[#00ff88]">Iluminação:</strong> {kit.creativeConcept.lighting}</div>
              <div><strong className="text-[#00ff88]">Atmosfera:</strong> {kit.creativeConcept.mood}</div>
            </div>

            <div className="bg-[#080d0b] p-4 rounded-lg border border-[#192720] space-y-2">
              <div className="text-[#00ff88] font-bold">Prompt Completo em Inglês:</div>
              <p className="text-[#cbd5e1] font-mono leading-relaxed">{kit.creativeConcept.fullPrompt}</p>
              <div className="pt-2 border-t border-[#192720] text-[11px] text-[#f87171]">
                <strong>Negative Prompt:</strong> {kit.creativeConcept.negativePrompt}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 8: Frameworks */}
      {activeTab === 'frameworks' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="studio-card rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#00ff88] uppercase tracking-wider">
              {kit.copyFrameworks.aida.framework}
            </h3>
            <div className="space-y-2 text-xs text-[#cbd5e1] leading-relaxed">
              <div><strong className="text-[#f0fdf4]">Atenção:</strong> {kit.copyFrameworks.aida.attention}</div>
              <div><strong className="text-[#f0fdf4]">Interesse:</strong> {kit.copyFrameworks.aida.interest}</div>
              <div><strong className="text-[#f0fdf4]">Desejo:</strong> {kit.copyFrameworks.aida.desire}</div>
              <div><strong className="text-[#f0fdf4]">Ação:</strong> {kit.copyFrameworks.aida.action}</div>
            </div>
          </div>

          <div className="studio-card rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#00ff88] uppercase tracking-wider">
              {kit.copyFrameworks.pas.framework}
            </h3>
            <div className="space-y-2 text-xs text-[#cbd5e1] leading-relaxed">
              <div><strong className="text-[#f0fdf4]">Problema:</strong> {kit.copyFrameworks.pas.problem}</div>
              <div><strong className="text-[#f0fdf4]">Agitação:</strong> {kit.copyFrameworks.pas.agitation}</div>
              <div><strong className="text-[#f0fdf4]">Solução:</strong> {kit.copyFrameworks.pas.solution}</div>
            </div>
          </div>

          <div className="studio-card rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#00ff88] uppercase tracking-wider">
              {kit.copyFrameworks.bab.framework}
            </h3>
            <div className="space-y-2 text-xs text-[#cbd5e1] leading-relaxed">
              <div><strong className="text-[#f0fdf4]">Antes:</strong> {kit.copyFrameworks.bab.before}</div>
              <div><strong className="text-[#f0fdf4]">Depois:</strong> {kit.copyFrameworks.bab.after}</div>
              <div><strong className="text-[#f0fdf4]">Ponte:</strong> {kit.copyFrameworks.bab.bridge}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
