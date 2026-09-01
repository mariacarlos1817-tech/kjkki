import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FolderKanban, 
  Sparkles, 
  FileText, 
  MessageSquare, 
  Megaphone, 
  Globe, 
  BookOpen, 
  Grid, 
  Palette, 
  PenTool, 
  FolderGit2, 
  ShieldCheck, 
  PlusCircle, 
  ChevronRight,
  History,
  CheckCircle,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { Product } from '../types';
import { NexLogo } from './NexLogo';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  products: Product[];
  selectedProductId: string;
  onSelectProduct: (id: string) => void;
  onNewProduct: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  products,
  selectedProductId,
  onSelectProduct,
  onNewProduct,
  isCollapsed,
  onToggleCollapse
}) => {
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  const navItems = [
    { id: 'dashboard', label: 'Visão geral', icon: LayoutDashboard },
    { id: 'produtos', label: 'Cursos e ofertas', icon: Package, badge: products.length },
    { id: 'meta-ads', label: 'Campanhas Meta', icon: Megaphone, highlight: true },
    { id: 'whatsapp', label: 'WhatsApp Sales', icon: MessageSquare },
    { id: 'projetos', label: 'Biblioteca e aprovação', icon: FolderGit2 },
    { id: 'historico', label: 'Histórico', icon: History }
  ];

  return (
    <aside 
      className={`bg-[#0a0f0d] border-r border-[#192720] flex flex-col h-screen fixed left-0 top-0 z-30 select-none transition-all duration-200 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header with NexMarketing Logo */}
      <div className={`border-b border-[#192720] flex items-center justify-between ${isCollapsed ? 'p-3 flex-col gap-2' : 'p-3.5'}`}>
        {isCollapsed ? (
          <div className="cursor-pointer" onClick={() => onNavigate('dashboard')} title="NexMarketing - Next Studio">
            <NexLogo size="sm" variant="badge" />
          </div>
        ) : (
          <div className="cursor-pointer overflow-hidden" onClick={() => onNavigate('dashboard')}>
            <NexLogo size="sm" variant="full" />
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-[#6ee7b7]/60 hover:text-[#34d399] hover:bg-[#121c17] transition-colors cursor-pointer shrink-0"
          title={isCollapsed ? 'Expandir barra lateral' : 'Recolher barra lateral (modo compacto)'}
        >
          {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* New Course CTA Button */}
      <div className={`p-2.5 border-b border-[#192720] ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button
          id="btn-sidebar-new-project"
          onClick={onNewProduct}
          className={`emerald-gradient-bg text-[#080d0b] font-bold text-xs shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            isCollapsed ? 'w-10 h-10 rounded-xl p-0' : 'w-full py-2 px-3 rounded-lg'
          }`}
          title="Novo Produto / Curso"
        >
          <PlusCircle className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Novo Curso</span>}
        </button>
      </div>

      {/* Course Context Switcher (Only in expanded mode) */}
      {!isCollapsed && (
        <div className="px-3 py-2 bg-[#0e1713] border-b border-[#192720]">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#6ee7b7]/70 mb-1 flex items-center justify-between">
            <span>Curso Ativo para Vendas</span>
            <span className="text-[9px] bg-[#10b981]/15 text-[#34d399] px-1.5 py-0.2 rounded font-mono font-bold">
              {selectedProduct?.workloadHours}h
            </span>
          </div>
          <select
            id="select-sidebar-active-course"
            value={selectedProductId}
            onChange={(e) => onSelectProduct(e.target.value)}
            className="w-full bg-[#080d0b] border border-[#1f3329] text-[#f0fdf4] text-[11px] rounded-md p-1.5 focus:border-[#10b981] focus:outline-none truncate cursor-pointer font-medium"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-2.5 space-y-0.5 scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              id={`nav-item-${item.id}`}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                isCollapsed
                  ? 'justify-center p-2.5'
                  : 'justify-between px-3 py-2'
              } ${
                isActive
                  ? 'bg-[#10b981]/15 text-[#34d399] font-semibold border-r-2 border-[#10b981]'
                  : item.highlight
                  ? 'text-[#34d399] hover:bg-[#12221a] bg-[#0d1a14]/60'
                  : 'text-[#94a3b8] hover:text-[#f0fdf4] hover:bg-[#111c17]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive || item.highlight ? 'text-[#34d399]' : 'text-[#64748b]'
                  }`}
                />
                {!isCollapsed && <span className="truncate text-xs">{item.label}</span>}
              </div>

              {!isCollapsed && (
                <>
                  {item.highlight && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full emerald-gradient-bg text-[#080d0b] font-bold">
                      PRO
                    </span>
                  )}
                  {item.badge !== undefined && !item.highlight && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#16251e] text-[#6ee7b7] font-mono">
                      {item.badge}
                    </span>
                  )}
                  {!item.highlight && item.badge === undefined && isActive && (
                    <ChevronRight className="w-3.5 h-3.5 text-[#34d399]" />
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className={`border-t border-[#192720] bg-[#080d0b] ${isCollapsed ? 'p-2.5 flex justify-center' : 'p-3'}`}>
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-[#111c17] border border-[#1f3329] flex items-center justify-center text-[#10b981] shrink-0">
            <CheckCircle className="w-3.5 h-3.5 text-[#10b981]" />
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <div className="text-[11px] font-bold text-[#f0fdf4] truncate">Next Studio</div>
              <div className="text-[9px] text-[#6ee7b7]/70">Central do Vendedor • SENATRAN</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
