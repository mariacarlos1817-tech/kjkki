import React, { useMemo, useState } from 'react';
import { AlertCircle, Check, Copy, ExternalLink, MessageCircle, Phone, Send, Sparkles } from 'lucide-react';
import { BrandKit, Product } from '../types';

interface WhatsAppSalesViewProps {
  selectedProduct: Product;
  brandKit: BrandKit;
}

type ScriptKey = 'inicial' | 'preco' | 'modalidade' | 'certificado' | 'pensar' | 'fechamento';

const safeText = (value: unknown, fallback: string) => {
  if (typeof value !== 'string') return fallback;
  const normalized = value.trim();
  return normalized && !['undefined', 'null', 'nan'].includes(normalized.toLowerCase()) ? normalized : fallback;
};

const formatCurrency = (value?: number) => typeof value === 'number'
  ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  : 'informação pendente';

const cleanPhone = (value: string) => value.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');

export const WhatsAppSalesView: React.FC<WhatsAppSalesViewProps> = ({ selectedProduct, brandKit }) => {
  const [tab, setTab] = useState<'scripts' | 'followup'>('scripts');
  const [scriptKey, setScriptKey] = useState<ScriptKey>('inicial');
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [copied, setCopied] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const course = safeText(selectedProduct.name, 'curso');
  const company = safeText(brandKit.tradingName || brandKit.companyName, 'nossa equipe');
  const price = selectedProduct.promoPrice ?? selectedProduct.price;
  const purchaseUrl = safeText(selectedProduct.purchaseUrl || brandKit.website, 'link ainda não informado');
  const legalReview = selectedProduct.legalStatus !== 'APROVADO';

  const scripts = useMemo<Record<ScriptKey, { title: string; description: string; content: string }>>(() => ({
    inicial: {
      title: 'Lead novo',
      description: 'Primeiro contato consultivo',
      content: `Olá${leadName ? `, ${leadName}` : ''}! Tudo bem?\n\nSou da ${company}. Vi seu interesse no *${course}*. Posso te explicar de forma rápida como funciona, para quem é e quais são os próximos passos?\n\nSe preferir, me diga qual é sua principal dúvida para eu te orientar.`,
    },
    preco: {
      title: 'Pergunta sobre preço',
      description: 'Resposta clara sem pressão',
      content: `Claro${leadName ? `, ${leadName}` : ''}. Para o *${course}*, a condição cadastrada no momento é *${formatCurrency(price)}*.\n\nTambém vale confirmar as formas de pagamento e se a oferta ainda se aplica ao seu perfil. Quer que eu detalhe essas informações?`,
    },
    modalidade: {
      title: 'Dúvida sobre modalidade',
      description: 'Explica o formato com transparência',
      content: `O *${course}* está cadastrado na modalidade *${safeText(selectedProduct.modality, 'informação pendente')}*. A carga horária informada é de *${safeText(String(selectedProduct.workloadHours), 'informação pendente')}*.\n\nAntes da matrícula, posso confirmar para você os requisitos, o prazo e como é o acesso.`,
    },
    certificado: {
      title: 'Certificado e requisitos',
      description: 'Sem afirmações não verificadas',
      content: `Sobre certificado e requisitos do *${course}*: a informação cadastrada é *${safeText(selectedProduct.certification, 'informação pendente')}*.\n\nPara te passar uma orientação correta, vou confirmar os critérios aplicáveis, os órgãos relacionados e a documentação necessária antes da matrícula.`,
    },
    pensar: {
      title: '“Vou pensar”',
      description: 'Follow-up respeitoso',
      content: `Perfeito${leadName ? `, ${leadName}` : ''}. Faz sentido avaliar com calma.\n\nSe ajudar, posso te deixar um resumo objetivo do *${course}* com modalidade, requisitos, investimento e canal oficial de atendimento. Quando quiser retomar, fico à disposição.`,
    },
    fechamento: {
      title: 'Próximo passo',
      description: 'Encaminhamento com validação',
      content: `Ótimo${leadName ? `, ${leadName}` : ''}. Antes de avançar, vou confirmar com você se o *${course}* atende ao que procura e se os dados da oferta estão corretos.\n\nLink cadastrado: ${purchaseUrl}\n\nSe preferir, posso acompanhar pelo canal oficial e ajudar com as dúvidas restantes.`,
    },
  }), [leadName, company, course, price, selectedProduct, purchaseUrl]);

  const current = scripts[scriptKey];
  const followUps = [
    `Olá${leadName ? `, ${leadName}` : ''}! Passando para saber se ficou alguma dúvida sobre o *${course}*. Se quiser, posso resumir modalidade, requisitos e oferta cadastrada.`,
    `Oi${leadName ? `, ${leadName}` : ''}! Estou por aqui caso queira retomar a conversa sobre o *${course}*. Sem compromisso: posso responder apenas à sua principal dúvida.`,
    `Olá${leadName ? `, ${leadName}` : ''}! Caso o *${course}* ainda esteja nos seus planos, posso confirmar as informações atualizadas antes de você decidir.`,
  ];

  const copy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const openWhatsApp = (content: string) => {
    const phone = cleanPhone(leadPhone);
    if (phone.length < 10 || phone.length > 11) {
      setPhoneError('Informe DDD + número do lead para abrir uma conversa direcionada.');
      return;
    }
    setPhoneError('');
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(content)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 pb-12">
      <header><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6ee7b7]">WhatsApp Sales</p><h1 className="mt-1 font-heading text-2xl font-bold text-[#f0fdf4] sm:text-3xl">Central de conversa e follow-up</h1><p className="mt-2 max-w-2xl text-sm text-[#94a3b8]">Mensagens consultivas, editáveis e orientadas pelos dados do curso - sem promessas que não foram confirmadas.</p></header>

      {legalReview && <section className="flex gap-3 rounded-xl border border-[#5b4315] bg-[#1b170d] p-4"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#fbbf24]" /><p className="text-xs leading-relaxed text-[#fef3c7]">O status legal do curso exige revisão. As mensagens de certificado e requisitos foram marcadas para confirmação antes do envio.</p></section>}

      <section className="studio-card rounded-xl p-5"><div className="grid gap-4 md:grid-cols-2"><label className="text-xs font-semibold text-[#d1fae5]">Nome do lead (opcional)<input value={leadName} onChange={(event) => setLeadName(event.target.value)} placeholder="Ex.: Ana" className="studio-input mt-1.5 w-full rounded-lg px-3 py-2.5 text-xs" /></label><label className="text-xs font-semibold text-[#d1fae5]">Telefone do lead<input value={leadPhone} onChange={(event) => { setLeadPhone(event.target.value); setPhoneError(''); }} placeholder="DDD + número" inputMode="numeric" className="studio-input mt-1.5 w-full rounded-lg px-3 py-2.5 text-xs" /></label></div>{phoneError && <p className="mt-2 text-xs text-[#fca5a5]">{phoneError}</p>}</section>

      <div className="flex gap-2 border-b border-[#1c2b24] pb-3"><button onClick={() => setTab('scripts')} className={`rounded-lg px-3 py-2 text-xs font-bold ${tab === 'scripts' ? 'bg-[#10b981]/15 text-[#6ee7b7]' : 'text-[#94a3b8] hover:bg-[#121c17]'}`}>Scripts de conversa</button><button onClick={() => setTab('followup')} className={`rounded-lg px-3 py-2 text-xs font-bold ${tab === 'followup' ? 'bg-[#10b981]/15 text-[#6ee7b7]' : 'text-[#94a3b8] hover:bg-[#121c17]'}`}>Follow-up</button></div>

      {tab === 'scripts' ? <div className="grid gap-5 lg:grid-cols-[0.8fr_1.4fr]"><section className="space-y-2">{(Object.keys(scripts) as ScriptKey[]).map((key) => <button key={key} onClick={() => setScriptKey(key)} className={`w-full rounded-xl border p-4 text-left transition ${scriptKey === key ? 'border-[#34d399]/60 bg-[#10251a]' : 'border-[#1c2b24] bg-[#0e1512] hover:bg-[#121c17]'}`}><p className="text-xs font-bold text-[#e5f7ed]">{scripts[key].title}</p><p className="mt-1 text-[11px] text-[#94a3b8]">{scripts[key].description}</p></button>)}</section><section className="studio-card rounded-xl p-5"><div className="flex items-start justify-between gap-3 border-b border-[#1c2b24] pb-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-[#6ee7b7]">{current.title}</p><p className="mt-1 text-xs text-[#94a3b8]">{current.description}</p></div><MessageCircle className="h-5 w-5 text-[#6ee7b7]" /></div><textarea value={current.content} readOnly rows={13} className="mt-4 w-full resize-none rounded-lg border border-[#1f2c34] bg-[#0b141a] p-4 text-xs leading-relaxed text-[#e9edef] outline-none" /><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => copy(current.content)} className="inline-flex items-center gap-2 rounded-lg border border-[#2d6948] px-4 py-2.5 text-xs font-bold text-[#6ee7b7] hover:bg-[#12241b]">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? 'Copiado' : 'Copiar'}</button><button onClick={() => openWhatsApp(current.content)} className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-4 py-2.5 text-xs font-bold text-[#042c1b] hover:bg-[#32e178]"><Send className="h-4 w-4" />Abrir no WhatsApp</button></div></section></div> : <section className="grid gap-4 md:grid-cols-3">{followUps.map((content, index) => <article key={index} className="studio-card rounded-xl p-5"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-[#6ee7b7]">{['24 horas', '3 dias', '7 dias'][index]}</span><Sparkles className="h-4 w-4 text-[#6ee7b7]" /></div><p className="mt-4 whitespace-pre-wrap text-xs leading-relaxed text-[#d1fae5]">{content}</p><div className="mt-5 flex gap-2"><button onClick={() => copy(content)} className="rounded-lg border border-[#2d6948] px-3 py-2 text-xs font-bold text-[#6ee7b7]">Copiar</button><button onClick={() => openWhatsApp(content)} className="rounded-lg bg-[#25d366] px-3 py-2 text-xs font-bold text-[#042c1b]"><Phone className="h-3.5 w-3.5" /></button></div></article>)}</section>}
    </div>
  );
};
