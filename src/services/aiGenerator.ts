import { Product, BrandKit, ChannelDestination, DescriptionLength, ToneOfVoice, VideoScript, ImagePromptConcept, CopyFramework, ImageCompanionTexts } from '../types';

export class AIGeneratorService {
  /**
   * Helper to format pricing strictly according to registered data
   */
  private static formatPrice(product: Product): string {
    if (product.promoPrice) {
      return `R$ ${product.promoPrice.toFixed(2).replace('.', ',')} (ou ${product.installments || 'parcelado'})`;
    }
    if (product.price) {
      return `R$ ${product.price.toFixed(2).replace('.', ',')} (ou ${product.installments || 'parcelado'})`;
    }
    return '[Condições comerciais e valores sob consulta com a equipe]';
  }

  /**
   * Generates tailored course descriptions across 15+ channels & 5 length profiles
   */
  static generateDescription(
    product: Product,
    brandKit: BrandKit,
    channel: ChannelDestination,
    length: DescriptionLength = 'media',
    tone: ToneOfVoice = 'Comercial'
  ): string {
    const priceText = this.formatPrice(product);
    const benefitsList = product.secondaryBenefits.map(b => `• ${b}`).join('\n');
    const legalNotice = product.applicableLaws.length > 0 ? `Conforme ${product.applicableLaws.join(' e ')}.` : '';

    // Tone modifiers
    let tonePrefix = '';
    if (tone === 'Urgente') tonePrefix = '🚨 VAGAS LIMITADAS PARA A PRÓXIMA TURMA! ';
    if (tone === 'Autoridade') tonePrefix = '🎓 CERTIFICAÇÃO PROFISSIONAL RECONHECIDA: ';
    if (tone === 'Premium') tonePrefix = '✨ EXCELÊNCIA EM CAPACITAÇÃO: ';
    if (tone === 'Inspirador') tonePrefix = '🚀 DÊ O PRÓXIMO PASSO NA SUA CARREIRA: ';

    if (length === 'micro') {
      return `${tonePrefix}${product.name}: ${product.shortDescription} Curso ${product.modality} com ${product.workloadHours}h de carga horária.`;
    }

    if (length === 'curta') {
      return `${tonePrefix}Qualifique-se com o curso de ${product.name}. Capacitação ${product.modality} com ${product.workloadHours} horas/aula e conclusão rápida em ${product.completionDeadline}. Ideal para quem busca oportunidades em ${product.fieldOfActivity}. Garanta sua certificação com a ${brandKit.tradingName}!`;
    }

    if (length === 'seo') {
      return `[TAG SEO - META TITLE]
Curso ${product.name} Online (${product.workloadHours}h) - Certificado ${brandKit.tradingName}

[META DESCRIPTION]
Matricule-se no curso de ${product.name} 100% online. Carga horária de ${product.workloadHours}h, conclusão em ${product.completionDeadline}. ${legalNotice} Estude pelo celular com suporte exclusivo.

[H1 HEADLINE]
Curso Profissional de ${product.name} — ${product.workloadHours}h Online

[KEYWORDS PRINCIPAIS]
curso ${product.name.toLowerCase()}, ${product.category.toLowerCase()}, ${product.relatedProfession.toLowerCase()}, certificado ${product.workloadHours}h, curso online trânsito e máquinas, ${brandKit.tradingName.toLowerCase()}

[RESUMO ESTRUTURADO PARA BUSCADORES]
• Modalidade: ${product.modality}
• Carga Horária: ${product.workloadHours} horas/aula
• Prazo de Conclusão: ${product.completionDeadline}
• Acesso: ${product.accessPeriod}
• Certificação: ${product.certification}
• Pré-requisitos: ${product.prerequisites.join('; ')}`;
    }

    // Specific Channel Formatting
    switch (channel) {
      case 'WhatsApp':
      case 'Catálogo WhatsApp':
        return `*${product.name.toUpperCase()}* 🚀
_${product.shortDescription}_

📚 *Sobre a Capacitação:*
${product.commercialSummary}

🎯 *Para quem é indicado:*
${product.targetAudience}

✅ *Principais Vantagens:*
${benefitsList}

⏱ *Carga Horária:* ${product.workloadHours}h
💻 *Modalidade:* ${product.modality} (${product.completionDeadline})
📜 *Certificação:* ${product.certification} (${product.certificateValidity})
${product.prerequisites.length > 0 ? `📋 *Pré-requisitos:* ${product.prerequisites.join(', ')}` : ''}

💰 *Investimento:* ${priceText}
${product.discount ? `🎁 *Condição Especial:* ${product.discount}` : ''}

👉 *Como iniciar agora:*
Envie uma mensagem aqui para liberar seu acesso imediato na plataforma ou acesse: ${product.purchaseUrl || brandKit.website}`;

      case 'Instagram':
      case 'Facebook':
        return `${tonePrefix}Você já conhece a especialização em *${product.name}*? 🚛⚡

${product.commercialSummary}

${product.primaryPainPoint ? `❌ O mercado não aceita mais amadores ou condutores desatualizados.\n` : ''}
✅ Com o curso da *${brandKit.tradingName}*, você conquista:
${benefitsList}

📌 *Detalhes do Curso:*
• Carga Horária: ${product.workloadHours} horas/aula
• Modalidade: 100% ${product.modality} (Estude no celular ou PC)
• Prazo: Conclua em ${product.completionDeadline}
• Validade: ${product.certificateValidity}
${product.applicableLaws.length > 0 ? `• Regulamentação: ${product.applicableLaws.join(', ')}` : ''}

💬 Clique no link da bio ou envie uma mensagem direta para garantir sua vaga com valor promocional!

#${product.category.replace(/[^a-zA-Z0-9]/g, '')} #PrimeTransito #CursosProfissionalizantes #MotoristaProfissional #${product.relatedProfession.replace(/[^a-zA-Z0-9]/g, '')} #Capacitacao`;

      case 'Anúncio Meta':
        return `[TEXTO PRINCIPAL DO ANÚNCIO]
${product.primaryPainPoint} 
Chegou a hora de dar um salto na sua carreira com o curso de ${product.name}!

🏆 ${product.commercialSummary}
• ${product.workloadHours} horas/aula 100% online
• Conclusão ágil em ${product.completionDeadline}
• Plataforma moderna com suporte e simulados
• ${legalNotice}

[TÍTULO / HEADLINE DO ANÚNCIO]
Curso ${product.name} Online — Certificado Rápido em ${product.completionDeadline}

[DESCRIÇÃO DO ANÚNCIO]
${priceText} • Inicie hoje mesmo pelo celular!

[BOTÃO CTA]
${product.ctaText || 'Saiba Mais / Matricular'}`;

      case 'E-mail':
        return `Assunto: [${brandKit.tradingName}] Oportunidade: Qualifique-se em ${product.name}

Olá, futuro especialista!

Você sabia que o setor de ${product.fieldOfActivity} está em busca constante de profissionais com qualificação comprovada?

A ${brandKit.tradingName} preparou para você o curso de **${product.name}**, desenvolvido para quem precisa de flexibilidade, agilidade e total conformidade com as normas oficiais.

O que você vai encontrar no curso:
${benefitsList}

Informações essenciais:
• Carga Horária: ${product.workloadHours}h (${product.modality})
• Prazo estimado de conclusão: ${product.completionDeadline}
• Acesso à plataforma: ${product.accessPeriod}
• Certificado: ${product.certification}

Investimento:
De R$ ${(product.price || 349).toFixed(2)} por apenas ${priceText}.

Clique no botão abaixo para garantir sua vaga:
👉 [QUERO ME MATRICULAR AGORA NO CURSO DE ${product.name.toUpperCase()}]

Atenciosamente,
Equipe ${brandKit.tradingName}
${brandKit.website}`;

      case 'Página de Vendas':
      case 'Portfólio':
      case 'Apresentação Comercial':
      default:
        return `## ${product.name}
**Categoria:** ${product.category} | **Código:** ${product.codeSKU}

### Proposta de Valor
${product.fullDescription}

### Objetivo e Aplicação
${product.objective}
Destinado a ${product.targetAudience}, com foco em atuação profissional em ${product.fieldOfActivity}.

### Estrutura e Diferenciais
• **Carga Horária:** ${product.workloadHours} horas/aula
• **Modalidade:** ${product.modality}
• **Tempo de Conclusão:** ${product.completionDeadline}
• **Período de Acesso:** ${product.accessPeriod}
• **Certificação:** ${product.certification} (${product.certificateValidity})
• **Pré-requisitos:** ${product.prerequisites.join('; ')}
• **Normas e Legislação:** ${product.applicableLaws.join(', ') || 'Normas regulamentares vigentes'}
• **Exames/Avaliações:** ${product.examsRequired}

### Benefícios Exclusivos
${benefitsList}

### Condições Comerciais
${priceText} ${product.discount ? `(${product.discount})` : ''}
${product.guaranteeDays ? `Garantia incondicional de ${product.guaranteeDays} dias.` : ''}

**Mais informações:** ${brandKit.website} | WhatsApp: ${brandKit.whatsapp}`;
    }
  }

