import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Palette, 
  Phone, 
  Mail, 
  Globe, 
  Check, 
  Save, 
  Award, 
  FileText,
  Sliders,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BrandKit } from '../types';
import { NexLogo } from '../components/NexLogo';

interface BrandKitViewProps {
  brandKit: BrandKit;
  onUpdateBrandKit: (updated: BrandKit) => void;
}

export const BrandKitView: React.FC<BrandKitViewProps> = ({
  brandKit,
  onUpdateBrandKit
}) => {
  const [formData, setFormData] = useState<BrandKit>({ ...brandKit });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdateBrandKit(formData);
    setSaved(true);
    confetti({ particleCount: 60, spread: 60 });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#00ff88] uppercase tracking-wider mb-1">
            Brand Kit & Identidade Institucional
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#f0fdf4] font-heading">
            Next Studio Marketing Inteligente
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1">
            Configure as diretrizes corporativas do vendedor, dados de contato e paleta de cores para os geradores com IA.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg emerald-gradient-bg text-[#080d0b] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Alterações Salvas!' : 'Salvar Brand Kit'}
        </button>
      </div>

      {/* Brand Preview Banner */}
      <div className="studio-card rounded-2xl p-6 bg-gradient-to-r from-[#0d1c15] via-[#09140f] to-[#0d1c15] border border-[#193b29] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <NexLogo size="lg" variant="full" />
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00d26a]/15 text-[#00ff88] text-[10px] font-bold">
              <Sparkles className="w-3 h-3" /> Identidade Oficial Ativa
            </div>
            <p className="text-xs text-[#94a3b8]">
              {formData.slogan}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#080d0b] border border-[#1f3329]">
            <div className="w-5 h-5 rounded-full bg-[#00d26a] shadow-[0_0_8px_#00d26a]" />
            <span className="text-xs font-mono font-bold text-[#f0fdf4]">#00D26A</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#080d0b] border border-[#1f3329]">
            <div className="w-5 h-5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
            <span className="text-xs font-mono font-bold text-[#f0fdf4]">#00FF88</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Informações Institucionais */}
        <div className="studio-card rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#f0fdf4] font-heading flex items-center gap-2 border-b border-[#192720] pb-3">
            <Building2 className="w-4 h-4 text-[#00ff88]" />
            Dados Institucionais do Vendedor / Agência
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#94a3b8] mb-1">
                Nome Comercial (Trading Name)
              </label>
              <input
                type="text"
                value={formData.tradingName}
                onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#f0fdf4]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-1">
                  Razão Social (Company Name)
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#f0fdf4]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-1">
                  CNPJ
                </label>
                <input
                  type="text"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#f0fdf4]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-1">
                  Slogan Comercial
                </label>
                <input
                  type="text"
                  value={formData.slogan}
                  onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                  className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#f0fdf4]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-1">
                  WhatsApp Oficial para Vendas
                </label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#f0fdf4]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-1">
                  E-mail de Contato
                </label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#f0fdf4]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-1">
                  Instagram Oficial
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#f0fdf4]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94a3b8] mb-1">
                Site Oficial / Plataforma
              </label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#f0fdf4]"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Paleta de Cores e Tipografia */}
        <div className="studio-card rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-[#f0fdf4] font-heading flex items-center gap-2 border-b border-[#192720] pb-3">
            <Palette className="w-4 h-4 text-[#00ff88]" />
            Paleta de Cores & Identidade Visual NexMarketing
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#080d0b] border border-[#1f3329] space-y-2">
              <div className="w-full h-12 rounded-lg bg-[#00D26A] border border-[#00ff88]/40 flex items-center justify-center font-bold text-[#080d0b] text-xs shadow-lg">
                #00D26A
              </div>
              <div className="text-xs font-bold text-[#f0fdf4]">Emerald Electric</div>
              <p className="text-[11px] text-[#64748b]">Cor primária de alta conversão e CTAs.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#080d0b] border border-[#1f3329] space-y-2">
              <div className="w-full h-12 rounded-lg bg-[#00FF88] border border-[#00d26a]/40 flex items-center justify-center font-bold text-[#080d0b] text-xs shadow-lg">
                #00FF88
              </div>
              <div className="text-xs font-bold text-[#f0fdf4]">Neon Mint Glow</div>
              <p className="text-[11px] text-[#64748b]">Brilho, realce e badges de destaque.</p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#192720] space-y-2">
            <div className="text-xs font-bold text-[#00ff88]">Diretrizes de Tom de Voz da NexMarketing:</div>
            <ul className="text-xs text-[#94a3b8] space-y-1">
              <li>• Foco absoluto em conversão comercial e segurança técnica do aluno.</li>
              <li>• Clareza cristalina sobre homologação SENATRAN, carga horária e validade.</li>
              <li>• Abordagem consultiva, ágil e resolutiva para fechamento no WhatsApp.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
