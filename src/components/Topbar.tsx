import React from 'react';
import { 
  Search, 
  Sparkles, 
  Upload, 
  ShieldCheck, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { Product } from '../types';

interface TopbarProps {
  products: Product[];
  selectedProductId: string;
  onSelectProduct: (id: string) => void;
  onOpenImport: () => void;
  onOpenSuperKit: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  products,
  selectedProductId,
  onSelectProduct,
  onOpenImport,
  onOpenSuperKit,
  searchQuery,
  onSearchChange
}) => {
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  return (
    <header className="sticky top-0 z-20 h-16 bg-[#0a0f0d]/95 backdrop-blur-md border-b border-[#192720] px-6 sm:px-8 flex items-center justify-between gap-4">
      {/* Search Input */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6ee7b7]/60" />
          <input
            id="global-search-input"
            type="text"
            placeholder="Buscar cursos, materiais, scripts, campanhas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 rounded-full studio-input text-xs text-[#f0fdf4] placeholder-[#64748b] focus:border-[#00d26a]"
          />
        </div>
      </div>

      {/* Center/Right Actions */}
      <div className="flex items-center gap-3">
        {/* Global Active Course Indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-[#0e1713] border border-[#1f3329] rounded-lg px-3 py-1.5">
          <BookOpen className="w-4 h-4 text-[#34d399]" />
          <span className="text-xs text-[#94a3b8]">Ativo:</span>
          <select
            id="topbar-product-select"
            value={selectedProductId}
            onChange={(e) => onSelectProduct(e.target.value)}
            className="bg-transparent text-xs font-semibold text-[#f0fdf4] focus:outline-none cursor-pointer max-w-[220px] truncate"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0a0f0d] text-[#f0fdf4]">
                {p.name}
              </option>
            ))}
          </select>
          <span className="text-[10px] bg-[#10b981]/20 text-[#34d399] px-1.5 py-0.5 rounded font-mono font-bold">
            {selectedProduct?.workloadHours}h
          </span>
        </div>

        {/* Legal Compliance Status */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#062c19] border border-[#0d5932] text-[#34d399] text-[11px] px-2.5 py-1 rounded-full font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
          <span>Homologado SENATRAN</span>
        </div>

        {/* Import PDF Button */}
        <button
          id="btn-topbar-import-pdf"
          onClick={onOpenImport}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#1f3329] bg-[#0e1713] text-xs font-semibold text-[#f0fdf4] hover:border-[#10b981] hover:text-[#34d399] transition-all cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-[#10b981]" />
          <span className="hidden md:inline">Importar PDF / Portfólio</span>
        </button>

        {/* Super Kit Trigger */}
        <button
          id="btn-topbar-super-kit"
          onClick={onOpenSuperKit}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg emerald-gradient-bg text-[#080d0b] text-xs font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gerar Super Kit</span>
        </button>
      </div>
    </header>
  );
};
