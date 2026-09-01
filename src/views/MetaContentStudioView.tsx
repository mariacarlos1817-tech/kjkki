import React, { useState } from 'react';
import { 
  Megaphone, 
  Sparkles, 
  Copy, 
  Check, 
  Layers, 
  SplitSquareVertical, 
  Share2, 
  Target, 
  Eye,
  Sliders,
  DollarSign,
  Grid
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, BrandKit, AdObjective, AdAngle, AdVariation } from '../types';
import { AIGeneratorService } from '../services/aiGenerator';

interface MetaContentStudioViewProps {
  selectedProduct: Product;
  brandKit: BrandKit;
}

export const MetaContentStudioView: React.FC<MetaContentStudioViewProps> = ({
  selectedProduct,
  brandKit
}) => {
  const [activeTab, setActiveTab] = useState<'single' | '10vars' | 'abtest' | 'carousel'>('single');
  const [objective, setObjective] = useState<AdObjective>('Venda Direta');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Generate single ad
  const singleAd = React.useMemo(() => {
    return AIGeneratorService.generateMetaAd(selectedProduct, brandKit, { objective });
  }, [selectedProduct, objective, brandKit]);

  // Generate 10 variations
  const adVariations = React.useMemo(() => {
    return AIGeneratorService.generateAdVariations(selectedProduct, brandKit);
  }, [selectedProduct, brandKit]);

  // Generate carousel
  const carouselSlides = React.useMemo(() => {
    return AIGeneratorService.generateCarouselSlides(selectedProduct, brandKit);
  }, [selectedProduct, brandKit]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#f2ca50] uppercase tracking-wider mb-1">
            Meta Content & Ads Studio
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#e5e2e1] font-heading">
            Facebook & Instagram Ads Studio
          </h1>
          <p className="text-xs text-[#a09885] mt-1">
            Produza anúncios de alto ROAS, testes A/B, 10 variações estratégicas e carrosséis com dados homologados.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#242424] bg-[#121212] rounded-xl overflow-x-auto scrollbar-hide p-1 gap-1">
        <button
          onClick={() => setActiveTab('single')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'single'
              ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
              : 'text-[#857d6e] hover:text-[#e5e2e1]'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          Gerador de Anúncio Individual
        </button>
        <button
          onClick={() => setActiveTab('10vars')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === '10vars'
              ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
              : 'text-[#857d6e] hover:text-[#e5e2e1]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          10 Variações de Anúncio (Multi-Ângulos)
        </button>
        <button
          onClick={() => setActiveTab('abtest')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'abtest'
              ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
              : 'text-[#857d6e] hover:text-[#e5e2e1]'
          }`}
        >
          <SplitSquareVertical className="w-4 h-4" />
          Teste A/B Comparativo
        </button>
        <button
          onClick={() => setActiveTab('carousel')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'carousel'
              ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
              : 'text-[#857d6e] hover:text-[#e5e2e1]'
          }`}
        >
          <Grid className="w-4 h-4" />
          Carrossel de 8 Slides
        </button>
      </div>

      {/* Tab 1: Single Ad Generator */}
      {activeTab === 'single' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="studio-card rounded-xl p-5 space-y-3">
              <label className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider block">
                Objetivo da Campanha no Meta Ads
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Venda Direta',
                  'Mensagem WhatsApp',
                  'Captação de Lead',
                  'Matrícula Imediata',
                  'Reconhecimento',
                  'Remarketing',
                  'Promoção Relâmpago'
                ].map((obj) => (
                  <button
                    key={obj}
                    onClick={() => setObjective(obj as AdObjective)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer truncate ${
                      objective === obj
                        ? 'bg-[#d4af37]/25 text-[#f2ca50] border border-[#d4af37]/40'
                        : 'bg-[#171717] text-[#857d6e] hover:text-[#e5e2e1] border border-[#262626]'
                    }`}
                  >
                    {obj}
                  </button>
                ))}
              </div>
            </div>

            <div className="studio-card rounded-xl p-5 space-y-2 text-xs text-[#a09885]">
              <div className="font-bold text-[#f2ca50]">💡 Dica de Tráfego:</div>
              <p>
                Anúncios no Meta Ads com público de motoristas e operadores convertem 42% mais quando o Hook inicial traz a dor direta da exigência do curso no currículo.
              </p>
            </div>
          </div>

          {/* Ad Mockup Card (Meta Feed Style) */}
          <div className="lg:col-span-7">
            <div className="studio-card rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#242424] pb-3">
                <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
                  Prévia do Anúncio (Feed Instagram / Facebook)
                </span>
                <button
                  onClick={() => handleCopy(`${singleAd.headline}\n\n${singleAd.primaryText}\n\nCTA: ${singleAd.cta}`, 'single-ad')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#242424] text-xs font-bold text-[#f2ca50] hover:bg-[#333] cursor-pointer"
                >
                  {copiedKey === 'single-ad' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'single-ad' ? 'Copiado!' : 'Copiar Anúncio'}
                </button>
              </div>

              {/* Feed Card Simulation */}
              <div className="bg-[#121212] border border-[#2d2d2d] rounded-xl overflow-hidden shadow-lg max-w-lg mx-auto">
                {/* Meta Header */}
                <div className="p-3.5 flex items-center justify-between border-b border-[#222]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center font-bold text-[#0A0A0A] text-xs">
                      P
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#e5e2e1]">{brandKit.name}</div>
                      <div className="text-[10px] text-[#857d6e]">Patrocinado • 🌐</div>
                    </div>
                  </div>
                </div>

                {/* Primary Text */}
                <div className="p-3.5 text-xs text-[#e5e2e1] whitespace-pre-wrap leading-relaxed">
                  <p className="font-bold text-[#f2ca50] mb-2">{singleAd.hook}</p>
                  {singleAd.primaryText}
                </div>

                {/* Image Preview */}
                <div className="relative h-60 w-full bg-[#0d0d0d]">
                  <img
                    src={selectedProduct.coverImage}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#0A0A0A]/80 backdrop-blur-md px-2 py-1 rounded text-[10px] text-[#f2ca50] font-mono">
                    {selectedProduct.workloadHours}h • {selectedProduct.modality}
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="p-3.5 bg-[#181818] border-t border-[#222] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-[#857d6e] uppercase tracking-wider font-mono">
                      {brandKit.website.replace('https://', '')}
                    </div>
                    <div className="text-xs font-bold text-[#e5e2e1]">{singleAd.headline}</div>
                  </div>

                  <button className="px-4 py-2 rounded-lg gold-gradient-bg text-[#0A0A0A] font-bold text-xs shadow-sm">
                    {singleAd.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 10 Ad Variations */}
      {activeTab === '10vars' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#e5e2e1] font-heading">
              10 Ângulos Estratégicos de Anúncio
            </h2>
            <button
              onClick={() => handleCopy(adVariations.map((a, i) => `[${i+1}. ${a.angle}]\nHeadline: ${a.headline}\nHook: ${a.hook}\n${a.primaryText}\nCTA: ${a.cta}`).join('\n\n---\n\n'), 'all-10')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#222] text-xs font-bold text-[#f2ca50] hover:bg-[#333] cursor-pointer"
            >
              {copiedKey === 'all-10' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              Copiar Todas as 10 Variações
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adVariations.map((ad, idx) => (
              <div key={idx} className="studio-card rounded-xl p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/30">
                      {idx + 1}. Ângulo: {ad.angle}
                    </span>
                    <button
                      onClick={() => handleCopy(`${ad.headline}\n\n${ad.hook}\n\n${ad.primaryText}\n\nCTA: ${ad.cta}`, `v-${idx}`)}
                      className="p-1 rounded bg-[#222] text-[#857d6e] hover:text-[#f2ca50] cursor-pointer"
                    >
                      {copiedKey === `v-${idx}` ? <Check className="w-3.5 h-3.5 text-[#7ee787]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <h3 className="text-xs font-bold text-[#e5e2e1] font-heading">{ad.headline}</h3>
                  <div className="text-xs text-[#f2ca50] italic">"{ad.hook}"</div>
                  <p className="text-xs text-[#a09885] leading-relaxed whitespace-pre-wrap">{ad.primaryText}</p>
                </div>

                <div className="pt-2 border-t border-[#222] flex items-center justify-between text-xs">
                  <span className="text-[#857d6e]">CTA:</span>
                  <span className="text-[#f2ca50] font-bold">{ad.cta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: A/B Test */}
      {activeTab === 'abtest' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: 'Versão A (Foco em Dor / Medo de Perder Vagas)', angle: 'Dor', headline: 'Não perca mais vagas de emprego!', hook: 'Quantas oportunidades você já perdeu por não ter este curso?' },
            { tag: 'Versão B (Foco em Benefício / Facilidade EAD)', angle: 'Benefício', headline: 'Curso 100% online no seu celular!', hook: 'Estude nos seus horários livres e pegue seu certificado rápido.' },
            { tag: 'Versão C (Foco em Oferta & Promoção)', angle: 'Oferta', headline: `De ~R$ 349~ por R$ ${selectedProduct.promoPrice?.toFixed(2) || '249,90'}!`, hook: 'Lote promocional de matrículas aberto por tempo limitado.' }
          ].map((test, i) => (
            <div key={i} className="studio-card rounded-xl p-5 space-y-3">
              <div className="text-xs font-bold text-[#f2ca50] border-b border-[#242424] pb-2">
                {test.tag}
              </div>
              <div className="space-y-2 text-xs">
                <div><strong className="text-[#e5e2e1]">Headline:</strong> {test.headline}</div>
                <div><strong className="text-[#e5e2e1]">Hook:</strong> <span className="italic text-[#d0c5af]">"{test.hook}"</span></div>
                <div className="text-[#857d6e] pt-2 border-t border-[#222]">
                  Ideal para testar no Meta Ads com público frio (Interesses em Transporte, CNH e Logística).
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Carousel */}
      {activeTab === 'carousel' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {carouselSlides.map((slide) => (
            <div key={slide.slide} className="studio-card rounded-xl p-4 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#f2ca50]">Slide {slide.slide}/8</span>
                  <span className="text-[10px] bg-[#222] text-[#857d6e] px-2 py-0.5 rounded uppercase font-bold">{slide.type}</span>
                </div>
                <h4 className="text-xs font-bold text-[#e5e2e1]">{slide.title}</h4>
                <p className="text-xs text-[#a09885] mt-1 leading-relaxed">{slide.content}</p>
              </div>
              <div className="pt-2 border-t border-[#222] text-[11px] text-[#f2ca50] italic">
                "{slide.subtext}"
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