  /**
   * Generates 10 distinct marketing angles/variations for Meta Ads
   */
  static generate10AdVariations(product: Product, brandKit: BrandKit) {
    const price = this.formatPrice(product);

    return [
      {
        angle: 'Focada na Dor',
        hook: 'Cansado de perder vagas de emprego por falta do curso na CNH?',
        headline: `Sem ${product.name}? Não perca mais oportunidades!`,
        primaryText: `${product.primaryPainPoint} Faça o curso de ${product.name} 100% online com a ${brandKit.tradingName} e tenha seu certificado pronto para apresentar nas melhores empresas.`,
        cta: 'Garantir Minha Vaga'
      },
      {
        angle: 'Focada no Benefício',
        hook: 'Estude onde quiser, no seu ritmo, direto pelo celular!',
        headline: `Curso ${product.name} — ${product.workloadHours}h Online com Suporte`,
        primaryText: `Conclua sua especialização em ${product.completionDeadline} com apostilas digitais e simulados atualizados. ${product.primaryBenefit}`,
        cta: 'Começar Agora'
      },
      {
        angle: 'Focada na Profissão',
        hook: `Quer se destacar como ${product.relatedProfession}?`,
        headline: `Qualificação Profissional para ${product.relatedProfession}`,
        primaryText: `As maiores empresas do ramo de ${product.fieldOfActivity} exigem qualificação comprovada. Matricule-se no curso de ${product.name} e transforme sua carreira.`,
        cta: 'Ver Detalhes do Curso'
      },
      {
        angle: 'Focada no Mercado de Trabalho',
        hook: `O mercado de ${product.fieldOfActivity} está contratando!`,
        headline: `Vagas Abertas em ${product.fieldOfActivity} — Esteja Preparado`,
        primaryText: `Profissionais com o curso de ${product.name} têm preferência imediata em processos seletivos. Garanta sua certificação com a segurança da ${brandKit.tradingName}.`,
        cta: 'Quero me Qualificar'
      },
      {
        angle: 'Focada em Oportunidade / Agilidade',
        hook: `Conclua seu curso de ${product.workloadHours}h em ${product.completionDeadline}!`,
        headline: `Agilidade e Qualidade: Curso ${product.name}`,
        primaryText: `Não perca tempo em salas de aula presenciais. Estude online pela plataforma da Prime com acesso disponível por ${product.accessPeriod}.`,
        cta: 'Aproveitar Oportunidade'
      },
      {
        angle: 'Focada na Segurança Jurídica',
        hook: 'Evite multas e fiscalizações: trabalhe 100% dentro da lei!',
        headline: `Curso Homologado em Conformidade com ${product.applicableLaws[0] || 'as Resoluções Oficiais'}`,
        primaryText: `Trabalhe com tranquilidade. O curso de ${product.name} da ${brandKit.tradingName} segue rigorosamente as diretrizes e resoluções dos órgãos reguladores.`,
        cta: 'Regularizar Minha Situação'
      },
      {
        angle: 'Focada na Autoridade da Escola',
        hook: `Mais de uma década formando profissionais em todo o Brasil!`,
        headline: `Prime Excelência em Trânsito — Tradição desde 2015`,
        primaryText: `Aprenda com quem é referência em trânsito e treinamentos profissionais. Curso de ${product.name} com suporte de pós-graduados e material de alto nível.`,
        cta: 'Conhecer a Prime'
      },
      {
        angle: 'Focada na Curiosidade',
        hook: `Você sabia que pode concluir o curso de ${product.name} pelo celular?`,
        headline: `Descubra como funciona o curso de ${product.name} EAD`,
        primaryText: `Centenas de alunos já se formaram sem sair de casa. Conheça a metodologia prática da ${brandKit.tradingName} para ${product.name}.`,
        cta: 'Descobrir Como Funciona'
      },
      {
        angle: 'Focada na Oferta / Condição Especial',
        hook: `Condição especial por tempo limitado para o curso de ${product.name}!`,
        headline: `Matrícula Promocional: ${price}`,
        primaryText: `Aproveite o valor promocional com liberação imediata da plataforma. Bônus exclusivos: simulados para teste e suporte online.`,
        cta: 'Quero o Desconto'
      },
      {
        angle: 'Focada na Quebra de Objeção',
        hook: '“Não tenho tempo para fazer curso presencial.” Nós resolvemos!',
        headline: 'Estude nos seus horários livres, onde você estiver',
        primaryText: `Nossa plataforma funciona 24 horas por dia no celular ou computador. Você estuda no seu ritmo e conclui em ${product.completionDeadline}.`,
        cta: 'Começar no Meu Ritmo'
      }
    ];
  }

  /**
   * Generates A/B Test comparisons
   */
  static generateABTest(product: Product, brandKit: BrandKit) {
    const price = this.formatPrice(product);
    return {
      versionA: {
        name: 'Versão A (Foco em Agilidade e Facilidade)',
        headline: `Curso ${product.name} 100% Online — Conclua em ${product.completionDeadline}`,
        hook: 'Estude pelo celular e tenha seu certificado homologado sem burocracia.',
        text: `Com a ${brandKit.tradingName}, você faz sua capacitação de ${product.workloadHours}h no seu próprio ritmo. Acesso liberado por ${product.accessPeriod} com simulados inclusos.`,
        cta: 'Matricule-se Online',
        imageConcept: 'Motorista ou operador sorrindo segurando celular com a tela da plataforma em ambiente profissional.'
      },
      versionB: {
        name: 'Versão B (Foco em Carreira e Salário)',
        headline: `Aumente sua Renda e Qualifique-se em ${product.name}`,
        hook: `As melhores vagas em ${product.fieldOfActivity} exigem essa especialização!`,
        text: `${product.commercialSummary} Não fique para trás no mercado. Invista no seu futuro profissional com a escola referência desde 2015. ${price}`,
        cta: 'Garantir Vaga no Mercado',
        imageConcept: 'Caminhão moderno ou máquina pesada em operação com iluminação dourada e visual de alta tecnologia.'
      },
      versionC: {
        name: 'Versão C (Foco em Legalidade e Segurança)',
        headline: `Regularize sua CNH com o Curso de ${product.name}`,
        hook: 'Trabalhe dentro das normas e evite autuações e impedimentos.',
        text: `Curso desenvolvido em total conformidade com ${product.applicableLaws.join(' e ') || 'a legislação'}. Certificado aceito em todo o Brasil.`,
        cta: 'Ficar 100% Regularizado',
        imageConcept: 'CNH com certificado digital em destaque e selo de conformidade oficial.'
      }
    };
  }

  /**
   * Generates interactive WhatsApp Seller Mode answers for specific objections
   */
  static getSellerModeResponse(product: Product, brandKit: BrandKit, situation: string): string {
    const price = this.formatPrice(product);

    switch (situation) {
      case 'preco':
        return `Olá! Tudo bem? 😊

O investimento no curso de *${product.name}* é de apenas *${price}*.

✅ *O que já está incluso no valor:*
• Acesso completo à plataforma online por ${product.accessPeriod};
• ${product.workloadHours} horas/aula com material digital completo;
• Simulados focados na sua aprovação;
• Certificado oficial de conclusão da ${brandKit.tradingName};
• Suporte humanizado para tirar todas as dúvidas.

Gostaria de garantir sua vaga com liberação imediata no Pix ou prefere parcelar no cartão?`;

      case 'online':
        return `Com certeza! O curso é *100% online (EAD)* 📱💻

Você pode estudar de onde estiver: direto pelo seu celular, tablet ou computador. 

A plataforma fica disponível 24 horas por dia, então você escolhe o melhor horário para estudar. A maioria dos nossos alunos conclui com tranquilidade em *${product.completionDeadline}*.

${product.examsRequired ? `\n📌 *Sobre avaliações:* ${product.examsRequired}` : ''}

Você prefere estudar pelo celular ou pelo computador?`;

      case 'certificado':
        return `Sim! Ao concluir as ${product.workloadHours}h e avaliações na plataforma, você recebe o *${product.certification}*.

Nossa instituição atua no mercado desde 2015, com cobertura em todo o Brasil e total conformidade com ${product.applicableLaws.join(', ') || 'as normas vigentes'}.

O certificado possui verificação de autenticidade e validade reconhecida para comprovação profissional! 🎓`;

      case 'inseguro':
        return `Compreendo perfeitamente sua preocupação! A *${brandKit.tradingName}* atua desde 2015 na formação de milhares de condutores e profissionais em todo o país.

Nosso CNPJ é ${brandKit.cnpj} e nosso curso segue rigorosamente todas as diretrizes oficiais. Além disso, nosso time de suporte acompanha você do primeiro dia até a emissão do certificado.

Se você quiser, posso te mandar um vídeo demonstrativo de como é a plataforma por dentro! O que acha?`;

      case 'vai_pensar':
        return `Sem problemas! É uma decisão importante para a sua qualificação.

Só queria te lembrar que a procura por profissionais qualificados em *${product.fieldOfActivity}* está muito alta e as condições especiais com bônus de simulados estão ativas nesta semana.

Posso reservar a sua vaga com esse valor promocional até o final do dia para você não perder?`;

      case 'achou_caro':
        return `Entendo sua posição! Mas veja como um investimento que se paga logo no primeiro trabalho:

Profissionais que possuem o curso de *${product.name}* têm acesso a fretes e vagas de emprego com remunerações muito superiores. Por apenas *${product.installments || 'parcelas acessíveis'}*, você se regulariza e abre portas em grandes empresas.

Além disso, nosso curso economiza seu tempo e despesas de deslocamento, já que é 100% online!`;

      case 'comecar_hoje':
        return `Excelente decisão! 🚀

Para começar hoje mesmo, o procedimento é muito simples:
1. Confirmamos seus dados básicos;
2. Escolhe a forma de pagamento (Pix libera na hora!);
3. Você recebe login e senha no seu WhatsApp/E-mail e já pode iniciar as aulas imediatamente.

Posso gerar o link de matrícula agora para você?`;

      default:
        return `Olá! Agradeço o contato. O curso de *${product.name}* possui ${product.workloadHours} horas/aula, modalidade 100% ${product.modality}, com conclusão em ${product.completionDeadline}. 

Qualquer dúvida sobre matrícula ou conteúdo, estou à disposição para te orientar!`;
    }
  }

