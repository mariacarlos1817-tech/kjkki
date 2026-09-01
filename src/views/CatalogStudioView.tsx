import React, { useState } from 'react';
import { 
  Grid, 
  List, 
  Search, 
  Share2, 
  Printer, 
  Copy, 
  Check, 
  MessageSquare, 
  DollarSign, 
  Clock, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, BrandKit } from '../types';

interface CatalogStudioViewProps {
  products: Product[];
  brandKit: BrandKit;
  onSelectProduct: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const CatalogStudioView: React.FC<CatalogStudioViewProps> = ({
  products,
  brandKit,
  onSelectProduct,
  onNavigate
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.codeSKU.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCat === 'all' || p.category === selectedCat;
    return matchSearch && matchCat;
  });

  const handleShareWhatsApp = (product: Product) => {
    const text = `🔥 *${product.name.toUpperCase()}* (${product.workloadHours}h)\n\n` +
      `${product.shortDescription}\n\n` +
      `✅ Modalidade: ${product.modality}\n` +
      `✅ Certificado Oficial: ${product.certification}\n` +
      `💰 *Valor Especial:* R$ ${product.promoPrice ? product.promoPrice.toFixed(2) : '249,90'} (${product.installments || '12x no cartão'})\n\n` +
      `Fale com a ${brandKit.name}: ${brandKit.website}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = (product: Product) => {
    const text = `🔥 ${product.name} (${product.workloadHours}h) - R$ ${product.promoPrice?.toFixed(2) || '249,90'} | ${brandKit.website}`;
    navigator.clipboard.writeText(text);
    setCopiedId(product.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#f2ca50] uppercase tracking-wider mb-1">
            Catalog Studio
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#e5e2e1] font-heading">
            Catálogo Comercial de Cursos
          </h1>
          <p className="text-xs text-[#a09885] mt-1">
            Visualização diagramada para atendimento rápido e compartilhamento no WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#181818] border border-[#2d2d2d] rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-[#d4af37]/20 text-[#f2ca50]' : 'text-[#857d6e]'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-[#d4af37]/20 text-[#f2ca50]' : 'text-[#857d6e]'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient-bg text-[#0A0A0A] font-bold text-xs shadow-md cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Imprimir Catálogo
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141414] border border-[#242424] rounded-xl p-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#857d6e]" />
          <input
            type="text"
            placeholder="Buscar no catálogo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg studio-input text-xs text-[#e5e2e1]"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-hide pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCat === c
                  ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
                  : 'bg-[#1a1a1a] text-[#857d6e] hover:text-[#e5e2e1]'
              }`}
            >
              {c === 'all' ? 'Todos' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <div key={p.id} className="studio-card rounded-xl overflow-hidden flex flex-col justify-between hover:bg-[#181818] transition-all">
              <div>
                <div className="relative h-36 w-full">
                  <img src={p.coverImage} alt={p.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-[#0A0A0A]/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-[#f2ca50] font-mono font-bold">
                    {p.codeSKU}
                  </div>
                  <div className="absolute top-2 right-2 bg-[#d4af37] text-[#0A0A0A] font-bold px-2 py-0.5 rounded text-[10px]">
                    {p.workloadHours}h
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] text-[#857d6e] uppercase tracking-wider font-semibold">{p.category}</span>
                  <h3 className="text-sm font-bold text-[#e5e2e1] font-heading line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-[#857d6e] line-clamp-2">{p.shortDescription}</p>

                  <div className="pt-2 border-t border-[#242424] flex items-center justify-between text-xs">
                    <span className="text-[#857d6e]">Apenas:</span>
                    <span className="text-[#f2ca50] font-bold">R$ {p.promoPrice?.toFixed(2) || '249,90'}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#121212] border-t border-[#222] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleShareWhatsApp(p)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </button>

                <button
                  onClick={() => handleCopyLink(p)}
                  className="p-1.5 rounded-lg bg-[#222] text-[#857d6e] hover:text-[#e5e2e1] transition-all cursor-pointer"
                  title="Copiar resumo"
                >
                  {copiedId === p.id ? <Check className="w-4 h-4 text-[#7ee787]" /> : <Copy className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    onSelectProduct(p.id);
                    onNavigate('super-kit');
                  }}
                  className="py-1.5 px-3 rounded-lg gold-gradient-bg text-[#0A0A0A] font-bold text-xs hover:brightness-110 transition-all cursor-pointer"
                >
                  Super Kit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="studio-card rounded-xl overflow-hidden divide-y divide-[#242424]">
          {filtered.map((p) => (
            <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#181818] transition-colors">
              <div className="flex items-center gap-3">
                <img src={p.coverImage} alt={p.name} className="w-16 h-16 rounded-lg object-cover border border-[#333] shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#f2ca50] font-mono font-bold">{p.codeSKU}</span>
                    <span className="text-[10px] text-[#857d6e]">{p.category}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#e5e2e1] font-heading">{p.name}</h4>
                  <p className="text-xs text-[#857d6e] line-clamp-1">{p.shortDescription}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
                <div className="text-right text-xs">
                  <div className="text-[#f2ca50] font-bold">{p.workloadHours}h ({p.modality})</div>
                  <div className="text-[#7ee787] font-bold">R$ {p.promoPrice?.toFixed(2) || '249,90'}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShareWhatsApp(p)}
                    className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 cursor-pointer"
                    title="Enviar no WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectProduct(p.id);
                      onNavigate('super-kit');
                    }}
                    className="px-3 py-1.5 rounded-lg gold-gradient-bg text-[#0A0A0A] font-bold text-xs cursor-pointer"
                  >
                    Kit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
