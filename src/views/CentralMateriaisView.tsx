import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Share2, 
  ShoppingBag, 
  Award, 
  ArrowRight, 
  FileText, 
  MessageSquare, 
  Globe, 
  BookOpen, 
  Grid, 
  Palette, 
  Sparkles,
  Star,
  Search,
  Check
} from 'lucide-react';
import { Product } from '../types';

interface CentralMateriaisViewProps {
  selectedProduct: Product;
  onNavigate: (view: string, subContext?: string) => void;
}

interface MaterialHubItem {
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  view: string;
  context: string;
  categoryTag: string;
}

export const CentralMateriaisView: React.FC<CentralMateriaisViewProps> = ({
  selectedProduct,
  onNavigate
}) => {
  // Favorites persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('prime_favorite_central_items');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading favorite materials:', e);
    }
    // Default initial favorites for quick onboarding
    return ['Post Instagram', 'Carrossel (8 Slides)', 'Texto para Vendedor', '10 Variações de Anúncio'];
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'social' | 'comercial' | 'vendas' | 'publicidade'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('prime_favorite_central_items', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (itemName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const isFav = prev.includes(itemName);
      const next = isFav ? prev.filter(name => name !== itemName) : [...prev, itemName];
      
      setToastMessage(isFav ? `Removido dos favoritos: ${itemName}` : `⭐ Adicionado aos favoritos: ${itemName}`);
      setTimeout(() => setToastMessage(null), 2200);
      
      return next;
    });
  };

  const hubs = [
    {
      id: 'social',
      category: '1. DIVULGAÇÃO & SOCIAL',
      color: 'border-[#3b82f6]/40 text-[#60a5fa]',
      desc: 'Materiais para redes sociais, atração de novos alunos e engajamento.',
      items: [
        { name: 'Post Instagram', desc: 'Legendas com hashtags, formato para feed e CTAs.', icon: Share2, view: 'descriptions', context: 'Instagram', categoryTag: 'Social' },
        { name: 'Post Facebook', desc: 'Textos com foco em compartilhamento e comentários.', icon: Share2, view: 'descriptions', context: 'Facebook', categoryTag: 'Social' },
        { name: 'Carrossel (8 Slides)', desc: 'Estrutura Hook -> Problema -> Solução -> CTA.', icon: Grid, view: 'meta-ads', context: 'carousel', categoryTag: 'Social' },
        { name: 'Banner & Criativos', desc: 'Prompts profissionais de imagem e layouts.', icon: Palette, view: 'creative', context: 'banner', categoryTag: 'Social' }
      ]
    },
    {
      id: 'comercial',
      category: '2. COMERCIAL & ATENDIMENTO',
      color: 'border-[#10b981]/40 text-[#34d399]',
      desc: 'Materiais de apoio a consultores, representantes e propostas comerciais.',
      items: [
        { name: 'Portfólio Institucional', desc: 'Apresentação corporativa completa de cursos.', icon: BookOpen, view: 'portfolio', context: 'institucional', categoryTag: 'Comercial' },
        { name: 'Catálogo de Cursos', desc: 'Diagramação de produtos para envio em PDF.', icon: Grid, view: 'catalogo', context: 'pdf', categoryTag: 'Comercial' },
        { name: 'Descrição Comercial', desc: 'Textos médios e longos para propostas.', icon: FileText, view: 'descriptions', context: 'Apresentação Comercial', categoryTag: 'Comercial' },
        { name: 'Texto para Vendedor', desc: 'Pitch estruturado e argumentos de fechamento.', icon: MessageSquare, view: 'whatsapp', context: 'seller', categoryTag: 'Comercial' },
        { name: 'FAQ & Quebra de Objeções', desc: 'Perguntas frequentes e respostas técnicas.', icon: Award, view: 'copywriting', context: 'faq', categoryTag: 'Comercial' }
      ]
    },
    {
      id: 'vendas',
      category: '3. VENDAS & CONVERSÃO',
      color: 'border-[#10b981]/40 text-[#34d399]',
      desc: 'Páginas, funis e canais de alta conversão para fechamento imediato.',
      items: [
        { name: 'Página de Vendas (17 Seções)', desc: 'Landing page completa com prova social e oferta.', icon: Globe, view: 'sales-page', context: 'sales-page', categoryTag: 'Vendas' },
        { name: 'Catálogo WhatsApp', desc: 'Texto formatado pronto para copiar e colar.', icon: MessageSquare, view: 'whatsapp', context: 'catalogo', categoryTag: 'Vendas' },
        { name: 'Página para WhatsApp', desc: 'Página curta focada em direcionar para o consultor.', icon: Globe, view: 'sales-page', context: 'whatsapp-page', categoryTag: 'Vendas' },
        { name: 'Copy para Checkout', desc: 'Frases de segurança, garantia e urgência.', icon: ShoppingBag, view: 'descriptions', context: 'Página de Vendas', categoryTag: 'Vendas' },
        { name: 'Mensagens de Follow-up', desc: 'Recuperação de leads e contatos pós-atendimento.', icon: MessageSquare, view: 'whatsapp', context: 'followup', categoryTag: 'Vendas' }
      ]
    },
    {
      id: 'publicidade',
      category: '4. PUBLICIDADE & TRÁFEGO PAGO',
      color: 'border-[#ec4899]/40 text-[#f472b6]',
      desc: 'Campanhas de tráfego pago no Meta Ads (Facebook e Instagram).',
      items: [
        { name: 'Facebook & Instagram Ads', desc: 'Textos com Hook, Headline, CTA e Promessa.', icon: Megaphone, view: 'meta-ads', context: 'ads', categoryTag: 'Tráfego' },
        { name: '10 Variações de Anúncio', desc: 'Ângulos focados em dor, benefício, autoridade, etc.', icon: Sparkles, view: 'meta-ads', context: '10-variations', categoryTag: 'Tráfego' },
        { name: 'Teste A/B de Criativos', desc: 'Comparativo lado a lado de 3 abordagens.', icon: Award, view: 'meta-ads', context: 'ab-test', categoryTag: 'Tráfego' }
      ]
    }
  ];

  // All flattened items
  const allItems: MaterialHubItem[] = hubs.flatMap(h => h.items);

  // Filtered hubs / items based on activeFilter & searchTerm
  const filteredHubs = hubs.map(hub => {
    const items = hub.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFavorite = activeFilter === 'favorites' ? favorites.includes(item.name) : true;
      const matchesCategory = (activeFilter === 'all' || activeFilter === 'favorites') ? true : hub.id === activeFilter;

      return matchesSearch && matchesFavorite && matchesCategory;
    });
    return { ...hub, items };
  }).filter(hub => hub.items.length > 0);

  const favoriteItemsList = allItems.filter(item => favorites.includes(item.name) && 
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.desc.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c1a13] border border-[#10b981] text-[#34d399] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-[#34d399]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#34d399] uppercase tracking-wider mb-1">
            Central de Materiais
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#f0fdf4] font-heading">
            O que você deseja criar hoje?
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1">
            Produzindo materiais para: <strong className="text-[#34d399]">{selectedProduct.name}</strong> ({selectedProduct.workloadHours}h - {selectedProduct.modality})
          </p>
        </div>

        <button
          onClick={() => onNavigate('super-kit')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg emerald-gradient-bg text-[#080d0b] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4" />
          Gerar Todos em 1 Clique (Super Kit)
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-[#0a120e] border border-[#192720] rounded-xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-hide pb-1 md:pb-0">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40 shadow-sm'
                : 'bg-[#121f18] text-[#64748b] hover:text-[#f0fdf4]'
            }`}
          >
            Todos os Materiais ({allItems.length})
          </button>

          <button
            onClick={() => setActiveFilter('favorites')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'favorites'
                ? 'bg-[#10b981] text-[#080d0b] shadow-lg shadow-[#10b981]/20 border border-[#34d399]'
                : 'bg-[#121f18] text-[#facc15] hover:text-[#fde047] border border-[#facc15]/30'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${activeFilter === 'favorites' ? 'fill-[#080d0b]' : 'fill-[#facc15]'}`} />
            <span>Favoritos ({favorites.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('social')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'social'
                ? 'bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6]/40'
                : 'bg-[#121f18] text-[#64748b] hover:text-[#f0fdf4]'
            }`}
          >
            Social
          </button>

          <button
            onClick={() => setActiveFilter('comercial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'comercial'
                ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40'
                : 'bg-[#121f18] text-[#64748b] hover:text-[#f0fdf4]'
            }`}
          >
            Comercial
          </button>

          <button
            onClick={() => setActiveFilter('vendas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'vendas'
                ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40'
                : 'bg-[#121f18] text-[#64748b] hover:text-[#f0fdf4]'
            }`}
          >
            Vendas
          </button>

          <button
            onClick={() => setActiveFilter('publicidade')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'publicidade'
                ? 'bg-[#ec4899]/20 text-[#f472b6] border border-[#ec4899]/40'
                : 'bg-[#121f18] text-[#64748b] hover:text-[#f0fdf4]'
            }`}
          >
            Tráfego
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            placeholder="Buscar formato ou material..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg studio-input text-xs text-[#f0fdf4] bg-[#080d0b] border border-[#192720] focus:border-[#10b981]"
          />
        </div>
      </div>

      {/* Special Highlighted Favorites View */}
      {activeFilter === 'favorites' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
              <h2 className="text-sm font-bold text-[#f0fdf4] font-heading">
                Seus Materiais Favoritos Fixados ({favoriteItemsList.length})
              </h2>
            </div>
            <p className="text-xs text-[#64748b]">
              Clique na estrela de qualquer item para fixar ou remover da sua lista prioritária.
            </p>
          </div>

          {favoriteItemsList.length === 0 ? (
            <div className="studio-card p-12 text-center rounded-xl space-y-3 border-dashed border-[#193b29]">
              <div className="w-12 h-12 rounded-full bg-[#16251e] text-[#facc15] flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 fill-none text-[#facc15]" />
              </div>
              <h3 className="text-sm font-bold text-[#f0fdf4]">Nenhum material favoritado ainda</h3>
              <p className="text-xs text-[#64748b] max-w-md mx-auto">
                Favorite os formatos e ferramentas que você mais utiliza clicando no ícone de estrela para acessá-los rapidamente em um só lugar.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 rounded-lg bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30 text-xs font-bold hover:bg-[#10b981]/25 transition-all cursor-pointer"
              >
                Ver Todos os Materiais
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteItemsList.map((item, i) => {
                const Icon = item.icon;
                const isFav = favorites.includes(item.name);
                return (
                  <div
                    key={i}
                    onClick={() => onNavigate(item.view, item.context)}
                    className="studio-card rounded-xl p-5 flex flex-col justify-between gap-4 border-[#10b981]/40 bg-[#0a1711] shadow-lg shadow-[#10b981]/5 hover:border-[#10b981] hover:bg-[#0e2219] cursor-pointer group transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] bg-[#10b981]/25 text-[#34d399] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                              {item.categoryTag}
                            </span>
                            <span className="text-[10px] bg-[#facc15]/20 text-[#facc15] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 fill-[#facc15]" />
                              Favorito
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-[#f0fdf4] group-hover:text-[#34d399] transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => toggleFavorite(item.name, e)}
                        className="p-1.5 rounded-lg text-[#facc15] hover:bg-[#16251e] transition-colors cursor-pointer shrink-0"
                        title="Remover dos favoritos"
                      >
                        <Star className="w-4 h-4 fill-[#facc15]" />
                      </button>
                    </div>

                    <div className="pt-3 border-t border-[#193b29] flex items-center justify-between text-xs">
                      <span className="text-[#34d399] font-bold">Abrir Gerador</span>
                      <ArrowRight className="w-4 h-4 text-[#34d399] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Regular Categories Hub View */
        <div className="space-y-8">
          {filteredHubs.length === 0 ? (
            <div className="studio-card p-12 text-center rounded-xl text-xs text-[#64748b]">
              Nenhum material encontrado com o termo "{searchTerm}".
            </div>
          ) : (
            filteredHubs.map((hub, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#192720] pb-2">
                  <div>
                    <h2 className={`text-sm font-bold tracking-wide uppercase ${hub.category.includes('3. VENDAS') ? 'text-[#34d399]' : hub.color}`}>
                      {hub.category}
                    </h2>
                    <p className="text-[11px] text-[#64748b]">{hub.desc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hub.items.map((item, i) => {
                    const Icon = item.icon;
                    const isFav = favorites.includes(item.name);
                    return (
                      <div
                        key={i}
                        onClick={() => onNavigate(item.view, item.context)}
                        className={`studio-card rounded-xl p-4 flex items-start justify-between gap-3 cursor-pointer group transition-all ${
                          isFav 
                            ? 'border-[#10b981]/40 bg-[#0c1a13] hover:bg-[#102219]' 
                            : 'hover:bg-[#121c17]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${
                            isFav 
                              ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/30' 
                              : 'bg-[#16251e] text-[#34d399]'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="text-xs font-bold text-[#f0fdf4] group-hover:text-[#34d399] transition-colors">
                                {item.name}
                              </h3>
                              {isFav && (
                                <span className="text-[9px] bg-[#facc15]/20 text-[#facc15] px-1 py-0.2 rounded font-bold">
                                  ★
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#64748b] mt-0.5 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 mt-0.5">
                          <button
                            onClick={(e) => toggleFavorite(item.name, e)}
                            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                              isFav
                                ? 'text-[#facc15] hover:bg-[#192720]'
                                : 'text-[#475569] hover:text-[#facc15] hover:bg-[#16251e]'
                            }`}
                            title={isFav ? "Remover dos favoritos" : "Favoritar este material"}
                          >
                            <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-[#facc15]' : 'fill-none'}`} />
                          </button>
                          <ArrowRight className="w-4 h-4 text-[#475569] group-hover:text-[#34d399] group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

