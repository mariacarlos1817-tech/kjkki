import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Grid, 
  Globe, 
  Megaphone, 
  MessageSquare, 
  Palette, 
  Layers, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Award,
  Upload,
  Zap,
  TrendingUp
} from 'lucide-react';
import { Product, BrandKit, GeneratedMaterial } from '../types';
import { NexLogo } from '../components/NexLogo';

interface DashboardViewProps {
  products: Product[];
  selectedProduct: Product;
  brandKit: BrandKit;
  onSelectProduct: (id: string) => void;
  onNavigate: (view: string) => void;
  onOpenImport: () => void;
  recentMaterials: GeneratedMaterial[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  selectedProduct,
  brandKit,
  onSelectProduct,
  onNavigate,
  onOpenImport,
  recentMaterials
}) => {
  const quickActionCards = [
    {
      id: 'super-kit',
      title: 'SUPER KIT DE VENDAS',
      desc: 'Gera todo o material de divulgação do curso selecionado com 1 clique (20+ peças prontas).',
      icon: Sparkles,
      view: 'super-kit',
      isHero: true
    },
    {
      id: 'creative',
      title: 'CREATIVE STUDIO & EDITOR HD',
      desc: 'Editor de imagem com diagnóstico de proporção em tempo real e gerador multimodal de prompts e copies.',
      icon: Palette,
      view: 'creative',
      isHero: true
    },
    {
      id: 'portfolio',
      title: 'CRIAR PORTFÓLIO',
      desc: 'Estruture portfólios institucionais e comerciais de cursos para envio a empresas e frotas.',
      icon: BookOpen,
      view: 'portfolio'
    },
    {
      id: 'catalogo',
      title: 'CATÁLOGO INTERATIVO',
      desc: 'Catálogo de cursos diagramado para WhatsApp, envio em PDF e propostas imediatas.',
      icon: Grid,
      view: 'catalogo'
    },
    {
      id: 'sales-page',
      title: 'PÁGINA DE VENDAS',
      desc: 'Gere páginas de alta conversão com 17 seções completas, prova social e botão de matrícula.',
      icon: Globe,
      view: 'sales-page'
    },
    {
      id: 'meta-ads',
      title: 'ANÚNCIOS & META ADS',
      desc: 'Gere 10 variações de anúncios de alta performance para Facebook e Instagram.',
      icon: Megaphone,
      view: 'meta-ads'
    },
    {
      id: 'whatsapp',
      title: 'WHATSAPP & SCRIPTS',
      desc: 'Modo consultor de vendas, scripts de quebra de objeções e mensagens de fechamento.',
      icon: MessageSquare,
      view: 'whatsapp'
    },
    {
      id: 'descriptions',
      title: 'DESCRIPTION STUDIO',
      desc: 'Descrições especializadas para 15+ canais em 5 tamanhos e 12 tons de voz.',
      icon: FileText,
      view: 'descriptions'
    },
    {
      id: 'copywriting',
      title: 'COPYWRITING & FRAMEWORKS',
      desc: 'Estruturação de copy em frameworks comprovados: AIDA, PAS, BAB e 4Ps.',
      icon: Layers,
      view: 'copywriting'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Optimized Header with single concise phrase */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0c1611] to-[#09120e] border border-[#192f23] rounded-2xl p-6 relative overflow-hidden shadow-lg">
        <div className="space-y-1 z-10">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#f0fdf4] font-heading tracking-tight">
            Painel do Vendedor
          </h1>
          <p className="text-xs sm:text-sm text-[#94a3b8]">
            Central de vendas e marketing para acelerar seus fechamentos de cursos.
          </p>
        </div>

        <div className="z-10 flex items-center gap-3">
          <div className="bg-[#080d0b] border border-[#192f23] rounded-xl px-4 py-2 flex items-center gap-3">
            <span className="text-xs text-[#64748b]">Curso Ativo:</span>
            <span className="text-xs font-bold text-[#34d399]">{selectedProduct.name}</span>
            <span className="text-[10px] bg-[#10b981]/20 text-[#34d399] px-2 py-0.5 rounded font-mono font-bold">
              {selectedProduct.workloadHours}h
            </span>
          </div>
        </div>
      </div>

      {/* Selected Product Spotlight Card */}
      <div className="bg-[#0e1512] border border-[#192720] rounded-xl p-6 relative">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={selectedProduct.coverImage}
              alt={selectedProduct.name}
              className="w-20 h-20 rounded-lg object-cover border border-[#1f3329] shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#10b981]/15 text-[#34d399] font-semibold font-mono">
                  {selectedProduct.codeSKU}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#16251e] text-[#94a3b8]">
                  {selectedProduct.category}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#062c19] text-[#34d399] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {selectedProduct.legalStatus}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[#f0fdf4] font-heading">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-[#94a3b8] max-w-2xl line-clamp-1">
                {selectedProduct.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              id="btn-dashboard-super-kit-highlight"
              onClick={() => onNavigate('super-kit')}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg emerald-gradient-bg text-[#080d0b] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              Gerar Kit Completo deste Curso
            </button>
            <button
              onClick={() => onNavigate('produtos')}
              className="px-4 py-2.5 rounded-lg border border-[#1f3329] hover:border-[#10b981] text-xs font-semibold text-[#94a3b8] hover:text-[#f0fdf4] transition-all cursor-pointer whitespace-nowrap"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>

      {/* Primary Action Cards Grid (10 Functions) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#f0fdf4] font-heading">
              Ações Rápidas de Produção
            </h2>
            <p className="text-xs text-[#64748b]">
              Selecione o tipo de material que deseja produzir para o curso ativo
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {quickActionCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                id={`card-action-${card.id}`}
                onClick={() => onNavigate(card.view)}
                className={`studio-card rounded-xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:-translate-y-1 ${
                  card.isHero
                    ? 'col-span-1 sm:col-span-2 bg-gradient-to-br from-[#0c1f17] to-[#0a1410] border-[#10b981]/40 shadow-lg shadow-[#10b981]/10'
                    : 'hover:bg-[#121c17]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                        card.isHero
                          ? 'emerald-gradient-bg text-[#080d0b]'
                          : 'bg-[#16251e] text-[#34d399]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#475569] group-hover:text-[#34d399] group-hover:translate-x-1 transition-all" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#f0fdf4] font-heading group-hover:text-[#34d399] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#192720] flex items-center justify-between text-[11px] text-[#34d399] font-semibold">
                  <span>Abrir Ferramenta</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">Iniciar →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PDF Import Banner */}
      <div className="bg-[#0c1712] border border-[#192f23] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#12241b] border border-[#19402c] flex items-center justify-center text-[#34d399] shrink-0">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#f0fdf4] font-heading">
              Tem um catálogo ou PDF de cursos? Importe agora com IA!
            </h3>
            <p className="text-xs text-[#94a3b8] mt-0.5">
              O sistema extrai automaticamente carga horária, modalidade, ementa, normas e benefícios para revisão antes de cadastrar.
            </p>
          </div>
        </div>

        <button
          id="btn-dashboard-open-import"
          onClick={onOpenImport}
          className="px-5 py-2.5 rounded-lg bg-[#0d3822] border border-[#10b981]/40 text-[#34d399] hover:bg-[#124d2f] font-bold text-xs transition-all whitespace-nowrap cursor-pointer"
        >
          Importar Portfólio / PDF
        </button>
      </div>

      {/* Compliance & Methodology Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="studio-card rounded-xl p-4 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#10b981] shrink-0" />
          <div>
            <div className="text-xs font-bold text-[#f0fdf4]">Conformidade Jurídica</div>
            <div className="text-[11px] text-[#94a3b8]">SENATRAN, DETRAN e MTE rigorosamente respeitados.</div>
          </div>
        </div>
        <div className="studio-card rounded-xl p-4 flex items-center gap-3">
          <Clock className="w-8 h-8 text-[#10b981] shrink-0" />
          <div>
            <div className="text-xs font-bold text-[#f0fdf4]">Plataforma EAD 24/7</div>
            <div className="text-[11px] text-[#94a3b8]">Acesso imediato no celular, tablet ou computador.</div>
          </div>
        </div>
        <div className="studio-card rounded-xl p-4 flex items-center gap-3">
          <Award className="w-8 h-8 text-[#10b981] shrink-0" />
          <div>
            <div className="text-xs font-bold text-[#f0fdf4]">Performance & Conversão</div>
            <div className="text-[11px] text-[#94a3b8]">Materiais desenhados para acelerar vendas e fechamentos.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