  /**
   * Generates a complete 8-slide Instagram carousel
   */
  static generateCarousel(product: Product, brandKit: BrandKit) {
    return [
      {
        slide: 1,
        type: 'HOOK',
        title: 'Capa / Gancho',
        content: `O QUE NINGUÉM TE CONTOU SOBRE O CURSO DE ${product.name.toUpperCase()}... 👀`,
        subtext: 'Arraste para o lado e veja como garantir sua qualificação sem perder tempo!'
      },
      {
        slide: 2,
        type: 'PROBLEMA',
        title: 'Identificação da Dor',
        content: 'Muitos motoristas perdem grandes oportunidades de trabalho simplesmente por não estarem regularizados ou com o curso vencido.',
        subtext: 'Não deixe a falta do certificado travar sua carreira profissional.'
      },
      {
        slide: 3,
        type: 'CONTEXTO',
        title: 'Exigência do Mercado',
        content: `No setor de ${product.fieldOfActivity}, empresas exigem qualificação séria e homologada pelos órgãos reguladores.`,
        subtext: 'Segurança e profissionalismo são os pilares mais valorizados.'
      },
      {
        slide: 4,
        type: 'INFORMAÇÃO',
        title: 'Como Funciona o Curso',
        content: `Com o curso 100% online da ${brandKit.tradingName}, você estuda no seu próprio horário pelo celular ou computador.`,
        subtext: `Carga horária de ${product.workloadHours}h com conclusão em até ${product.completionDeadline}.`
      },
      {
        slide: 5,
        type: 'BENEFÍCIOS',
        title: 'Vantagens Exclusivas',
        content: `• Plataforma interativa e fácil\n• Simulados atualizados\n• Suporte exclusivo durante todo o curso\n• Acesso por ${product.accessPeriod}`,
        subtext: 'Tudo pensado para quem vive na correria do dia a dia.'
      },
      {
        slide: 6,
        type: 'CERTIFICAÇÃO',
        title: 'Garantia e Validade',
        content: `${product.certification}\n\nConformidade total com ${product.applicableLaws.join(' e ') || 'a legislação vigente'}.`,
        subtext: `Tradição e solidez da ${brandKit.tradingName} desde 2015.`
      },
      {
        slide: 7,
        type: 'OFERTA',
        title: 'Condição Especial',
        content: `Invista no seu futuro profissional por apenas ${this.formatPrice(product)}!`,
        subtext: 'Liberação imediata das aulas após confirmação.'
      },
      {
        slide: 8,
        type: 'CTA',
        title: 'Chamada para Ação',
        content: 'PRONTO PARA DAR ESSE PASSO?',
        subtext: 'Clique no link da nossa bio ou comente "EU QUERO" para receber o link de matrícula no seu direct!'
      }
    ];
  }

  /**
   * Generates a professional AI Video script with scene breakdowns for Veo/Sora/Runway
   */
  static generateVideoScript(product: Product, brandKit: BrandKit, toolTarget: 'Veo' | 'Sora' | 'Kling' | 'Runway' | 'Geral' = 'Veo'): VideoScript {
    return {
      title: `Roteiro Comercial de Alta Conversão — ${product.name}`,
      hook: `Você sabia que pode concluir o curso de ${product.name} direto pelo seu celular em poucos dias?`,
      problem: `Muitos profissionais perdem contratações em ${product.fieldOfActivity} por estarem sem o certificado obrigatório.`,
      development: `A Prime Excelência em Trânsito desenvolveu uma plataforma 100% online para você estudar no seu tempo livre, com simulados e suporte completo.`,
      benefit: `São ${product.workloadHours} horas/aula práticas e objetivas com certificado homologado e aceito em todo o Brasil.`,
      offer: `Matrícula promocional liberada hoje por apenas ${this.formatPrice(product)}.`,
      cta: `Clique no link abaixo ou envie uma mensagem no WhatsApp para começar agora mesmo!`,
      toolTarget,
      scenes: [
        {
          sceneNumber: 1,
          durationSeconds: 4,
          visual: `Plano fechado e dinâmico de um profissional em ambiente de ${product.fieldOfActivity} olhando para a câmera com determinação.`,
          action: 'O profissional segura um smartphone mostrando a plataforma Prime aberta e sorri com confiança.',
          camera: 'Gimbal suave aproximando com iluminação cinematográfica dourada e reflexos metálicos.',
          narration: `Quer se qualificar em ${product.name} sem perder dias de trabalho?`,
          textOnScreen: `CURSO ${product.name.toUpperCase()} 100% ONLINE`,
          audioPrompt: 'Batida eletrônica moderna, enérgica e profissional'
        },
        {
          sceneNumber: 2,
          durationSeconds: 5,
          visual: `Cortes rápidos mostrando caminhão moderno / máquina pesada em operação segura e motorista estudando no tablet durante pausa.`,
          action: 'Demonstração da praticidade de estudar em qualquer lugar.',
          camera: 'Travelling lateral rápido destacando a grandeza dos veículos e a facilidade do aplicativo.',
          narration: `Com a Prime, você estuda direto no seu celular e conclui a carga de ${product.workloadHours}h em até ${product.completionDeadline}!`,
          textOnScreen: `${product.workloadHours}H • CONCLUA EM ${product.completionDeadline.toUpperCase()}`,
          audioPrompt: 'Trilha sonora inspiradora com build-up'
        },
        {
          sceneNumber: 3,
          durationSeconds: 5,
          visual: `Mockup do certificado digital com selo dourado da Prime e ícones de conformidade oficial.`,
          action: 'Efeito de partículas douradas ao redor do certificado digital emitido.',
          camera: 'Zoom no certificado e no QR Code de autenticação oficial.',
          narration: `Certificação reconhecida em todo o Brasil com a tradição de quem atua desde 2015.`,
          textOnScreen: `CERTIFICADO OFICIAL • COBERTURA NACIONAL`,
          audioPrompt: 'Acordes orquestrais com peso e credibilidade'
        },
        {
          sceneNumber: 4,
          durationSeconds: 4,
          visual: `Tela final com logotipo dourado da ${brandKit.tradingName}, botão de CTA pulsante e contato de WhatsApp.`,
          action: 'Animação do botão "Matricule-se Agora" e número do WhatsApp.',
          camera: 'Plano frontal limpo estilo estúdio premium preto e dourado.',
          narration: `Não perca mais tempo. Clique no link e comece seu curso agora mesmo!`,
          textOnScreen: `CLIQUE NO LINK ABAIXO • INÍCIO IMEDIATO`,
          audioPrompt: 'Finalização sonora marcante'
        }
      ]
    };
  }

  /**
   * Generates a professional Image/Creative Prompt conforming strictly to section 39 of requirements
   */
  static generateCreativeConcept(product: Product, brandKit: BrandKit, aspectRatio: '1:1' | '4:5' | '9:16' | '16:9' = '1:1'): ImagePromptConcept {
    const isHeavyVehicle = product.category === 'Cursos Especializados' || product.category === 'Cursos Operacionais';
    const characterType = product.relatedProfession || 'Motorista profissional brasileiro';
    const vehicleEnv = isHeavyVehicle 
      ? 'Caminhão Scania/Volvo moderno ou máquina pesada em ambiente logístico/rodoviário impecável'
      : 'Ambiente profissional moderno e tecnológico com iluminação equilibrada';

    return {
      id: `concept-${Date.now()}`,
      title: `Conceito Visual Premium — ${product.name}`,
      aspectRatio,
      headline: `Curso ${product.name} Online`,
      cta: 'Matricule-se Já',
      objective: `Anúncio de alta conversão para venda do curso de ${product.name}`,
      product: product.name,
      audience: product.targetAudience,
      character: `${characterType}, 30-45 anos, expressão confiante e profissional, uniforme limpo de trabalho ou camisa polo corporativa.`,
      environment: `Rodovia brasileira moderna com asfalto perfeito ou pátio logístico industrial de alto padrão ao entardecer.`,
      vehicleOrEquipment: vehicleEnv,
      lighting: `Golden hour dramática com iluminação de recorte âmbar/dourada (#d4af37) e sombras profundas cinematográficas.`,
      composition: `Regra dos terços com o personagem à direita em primeiro plano, veículo imponente ao fundo à esquerda e espaço negativo limpo no canto superior para inserção de títulos.`,
      mood: `Autoridade, segurança, alta tecnologia, conquista profissional e prestígio.`,
      fullPrompt: `Commercial advertising photography, highly realistic, 8k resolution. Brazilian professional ${characterType} in clean corporate uniform standing confidently with arms crossed in front of a modern heavy truck/equipment on a clean highway. Epic golden hour rim lighting with warm gold and deep obsidian tones. Professional depth of field, sharp focus on subject, subtle bokeh in background. Clean negative space on top left for typography. Shot on 85mm f/1.4 lens, cinematic color grading, photorealistic textures, masterclass studio quality --ar ${aspectRatio.replace(':', ':')} --v 6.0`,
      negativePrompt: `cartoon, 3d render, illustration, low resolution, blurry, distorted hands, extra fingers, messy text, saturated neon colors, amateur photo, unnatural anatomy`
    };
  }

