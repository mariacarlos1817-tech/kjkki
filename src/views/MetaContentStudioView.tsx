import React, { useEffect, useMemo, useState } from 'react';
import { Check, ClipboardCheck, Copy, FileText, Megaphone, Plus, ShieldAlert, Target } from 'lucide-react';
import { BrandKit, Campaign, GeneratedMaterial, Product } from '../types';

interface MetaContentStudioViewProps {
  selectedProduct: Product;
  brandKit: BrandKit;
  campaigns: Campaign[];
  onSaveCampaign: (campaign: Campaign) => void;
  onSaveMaterial: (material: GeneratedMaterial) => void;
}

const safeText = (value: unknown, fallback: string) => {
  if (typeof value !== 'string') return fallback;
  const normalized = value.trim();
  return normalized && !['undefined', 'null', 'nan'].includes(normalized.toLowerCase()) ? normalized : fallback;
};

const price = (value?: number) => typeof value === 'number'
  ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  : 'Informação pendente';

export const MetaContentStudioView: React.FC<MetaContentStudioViewProps> = ({
  selectedProduct,
  brandKit,
  campaigns,
  onSaveCampaign,
  onSaveMaterial,
}) => {
  const [campaignName, setCampaignName] = useState(`Campanha - ${safeText(selectedProduct.name, 'curso ativo')}`);
  const [objective, setObjective] = useState('Mensagens no WhatsApp');
  const [audience, setAudience] = useState(safeText(selectedProduct.targetAudience, 'Informação pendente'));
  const [angle, setAngle] = useState('Benefício');
  const [hypothesis, setHypothesis] = useState('Uma mensagem clara sobre o benefício principal aumenta conversas qualificadas.');
  const [utmContent, setUtmContent] = useState('criativo-01');
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    setCampaignName(`Campanha - ${safeText(selectedProduct.name, 'curso ativo')}`);
    setAudience(safeText(selectedProduct.targetAudience, 'Informação pendente'));
    setGenerated(false);
  }, [selectedProduct.id, selectedProduct.name, selectedProduct.targetAudience]);

  const campaign = useMemo<Campaign>(() => ({
    id: `campaign-${selectedProduct.id}-${campaignName.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, '') || 'nova'}`,
    name: safeText(campaignName, `Campanha - ${safeText(selectedProduct.name, 'curso ativo')}`),
    productId: selectedProduct.id,
    productName: selectedProduct.name,
    objective,
    targetAudience: safeText(audience, 'Informação pendente'),
    offer: selectedProduct.promoPrice ? price(selectedProduct.promoPrice) : price(selectedProduct.price),
    startDate: new Date().toISOString().slice(0, 10),
    channel: 'Meta Ads',
    tone: 'Profissional',
    materialsCount: generated ? 1 : 0,
    status: 'Rascunho',
    angle,
    hypothesis: safeText(hypothesis, 'Informação pendente'),
    utm: {
      source: 'meta',
      medium: 'paid_social',
      campaign: safeText(campaignName, 'campanha').toLowerCase().replace(/[^a-z0-9]+/gi, '-'),
      content: safeText(utmContent, 'criativo-01'),
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
  }), [selectedProduct, campaignName, objective, audience, angle, hypothesis, utmContent, generated]);

  const packageText = useMemo(() => {
    const course = safeText(selectedProduct.name, 'curso');
    const benefit = safeText(selectedProduct.primaryBenefit, 'qualificação para o seu objetivo profissional');
    const pain = safeText(selectedProduct.primaryPainPoint, 'encontrar a formação adequada');
    const offer = selectedProduct.promoPrice ? price(selectedProduct.promoPrice) : price(selectedProduct.price);
    const cta = objective === 'Mensagens no WhatsApp' ? 'Falar com um consultor no WhatsApp' : 'Conhecer a oferta';
    const officialChannel = safeText(brandKit.whatsapp || brandKit.phone, 'canal oficial não informado');
    const utmQuery = `utm_source=${campaign.utm?.source}&utm_medium=${campaign.utm?.medium}&utm_campaign=${campaign.utm?.campaign}&utm_content=${campaign.utm?.content}`;

    return `PACOTE DE CAMPANHA - RASCUNHO\n\nCurso: ${course}\nObjetivo: ${objective}\nPúblico: ${safeText(audience, 'Informação pendente')}\nÂngulo: ${angle}\nHipótese: ${safeText(hypothesis, 'Informação pendente')}\n\nHOOKS\n1. Procurando uma formação em ${course} que faça sentido para sua rotina?\n2. Entenda como ${course} pode apoiar quem busca ${benefit}.\n3. Antes de decidir, confira as informações do curso e tire suas dúvidas com um consultor.\n4. Uma alternativa para quem quer avançar com clareza e orientação.\n5. Veja se ${course} é adequado para o seu momento profissional.\n\nTEXTO PRINCIPAL\nSe você busca ${benefit}, o ${course} pode ser uma alternativa a avaliar. A proposta é explicar como funciona, para quem é e quais informações precisam ser confirmadas antes da matrícula. Fale com a equipe para receber orientação sobre modalidade, requisitos e oferta disponível.\n\nHEADLINE\n${course}: confira se é para você\n\nDESCRIÇÃO\nInformações claras, orientação comercial e próximos passos pelo canal oficial.\n\nCTA\n${cta}\n\nOFERTA CADASTRADA\n${offer}\n\nCANAL OFICIAL\n${officialChannel}\n\nUTMs\n${utmQuery}\n\nCHECKLIST DE REVISÃO\n[ ] Oferta, preço e parcelamento conferidos\n[ ] Público e ângulo coerentes com o curso\n[ ] Claims legais/comerciais revisados\n[ ] Link de matrícula e telefone validados\n[ ] Criativo e copy aprovados antes da publicação`;
  }, [selectedProduct, brandKit, campaign, objective, audience, angle, hypothesis]);

  const needsLegalReview = selectedProduct.legalStatus !== 'APROVADO';
  const missingCommercialInfo = !selectedProduct.purchaseUrl || !selectedProduct.whatsappNumber;

  const saveCampaign = () => {
    onSaveCampaign(campaign);
  };

  const generatePackage = () => {
    const material: GeneratedMaterial = {
      id: `material-${Date.now()}`,
      title: `Pacote Meta - ${safeText(campaign.name, 'Campanha')}`,
      category: 'Publicidade',
      type: 'Pacote de campanha Meta',
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      content: packageText,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      editorialStatus: 'Rascunho',
      version: 1,
      source: 'ai',
      campaignId: campaign.id,
      isFavorite: false,
      tags: ['Meta Ads', angle, objective],
    };
    onSaveCampaign({ ...campaign, materialsCount: 1, updatedAt: new Date().toISOString() });
    onSaveMaterial(material);
    setGenerated(true);
  };

  const copyPackage = async () => {
    await navigator.clipboard.writeText(packageText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6 pb-12">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6ee7b7]">Campanhas Meta</p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-[#f0fdf4] sm:text-3xl">Workspace de campanha</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#94a3b8]">Monte um briefing completo, gere um pacote em rascunho e envie para revisão antes de publicar.</p>
        </div>
        <button onClick={saveCampaign} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2d6948] bg-[#0d3822] px-4 py-2.5 text-xs font-bold text-[#6ee7b7] hover:bg-[#124d2f]"><Plus className="h-4 w-4" />Salvar campanha</button>
      </header>

      {(needsLegalReview || missingCommercialInfo) && (
        <section className="flex gap-3 rounded-xl border border-[#5b4315] bg-[#1b170d] p-4">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#fbbf24]" />
          <div><h2 className="text-sm font-bold text-[#fef3c7]">Revisão obrigatória antes da publicação</h2><p className="mt-1 text-xs leading-relaxed text-[#d6c58e]">{needsLegalReview ? 'O status legal do curso exige revisão. ' : ''}{missingCommercialInfo ? 'Telefone ou link de matrícula ainda precisam ser validados. ' : ''}O pacote será salvo como rascunho.</p></div>
        </section>
      )}

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.35fr]">
        <section className="studio-card rounded-xl p-5">
          <div className="flex items-center gap-2"><Target className="h-4 w-4 text-[#6ee7b7]" /><h2 className="text-sm font-bold text-[#f0fdf4]">Briefing da campanha</h2></div>
          <div className="mt-5 space-y-4">
            <label className="block text-xs font-semibold text-[#d1fae5]">Nome da campanha<input value={campaignName} onChange={(event) => setCampaignName(event.target.value)} className="studio-input mt-1.5 w-full rounded-lg px-3 py-2.5 text-xs" /></label>
            <label className="block text-xs font-semibold text-[#d1fae5]">Objetivo<select value={objective} onChange={(event) => setObjective(event.target.value)} className="studio-input mt-1.5 w-full rounded-lg px-3 py-2.5 text-xs"><option>Mensagens no WhatsApp</option><option>Captação de lead</option><option>Venda direta</option><option>Remarketing</option></select></label>
            <label className="block text-xs font-semibold text-[#d1fae5]">Público<input value={audience} onChange={(event) => setAudience(event.target.value)} className="studio-input mt-1.5 w-full rounded-lg px-3 py-2.5 text-xs" /></label>
            <label className="block text-xs font-semibold text-[#d1fae5]">Ângulo<select value={angle} onChange={(event) => setAngle(event.target.value)} className="studio-input mt-1.5 w-full rounded-lg px-3 py-2.5 text-xs"><option>Benefício</option><option>Dor</option><option>Carreira</option><option>Agilidade</option><option>Segurança</option><option>Autoridade</option><option>Oferta</option></select></label>
            <label className="block text-xs font-semibold text-[#d1fae5]">Hipótese de teste<textarea value={hypothesis} onChange={(event) => setHypothesis(event.target.value)} rows={3} className="studio-input mt-1.5 w-full rounded-lg px-3 py-2.5 text-xs" /></label>
            <label className="block text-xs font-semibold text-[#d1fae5]">UTM content<input value={utmContent} onChange={(event) => setUtmContent(event.target.value)} className="studio-input mt-1.5 w-full rounded-lg px-3 py-2.5 text-xs" /></label>
          </div>
        </section>

        <section className="studio-card rounded-xl p-5">
          <div className="flex flex-col gap-3 border-b border-[#1c2b24] pb-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-[#6ee7b7]">Pacote de campanha</p><h2 className="mt-1 text-lg font-bold text-[#f0fdf4]">{safeText(selectedProduct.name, 'Curso ativo')}</h2><p className="mt-1 text-xs text-[#94a3b8]">Versão 1 · Rascunho · fonte: IA</p></div><span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#fbbf24]/15 px-2.5 py-1 text-[10px] font-bold text-[#fbbf24]">Requer revisão</span></div>
          <pre className="mt-4 max-h-[540px] overflow-y-auto whitespace-pre-wrap rounded-lg border border-[#1c2b24] bg-[#080d0b] p-4 font-mono text-xs leading-relaxed text-[#d1fae5]">{packageText}</pre>
          <div className="mt-4 flex flex-wrap gap-2"><button onClick={generatePackage} className="emerald-gradient-bg inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold text-[#062d1b] hover:brightness-110"><Megaphone className="h-4 w-4" />{generated ? 'Atualizar pacote na biblioteca' : 'Gerar pacote em rascunho'}</button><button onClick={copyPackage} className="inline-flex items-center gap-2 rounded-lg border border-[#2d6948] px-4 py-2.5 text-xs font-bold text-[#6ee7b7] hover:bg-[#12241b]">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? 'Copiado' : 'Copiar pacote'}</button></div>
        </section>
      </div>

      <section className="studio-card rounded-xl p-5"><div className="flex items-center gap-2"><ClipboardCheck className="h-4 w-4 text-[#6ee7b7]" /><h2 className="text-sm font-bold text-[#f0fdf4]">Campanhas salvas</h2></div>{campaigns.length ? <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{campaigns.slice(0, 6).map((item) => <article key={item.id} className="rounded-lg border border-[#1c2b24] bg-[#0b110e] p-4"><p className="text-xs font-bold text-[#e5f7ed]">{safeText(item.name, 'Campanha sem nome')}</p><p className="mt-1 text-[11px] text-[#94a3b8]">{safeText(item.objective, 'Objetivo pendente')} · {safeText(item.angle, 'Ângulo pendente')}</p><div className="mt-3 flex items-center justify-between"><span className="text-[10px] text-[#64748b]">{item.materialsCount || 0} material(is)</span><span className="rounded-full bg-[#fbbf24]/15 px-2 py-1 text-[10px] font-bold text-[#fbbf24]">{item.status || 'Rascunho'}</span></div></article>)}</div> : <div className="mt-4 rounded-lg border border-dashed border-[#2a4033] px-4 py-6 text-center text-xs text-[#94a3b8]"><FileText className="mx-auto h-5 w-5 text-[#6ee7b7]" /><p className="mt-2">Salve o briefing para começar a biblioteca de campanhas.</p></div>}</section>
    </div>
  );
};
