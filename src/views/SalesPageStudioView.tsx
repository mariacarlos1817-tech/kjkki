import React, { useState } from 'react';
import { 
  Globe, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  DollarSign, 
  PhoneCall,
  ExternalLink,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, BrandKit } from '../types';

interface SalesPageStudioViewProps {
  selectedProduct: Product;
  brandKit: BrandKit;
}

export const SalesPageStudioView: React.FC<SalesPageStudioViewProps> = ({
  selectedProduct,
  brandKit
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openModule, setOpenModule] = useState<number | null>(0);

  const containerWidthClass = {
    desktop: 'max-w-5xl',
    tablet: 'max-w-2xl',
    mobile: 'max-w-sm'
  }[device];

  const handleCopyCode = () => {
    const htmlCode = `<!-- Página de Vendas Homologada - ${selectedProduct.name} -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>${selectedProduct.name} | ${brandKit.name}</title>
  <meta name="description" content="${selectedProduct.shortDescription}">
</head>
<body style="background:#0a0a0a; color:#e5e2e1; font-family:sans-serif;">
  <!-- Hero Section -->
  <header style="padding: 60px 20px; text-align:center;">
    <h1 style="color:#f2ca50; font-size:32px;">${selectedProduct.name}</h1>
    <p style="font-size:18px;">${selectedProduct.shortDescription}</p>
    <div style="margin-top:20px;">
      <a href="${brandKit.website}" style="background:#d4af37; color:#000; padding:15px 30px; text-decoration:none; font-weight:bold; border-radius:8px;">${selectedProduct.ctaText}</a>
    </div>
  </header>
</body>
</html>`;
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    confetti({ particleCount: 60, spread: 60 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#f2ca50] uppercase tracking-wider mb-1">
            Sales Page Studio
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#e5e2e1] font-heading">
            Página de Vendas de Alta Conversão
          </h1>
          <p className="text-xs text-[#a09885] mt-1">
            Layout com 17 seções completas diagramadas no padrão Prime (Dark & Gold Luxury).
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Device Switcher */}
          <div className="flex items-center bg-[#181818] border border-[#2d2d2d] rounded-lg p-1">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-1.5 rounded-md transition-all ${device === 'desktop' ? 'bg-[#d4af37]/20 text-[#f2ca50]' : 'text-[#857d6e] hover:text-[#e5e2e1]'}`}
              title="Visualização Desktop"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-1.5 rounded-md transition-all ${device === 'tablet' ? 'bg-[#d4af37]/20 text-[#f2ca50]' : 'text-[#857d6e] hover:text-[#e5e2e1]'}`}
              title="Visualização Tablet"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-1.5 rounded-md transition-all ${device === 'mobile' ? 'bg-[#d4af37]/20 text-[#f2ca50]' : 'text-[#857d6e] hover:text-[#e5e2e1]'}`}
              title="Visualização Mobile"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient-bg text-[#0A0A0A] font-bold text-xs shadow-md cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Código Copiado!' : 'Copiar HTML da Página'}
          </button>
        </div>
      </div>

      {/* Live Landing Page Preview Container */}
      <div className="flex justify-center bg-[#070707] p-4 sm:p-8 rounded-2xl border border-[#222] min-h-[600px] overflow-hidden">
        <div className={`w-full ${containerWidthClass} transition-all duration-300 bg-[#0d0d0d] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl space-y-0`}>
          
          {/* SECTION 1: Top Notification Bar */}
          <div className="bg-[#d4af37] text-[#0A0A0A] py-2 px-4 text-center text-xs font-bold tracking-wide">
            ⚡ VAGAS PROMOCIONAIS COM INÍCIO IMEDIATO — 100% ONLINE E HOMOLOGADO
          </div>

          {/* SECTION 2: Navbar */}
          <nav className="px-6 py-4 border-b border-[#222] flex items-center justify-between bg-[#121212]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gold-gradient-bg flex items-center justify-center font-bold text-[#0A0A0A] text-sm">
                P
              </div>
              <div>
                <span className="font-extrabold text-sm text-[#f2ca50] font-heading">{brandKit.name}</span>
                <span className="text-[9px] text-[#857d6e] block">Desde 2015</span>
              </div>
            </div>

            <a
              href={brandKit.website}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 rounded-lg gold-gradient-bg text-[#0A0A0A] font-bold text-xs hover:brightness-110 transition-all"
            >
              Matricule-se
            </a>
          </nav>

          {/* SECTION 3: Hero Section */}
          <section className="px-6 py-12 text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-[#141414] to-[#0d0d0d]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#f2ca50] text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              CURSO HOMOLOGADO PELO SENATRAN & DETRAN
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#e5e2e1] font-heading tracking-tight max-w-2xl mx-auto leading-tight">
              {selectedProduct.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#a09885] max-w-xl mx-auto leading-relaxed">
              {selectedProduct.promisedTransformation || selectedProduct.shortDescription}
            </p>

            {/* Media Card / Cover */}
            <div className="relative rounded-xl overflow-hidden max-w-lg mx-auto border border-[#333] shadow-2xl">
              <img
                src={selectedProduct.coverImage}
                alt={selectedProduct.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-[#f2ca50] font-mono border border-[#d4af37]/30">
                {selectedProduct.workloadHours}h • {selectedProduct.modality} • {selectedProduct.completionDeadline}
              </div>
            </div>

            {/* Hero CTA */}
            <div className="space-y-2 pt-2">
              <button className="px-8 py-3.5 rounded-xl gold-gradient-bg text-[#0A0A0A] font-extrabold text-sm shadow-xl shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition-all">
                {selectedProduct.ctaText} — R$ {selectedProduct.promoPrice?.toFixed(2) || '249,90'}
              </button>
              <div className="text-[11px] text-[#857d6e]">
                🔒 Pagamento 100% seguro • Acesso liberado imediatamente no WhatsApp
              </div>
            </div>
          </section>

          {/* SECTION 4: Authority Badges Bar */}
          <section className="bg-[#121212] border-y border-[#222] py-4 px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-base font-bold text-[#f2ca50]">Desde 2015</div>
              <div className="text-[10px] text-[#857d6e]">Pioneirismo em EAD</div>
            </div>
            <div>
              <div className="text-base font-bold text-[#f2ca50]">{selectedProduct.workloadHours}h</div>
              <div className="text-[10px] text-[#857d6e]">Carga Horária Oficial</div>
            </div>
            <div>
              <div className="text-base font-bold text-[#f2ca50]">100% Online</div>
              <div className="text-[10px] text-[#857d6e]">Estudo no Celular/PC</div>
            </div>
            <div>
              <div className="text-base font-bold text-[#f2ca50]">Válido em Todo Brasil</div>
              <div className="text-[10px] text-[#857d6e]">Certificado Homologado</div>
            </div>
          </section>

          {/* SECTION 5: Problems & Transformation */}
          <section className="p-8 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
                Oportunidade de Carreira
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#e5e2e1] font-heading">
                Por que se capacitar agora com a Prime?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#171414] border border-[#3d2424] space-y-2">
                <div className="text-xs font-bold text-[#ff7b7b]">⚠️ Sem a qualificação necessária:</div>
                <p className="text-xs text-[#a09885] leading-relaxed">
                  {selectedProduct.primaryPainPoint || 'Você perde vagas com altos salários em grandes transportadoras e empresas que exigem cursos obrigatórios no currículo.'}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#141714] border border-[#243d24] space-y-2">
                <div className="text-xs font-bold text-[#7ee787]">✅ Com o certificado Prime em mãos:</div>
                <p className="text-xs text-[#a09885] leading-relaxed">
                  {selectedProduct.promisedTransformation || 'Você se destaca nos processos seletivos com documentação 100% legalizada e válida em todo o território nacional.'}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 6: Syllabus Modules Accordion */}
          <section className="p-8 bg-[#121212] border-t border-[#222] space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
                Grade Curricular Completa
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#e5e2e1] font-heading">
                O que você vai aprender
              </h2>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              {selectedProduct.syllabusModules.map((mod, idx) => (
                <div key={mod.id} className="bg-[#181818] border border-[#282828] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenModule(openModule === idx ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-[#e5e2e1] cursor-pointer"
                  >
                    <span>{mod.title}</span>
                    {openModule === idx ? <ChevronUp className="w-4 h-4 text-[#f2ca50]" /> : <ChevronDown className="w-4 h-4 text-[#857d6e]" />}
                  </button>
                  {openModule === idx && (
                    <div className="px-4 pb-4 text-xs text-[#857d6e] border-t border-[#222] pt-3 leading-relaxed">
                      {mod.description}
                      <div className="mt-2 text-[11px] text-[#f2ca50]">
                        ✓ {mod.lessonsCount} aulas completas com exercícios de fixação.
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7: Pricing Offer Card */}
          <section className="p-8 text-center space-y-6 bg-gradient-to-b from-[#141414] to-[#1a1710] border-t border-[#222]">
            <div className="max-w-md mx-auto studio-card p-8 rounded-2xl border-[#d4af37]/50 space-y-4 shadow-2xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient-bg text-[#0A0A0A] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase">
                OFERTA EXCLUSIVA DESTA SEMANA
              </div>

              <div className="pt-2">
                <span className="text-xs text-[#857d6e] line-through">
                  De R$ {selectedProduct.price?.toFixed(2) || '349,00'}
                </span>
                <div className="text-3xl font-extrabold text-[#f2ca50] font-heading mt-1">
                  R$ {selectedProduct.promoPrice?.toFixed(2) || '249,90'}
                </div>
                <div className="text-xs text-[#a09885] mt-1 font-semibold">
                  ou em até {selectedProduct.installments || '12x no cartão de crédito'}
                </div>
              </div>

              <div className="pt-4 border-t border-[#222] text-left text-xs space-y-2 text-[#d0c5af]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7ee787]" />
                  <span>Acesso por {selectedProduct.accessPeriod}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7ee787]" />
                  <span>Certificado oficial incluso</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7ee787]" />
                  <span>Suporte pedagógico completo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#7ee787]" />
                  <span>Garantia incondicional de 7 dias</span>
                </div>
              </div>

              <button className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#0A0A0A] font-extrabold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all">
                {selectedProduct.ctaText}
              </button>
            </div>
          </section>

          {/* SECTION 8: FAQs Accordion */}
          <section className="p-8 bg-[#121212] border-t border-[#222] space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
                Dúvidas Frequentes
              </span>
              <h2 className="text-xl font-bold text-[#e5e2e1] font-heading">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-2.5 max-w-2xl mx-auto">
              {[
                { q: 'O certificado é emitido na hora?', a: 'Assim que você conclui todos os módulos e avaliações na plataforma, seu certificado digital com chave de autenticidade é liberado.' },
                { q: 'Posso fazer pelo celular?', a: 'Sim! Nossa plataforma é 100% responsiva e otimizada para smartphones Android e iPhone.' },
                { q: 'A Prime é credenciada?', a: 'Sim, a Prime Excelência atua desde 2015 em total conformidade com as resoluções e órgãos competentes.' }
              ].map((faq, i) => (
                <div key={i} className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-[#e5e2e1] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-[#f2ca50]" /> : <ChevronDown className="w-4 h-4 text-[#857d6e]" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-xs text-[#857d6e] border-t border-[#222] pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 9: Footer */}
          <footer className="p-6 bg-[#0a0a0a] border-t border-[#222] text-center text-xs text-[#857d6e] space-y-2">
            <div className="text-[#e5e2e1] font-bold">{brandKit.name} • {brandKit.corporateReason}</div>
            <div>CNPJ: {brandKit.cnpj} • {brandKit.address}</div>
            <div className="text-[10px] text-[#555]">© {new Date().getFullYear()} Todos os direitos reservados.</div>
          </footer>

        </div>
      </div>
    </div>
  );
};