  /**
   * Generates a 7, 15, or 30-day Social Media Calendar
   */
  static generateContentCalendar(product: Product, brandKit: BrandKit, days: 7 | 15 | 30 = 7) {
    const calendar = [];
    const themes = [
      { type: 'Educativo', goal: 'Gerar autoridade e ensinar regra de trânsito/segurança' },
      { type: 'Comercial / Oferta', goal: 'Venda direta e chamada para matrícula' },
      { type: 'Prova Social', goal: 'Depoimento de aluno formado e conquista' },
      { type: 'Quebra de Objeção', goal: 'Explicar facilidade de estudar 100% online pelo celular' },
      { type: 'Mercado de Trabalho', goal: 'Mostrar vagas e remuneração da profissão' },
      { type: 'Dica Prática', goal: 'Checklist de segurança e prevenção de acidentes' },
      { type: 'Institucional', goal: 'Apresentar a história e excelência da Prime desde 2015' }
    ];

    for (let i = 1; i <= days; i++) {
      const theme = themes[(i - 1) % themes.length];
      calendar.push({
        day: i,
        theme: theme.type,
        goal: theme.goal,
        format: i % 3 === 0 ? 'Reels' : i % 2 === 0 ? 'Carrossel' : 'Post Estático',
        headline: `Dia ${i}: ${theme.type} — ${product.name}`,
        caption: `Post focado em ${theme.goal} para o curso de ${product.name}. Destacando ${product.workloadHours}h online e certificação oficial com a ${brandKit.tradingName}.`,
        cta: 'Clique no link da bio para garantir sua vaga!',
        suggestedImage: `Foto profissional de ${product.relatedProfession} em ação com detalhes dourados.`,
        prompt: `Professional photography of ${product.relatedProfession} working safely, warm golden lighting --ar 1:1`
      });
    }
    return calendar;
  }

  /**
   * Generates Copywriting Framework Variations (AIDA, PAS, BAB, 4Ps, etc.)
   */
  static generateCopyFramework(product: Product, brandKit: BrandKit, framework: CopyFramework) {
    const price = this.formatPrice(product);

    switch (framework) {
      case 'AIDA':
        return {
          framework: 'AIDA (Atenção, Interesse, Desejo, Ação)',
          attention: `🚨 Você sabia que a falta do curso de ${product.name} pode impedir você de assumir as melhores vagas do mercado?`,
          interest: `A ${brandKit.tradingName} oferece o curso de ${product.name} 100% online, com ${product.workloadHours}h de carga horária e conclusão em até ${product.completionDeadline}.`,
          desire: `Estude no seu próprio ritmo, pelo celular ou computador, com simulados exclusivos e suporte que já formou milhares de profissionais desde 2015. ${product.primaryBenefit}`,
          action: `👉 Clique aqui e matricule-se hoje mesmo por apenas ${price}!`
        };
      case 'PAS':
        return {
          framework: 'PAS (Problema, Agitação, Solução)',
          problem: `❌ Sem o curso de ${product.name}, você fica vulnerável a multas pesadas e perde oportunidades de emprego com altos salários.`,
          agitation: `A cada dia que passa, as empresas estão mais rigorosas na fiscalização e na exigência do certificado oficial na CNH. Deixar para depois pode custar sua vaga dos sonhos.`,
          solution: `✅ Resolva isso agora com o curso EAD da ${brandKit.tradingName}: 50h de conteúdo prático, rápido e direto ao ponto. Conclua em até ${product.completionDeadline} sem sair de casa!`
        };
      case 'BAB':
        return {
          framework: 'BAB (Before, After, Bridge)',
          before: `Antes: Insegurança na profissão, receio de fiscalizações e estagnação salarial sem a certificação exigida.`,
          after: `Depois: CNH devidamente especializada com o curso de ${product.name}, segurança jurídica e portas abertas nas maiores transportadoras e indústrias do país.`,
          bridge: `A Ponte: A plataforma 100% online da Prime Excelência em Trânsito, com acompanhamento de especialistas e certificado oficial reconhecido em todo o Brasil.`
        };
      case '4Ps':
        return {
          framework: '4Ps (Promise, Picture, Proof, Push)',
          promise: `Promessa: Conquiste sua certificação em ${product.name} em até ${product.completionDeadline} estudando no seu celular.`,
          picture: `Imagine-se assumindo novos fretes e rotas com tranquilidade e respeito na sua categoria.`,
          proof: `Prova: No mercado desde 2015 com CNPJ ${brandKit.cnpj}, mais de uma década de solidez e milhares de alunos aprovados.`,
          push: `Empurrão: Vagas promocionais por tempo limitado. Não espere a próxima oportunidade escapar, matricule-se agora!`
        };
      default:
        return {
          framework: 'Problem-Solution',
          problem: product.primaryPainPoint,
          solution: product.commercialSummary
        };
    }
  }

  /**
   * Generates the entire Promotional Kit in one unified call
   */
  static generateSuperKit(product: Product, brandKit: BrandKit) {
    return {
      productName: product.name,
      generatedAt: new Date().toISOString(),
      descriptions: {
        whatsapp: this.generateDescription(product, brandKit, 'WhatsApp', 'media'),
        instagram: this.generateDescription(product, brandKit, 'Instagram', 'media'),
        metaAds: this.generateDescription(product, brandKit, 'Anúncio Meta', 'completa'),
        salesPage: this.generateDescription(product, brandKit, 'Página de Vendas', 'completa'),
        shortBio: this.generateDescription(product, brandKit, 'Instagram', 'curta'),
        seo: this.generateDescription(product, brandKit, 'Site', 'seo')
      },
      adVariations: this.generate10AdVariations(product, brandKit),
      abTest: this.generateABTest(product, brandKit),
      whatsappSellerMode: {
        priceResponse: this.getSellerModeResponse(product, brandKit, 'preco'),
        onlineResponse: this.getSellerModeResponse(product, brandKit, 'online'),
        certificateResponse: this.getSellerModeResponse(product, brandKit, 'certificado'),
        objectionResponse: this.getSellerModeResponse(product, brandKit, 'achou_caro'),
        closingScript: this.getSellerModeResponse(product, brandKit, 'comecar_hoje')
      },
      carouselSlides: this.generateCarousel(product, brandKit),
      videoScript: this.generateVideoScript(product, brandKit),
      creativeConcept: this.generateCreativeConcept(product, brandKit),
      socialCalendar: this.generateContentCalendar(product, brandKit, 7),
      copyFrameworks: {
        aida: this.generateCopyFramework(product, brandKit, 'AIDA'),
        pas: this.generateCopyFramework(product, brandKit, 'PAS'),
        bab: this.generateCopyFramework(product, brandKit, 'BAB')
      }
    };
  }

  /**
   * Transforms one material format into another
   */
  static transformMaterial(content: string, fromType: string, toType: string, product: Product, brandKit: BrandKit): string {
    if (toType === 'WhatsApp') {
      return `*${product.name.toUpperCase()}* 📲\n\n${content.substring(0, 300)}...\n\n⏱ *Carga Horária:* ${product.workloadHours}h\n💰 *Investimento:* ${this.formatPrice(product)}\n\n👉 Envie uma mensagem para iniciar agora!`;
    }
    if (toType === 'Anúncio Meta') {
      return `[ANÚNCIO META CRIADO A PARTIR DE ${fromType.toUpperCase()}]\n\n${content}\n\n🏆 ${product.name} — ${product.workloadHours}h Online\n👉 Garanta sua vaga com a ${brandKit.tradingName}!`;
    }
    if (toType === 'Prompt de Imagem') {
      return `Photorealistic advertising banner for ${product.name}. ${product.relatedProfession} in professional pose with heavy transport context. Cinematic lighting in gold #d4af37 and black obsidian studio tones. 8k quality, sharp focus --ar 1:1`;
    }
    if (toType === 'Roteiro de Reels') {
      return `🎬 ROTEIRO REELS A PARTIR DE ${fromType.toUpperCase()}:\n\n[0-3s] GANCHO: "Você precisa ver isso antes de fazer o curso de ${product.name}!"\n[3-15s] PROBLEMA: "${content.substring(0, 150)}..."\n[15-25s] SOLUÇÃO: "Na Prime você estuda 100% online pelo celular."\n[25-30s] CTA: "Comente CURSO para receber o link com desconto!"`;
    }
    return content;
  }

