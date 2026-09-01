import React, { useState } from 'react';
import { 
  BookOpen, 
  Printer, 
  Share2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Award, 
  Clock, 
  Building2, 
  Sparkles,
  Phone,
  Mail,
  Globe,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, BrandKit } from '../types';

interface PortfolioBuilderViewProps {
  products: Product[];
  brandKit: BrandKit;
}

export const PortfolioBuilderView: React.FC<PortfolioBuilderViewProps> = ({
  products,
  brandKit
}) => {
  const [layoutType, setLayoutType] = useState<'institucional' | 'comercial' | 'b2b'>('institucional');
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `PORTFÓLIO OFICIAL DE CURSOS — ${brandKit.name.toUpperCase()}\n` +
      `Desde ${brandKit.foundedYear} • Homologado e Certificado\n\n` +
      `📌 CURSOS DISPONÍVEIS:\n\n` +
      products.map(p => `• ${p.name.toUpperCase()} (${p.workloadHours}h - ${p.modality})\n  ${p.shortDescription}\n  Certificado: ${p.certification}`).join('\n\n') +
      `\n\nCanais Oficiais:\nTelefone: ${brandKit.contactPhone}\nSite: ${brandKit.website}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 50 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#f2ca50] uppercase tracking-wider mb-1">
            Portfolio Builder
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#e5e2e1] font-heading">
            Portfólio Institucional & Comercial
          </h1>
          <p className="text-xs text-[#a09885] mt-1">
            Gere apresentações diagramadas para clientes corporativos, órgãos públicos e empresas de logística.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#353535] bg-[#1a1a1a] text-xs font-semibold text-[#e5e2e1] hover:border-[#d4af37] hover:text-[#f2ca50] transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#7ee787]" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg gold-gradient-bg text-[#0A0A0A] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Layout Selection */}
      <div className="flex gap-2">
        {[
          { id: 'institucional', label: 'Portfólio Institucional (Completo)' },
          { id: 'comercial', label: 'Portfólio Comercial (Com Preços)' },
          { id: 'b2b', label: 'Portfólio Corporativo (B2B Empresas)' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setLayoutType(item.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              layoutType === item.id
                ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
                : 'bg-[#181818] text-[#857d6e] hover:text-[#e5e2e1]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Printable / Viewable Portfolio Sheet */}
      <div className="bg-[#111] border border-[#262626] rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto space-y-10 shadow-2xl">
        {/* Cover Header */}
        <div className="text-center space-y-4 border-b border-[#262626] pb-8">
          <div className="w-16 h-16 rounded-2xl gold-gradient-bg mx-auto flex items-center justify-center font-extrabold text-[#0A0A0A] text-2xl shadow-lg shadow-[#d4af37]/20">
            P
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f2ca50] font-heading">
              {brandKit.name}
            </h2>
            <div className="text-xs text-[#a09885] uppercase tracking-widest mt-1">
              Portfólio Geral de Capacitação & Cursos Homologados
            </div>
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-[#1e1c14] border border-[#d4af37]/30 text-[11px] text-[#f2ca50]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Atuação desde {brandKit.foundedYear} • Homologado pelos Órgãos Competentes
            </div>
          </div>
        </div>

        {/* Institutional Mission */}
        <div className="bg-[#171717] border border-[#292929] rounded-xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-[#e5e2e1] font-heading flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#f2ca50]" />
            Apresentação Institucional
          </h3>
          <p className="text-xs text-[#a09885] leading-relaxed">
            A {brandKit.name} é referência nacional em soluções de ensino e qualificação profissional à distância (EAD). Desenvolvemos programas educacionais que aliam rigor pedagógico, conformidade estrita às resoluções legais e tecnologia de ponta para atender tanto profissionais autônomos quanto frotas corporativas em todo o Brasil.
          </p>
        </div>

        {/* Courses Table / Cards */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#e5e2e1] font-heading flex items-center justify-between border-b border-[#242424] pb-2">
            <span>Grade Oficial de Cursos</span>
            <span className="text-xs text-[#857d6e] font-normal">{products.length} qualificações cadastradas</span>
          </h3>

          <div className="space-y-3">
            {products.map((p, idx) => (
              <div key={p.id} className="bg-[#161616] border border-[#262626] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#222] text-[#f2ca50] font-bold text-xs flex items-center justify-center font-mono shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#f2ca50] font-mono font-bold bg-[#d4af37]/15 px-1.5 py-0.5 rounded">
                        {p.codeSKU}
                      </span>
                      <span className="text-[10px] text-[#857d6e]">{p.category}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#e5e2e1] font-heading mt-0.5">{p.name}</h4>
                    <p className="text-xs text-[#857d6e] mt-0.5 line-clamp-1">{p.shortDescription}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 sm:text-right text-xs">
                  <div>
                    <div className="text-[#f2ca50] font-bold">{p.workloadHours}h / aula</div>
                    <div className="text-[10px] text-[#857d6e]">{p.modality}</div>
                  </div>

                  {layoutType === 'comercial' && (
                    <div className="pl-4 border-l border-[#262626]">
                      <div className="text-[#7ee787] font-bold">R$ {p.promoPrice?.toFixed(2) || '249,90'}</div>
                      <div className="text-[10px] text-[#857d6e]">{p.installments || '12x no cartão'}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Differentials Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#262626]">
          <div className="bg-[#141414] p-4 rounded-xl border border-[#242424] text-center space-y-1.5">
            <Clock className="w-6 h-6 text-[#f2ca50] mx-auto" />
            <h4 className="text-xs font-bold text-[#e5e2e1]">Acesso 24/7</h4>
            <p className="text-[11px] text-[#857d6e]">Estudo flexível no celular ou computador sem interrupção.</p>
          </div>

          <div className="bg-[#141414] p-4 rounded-xl border border-[#242424] text-center space-y-1.5">
            <Award className="w-6 h-6 text-[#f2ca50] mx-auto" />
            <h4 className="text-xs font-bold text-[#e5e2e1]">Certificado Válido</h4>
            <p className="text-[11px] text-[#857d6e]">Chave de autenticidade digital com aceitação nacional.</p>
          </div>

          <div className="bg-[#141414] p-4 rounded-xl border border-[#242424] text-center space-y-1.5">
            <ShieldCheck className="w-6 h-6 text-[#f2ca50] mx-auto" />
            <h4 className="text-xs font-bold text-[#e5e2e1]">Suporte Pedagógico</h4>
            <p className="text-[11px] text-[#857d6e]">Acompanhamento com equipe especializada de atendimento.</p>
          </div>
        </div>

        {/* Official Contacts Footer */}
        <div className="pt-6 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between text-xs text-[#857d6e] gap-4">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#f2ca50]" />
            <span>{brandKit.contactPhone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#f2ca50]" />
            <span>{brandKit.contactEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#f2ca50]" />
            <span>{brandKit.website}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
