import React, { useState } from 'react';
import { 
  MessageSquare, 
  Copy, 
  Check, 
  Send, 
  PhoneCall, 
  UserCheck, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Layers,
  ExternalLink,
  DollarSign,
  HelpCircle,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, BrandKit } from '../types';

interface WhatsAppSalesViewProps {
  selectedProduct: Product;
  brandKit: BrandKit;
}

export const WhatsAppSalesView: React.FC<WhatsAppSalesViewProps> = ({
  selectedProduct,
  brandKit
}) => {
  const [activeTab, setActiveTab] = useState<'seller' | 'catalog' | 'quick-answers' | 'followup'>('seller');
  const [selectedSituation, setSelectedSituation] = useState<string>('preco');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customPhone, setCustomPhone] = useState<string>('');

  const situations = [
    {
      id: 'preco',
      title: 'Cliente perguntou o preço',
      scenario: 'Lead quer saber o valor do curso',
      script: `Olá! Tudo bem? 🚗\n\nO curso de *${selectedProduct.name}* (${selectedProduct.workloadHours} horas) está com uma condição super especial na ${brandKit.name}!\n\nInvestimento:\nDe: ~R$ ${selectedProduct.price ? selectedProduct.price.toFixed(2) : '349,00'}~\n*Por apenas:* R$ ${selectedProduct.promoPrice ? selectedProduct.promoPrice.toFixed(2) : '249,90'} à vista\nou em *${selectedProduct.installments || '12x no cartão'}* sem burocracia!\n\n✅ 100% online com início imediato\n✅ Certificado oficial e homologado\n✅ Suporte durante todo o curso\n\nQuer que eu reserve a sua vaga com esse valor promocional agora?`
    },
    {
      id: 'online',
      title: 'Cliente perguntou se é online',
      scenario: 'Dúvida se precisa ir presencialmente',
      script: `Sim, 100% online! 📲\n\nVocê faz o curso de *${selectedProduct.name}* direto do seu celular, computador ou tablet, nos horários que forem melhores para você (a plataforma fica disponível 24 horas por dia).\n\nAssim que você conclui as aulas, seu certificado é emitido com total validade e homologação nacional.\n\nFica muito mais prático para você não perder tempo de trabalho! Posso te enviar o link de matrícula?`
    },
    {
      id: 'certificado',
      title: 'Dúvida sobre certificado e DETRAN',
      scenario: 'Segurança jurídica e validade',
      script: `Com certeza! A ${brandKit.name} atua desde 2015 com credenciamento e homologação nos órgãos competentes (${selectedProduct.relatedRegulatoryBodies.join(', ')}).\n\nO seu certificado de *${selectedProduct.name}* (${selectedProduct.workloadHours}h) possui:\n📄 Validade nacional e chave de autenticidade\n🏛️ Emissão em conformidade com as resoluções vigentes\n🛡️ Segurança total para seu currículo e contratação\n\nVocê pode se matricular com total tranquilidade. Vamos começar?`
    },
    {
      id: 'caro',
      title: 'Cliente achou caro / pediu desconto',
      scenario: 'Objeção de valor e negociação',
      script: `Eu compreendo perfeitamente seu ponto! Mas olha que interessante: o curso de *${selectedProduct.name}* não é um gasto, é a chave para você concorrer às melhores vagas e salários na área de ${selectedProduct.relatedProfession || 'transporte e segurança'}.\n\nHoje, dividindo em *${selectedProduct.installments || '12 parcelas'}*, custa menos que um cafezinho por dia para ter a sua qualificação oficial.\n\nE além do curso completo, você ainda conta com nossa garantia de satisfação de ${selectedProduct.guaranteeDays || 7} dias. Quer garantir sua inscrição com início hoje?`
    },
    {
      id: 'pensar',
      title: 'Cliente falou que vai pensar',
      scenario: 'Evitar que o lead esfrie',
      script: `Perfeito! Entendo que você queira avaliar com calma.\n\nSó queria te avisar que o valor promocional de *R$ ${selectedProduct.promoPrice ? selectedProduct.promoPrice.toFixed(2) : '249,90'}* é válido para o lote de vagas desta semana.\n\nPara não perder essa condição, eu consigo segurar o seu desconto até hoje no fim da tarde. Posso deixar pré-reservado no seu nome?`
    },
    {
      id: 'hoje',
      title: 'Cliente quer começar hoje',
      scenario: 'Fechamento rápido e link de pagamento',
      script: `Excelente decisão! 🚀\n\nO processo é super rápido:\n1. Você faz sua matrícula agora mesmo pelo link seguro;\n2. Assim que o pagamento confirmar (no Pix ou Cartão a liberação é imediata), você recebe seu login no WhatsApp e e-mail;\n3. Já pode acessar as aulas na hora e iniciar sua capacitação!\n\nSegue o link oficial para matrícula: ${brandKit.website}\n\nSe preferir, posso gerar a chave Pix diretamente por aqui. Como fica melhor para você?`
    }
  ];

  const currentSituation = situations.find(s => s.id === selectedSituation) || situations[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleOpenWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    const cleanPhone = customPhone.replace(/\D/g, '');
    const url = cleanPhone 
      ? `https://wa.me/55${cleanPhone}?text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
  };

  const catalogText = `🔥 *CATÁLOGO OFICIAL — ${selectedProduct.name.toUpperCase()}* 🔥\n\n` +
    `*Modalidade:* ${selectedProduct.modality}\n` +
    `*Carga Horária:* ${selectedProduct.workloadHours} Horas\n` +
    `*Prazo de Conclusão:* ${selectedProduct.completionDeadline}\n` +
    `*Certificação:* ${selectedProduct.certification}\n\n` +
    `📌 *O QUE VOCÊ VAI APRENDER:*\n` +
    selectedProduct.syllabusModules.map(m => `• ${m.title}`).join('\n') + `\n\n` +
    `🎯 *BENEFÍCIOS EXCLUSIVOS:*\n` +
    selectedProduct.secondaryBenefits.map(b => `✓ ${b}`).join('\n') + `\n\n` +
    `💰 *VALOR PROMOCIONAL:*\n` +
    `De ~R$ ${selectedProduct.price ? selectedProduct.price.toFixed(2) : '349,00'}~ por apenas *R$ ${selectedProduct.promoPrice ? selectedProduct.promoPrice.toFixed(2) : '249,90'}*\n` +
    `Ou em até *${selectedProduct.installments || '12x no cartão'}*\n\n` +
    `📲 *MATRÍCULA IMEDIATA:*\n` +
    `Fale com a ${brandKit.name}: ${brandKit.contactPhone}\n` +
    `Site oficial: ${brandKit.website}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#f2ca50] uppercase tracking-wider mb-1">
            WhatsApp Sales Studio
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#e5e2e1] font-heading">
            Central de Vendas WhatsApp
          </h1>
          <p className="text-xs text-[#a09885] mt-1">
            Modo Vendedor, quebra de objeções técnicas, catálogo diagramado e respostas rápidas para o curso ativo.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#242424] bg-[#121212] rounded-xl overflow-x-auto scrollbar-hide p-1 gap-1">
        <button
          onClick={() => setActiveTab('seller')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'seller'
              ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
              : 'text-[#857d6e] hover:text-[#e5e2e1]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Modo Vendedor (Simulador de Objeções)
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
              : 'text-[#857d6e] hover:text-[#e5e2e1]'
          }`}
        >
          <Layers className="w-4 h-4" />
          Catálogo Formatado WhatsApp
        </button>
        <button
          onClick={() => setActiveTab('quick-answers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'quick-answers'
              ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
              : 'text-[#857d6e] hover:text-[#e5e2e1]'
          }`}
        >
          <Zap className="w-4 h-4" />
          Respostas Rápidas (FAQ Técnico)
        </button>
        <button
          onClick={() => setActiveTab('followup')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'followup'
              ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
              : 'text-[#857d6e] hover:text-[#e5e2e1]'
          }`}
        >
          <Clock className="w-4 h-4" />
          Sequência de Follow-up
        </button>
      </div>

      {/* Tab 1: Modo Vendedor */}
      {activeTab === 'seller' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Situation Selector (4 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <label className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider block">
              Qual a situação do atendimento?
            </label>
            <div className="space-y-2">
              {situations.map((sit) => (
                <button
                  key={sit.id}
                  onClick={() => setSelectedSituation(sit.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedSituation === sit.id
                      ? 'bg-[#211d13] border-[#d4af37] text-[#f2ca50] shadow-md shadow-[#d4af37]/5'
                      : 'bg-[#141414] border-[#262626] text-[#a09885] hover:text-[#e5e2e1] hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="text-xs font-bold font-heading">{sit.title}</div>
                  <div className="text-[11px] text-[#857d6e] mt-0.5">{sit.scenario}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Script Output & WhatsApp Direct Launcher (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="studio-card rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#242424] pb-3">
                <div>
                  <h3 className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
                    {currentSituation.title}
                  </h3>
                  <p className="text-[11px] text-[#857d6e]">Script de alta conversão</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(currentSituation.script, 'seller-script')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#242424] text-xs font-bold text-[#f2ca50] hover:bg-[#333] transition-all cursor-pointer"
                  >
                    {copiedKey === 'seller-script' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'seller-script' ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              {/* Message Preview in WhatsApp balloon style */}
              <div className="bg-[#0b141a] p-4 rounded-xl border border-[#1f2c34] relative">
                <div className="bg-[#005c4b] text-[#e9edef] text-xs p-3.5 rounded-lg max-w-xl whitespace-pre-wrap font-sans leading-relaxed shadow-sm">
                  {currentSituation.script}
                </div>
                <div className="text-[10px] text-[#8696a0] text-right mt-1 font-mono">
                  {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} • Entregue
                </div>
              </div>

              {/* Direct Send to Phone */}
              <div className="pt-2 border-t border-[#242424] flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  placeholder="DDD + Telefone do Cliente (Ex: 11999999999)"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  className="w-full sm:flex-1 rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                />
                <button
                  onClick={() => handleOpenWhatsApp(currentSituation.script)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0A0A] font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  Abrir no WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Catálogo Formatado */}
      {activeTab === 'catalog' && (
        <div className="studio-card rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#e5e2e1] font-heading">
                Catálogo Estruturado para o WhatsApp
              </h2>
              <p className="text-xs text-[#857d6e]">
                Formatado com negritos, marcadores e estrutura pronta para catálogo de mensagens.
              </p>
            </div>
            <button
              onClick={() => handleCopy(catalogText, 'catalog-full')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg gold-gradient-bg text-[#0A0A0A] font-bold text-xs cursor-pointer"
            >
              {copiedKey === 'catalog-full' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedKey === 'catalog-full' ? 'Copiado!' : 'Copiar Catálogo'}
            </button>
          </div>

          <pre className="bg-[#0d0d0d] p-5 rounded-xl text-xs text-[#d0c5af] font-mono whitespace-pre-wrap border border-[#222] leading-relaxed max-h-96 overflow-y-auto">
            {catalogText}
          </pre>
        </div>
      )}

      {/* Tab 3: Respostas Rápidas */}
      {activeTab === 'quick-answers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              q: 'Qual o prazo de conclusão?',
              a: `O curso de ${selectedProduct.name} é ${selectedProduct.completionDeadline}. Como é 100% online, você dita o seu próprio ritmo de estudo!`
            },
            {
              q: 'O certificado é aceito em todo o Brasil?',
              a: `Sim! O certificado é emitido pela ${brandKit.name}, empresa credenciada e atuante desde 2015. Válido em todo o território nacional.`
            },
            {
              q: 'Como posso pagar?',
              a: `Aceitamos Pix com liberação imediata, Cartão de Crédito em até ${selectedProduct.installments || '12 vezes'} e Boleto bancário.`
            },
            {
              q: 'Preciso ter computador para estudar?',
              a: `Não! Nossa plataforma é 100% compatível com celulares, tablets e notebooks. Você pode estudar de onde estiver.`
            },
            {
              q: 'Tem suporte para tirar dúvidas?',
              a: `Sim! Você conta com nossa equipe de suporte pedagógico e técnico durante todo o período de acesso ao curso.`
            },
            {
              q: 'Como recebo meu acesso após o pagamento?',
              a: `O acesso é liberado imediatamente no seu WhatsApp e e-mail assim que o pagamento é aprovado!`
            }
          ].map((item, idx) => (
            <div key={idx} className="studio-card rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#f2ca50]">{item.q}</h4>
                <button
                  onClick={() => handleCopy(item.a, `quick-${idx}`)}
                  className="p-1 rounded bg-[#222] text-[#857d6e] hover:text-[#f2ca50] cursor-pointer"
                >
                  {copiedKey === `quick-${idx}` ? <Check className="w-3.5 h-3.5 text-[#7ee787]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-[#a09885] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Follow-up */}
      {activeTab === 'followup' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: 'Follow-up 24 Horas',
              badge: 'Dia seguinte',
              msg: `Oi! Passando para saber se ficou com alguma dúvida sobre o curso de *${selectedProduct.name}*. Conseguiu dar uma olhada nas condições? Estou por aqui para te ajudar a iniciar!`
            },
            {
              title: 'Follow-up 3 Dias',
              badge: 'Urgência',
              msg: `Olá! Lembra que conversamos sobre o curso de *${selectedProduct.name}*? Nossas vagas com valor promocional de R$ ${selectedProduct.promoPrice ? selectedProduct.promoPrice.toFixed(2) : '249,90'} encerram em breve. Quer que eu garanta a sua?`
            },
            {
              title: 'Follow-up 7 Dias',
              badge: 'Última chamada',
              msg: `Olá! Passando para te desejar uma excelente semana. Caso ainda tenha interesse em turbinar seu currículo com *${selectedProduct.name}*, me dá um alô por aqui que verifico uma condição especial para você!`
            }
          ].map((f, i) => (
            <div key={i} className="studio-card rounded-xl p-5 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-[#e5e2e1] font-heading">{f.title}</h3>
                  <span className="text-[10px] bg-[#222] text-[#f2ca50] px-2 py-0.5 rounded font-mono font-bold">{f.badge}</span>
                </div>
                <pre className="bg-[#0d0d0d] p-3.5 rounded-lg text-xs text-[#d0c5af] font-mono whitespace-pre-wrap border border-[#222] leading-relaxed">
                  {f.msg}
                </pre>
              </div>

              <div className="pt-3 border-t border-[#222] flex items-center justify-between">
                <button
                  onClick={() => handleCopy(f.msg, `f-${i}`)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#f2ca50] hover:underline cursor-pointer"
                >
                  {copiedKey === `f-${i}` ? <Check className="w-3.5 h-3.5 text-[#7ee787]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === `f-${i}` ? 'Copiado!' : 'Copiar Mensagem'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