  /**
   * Parses uploaded or pasted PDF text and extracts structured course metadata
   */
  static parseExtractedDocument(rawText: string): Partial<Product> {
    // Intelligent heuristic extraction based on document contents
    const lower = rawText.toLowerCase();
    
    let detectedName = 'Novo Curso Extraído de Documento';
    let detectedCategory: Product['category'] = 'Cursos Especializados';
    let detectedHours: number = 50;

    if (lower.includes('mopp') || lower.includes('produtos perigosos')) {
      detectedName = 'MOPP — Movimentação de Produtos Perigosos';
      detectedCategory = 'Cursos Especializados';
      detectedHours = 50;
    } else if (lower.includes('indivis')) {
      detectedName = 'Cargas Indivisíveis';
      detectedCategory = 'Cursos Especializados';
      detectedHours = 50;
    } else if (lower.includes('escolar')) {
      detectedName = 'Transporte Escolar';
      detectedCategory = 'Cursos Especializados';
      detectedHours = 50;
    } else if (lower.includes('motofrete') || lower.includes('motoboy')) {
      detectedName = 'Motofrete Profissional';
      detectedCategory = 'Cursos Especializados';
      detectedHours = 30;
    } else if (lower.includes('empilhadeira') || lower.includes('nr 11')) {
      detectedName = 'Operador de Empilhadeira (NR 11)';
      detectedCategory = 'Cursos Operacionais';
      detectedHours = 20;
    } else if (lower.includes('nr 35') || lower.includes('altura')) {
      detectedName = 'NR 35 — Trabalho em Altura';
      detectedCategory = 'Normas Regulamentadoras (NRs)';
      detectedHours = 8;
    }

    return {
      name: detectedName,
      codeSKU: `PRM-IMP-${Math.floor(100 + Math.random() * 900)}`,
      category: detectedCategory,
      workloadHours: detectedHours,
      modality: 'Online (EAD)',
      completionDeadline: detectedHours <= 30 ? 'Em até 3 a 5 dias' : 'Em até 7 dias',
      accessPeriod: '60 dias na plataforma',
      shortDescription: `Capacitação extraída de documento institucional referente a ${detectedName}.`,
      fullDescription: rawText.substring(0, 400) + '...',
      commercialSummary: `Treinamento homologado e estruturado para capacitação profissional no setor de ${detectedName}.`,
      targetAudience: 'Profissionais e condutores que buscam formação especializada no segmento.',
      relatedProfession: 'Profissional / Condutor Qualificado',
      fieldOfActivity: 'Transporte, Trânsito e Logística',
      objective: 'Qualificar o aluno com conhecimentos teóricos e práticos para atuação com máxima segurança e conformidade legal.',
      problemSolved: 'Exigência regulamentar e necessidade de certificação oficial para atuação.',
      primaryBenefit: 'Certificação profissional com validade reconhecida e suporte completo durante o curso.',
      secondaryBenefits: [
        'Acesso 100% online em qualquer dispositivo',
        'Material digital com simulados atualizados',
        'Suporte de especialistas desde 2015'
      ],
      expectedResults: [
        'Conclusão ágil no seu tempo livre',
        'Prontidão para testes e avaliações oficiais'
      ],
      prerequisites: ['Maior de 21 anos (para especializados) ou 18 anos', 'CNH válida quando aplicável'],
      certification: 'Certificado de Conclusão emitido pela Prime',
      certificateValidity: 'Conforme regulamentação aplicável',
      renewalRequired: true,
      conclusionRequirements: 'Concluir todas as aulas e atingir o aproveitamento mínimo.',
      examsRequired: 'Conforme a categoria do curso (DETRAN ou avaliação interna).',
      relatedRegulatoryBodies: ['SENATRAN', 'DETRAN', 'Ministério do Trabalho'],
      applicableLaws: ['Resoluções vigentes e normas regulamentadoras'],
      legalStatus: 'PENDENTE DE REVISÃO',
      legalNotes: 'Informações extraídas automaticamente via leitura de documento. Favor revisar e aprovar antes da publicação.',
      ctaText: 'Matricule-se e Comece Agora',
      salesArguments: [
        'Formação essencial para o mercado de trabalho.',
        'Metodologia prática e 100% online.'
      ],
      commonObjections: [
        { id: 'imp-obj1', objection: 'O curso é online?', response: 'Sim, a capacitação é 100% online com suporte da equipe Prime.' }
      ],
      faqs: [
        { id: 'imp-faq1', question: 'Qual a duração do acesso?', answer: 'Acesso garantido por 60 dias na plataforma.' }
      ],
      testimonials: [],
      jobOpportunities: ['Empresas de Transporte', 'Logística', 'Indústrias'],
      careerFields: ['Trânsito', 'Operações']
    };
  }

  /**
   * PDF Document parsing with full Product output
   */
  static extractProductFromPDFText(rawText: string, fileName?: string): Product {
    const partial = this.parseExtractedDocument(rawText);
    return {
      id: `prod-${Date.now()}`,
      name: partial.name || 'Novo Curso EAD',
      codeSKU: partial.codeSKU || `PRM-IMP-${Date.now().toString().slice(-4)}`,
      category: partial.category || 'Cursos Especializados',
      coverImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
      shortDescription: partial.shortDescription || 'Curso profissionalizante com certificado válido.',
      fullDescription: partial.fullDescription || rawText.slice(0, 500),
      commercialSummary: partial.commercialSummary || 'Capacitação completa e homologada.',
      targetAudience: partial.targetAudience || 'Profissionais do setor.',
      relatedProfession: partial.relatedProfession || 'Especialista',
      fieldOfActivity: partial.fieldOfActivity || 'Transporte e Logística',
      objective: partial.objective || 'Capacitar o aluno para atuação profissional imediata.',
      problemSolved: partial.problemSolved || 'Atender exigências legais e do mercado.',
      primaryBenefit: partial.primaryBenefit || 'Certificado válido em todo o Brasil.',
      secondaryBenefits: partial.secondaryBenefits || ['Acesso online 24h', 'Suporte especializado', 'Simulados oficiais'],
      expectedResults: partial.expectedResults || ['Conclusão rápida', 'Certificação válida'],
      workloadHours: partial.workloadHours || 50,
      modality: partial.modality || 'Online (EAD)',
      completionDeadline: partial.completionDeadline || 'Em até 7 dias',
      accessPeriod: partial.accessPeriod || '60 dias',
      prerequisites: partial.prerequisites || ['CNH válida'],
      syllabusModules: [
        { id: 'm1', title: 'Módulo 1: Legislação Específica e Normas Técnicas', description: 'Fundamentos e regras vigentes', lessonsCount: 6 },
        { id: 'm2', title: 'Módulo 2: Procedimentos de Segurança e Prevenção', description: 'Direção defensiva e mitigação de riscos', lessonsCount: 8 },
        { id: 'm3', title: 'Módulo 3: Primeiros Socorros e Emergências', description: 'Protocolos de atendimento', lessonsCount: 4 }
      ],
      certification: partial.certification || 'Certificado homologado Prime',
      certificateValidity: partial.certificateValidity || '5 anos',
      renewalRequired: true,
      conclusionRequirements: partial.conclusionRequirements || '100% de aproveitamento das aulas',
      examsRequired: partial.examsRequired || 'Avaliação na plataforma EAD',
      relatedRegulatoryBodies: partial.relatedRegulatoryBodies || ['SENATRAN', 'DETRAN'],
      applicableLaws: partial.applicableLaws || ['Resoluções Oficiais'],
      legalStatus: 'APROVADO',
      price: 349.00,
      promoPrice: 249.90,
      installments: '12x de R$ 24,90',
      ctaText: 'Matricule-se Agora',
      primaryPainPoint: 'Falta de qualificação formal exigida pelas empresas.',
      primaryDesire: 'Trabalhar com segurança e conquistar melhores salários.',
      promisedTransformation: 'De profissional desatualizado a especialista certificado.',
      keyDifferentiators: ['Escola desde 2015', 'Certificado Aceito em Todo Brasil', 'Suporte Humanizado'],
      salesArguments: ['Curso 100% online no celular', 'Conclusão rápida'],
      commonObjections: [
        { id: 'o1', objection: 'O curso é aceito?', response: 'Sim, certificado oficial emitido conforme legislação.' }
      ],
      faqs: [
        { id: 'f1', question: 'Como recebo o certificado?', answer: 'Digitalmente com autenticidade logo após a aprovação.' }
      ],
      testimonials: [],
      jobOpportunities: ['Transportadoras', 'Empresas de Logística'],
      careerFields: ['Transportes', 'Operações']
    };
  }

  static generateCopyFrameworks(product: Product, brandKit: BrandKit) {
    return {
      aida: this.generateCopyFramework(product, brandKit, 'AIDA') as { framework: string; attention: string; interest: string; desire: string; action: string },
      pas: this.generateCopyFramework(product, brandKit, 'PAS') as { framework: string; problem: string; agitation: string; solution: string },
      bab: this.generateCopyFramework(product, brandKit, 'BAB') as { framework: string; before: string; after: string; bridge: string }
    };
  }

  static generateImagePromptConcept(product: Product, brandKit: BrandKit, aspectRatio: any) {
    const rawAspect = typeof aspectRatio === 'string' && aspectRatio.includes('1:1') ? '1:1'
      : typeof aspectRatio === 'string' && aspectRatio.includes('4:5') ? '4:5'
      : typeof aspectRatio === 'string' && aspectRatio.includes('9:16') ? '9:16'
      : typeof aspectRatio === 'string' && aspectRatio.includes('16:9') ? '16:9'
      : '1:1';
    return this.generateCreativeConcept(product, brandKit, rawAspect as any);
  }

