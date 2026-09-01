import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Megaphone,
  MessageCircle,
  Palette,
  Plus,
  ShieldAlert,
  Sparkles,
  Upload,
} from 'lucide-react';
import { BrandKit, GeneratedMaterial, Product } from '../types';

interface DashboardViewProps {
  products: Product[];
  selectedProduct: Product;
  brandKit: BrandKit;
  onSelectProduct: (id: string) => void;
  onNavigate: (view: string) => void;
  onOpenImport: () => void;
  recentMaterials: GeneratedMaterial[];
}

const text = (value: unknown, fallback = 'Informação pendente') => {
  if (typeof value !== 'string') return fallback;
  const clean = value.trim();
  return clean && !['undefined', 'null', 'nan'].includes(clean.toLowerCase()) ? clean : fallback;
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  selectedProduct,
  brandKit,
  onSelectProduct,
  onNavigate,
  onOpenImport,
  recentMaterials,
}) => {
  const courseNeedsReview = selectedProduct.legalStatus !== 'APROVADO';
  const brandNeedsReview = !text(brandKit.tradingName, '').trim() || !text(brandKit.whatsapp, '').trim();
  const reviewCount = (courseNeedsReview ? 1 : 0) + (brandNeedsReview ? 1 : 0);
  const nextAction = recentMaterials.length
    ? { label: 'Revisar materiais recentes', view: 'projetos', description: 'Valide o que foi gerado antes de publicar.' }
    : { label: 'Criar campanha Meta', view: 'meta-ads', description: 'Comece pelo objetivo, público e oferta do curso ativo.' };

  const actions = [
    { title: 'Criar campanha', description: 'Defina objetivo, público e ângulo.', icon: Plus, view: 'meta-ads' },
    { title: 'Gerar criativos', description: 'Prepare peças para Feed, Stories e Reels.', icon: Palette, view: 'creative' },
    { title: 'Abrir WhatsApp Sales', description: 'Use scripts consultivos e follow-up.', icon: MessageCircle, view: 'whatsapp' },
    { title: 'Biblioteca e aprovação', description: 'Organize, revise e exporte materiais.', icon: ClipboardCheck, view: 'projetos' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <section className="rounded-2xl border border-[#1f3329] bg-[#0c1611] p-6 shadow-lg shadow-black/20">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6ee7b7]">Visão geral</p>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-[#f0fdf4] sm:text-3xl">Seller Cockpit</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">Um fluxo simples para transformar um curso em campanha, criativos, conversa e materiais aprovados.</p>
          </div>
          <button onClick={() => onNavigate(nextAction.view)} className="emerald-gradient-bg inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-[#062d1b] transition hover:brightness-110">
            {nextAction.label}<ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
        <div className="studio-card rounded-xl p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6ee7b7]">Campanha em contexto</p>
              <h2 className="mt-1 font-heading text-xl font-bold text-[#f0fdf4]">{text(selectedProduct?.name)}</h2>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-[#94a3b8]">{text(selectedProduct?.commercialSummary || selectedProduct?.shortDescription)}</p>
            </div>
            <select aria-label="Selecionar curso ativo" value={selectedProduct.id} onChange={(event) => onSelectProduct(event.target.value)} className="studio-input rounded-lg px-3 py-2 text-xs font-medium">
              {products.map((product) => <option key={product.id} value={product.id}>{text(product.name)}</option>)}
            </select>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#1c2b24] pt-4 sm:grid-cols-4">
            <div><p className="text-[11px] text-[#64748b]">Oferta</p><p className="mt-1 text-xs font-semibold text-[#d1fae5]">{selectedProduct.promoPrice || selectedProduct.price ? 'Configurada' : 'Pendente'}</p></div>
            <div><p className="text-[11px] text-[#64748b]">Canal</p><p className="mt-1 text-xs font-semibold text-[#d1fae5]">Meta + WhatsApp</p></div>
            <div><p className="text-[11px] text-[#64748b]">Status legal</p><p className="mt-1 text-xs font-semibold text-[#fbbf24]">{text(selectedProduct.legalStatus)}</p></div>
            <div><p className="text-[11px] text-[#64748b]">Próximo passo</p><p className="mt-1 text-xs font-semibold text-[#d1fae5]">{nextAction.description}</p></div>
          </div>
        </div>

        <aside className="rounded-xl border border-[#5b4315] bg-[#1b170d] p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#fbbf24]" />
            <div>
              <h2 className="text-sm font-bold text-[#fef3c7]">Revisão necessária</h2>
              <p className="mt-1 text-xs leading-relaxed text-[#d6c58e]">{reviewCount ? `${reviewCount} item(ns) precisam de confirmação antes da publicação.` : 'Nenhum alerta pendente para o curso ativo.'}</p>
            </div>
          </div>
          <button onClick={() => onNavigate(courseNeedsReview ? 'produtos' : 'brand-kit')} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#fbbf24] hover:text-[#fde68a]">Abrir revisão <ArrowRight className="h-3.5 w-3.5" /></button>
        </aside>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-4"><div><h2 className="font-heading text-lg font-bold text-[#f0fdf4]">Fluxo da campanha</h2><p className="mt-1 text-xs text-[#64748b]">Use uma etapa por vez. Materiais só devem ser publicados após revisão.</p></div></div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {actions.map(({ title, description, icon: Icon, view }, index) => (
            <button key={view} onClick={() => onNavigate(view)} className="studio-card group rounded-xl p-5 text-left transition hover:-translate-y-0.5 hover:bg-[#121c17]">
              <div className="flex items-center justify-between"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#10b981]/15 text-xs font-bold text-[#6ee7b7]">0{index + 1}</span><Icon className="h-5 w-5 text-[#6ee7b7]" /></div>
              <h3 className="mt-6 text-sm font-bold text-[#f0fdf4]">{title}</h3><p className="mt-1 text-xs leading-relaxed text-[#94a3b8]">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#6ee7b7]">Abrir <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="studio-card rounded-xl p-5">
          <div className="flex items-center justify-between"><div><h2 className="font-heading text-lg font-bold text-[#f0fdf4]">Materiais recentes</h2><p className="mt-1 text-xs text-[#64748b]">Produções vinculadas a este espaço de trabalho.</p></div><FileText className="h-5 w-5 text-[#6ee7b7]" /></div>
          {recentMaterials.length ? <div className="mt-4 space-y-2">{recentMaterials.map((material) => <button key={material.id} onClick={() => onNavigate('projetos')} className="flex w-full items-center justify-between gap-4 rounded-lg border border-[#1c2b24] bg-[#0b110e] px-3 py-3 text-left hover:border-[#2d6948]"><div className="min-w-0"><p className="truncate text-xs font-semibold text-[#e5f7ed]">{text(material.title)}</p><p className="mt-0.5 text-[11px] text-[#64748b]">{text(material.type, 'Material')} · {text(material.createdAt, 'Data não informada')}</p></div><span className="shrink-0 rounded-full bg-[#fbbf24]/15 px-2 py-1 text-[10px] font-bold text-[#fbbf24]">Rascunho</span></button>)}</div> : <div className="mt-4 rounded-lg border border-dashed border-[#2a4033] px-4 py-6 text-center"><Sparkles className="mx-auto h-5 w-5 text-[#6ee7b7]" /><p className="mt-2 text-xs font-semibold text-[#d1fae5]">Nenhum material criado ainda</p><p className="mt-1 text-xs text-[#64748b]">Crie a primeira campanha para iniciar a biblioteca.</p></div>}
        </div>
        <div className="studio-card rounded-xl p-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10b981]/15 text-[#6ee7b7]"><Upload className="h-5 w-5" /></div><div><h2 className="text-sm font-bold text-[#f0fdf4]">Importar catálogo</h2><p className="mt-1 text-xs text-[#94a3b8]">Extraia cursos para revisar antes de cadastrar.</p></div></div><button onClick={onOpenImport} className="mt-5 w-full rounded-lg border border-[#2d6948] bg-[#0d3822] px-4 py-2.5 text-xs font-bold text-[#6ee7b7] hover:bg-[#124d2f]">Importar PDF ou catálogo</button><div className="mt-5 border-t border-[#1c2b24] pt-4 text-xs text-[#94a3b8]"><div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#6ee7b7]" />Dados incompletos são sinalizados para revisão.</div><div className="mt-2 flex items-center gap-2"><Megaphone className="h-4 w-4 text-[#6ee7b7]" />Não há métricas de venda inventadas neste painel.</div></div></div>
      </section>
    </div>
  );
};