  static generateAdVariations(product: Product, brandKit: BrandKit) {
    return this.generate10AdVariations(product, brandKit);
  }

  static generateCarouselSlides(product: Product, brandKit: BrandKit) {
    return this.generateCarousel(product, brandKit);
  }

  static generateSocialCalendar(product: Product, brandKit: BrandKit, days?: number) {
    const d = days === 15 ? 15 : days === 30 ? 30 : 7;
    return this.generateContentCalendar(product, brandKit, d as any);
  }

  static generateMetaAd(product: Product, brandKit: BrandKit, options?: any) {
    const variations = this.generate10AdVariations(product, brandKit);
    const chosen = variations[0];
    return {
      primaryText: chosen.primaryText,
      headline: chosen.headline,
      description: `R$ ${product.promoPrice ? product.promoPrice.toFixed(2) : '249,90'} • Inicie hoje mesmo!`,
      cta: chosen.cta,
      placement: options?.placement || 'Feed do Instagram e Facebook',
      creativePrompt: `High-conversion advertising creative for ${product.name}, professional brazilian specialist in working uniform, golden rim lighting, 8k resolution --ar 1:1`
    };
  }

  /**
   * Enhances an existing image prompt with hyper-realistic photography keywords and parameters
   */
  static enhanceImagePrompt(currentPrompt: string, style: 'Photorealistic' | 'Cinematic' | 'Studio' | 'Advertising' = 'Photorealistic'): string {
    const baseClean = currentPrompt
      .replace(/--ar \d+:\d+/g, '')
      .replace(/--v \d+(\.\d+)?/g, '')
      .trim();

    let enhancement = '';
    switch (style) {
      case 'Cinematic':
        enhancement = 'Cinematic composition, shot on 35mm anamorphic lens, shallow depth of field, dramatic golden hour rim lighting, subtle film grain, atmospheric haze, color graded in warm obsidian and gold tones, ultra-detailed 8k resolution, Unreal Engine 5 render style photorealism';
        break;
      case 'Studio':
        enhancement = 'Masterclass studio commercial lighting, softbox diffusion, clean dark minimalist background, crisp textures, sharp focus, 85mm f/1.8 portrait lens, Hasselblad H6D-100c color accuracy, magazine editorial quality';
        break;
      case 'Advertising':
        enhancement = 'High-conversion commercial ad visual, strong negative space on top for typography placement, hyper-detailed textures of uniform and equipment, vibrant natural colors, professional Brazilian specialist model, inviting and trustworthy atmosphere, 8k resolution';
        break;
      case 'Photorealistic':
      default:
        enhancement = 'Award-winning photojournalistic portrait, photorealistic skin textures, accurate reflections on vehicle and glass, natural daylight with warm golden hour backlighting, shot on Sony A7R V with 85mm f/1.4 GM lens, master photography';
        break;
    }

    return `${baseClean}, ${enhancement} --ar 1:1 --v 6.0`;
  }

  /**
   * Generates a tailored Image Prompt + Companion Copy & Social Texts
   * for a specific Aspect Ratio, Course, Visual Style, and AI Engine.
   */
  static generatePromptAndTextsForRatio(
    product: Product,
    brandKit: BrandKit,
    aspectRatio: '1:1' | '4:5' | '9:16' | '16:9' = '1:1',
    style: 'Photorealistic' | 'Cinematic' | 'Studio' | 'Advertising' | 'PracticalAction' = 'Photorealistic',
    engine: 'Midjourney v6' | 'Flux.1' | 'DALL-E 3' | 'SDXL' | 'Imagen 3' = 'Midjourney v6',
    customNotes?: string
  ): ImagePromptConcept {
    const isHeavy = product.category.includes('Especializados') || product.category.includes('Operacionais');
    const vehicleDesc = isHeavy 
      ? 'caminhão rodoviário moderno Scania/Volvo de última geração' 
      : 'veículo especializado ou posto operacional moderno';
    
    const profession = product.relatedProfession || 'motorista e operador profissional';
    const priceText = product.promoPrice ? `R$ ${product.promoPrice.toFixed(2)}` : 'R$ 197,00';

    // Style descriptor
    let styleKeywords = '';
    let lightingDesc = '';
    let compositionDesc = '';

    if (aspectRatio === '1:1') {
      compositionDesc = 'Centralized high-impact commercial square composition (1:1), hero framing with balanced negative space for brand badge';
    } else if (aspectRatio === '4:5') {
      compositionDesc = 'Instagram vertical portrait (4:5) maximizing feed real-estate, upper 30% left clean for typography overlay';
    } else if (aspectRatio === '9:16') {
      compositionDesc = 'Full vertical mobile framing (9:16) for Stories/Reels, top third clear for strong hook headline, bottom third clear for swipe-up CTA';
    } else {
      compositionDesc = 'Cinematic widescreen landscape (16:9), expansive highway horizon, strong leading lines';
    }

    switch (style) {
      case 'Cinematic':
        styleKeywords = 'Shot on Arri Alexa 35mm anamorphic lens, shallow depth of field, dramatic golden hour rim lighting, subtle film grain, rich obsidian and warm gold color grade, volumetric lighting rays, ultra-realistic 8k textures';
        lightingDesc = 'Luz dourada de fim de tarde com recorte dramático e sombras suaves';
        break;
      case 'Studio':
        styleKeywords = 'Master commercial studio lighting, large softbox diffusion, sleek dark graphite background, crisp edge definition, 85mm f/1.8 portrait lens, Hasselblad H6D color fidelity, ultra-clean magazine editorial';
        lightingDesc = 'Iluminação de estúdio profissional com softbox e difusor';
        break;
      case 'Advertising':
        styleKeywords = 'High-conversion advertising creative, crystal-clear focus on subject and safety uniform, vibrant realistic colors, professional Brazilian specialist model with confident and approachable expression, 8k commercial photography';
        lightingDesc = 'Iluminação publicitária nítida e equilibrada';
        break;
      case 'PracticalAction':
        styleKeywords = 'Authentic photojournalistic documentary style, Leica SL2, showing real operation handling, natural movement, hands on steering wheel/controls with safety gear, realistic dashboard reflections, sharp natural daylight';
        lightingDesc = 'Luz natural do ambiente de trabalho em operação';
        break;
      case 'Photorealistic':
      default:
        styleKeywords = 'Master portrait photography, shot on Sony A7R V with 85mm f/1.4 GM lens, photorealistic skin pores, accurate reflections on glass and metallic surfaces, warm golden rim lighting (#d4af37), hyper-detailed 8k';
        lightingDesc = 'Golden Hour com iluminação dourada Prime (#d4af37)';
        break;
    }

    // Engine specific formatting
    let enginePrompt = '';
    const baseSubject = `Brazilian professional ${profession}, 32-45 years old, wearing clean professional corporate uniform with safety ID badge, standing proudly with confident smile near ${vehicleDesc}. Location: modern Brazilian logistics highway or modern training center. ${compositionDesc}. ${styleKeywords}`;
    
    if (customNotes) {
      enginePrompt = `${baseSubject}, ${customNotes}`;
    } else {
      enginePrompt = baseSubject;
    }

    if (engine === 'Midjourney v6') {
      enginePrompt += ` --ar ${aspectRatio} --v 6.1 --style raw --q 2`;
    } else if (engine === 'Flux.1') {
      enginePrompt = `[Flux.1 Schnell/Dev] ${enginePrompt}, photorealistic rendering, accurate anatomy, natural daylight, aspect ratio ${aspectRatio}`;
    } else if (engine === 'DALL-E 3') {
      enginePrompt = `A high-end professional commercial photograph for an educational campaign. ${enginePrompt}. Ensure no visible misspelled text inside the picture. Aspect ratio: ${aspectRatio}.`;
    } else if (engine === 'SDXL') {
      enginePrompt += ` (masterpiece, best quality, 8k, photorealistic:1.3), aspect_ratio_${aspectRatio.replace(':', '_')}`;
    }

    const negative = 'cartoon, 3d render, anime, illustration, bad anatomy, deformed hands, extra fingers, distorted face, low quality, pixelated, blurry, messy text, oversaturated neon, fake plastic look';

    const companionTexts: ImageCompanionTexts = {
      headlineOverlay: `CURSO ${product.name.toUpperCase()} 100% ONLINE`,
      subheadline: `Certificado Homologado SENATRAN • ${product.workloadHours} Horas`,
      badgeText: 'HOMOLOGADO SENATRAN',
      socialCaption: `🚨 ATENÇÃO: Quer se destacar no mercado e garantir as melhores vagas de ${profession}?\n\n🎓 Faça o curso de *${product.name}* 100% online, no seu celular ou computador, com a tradição e excelência da ${brandKit.tradingName}.\n\n✅ Homologado pelo SENATRAN\n✅ Certificado oficial válido em todo o Brasil\n✅ Início imediato sem burocracia\n✅ Pagamento facilitado em até 12x\n\n💥 Condição especial por tempo limitado: Apenas ${priceText}!\n\n👉 Toque no link da bio ou envie uma mensagem no WhatsApp para garantir sua vaga hoje mesmo!`,
      metaAdPrimaryText: `Qualifique-se como ${profession} com o curso de ${product.name} 100% online. Estude no seu horário e receba seu certificado oficial homologado pelo SENATRAN. Garanta sua vaga com desconto exclusivo!`,
      metaAdHeadline: `${product.name} • 100% Online e Homologado`,
      metaAdDescription: `Certificado válido em todo Brasil por apenas ${priceText}. Inicie hoje!`,
      ctaText: 'Matricule-se Agora',
      hashtags: [
        `#${product.name.replace(/[^a-zA-Z0-9]/g, '')}`,
        '#CursoOnline',
        '#TransporteRodoviario',
        '#MotoristaProfissional',
        '#QualificacaoProfissional',
        '#PrimeEAD',
        '#SENATRAN'
      ]
    };

    return {
      id: `prompt-${aspectRatio.replace(':', '-')}-${Date.now()}`,
      title: `${product.name} — Proporção ${aspectRatio} (${style})`,
      aspectRatio,
      headline: companionTexts.headlineOverlay,
      cta: companionTexts.ctaText,
      objective: `Criativo otimizado para ${aspectRatio === '9:16' ? 'Stories / Reels' : aspectRatio === '4:5' ? 'Feed Retrato' : aspectRatio === '1:1' ? 'Feed Quadrado' : 'Banner 16:9'}`,
      product: product.name,
      audience: product.targetAudience,
      character: `Profissional ${profession} com uniforme institucional`,
      environment: 'Rodovia moderna brasileira ou centro logístico tecnológico',
      vehicleOrEquipment: vehicleDesc,
      lighting: lightingDesc,
      composition: compositionDesc,
      mood: 'Confiança, credibilidade e alta qualificação',
      fullPrompt: enginePrompt,
      negativePrompt: negative,
      styleCategory: style,
      enginePreset: engine,
      companionTexts
    };
  }

  /**
   * Generates a rich preset library of 5 distinct prompt concepts for a course
   */
  static generateDefaultPromptLibrary(product: Product, brandKit: BrandKit): ImagePromptConcept[] {
    const isHeavy = product.category.includes('Especializados') || product.category.includes('Operacionais');
    const vehicle = isHeavy ? 'Caminhão Scania/Volvo moderno' : 'Ambiente técnico profissional moderno';
    const profession = product.relatedProfession || 'especialista';
    const priceText = product.promoPrice ? `R$ ${product.promoPrice.toFixed(2)}` : 'R$ 197,00';

    return [
      {
        id: `p-commercial-${Date.now()}-1`,
        title: 'Anúncio de Conversão Principal (Golden Hour)',
        aspectRatio: '1:1',
        headline: `Curso ${product.name} Online`,
        cta: 'Matricule-se Agora',
        objective: 'Criativo de alta conversão para Feed e Meta Ads',
        product: product.name,
        audience: product.targetAudience,
        character: `${profession}, homem de 35 anos com expressão confiante e uniforme limpo`,
        environment: 'Rodovia moderna brasileira ao entardecer ou pátio logístico',
        vehicleOrEquipment: vehicle,
        lighting: 'Golden hour dramática com recorte dourado (#d4af37) e sombras profundas',
        composition: 'Personagem em destaque à direita com espaço negativo à esquerda',
        mood: 'Autoridade, prestígio e segurança profissional',
        fullPrompt: `Commercial advertising photography, highly realistic, 8k resolution. Brazilian professional ${profession} in clean corporate uniform standing confidently with arms crossed in front of a modern heavy vehicle on a clean highway. Epic golden hour rim lighting with warm gold and deep obsidian tones. Professional depth of field, sharp focus on subject, subtle bokeh in background. Clean negative space on top left for typography. Shot on 85mm f/1.4 lens, cinematic color grading, masterclass studio quality --ar 1:1 --v 6.1`,
        negativePrompt: 'cartoon, 3d render, illustration, low resolution, blurry, distorted hands, extra fingers, messy text, saturated neon colors, amateur photo, unnatural anatomy',
        styleCategory: 'Advertising',
        enginePreset: 'Midjourney v6',
        companionTexts: {
          headlineOverlay: `CURSO ${product.name.toUpperCase()} 100% ONLINE`,
          subheadline: `Certificado Oficial • Homologado SENATRAN`,
          badgeText: 'HOMOLOGADO SENATRAN',
          socialCaption: `🚨 Quer turbinar seu currículo e conquistar as melhores oportunidades como ${profession}?\n\nGaranta sua certificação oficial em *${product.name}* com a metodologia EAD líder de aprovação no Brasil.\n\n✔️ 100% Online pelo celular\n✔️ Certificado válido em todo território nacional\n✔️ Início imediato\n\n💰 Por apenas ${priceText} em até 12x!\n\n📲 Clique no link da bio e comece hoje mesmo.`,
          metaAdPrimaryText: `Certifique-se em ${product.name} 100% online com a Prime. Curso oficial homologado pelo SENATRAN, rápido e flexível para você estudar onde e quando quiser.`,
          metaAdHeadline: `${product.name} Oficial • R$ ${product.promoPrice ? product.promoPrice.toFixed(2) : '197,00'}`,
          metaAdDescription: `Válido em todo Brasil. Inicie agora mesmo!`,
          ctaText: 'Matricule-se Já',
          hashtags: [`#${product.name.replace(/[^a-zA-Z0-9]/g, '')}`, '#PrimeCursos', '#MotoristaProfissional', '#SENATRAN']
        }
      },
      {
        id: `p-action-${Date.now()}-2`,
        title: 'Profissional em Operação Real',
        aspectRatio: '4:5',
        headline: 'Qualificação Prática Reconhecida',
        cta: 'Inicie Imediatamente',
        objective: 'Transpassar realismo e prática para Instagram Feed (4:5)',
        product: product.name,
        audience: product.targetAudience,
        character: 'Profissional qualificado em postura de inspeção ou direção segura',
        environment: 'Cabine de controle ou pista de testes com equipamentos de segurança (EPI)',
        vehicleOrEquipment: 'Painel tecnológico moderno com volante e instrumentos digitais',
        lighting: 'Luz natural suave do meio da tarde com reflexos realistas',
        composition: 'Close-up médio dinâmico em ângulo levemente inclinado (4:5)',
        mood: 'Foco, excelência técnica e competência',
        fullPrompt: `Authentic documentary photo, 8k. Brazilian specialist working with precision and safety gear during operation related to ${product.name}. Natural afternoon sunlight coming through windshield, detailed dashboard, high clarity, dynamic professional angle, genuine expression of expertise, shot on Leica SL2 --ar 4:5 --v 6.1`,
        negativePrompt: 'blurry, artificial plastic look, oversaturated, amateur framing, unrealistic proportions, bad hands, low resolution',
        styleCategory: 'PracticalAction',
        enginePreset: 'Midjourney v6',
        companionTexts: {
          headlineOverlay: `QUALIFICAÇÃO EM ${product.name.toUpperCase()}`,
          subheadline: `Aulas Práticas e Simulados Interativos`,
          badgeText: 'CERTIFICADO RECONHECIDO',
          socialCaption: `A prática e a segurança no trânsito começam com a formação certa! 🚛\n\nO curso de *${product.name}* prepara você para os desafios reais da profissão com simulados exclusivos e suporte de professores especialistas.\n\n🔒 Certificado emitido com segurança e validade nacional.\n\n👉 Aproveite o valor promocional e matricule-se agora!`,
          metaAdPrimaryText: `Mais de ${product.workloadHours} horas de capacitação prática e homologada. Torne-se uma referência em ${product.name}.`,
          metaAdHeadline: `Capacitação Prática em ${product.name}`,
          metaAdDescription: `Certificado oficial entregue direto no seu e-mail.`,
          ctaText: 'Saiba Mais',
          hashtags: ['#PraticaProfissional', '#SegurancaNoTransito', '#CursosOnline']
        }
      },
      {
        id: `p-story-${Date.now()}-3`,
        title: 'Story / Reels Vertical para Mobile (9:16)',
        aspectRatio: '9:16',
        headline: 'Certificado em até 7 Dias',
        cta: 'Arraste para Cima',
        objective: 'Conversão rápida no formato vertical para Stories e TikTok Ads',
        product: product.name,
        audience: product.targetAudience,
        character: 'Profissional segurando tablet ou celular com tela da plataforma EAD Prime',
        environment: 'Pátio empresarial com caminhões ou centro de distribuição moderno ao fundo',
        vehicleOrEquipment: 'Frotas alinhadas e organizadas',
        lighting: 'Iluminação de estúdio combinada com luz ambiente noturna/dourada',
        composition: 'Vertical 9:16 com terço superior livre para texto e terço inferior para botão',
        mood: 'Modernidade, agilidade e transformação de carreira',
        fullPrompt: `Vertical 9:16 mobile ad photo. Professional brazilian ${profession} smiling with pride holding a smartphone displaying online study app, modern transport fleet in soft bokeh background. Crisp lighting, rich warm gold accents, high-end commercial aesthetic, clean top area for headline overlay --ar 9:16 --v 6.1`,
        negativePrompt: 'low quality, blurry, dark, pixelated, distorted faces, unrealistic lighting, cluttered typography, cartoon',
        styleCategory: 'Photorealistic',
        enginePreset: 'Midjourney v6',
        companionTexts: {
          headlineOverlay: `CERTIFICADO EM ATÉ 7 DIAS`,
          subheadline: `Estude 100% pelo Celular`,
          badgeText: '100% ONLINE 24H',
          socialCaption: `📱 Estude no seu ritmo, direto do celular! Sem perder dias de serviço ou gastar com deslocamento.\n\nCurso de ${product.name} homologado pelo SENATRAN com certificado rápido e válido em todo o Brasil. Arraste ou clique no link para garantir sua vaga!`,
          metaAdPrimaryText: `Precisa renovar ou obter o curso de ${product.name}? Faça tudo 100% pelo celular com aprovação garantida.`,
          metaAdHeadline: `Curso ${product.name} no Celular`,
          metaAdDescription: `Matrículas abertas por tempo limitado.`,
          ctaText: 'Cadastre-se',
          hashtags: ['#Stories', '#Reels', '#CursoMobile']
        }
      },
      {
        id: `p-banner-${Date.now()}-4`,
        title: 'Banner Panorâmico para Site e YouTube (16:9)',
        aspectRatio: '16:9',
        headline: `Capacitação Oficial ${product.name}`,
        cta: 'Conheça o Programa Completo',
        objective: 'Banner de topo de página de vendas e portfólio',
        product: product.name,
        audience: product.targetAudience,
        character: 'Equipe de especialistas uniformizados reunidos',
        environment: 'Horizonte amplo com rodovia e estrutura logística',
        vehicleOrEquipment: 'Composição panorâmica de veículos pesados',
        lighting: 'Luz cinematográfica de pôr do sol com tons quentes',
        composition: 'Panorâmico 16:9 cinematográfico',
        mood: 'Institucional, solidez e liderança',
        fullPrompt: `Cinematic wide 16:9 landscape banner. Impressive modern commercial transport fleet on highway at sunrise, professional specialists standing proudly. Majestic golden sky with deep contrast, premium advertising photography, hyper-detailed, shot on Arri Alexa 65mm --ar 16:9 --v 6.1`,
        negativePrompt: 'low resolution, messy, fake 3d, saturated colors, bad anatomy',
        styleCategory: 'Cinematic',
        enginePreset: 'Midjourney v6',
        companionTexts: {
          headlineOverlay: `FORMAÇÃO PROFISSIONAL EXECUTIVA EM ${product.name.toUpperCase()}`,
          subheadline: `Excelência, Tecnologia e Homologação Nacional`,
          badgeText: 'RECONHECIMENTO NACIONAL',
          socialCaption: `A Prime Excelência em Trânsito é referência nacional na qualificação de especialistas do setor automotivo e rodoviário. Conheça a grade completa de ${product.name}.`,
          metaAdPrimaryText: `Lidere o setor com a qualificação mais respeitada do mercado. Conheça o curso de ${product.name}.`,
          metaAdHeadline: `Formação Líder em ${product.name}`,
          metaAdDescription: `Homologado SENATRAN. Garanta sua vaga.`,
          ctaText: 'Saiba Mais',
          hashtags: ['#Lideranca', '#PrimeExcelencia', '#TransporteBrasil']
        }
      }
    ];
  }

  /**
   * Generates a library of video scripts with multiple marketing angles
   */
  static generateDefaultVideoScripts(product: Product, brandKit: BrandKit): VideoScript[] {
    return [
      this.generateVideoScript(product, brandKit),
      {
        title: `Roteiro Viral Reels/TikTok (15s) — ${product.name}`,
        hook: `Se você trabalha com transporte e não tem ${product.name}, você tá perdendo dinheiro todo mês!`,
        problem: 'Empresas só contratam quem tem o curso homologado na CNH.',
        development: `Na ${brandKit.tradingName} você faz 100% online pelo celular e pega o certificado rápido.`,
        benefit: 'Certificado oficial e aceito em todo o Brasil.',
        offer: `Apenas ${this.formatPrice(product)} no cartão ou Pix.`,
        cta: 'Clica no link do perfil e comece hoje!',
        toolTarget: 'Veo',
        scenes: [
          {
            sceneNumber: 1,
            durationSeconds: 3,
            visual: 'Câmera em movimento rápido dando zoom no rosto de um motorista pensativo na cabine do caminhão.',
            action: 'Motorista gesticula mostrando inconformismo.',
            camera: 'Close dinâmico vertical 9:16 com corte rápido.',
            narration: 'Você ainda tá perdendo vaga boa de emprego por falta do curso certo?',
            textOnScreen: '🚨 ATENÇÃO MOTORISTAS E OPERADORES',
            audioPrompt: 'Batida dinâmica de suspense moderno'
          },
          {
            sceneNumber: 2,
            durationSeconds: 5,
            visual: 'Mão segurando smartphone com as videoaulas interativas da Prime rodando de forma fluida.',
            action: 'Demonstração da plataforma EAD funcionando 24h.',
            camera: 'Plano detalhe com luz suave e transição fluida.',
            narration: `Faça o curso de ${product.name} 100% no seu celular, no seu horário, sem perder dia de trabalho.`,
            textOnScreen: `📱 100% ONLINE NO CELULAR • 24H`,
            audioPrompt: 'Música animada e inspiradora'
          },
          {
            sceneNumber: 3,
            durationSeconds: 4,
            visual: 'Certificado oficial sendo validado digitalmente com selo de homologação dourado.',
            action: 'Selo de garantia brilhando na tela.',
            camera: 'Animação fluida e nítida.',
            narration: `Certificado válido em todo o Brasil com a tradição da Prime Excelência em Trânsito.`,
            textOnScreen: `✅ CERTIFICADO OFICIAL VÁLIDO`,
            audioPrompt: 'Som de confirmação de sucesso'
          },
          {
            sceneNumber: 4,
            durationSeconds: 3,
            visual: 'Logo da Prime com botão pulsante "MATRICULE-SE JÁ" e valor da parcela.',
            action: 'Botão de clique animado.',
            camera: 'Plano frontal com fundo preto e dourado.',
            narration: 'Clique no link da bio e garanta sua vaga agora mesmo!',
            textOnScreen: `👉 CLIQUE NO LINK DA BIO`,
            audioPrompt: 'Assinatura sonora Prime'
          }
        ]
      },
      {
        title: `Apresentação Comercial Completa (60s) — ${product.name}`,
        hook: `Quer dar o próximo passo na sua carreira com uma qualificação respeitada?`,
        problem: 'O mercado de trabalho exige especialistas certificados pelos órgãos oficiais.',
        development: `A capacitação em ${product.name} aborda segurança, legislação e procedimentos práticos.`,
        benefit: 'Tranquilidade nas fiscalizações e valorização salarial imediata.',
        offer: 'Condições facilitadas em até 12x no cartão.',
        cta: 'Fale com nossos consultores no WhatsApp.',
        toolTarget: 'Sora',
        scenes: [
          {
            sceneNumber: 1,
            durationSeconds: 10,
            visual: 'Imagens aéreas cinematográficas de rodovias e pátios industriais em pleno funcionamento.',
            action: 'Transição suave para instrutor especializado cumprimentando os alunos.',
            camera: 'Drone panorâmico 4K com descida suave.',
            narration: `O setor de transportes e operações exige cada vez mais profissionais qualificados e em dia com a legislação.`,
            textOnScreen: `${product.name.toUpperCase()} • FORMAÇÃO OFICIAL`,
            audioPrompt: 'Música corporativa e confiante'
          },
          {
            sceneNumber: 2,
            durationSeconds: 15,
            visual: 'Telas da plataforma EAD mostrando os módulos práticos e simulados interativos.',
            action: 'Navegação rápida pelas aulas e recursos multimídia.',
            camera: 'Motion graphics com mockup de computador e tablet.',
            narration: `Com o curso EAD da Prime, você aprende com especialistas, resolve simulados e estuda com total flexibilidade.`,
            textOnScreen: `AULAS DINÂMICAS • SIMULADOS OFICIAIS`,
            audioPrompt: 'Trilha envolvente e progressiva'
          },
          {
            sceneNumber: 3,
            durationSeconds: 15,
            visual: 'Profissional formado recebendo nova proposta de trabalho com sorriso no rosto.',
            action: 'Aperto de mão corporativo e postura vitoriosa.',
            camera: 'Plano médio com iluminação dourada e profundidade de campo.',
            narration: `Mais de ${product.workloadHours} horas de conteúdo homologado para você conquistar a confiança das melhores empresas.`,
            textOnScreen: `RECONHECIMENTO • MELHORES SALÁRIOS`,
            audioPrompt: 'Música de conquista e triunfo'
          },
          {
            sceneNumber: 4,
            durationSeconds: 20,
            visual: 'Cartela final de encerramento com telefones de contato, WhatsApp e chamada para ação.',
            action: 'QR code para matrícula rápida na tela.',
            camera: 'Plano frontal corporativo premium.',
            narration: `Não adie sua conquista. Inicie agora mesmo o curso de ${product.name} na Prime Excelência em Trânsito.`,
            textOnScreen: `MATRICULE-SE HOJE • WHATSAPP NO LINK`,
            audioPrompt: 'Encerramento marcante'
          }
        ]
      }
    ];
  }
}
