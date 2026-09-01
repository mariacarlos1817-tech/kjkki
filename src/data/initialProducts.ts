import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'prod-mopp',
    name: 'MOPP — Movimentação Operacional de Produtos Perigosos',
    codeSKU: 'PRM-MOPP-01',
    category: 'Cursos Especializados',
    subcategory: 'Cursos de Trânsito Homologados',
    coverImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Capacitação especializada regulamentada para condutores que realizam transporte rodoviário de produtos perigosos.',
    fullDescription: 'O curso especializado MOPP capacita condutores profissionais para o transporte seguro de produtos perigosos, abordando legislação específica, direção defensiva, prevenção de incêndios, primeiros socorros e gerenciamento de emergências químicas e ambientais de acordo com a Resolução 1020/25 e normas do SENATRAN.',
    commercialSummary: 'Habilite-se para as melhores vagas no transporte rodoviário de cargas de alta remuneração com certificação oficial e validade reconhecida.',
    targetAudience: 'Motoristas profissionais habilitados nas categorias B, C, D ou E que desejam atuar no transporte de cargas perigosas e combustíveis.',
    relatedProfession: 'Motorista Carreteiro / Transporte de Cargas Perigosas',
    fieldOfActivity: 'Transporte Rodoviário, Logística, Indústria Química, Combustíveis e Distribuição',
    objective: 'Qualificar o condutor profissional com conhecimentos teóricos e práticos para transportar produtos perigosos com segurança e conformidade legal.',
    problemSolved: 'Exigência legal para atuação na área e necessidade de conhecimentos para prevenir acidentes graves em rodovias.',
    primaryBenefit: 'Inclusão da especialização na CNH digital para atuar legalmente em empresas de transporte e logística.',
    secondaryBenefits: [
      'Estudo 100% online com flexibilidade de horários',
      'Plataforma interativa acessível por celular, tablet ou computador',
      'Suporte exclusivo durante todo o período de estudos',
      'Apostilas digitais e simulados atualizados inclusos'
    ],
    expectedResults: [
      'Conclusão rápida em conformidade com as diretrizes do SENATRAN/DETRAN',
      'Prontidão para realizar a prova teórica exigida pelo DETRAN',
      'Abertura de oportunidades profissionais com melhores médias salariais'
    ],
    workloadHours: 50,
    modality: 'Online (EAD)',
    completionDeadline: 'Em até 7 dias',
    accessPeriod: 'Disponível na plataforma por 60 dias',
    prerequisites: [
      'Ser maior de 21 anos',
      'Possuir CNH válida nas categorias B, C, D ou E',
      'Não possuir impedimentos judiciais ou suspensão da CNH'
    ],
    syllabusModules: [
      { id: 'm1', title: 'Legislação de Trânsito e Normas Específicas', description: 'Regulamentação de produtos perigosos, documentação de transporte e sinalização.', lessonsCount: 10 },
      { id: 'm2', title: 'Direção Defensiva Aplicada ao Transporte Pesado', description: 'Técnicas de condução segura em rodovias, frenagem, curvas e condições adversas.', lessonsCount: 15 },
      { id: 'm3', title: 'Prevenção de Incêndio e Gerenciamento de Riscos', description: 'Classes de risco, simbologia, extintores e procedimentos em vazamentos.', lessonsCount: 12 },
      { id: 'm4', title: 'Primeiros Socorros e Meio Ambiente', description: 'Atendimento inicial em emergências e contenção de impacto ambiental.', lessonsCount: 13 }
    ],
    certification: 'Certificado de Conclusão de Curso Especializado emitido pela Prime',
    certificateValidity: 'Vitalício (com atualização periódica)',
    renewalRequired: true,
    renewalHours: 16,
    conclusionRequirements: 'Concluir todas as aulas na plataforma e obter aproveitamento mínimo exigido nas avaliações do curso.',
    examsRequired: 'Sim, após conclusão na plataforma o aluno solicita agendamento da prova presencial no DETRAN (exigência SENATRAN desde 28/07/2021).',
    relatedRegulatoryBodies: ['SENATRAN', 'DETRAN', 'ANTT'],
    applicableLaws: ['Resolução 1020/25', 'Resolução CONTRAN 789/20'],
    legalStatus: 'APROVADO',
    legalNotes: 'Em conformidade com a Resolução 1020/25. A prova teórica deve ser agendada junto ao DETRAN do estado de registro do condutor.',
    price: 349.00,
    promoPrice: 249.90,
    installments: '12x de R$ 24,90',
    paymentMethods: ['Cartão de Crédito', 'Pix com liberação imediata', 'Boleto Bancário'],
    discount: 'Desconto especial para pagamento à vista no Pix',
    bonuses: [
      'Simulados exclusivos para a prova do DETRAN',
      'Guia prático em PDF sobre documentação e notas fiscais de cargas perigosas',
      'Acesso ao suporte com especialistas em trânsito'
    ],
    guaranteeDays: 7,
    ctaText: 'Matricule-se Agora e Conclua em até 7 Dias',
    purchaseUrl: 'https://www.primetransito.com.br/cursos/mopp',
    whatsappNumber: '5531999999999',
    websiteUrl: 'https://www.primetransito.com.br',
    primaryPainPoint: 'Motorista sem a credencial MOPP perde vagas em transportadoras com salários elevados e fretes mais vantajosos.',
    primaryDesire: 'Conquistar a especialização com agilidade, sem perder dias de trabalho em salas presenciais.',
    promisedTransformation: 'Transforme seu perfil profissional e qualifique-se para o segmento que mais contrata motoristas qualificados no Brasil.',
    keyDifferentiators: [
      'Empresa no mercado desde 2015 com tradição e solidez',
      'Cobertura nacional e plataforma 100% online homologada',
      'Estudo no próprio ritmo pelo celular, tablet ou computador',
      'Simulados focados no formato de prova do DETRAN'
    ],
    salesArguments: [
      'O mercado de produtos perigosos paga os melhores salários para motoristas.',
      'Você pode concluir a carga horária de 50h no seu tempo livre em até 7 dias.',
      'Suporte humanizado para tirar todas as dúvidas durante a plataforma.'
    ],
    commonObjections: [
      { id: 'obj1', objection: 'O curso é realmente válido no Brasil todo?', response: 'Sim, a Prime possui cobertura nacional e o curso segue rigorosamente a Resolução 1020/25 e diretrizes do SENATRAN.' },
      { id: 'obj2', objection: 'Preciso fazer prova no DETRAN?', response: 'Sim, para cursos especializados de 50h a legislação exige agendamento de prova teórica presencial no DETRAN após conclusão na plataforma.' },
      { id: 'obj3', objection: 'Consigo estudar pelo celular?', response: 'Sim, nossa plataforma é moderna, responsiva e funciona perfeitamente no celular, tablet ou computador.' }
    ],
    faqs: [
      { id: 'faq1', question: 'Qual a carga horária do curso MOPP?', answer: 'A carga horária é de 50 horas/aula, podendo ser realizada no seu ritmo e concluída em até 7 dias.' },
      { id: 'faq2', question: 'Quais os requisitos para se matricular no MOPP?', answer: 'Ter mais de 21 anos, CNH válida nas categorias B, C, D ou E e não estar com a CNH suspensa ou cassada.' },
      { id: 'faq3', question: 'Quanto tempo tenho de acesso ao curso?', answer: 'Você tem acesso garantido por 60 dias na plataforma para revisar conteúdos e simulados.' }
    ],
    testimonials: [
      { id: 't1', name: 'Carlos Eduardo Silva', role: 'Motorista Rodoviário', company: 'Transportadora TransBrasil', quote: 'Consegui concluir no meu tempo livre entre as viagens. A plataforma é fácil de usar e os simulados me ajudaram a passar de primeira na prova!', rating: 5 },
      { id: 't2', name: 'Marcos Vinicius', role: 'Condutor de Tanque', company: 'Logística Sudeste', quote: 'Atendimento nota 10 da equipe Prime. Tirei minhas dúvidas pelo WhatsApp e o certificado foi liberado com rapidez.', rating: 5 }
    ],
    jobOpportunities: ['Transportadoras de Combustíveis', 'Distribuidoras de Gás', 'Indústria Química e Farmacêutica', 'Logística de Fertilizantes e Defensivos'],
    careerFields: ['Transporte Pesado', 'Logística Rodoviária', 'Gestão de Frotas']
  },
  {
    id: 'prod-indivisiveis',
    name: 'Cargas Indivisíveis — Curso Especializado de Transporte',
    codeSKU: 'PRM-INDIV-02',
    category: 'Cursos Especializados',
    subcategory: 'Cursos de Trânsito Homologados',
    coverImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Qualificação regulamentada para condutores no transporte de cargas pesadas com peso e dimensões excedentes.',
    fullDescription: 'Capacita o condutor profissional habilitado nas categorias C, D ou E para conduzir carretas, pranchas e veículos especiais no transporte de cargas indivisíveis (máquinas industriais, pás eólicas, vigas, transformadores) em conformidade com as resoluções do CONTRAN e normas da ANTT.',
    commercialSummary: 'Especialize-se na condução de transporte pesado e cargas superdimensionadas, um dos ramos mais valorizados das rodovias.',
    targetAudience: 'Motoristas habilitados nas categorias C, D ou E que desejam operar carretas prancha e transportes especiais de grande porte.',
    relatedProfession: 'Operador de Carreta Prancha / Motorista de Cargas Especiais',
    fieldOfActivity: 'Transporte Pesado, Construção Pesada, Energia Eólica, Mineração e Infraestrutura',
    objective: 'Preparar o condutor para o transporte seguro de cargas excedentes, com foco em rotas especiais, escolta, batedores e segurança viária.',
    problemSolved: 'Necessidade de qualificação específica exigida por lei para guiar composições com cargas indivisíveis.',
    primaryBenefit: 'Aptidão legal comprovada na CNH para contratação em frotas de transporte pesado e grandes obras.',
    secondaryBenefits: [
      '50 horas/aula 100% online',
      'Conclusão em até 7 dias',
      'Acesso garantido por 60 dias',
      'Material digital com foco em legislação e sinalização de escolta'
    ],
    expectedResults: [
      'Capacitação técnica para operar com segurança cargas de alto valor',
      'Preparação para a prova do DETRAN',
      'Destaque no currículo para transportadoras de carga especial'
    ],
    workloadHours: 50,
    modality: 'Online (EAD)',
    completionDeadline: 'Em até 7 dias',
    accessPeriod: 'Disponível na plataforma por 60 dias',
    prerequisites: [
      'Ter mais de 21 anos',
      'Possuir CNH válida nas categorias C, D ou E',
      'Sem impedimentos judiciais ou suspensão da carteira'
    ],
    syllabusModules: [
      { id: 'm1', title: 'Legislação e Normas do DNIT/ANTT para Cargas Excedentes', description: 'Autorizações Especiais de Trânsito (AET), limites de peso e dimensões.', lessonsCount: 12 },
      { id: 'm2', title: 'Direção Defensiva e Dinâmica de Veículos Especiais', description: 'Centro de gravidade, amarração de carga e frenagem de composições longas.', lessonsCount: 15 },
      { id: 'm3', title: 'Operação com Batedores e Escolta Rodoviária', description: 'Comunicação via rádio, sinalização e procedimentos em pontes e viadutos.', lessonsCount: 11 },
      { id: 'm4', title: 'Primeiros Socorros e Gerenciamento de Riscos', description: 'Condutas seguras em intercorrências rodoviárias.', lessonsCount: 12 }
    ],
    certification: 'Certificado de Curso Especializado Prime',
    certificateValidity: 'Vitalício (com atualização periódica)',
    renewalRequired: true,
    renewalHours: 16,
    conclusionRequirements: 'Concluir as 50h na plataforma e atingir aproveitamento mínimo nas avaliações.',
    examsRequired: 'Sim, após conclusão o aluno realiza a prova presencial no DETRAN de sua jurisdição.',
    relatedRegulatoryBodies: ['SENATRAN', 'DETRAN', 'ANTT', 'DNIT'],
    applicableLaws: ['Resolução 1020/25', 'Resoluções do CONTRAN'],
    legalStatus: 'APROVADO',
    price: 349.00,
    promoPrice: 249.90,
    installments: '12x de R$ 24,90',
    paymentMethods: ['Cartão', 'Pix', 'Boleto'],
    ctaText: 'Iniciar Curso de Cargas Indivisíveis',
    whatsappNumber: '5531999999999',
    websiteUrl: 'https://www.primetransito.com.br',
    primaryPainPoint: 'Falta do curso impede motoristas de assumir caminhões prancha e cargas de alto valor agregado.',
    primaryDesire: 'Obter a certificação oficial no menor tempo possível para fechar contratação imediata.',
    promisedTransformation: 'Qualifique-se para conduzir os maiores veículos de carga do país com segurança e reconhecimento.',
    keyDifferentiators: [
      'Desde 2015 capacitando motoristas de todo o Brasil',
      'Plataforma ágil e otimizada para quem vive na estrada',
      'Simulados direcionados para a aprovação no DETRAN'
    ],
    salesArguments: [
      'Empresas de energia eólica e mineração buscam constantemente profissionais com esse curso.',
      'Você estuda direto no celular durante paradas ou descanso.',
      'Certificado com validade nacional.'
    ],
    commonObjections: [
      { id: 'obj1', objection: 'Posso fazer tendo CNH C?', response: 'Sim! Condutores com categoria C, D ou E podem realizar o curso de Cargas Indivisíveis.' }
    ],
    faqs: [
      { id: 'faq1', question: 'Qual a idade mínima para o curso?', answer: 'A idade mínima é de 21 anos completos.' }
    ],
    testimonials: [
      { id: 't1', name: 'Rodrigo Medeiros', role: 'Motorista Especial', company: 'MegaCargas Log', quote: 'Excelente curso! Explica direitinho as regras de AET e sinalização de escolta.', rating: 5 }
    ],
    jobOpportunities: ['Transporte de Pás Eólicas', 'Logística de Transformadores e Turbinas', 'Transporte de Máquinas Pesadas', 'Construção Civil Pesada'],
    careerFields: ['Logística de Grande Porte', 'Transporte Rodoviário Especial']
  },
  {
    id: 'prod-escolar',
    name: 'Transporte Escolar — Curso Especializado de Condutores',
    codeSKU: 'PRM-ESC-03',
    category: 'Cursos Especializados',
    subcategory: 'Cursos de Trânsito Homologados',
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Formação obrigatória para condutores de vans, micro-ônibus e ônibus de transporte escolar.',
    fullDescription: 'Curso especializado para motoristas que realizam ou pretendem realizar o transporte de estudantes. Aborda segurança infantil, normas do CONTRAN, legislação de trânsito, primeiros socorros em ambiente escolar e direção defensiva avançada.',
    commercialSummary: 'Trabalhe com transporte escolar particular ou em frotas municipais com a qualificação oficial exigida pelo DETRAN.',
    targetAudience: 'Motoristas com CNH categoria D ou E com mais de 21 anos que desejam prestar serviços de transporte de crianças e jovens.',
    relatedProfession: 'Condutor de Transporte Escolar / Motorista de Van Escolar',
    fieldOfActivity: 'Transporte Urbano, Frotas Escolares Particulares e Transporte Escolar Público',
    objective: 'Capacitar o motorista para a condução segura e humanizada de estudantes, garantindo o cumprimento de todas as exigências legais.',
    problemSolved: 'Obrigatoriedade legal de curso especializado para obter ou renovar a autorização de transporte escolar.',
    primaryBenefit: 'Certificação exigida para inclusão da atividade remunerada de transporte de alunos na CNH.',
    secondaryBenefits: [
      '50h de conteúdo em ambiente virtual intuitivo',
      'Conclusão em até 7 dias',
      'Suporte exclusivo da Prime',
      'Material focado na segurança dos passageiros e legislação escolar'
    ],
    expectedResults: [
      'Aptidão para trabalhar em prefeituras, cooperativas ou como autônomo',
      'Domínio das normas de segurança e cinto de retenção infantil',
      'Aprovação na prova teórica do DETRAN'
    ],
    workloadHours: 50,
    modality: 'Online (EAD)',
    completionDeadline: 'Em até 7 dias',
    accessPeriod: 'Disponível na plataforma por 60 dias',
    prerequisites: [
      'Ser maior de 21 anos',
      'Possuir CNH válida na categoria D ou E',
      'Não ter cometido infração gravíssima nos últimos 12 meses',
      'Não possuir impedimentos judiciais'
    ],
    syllabusModules: [
      { id: 'm1', title: 'Legislação Específica do Transporte Escolar', description: 'Normas do CTB, vistorias obrigatórias e autorizações municipais.', lessonsCount: 12 },
      { id: 'm2', title: 'Direção Defensiva e Prevenção de Acidentes', description: 'Cuidados em áreas escolares, travessias e embarque/desembarque.', lessonsCount: 14 },
      { id: 'm3', title: 'Primeiros Socorros e Cuidados com Crianças e Jovens', description: 'Engasgo, quedas, comportamento e prevenção de acidentes dentro do veículo.', lessonsCount: 12 },
      { id: 'm4', title: 'Relacionamento Interpessoal e Ética no Transporte', description: 'Comunicação com pais, alunos e escolas.', lessonsCount: 12 }
    ],
    certification: 'Certificado de Curso Especializado Prime',
    certificateValidity: 'Vitalício (com atualização periódica)',
    renewalRequired: true,
    renewalHours: 16,
    conclusionRequirements: 'Concluir todas as aulas e atingir o índice mínimo nas avaliações da plataforma.',
    examsRequired: 'Sim, prova presencial no DETRAN após conclusão do curso online.',
    relatedRegulatoryBodies: ['SENATRAN', 'DETRAN', 'Prefeituras Municipais'],
    applicableLaws: ['Resolução 1020/25', 'Código de Trânsito Brasileiro (CTB)'],
    legalStatus: 'APROVADO',
    price: 349.00,
    promoPrice: 249.90,
    installments: '12x de R$ 24,90',
    paymentMethods: ['Cartão', 'Pix', 'Boleto'],
    ctaText: 'Garantir Matrícula no Transporte Escolar',
    whatsappNumber: '5531999999999',
    websiteUrl: 'https://www.primetransito.com.br',
    primaryPainPoint: 'Sem a qualificação de transporte escolar, o motorista não consegue alvará nem aprovação na vistoria da van.',
    primaryDesire: 'Legalizar seu trabalho como transportador escolar e atender escolas e famílias com tranquilidade.',
    promisedTransformation: 'Torne-se um condutor de transporte escolar certificado e de confiança na sua cidade.',
    keyDifferentiators: [
      'Conteúdo didático focado na segurança dos alunos',
      'Flexibilidade total para estudar no seu horário',
      'Tradição desde 2015 em cursos de trânsito'
    ],
    salesArguments: [
      'O transporte escolar oferece demanda constante o ano todo.',
      'Você estuda 100% online e vai ao DETRAN apenas para a prova.',
      'Plataforma homologada e aceita em todo o território nacional.'
    ],
    commonObjections: [
      { id: 'obj1', objection: 'Posso fazer com CNH B ou C?', response: 'Não. Para transporte escolar a legislação exige CNH nas categorias D ou E e idade mínima de 21 anos.' }
    ],
    faqs: [
      { id: 'faq1', question: 'Qual a categoria da CNH necessária?', answer: 'É necessário possuir CNH categoria D ou E.' }
    ],
    testimonials: [
      { id: 't1', name: 'Ana Paula Ramos', role: 'Motorista de Van Escolar', company: 'Tia Paula Transportes', quote: 'Amei a facilidade da plataforma! Conteúdo muito claro sobre cuidados e primeiros socorros.', rating: 5 }
    ],
    jobOpportunities: ['Transporte Escolar Autônomo', 'Frotas de Escolas Particulares', 'Transporte Escolar Municipal/Prefeituras'],
    careerFields: ['Transporte de Passageiros', 'Serviços Educacionais']
  },
  {
    id: 'prod-motofrete',
    name: 'Motofrete — Curso Especializado para Motofretistas',
    codeSKU: 'PRM-MFRETE-04',
    category: 'Cursos Especializados',
    subcategory: 'Cursos de Duas Rodas Homologados',
    coverImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Curso regulamentado obrigatório pela Lei Federal 12.009/2009 para transporte remunerado de mercadorias em motocicletas.',
    fullDescription: 'Capacitação voltada para entregadores e motofretistas que realizam entregas de produtos, mercadorias, encomendas e volumes. Aborda técnicas de pilotagem defensiva, legislação de trânsito, uso de baú/grelha, primeiros socorros e gestão de riscos em vias urbanas e rodovias de acordo com a Resolução 789/20.',
    commercialSummary: 'Fique 100% regularizado para trabalhar com entregas, aplicativos e empresas de logística sem risco de apreensão ou multas.',
    targetAudience: 'Motociclistas com mais de 21 anos e pelo menos 2 anos de CNH na categoria A que realizam entregas profissionais.',
    relatedProfession: 'Motofretista / Entregador Profissional / Motoboy',
    fieldOfActivity: 'Logística Expressa, E-commerce, Delivery, Farmácias e Distribuição',
    objective: 'Capacitar o motociclista para atuar profissionalmente no transporte de mercadorias com segurança, eficiência e dentro da lei.',
    problemSolved: 'Obrigatoriedade legal do curso para exercer atividade remunerada com moto e risco de fiscalização do DETRAN.',
    primaryBenefit: 'Inclusão da atividade de Motofrete na CNH e conformidade com a Lei Federal 12.009/2009.',
    secondaryBenefits: [
      '30 horas/aula online em plataforma rápida',
      'Conclusão em 3 a 5 dias',
      'Curso vitalício na CNH',
      'Simulados para a prova teórica presencial do DETRAN'
    ],
    expectedResults: [
      'Regularização completa para cadastros prioritários em aplicativos e transportadoras',
      'Redução de acidentes e pilotagem mais segura no trânsito pesado',
      'Segurança jurídica para exercer a profissão'
    ],
    workloadHours: 30,
    modality: 'Online (EAD)',
    completionDeadline: 'Conclusão em 3 a 5 dias',
    accessPeriod: 'Disponível na plataforma por 60 dias',
    prerequisites: [
      'Ter mais de 21 anos',
      'Possuir CNH na categoria A há pelo menos 2 anos',
      'Não possuir impedimentos judiciais ou suspensão do direito de dirigir'
    ],
    syllabusModules: [
      { id: 'm1', title: 'Legislação Específica de Motofrete e Lei 12.009/09', description: 'Equipamentos obrigatórios, placa vermelha, uso do baú e capacete com refletivo.', lessonsCount: 8 },
      { id: 'm2', title: 'Pilotagem Defensiva em Vias Urbanas e Corredores', description: 'Pontos cegos de veículos pesados, aderência em pista molhada e postura corporal.', lessonsCount: 10 },
      { id: 'm3', title: 'Primeiros Socorros e Atendimento em Acidentes', description: 'Condutas imediatas, imobilização e acionamento de resgate.', lessonsCount: 6 },
      { id: 'm4', title: 'Ética, Cidadania e Gestão de Risco', description: 'Relações comerciais, respeito ao pedestre e preservação da saúde.', lessonsCount: 6 }
    ],
    certification: 'Certificado de Curso Especializado Prime',
    certificateValidity: 'Vitalício (conforme regulamentação informada)',
    renewalRequired: false,
    conclusionRequirements: 'Concluir os módulos online e obter aprovação nas avaliações do sistema.',
    examsRequired: 'Sim, prova presencial no DETRAN após conclusão (exigência vigente desde 28/06/2021).',
    relatedRegulatoryBodies: ['SENATRAN', 'DETRAN'],
    applicableLaws: ['Lei Federal 12.009/2009', 'Resolução CONTRAN 789/20', 'Resolução 1020/25'],
    legalStatus: 'APROVADO',
    legalNotes: 'Diferença fundamental: Motofrete destina-se ao transporte de cargas, mercadorias e volumes. Para transporte de pessoas, o curso é Mototáxi.',
    price: 289.00,
    promoPrice: 199.90,
    installments: '12x de R$ 19,90',
    paymentMethods: ['Cartão', 'Pix imediato', 'Boleto'],
    ctaText: 'Regularizar meu Motofrete Agora',
    whatsappNumber: '5531999999999',
    websiteUrl: 'https://www.primetransito.com.br',
    primaryPainPoint: 'Multas pesadas, pontos na carteira e bloqueio em aplicativos por falta do curso de Motofrete.',
    primaryDesire: 'Trabalhar com a moto legalizada, garantindo renda com entregas sem medo da fiscalização.',
    promisedTransformation: 'Fique 100% legalizado na sua profissão e garanta preferência nas melhores vagas e apps de entregas.',
    keyDifferentiators: [
      'Estudo no celular entre uma entrega e outra',
      'Conclusão recorde em 3 a 5 dias',
      'Plataforma homologada pela Prime desde 2015'
    ],
    salesArguments: [
      'A Lei 12.009/09 exige o curso para qualquer entrega remunerada.',
      'Com apenas 30 horas/aula você conclui rapidamente.',
      'Simulados direcionados para passar com facilidade no DETRAN.'
    ],
    commonObjections: [
      { id: 'obj1', objection: 'Qual a diferença entre Motofrete e Mototáxi?', response: 'Motofrete é exclusivo para mercadorias, cargas e encomendas. Mototáxi é para o transporte remunerado de passageiros.' },
      { id: 'obj2', objection: 'Posso fazer se tirei a CNH A ontem?', response: 'A legislação exige no mínimo 2 anos de habilitação na categoria A e idade mínima de 21 anos.' }
    ],
    faqs: [
      { id: 'faq1', question: 'Preciso de autorização da prefeitura para motofrete?', answer: 'O curso do DETRAN é a exigência estadual/nacional. Algumas cidades possuem regras complementares locais para emplacamento comercial.' }
    ],
    testimonials: [
      { id: 't1', name: 'Lucas Santana', role: 'Entregador de App', company: 'Autônomo', quote: 'Fiz no celular nas horas vagas e deu tudo certo no DETRAN. Recomendo muito a Prime!', rating: 5 }
    ],
    jobOpportunities: ['Entregador de Aplicativos', 'Frotas de E-commerce e Correios', 'Farmácias e Distribuidoras', 'Empresas de Motofrete'],
    careerFields: ['Logística Expressa', 'Entregas Urbanas']
  },
  {
    id: 'prod-empilhadeira',
    name: 'Operador de Empilhadeira — NR 11 e Segurança Operacional',
    codeSKU: 'PRM-EMP-05',
    category: 'Cursos Operacionais',
    subcategory: 'Máquinas e Equipamentos Logísticos',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Capacitação técnica para operação segura de empilhadeiras a combustão e elétricas conforme a Norma Regulamentadora NR 11.',
    fullDescription: 'Formação para operadores de empilhadeiras, abrangendo movimentação de paletes, estabilidade mecânica, triângulo de estabilidade, capacidade de carga, inspeção diária (check-list), normas de segurança do Ministério do Trabalho e procedimentos de prevenção de tombamentos em centros logísticos e indústrias.',
    commercialSummary: 'Um dos cursos mais requisitados da indústria e logística. Conquiste seu certificado para concorrer a vagas de operador em todo o Brasil.',
    targetAudience: 'Profissionais que desejam atuar como operadores de empilhadeira em centros de distribuição, armazéns, indústrias e supermercados.',
    relatedProfession: 'Operador de Empilhadeira / Operador Logístico',
    fieldOfActivity: 'Centros de Distribuição, Armazenagem, Indústria Automotiva, Alimentícia e Portos',
    objective: 'Capacitar o operador com conhecimentos técnicos de segurança, mecânica básica e movimentação de cargas para prevenção de acidentes industriais.',
    problemSolved: 'Exigência da NR 11 do Ministério do Trabalho de treinamento certificado para operar equipamentos de transporte motorizado.',
    primaryBenefit: 'Certificado de capacitação profissional em conformidade com a NR 11 aceito por indústrias e operadores logísticos.',
    secondaryBenefits: [
      'Conteúdo didático com animações 3D de operação',
      'Abordagem de empilhadeiras elétricas e a combustão (GLP/Diesel)',
      'Check-list diário de segurança incluso para download',
      'Certificado digital com verificação de autenticidade'
    ],
    expectedResults: [
      'Compreensão profunda das regras de segurança e limites de carga',
      'Destaque em seleções de emprego do setor logístico',
      'Redução de avarias e acidentes de trabalho'
    ],
    workloadHours: 20,
    modality: 'Online (EAD)',
    completionDeadline: 'Em até 5 dias',
    accessPeriod: 'Acesso garantido por 60 dias',
    prerequisites: [
      'Ensino Fundamental completo recomendável',
      'Idade mínima de 18 anos',
      'Desejável CNH (B ou superior) para ambientes mistos com veículos'
    ],
    syllabusModules: [
      { id: 'm1', title: 'Norma Regulamentadora NR 11 e Legislação Trabalhista', description: 'Responsabilidades do operador, direitos e deveres na movimentação de materiais.', lessonsCount: 6 },
      { id: 'm2', title: 'Mecânica, Componentes e Princípios Físicos', description: 'Triângulo de estabilidade, capacidade nominal, centro de gravidade e alavanca.', lessonsCount: 8 },
      { id: 'm3', title: 'Técnicas de Operação, Empilhamento e Circulação', description: 'Velocidade em corredores, cruzamentos, rampas, pisos irregulares e elevação segura.', lessonsCount: 8 },
      { id: 'm4', title: 'Inspeção Diária (Check-list) e Manutenção Preventiva', description: 'Níveis de óleo, bateria, garfos, correntes, torre e pneus.', lessonsCount: 6 }
    ],
    certification: 'Certificado de Capacitação Profissional NR 11 Prime',
    certificateValidity: '1 ano (conforme periodicidade informada para NR 11)',
    renewalRequired: true,
    renewalHours: 8,
    conclusionRequirements: 'Assistir a todas as aulas e atingir nota mínima de 70% na avaliação teórica da plataforma.',
    examsRequired: 'Avaliação teórica na própria plataforma Prime.',
    relatedRegulatoryBodies: ['Ministério do Trabalho e Emprego (MTE)'],
    applicableLaws: ['Portaria 3.214/78 do MTE', 'Norma Regulamentadora NR 11'],
    legalStatus: 'APROVADO',
    legalNotes: 'A aceitação para admissão em empresas segue as diretrizes da NR 11 e requisitos do empregador.',
    price: 249.00,
    promoPrice: 179.90,
    installments: '12x de R$ 17,90',
    paymentMethods: ['Cartão', 'Pix', 'Boleto'],
    ctaText: 'Quero me Tornar Operador de Empilhadeira',
    whatsappNumber: '5531999999999',
    websiteUrl: 'https://www.primetransito.com.br',
    primaryPainPoint: 'Profissionais sem certificado de NR 11 não passam na triagem de RH de indústrias e operadores logísticos.',
    primaryDesire: 'Conquistar uma profissão estável com alta demanda em galpões e indústrias de todo o país.',
    promisedTransformation: 'Aprenda os princípios de operação segura e conquiste seu certificado para disputar as melhores vagas de operador.',
    keyDifferentiators: [
      'Empresa especialista em capacitação profissional desde 2015',
      'Plataforma interativa com estudos de caso de segurança',
      'Certificado com QR Code de autenticidade imediata'
    ],
    salesArguments: [
      'Centros de distribuição em todo o Brasil contratam operadores de empilhadeira diariamente.',
      'Curso rápido de 20 horas que cabe no seu bolso e no seu horário.',
      'Certificado emitido de acordo com a NR 11.'
    ],
    commonObjections: [
      { id: 'obj1', objection: 'O curso é válido para trabalhar em empresas?', response: 'Sim, nosso certificado é emitido em conformidade com as diretrizes da NR 11 do Ministério do Trabalho.' }
    ],
    faqs: [
      { id: 'faq1', question: 'Preciso ter CNH para fazer o curso?', answer: 'Para o curso não é obrigatório, mas ter CNH é um diferencial valorizado pelas empresas contratantes.' }
    ],
    testimonials: [
      { id: 't1', name: 'Gabriel Oliveira', role: 'Operador de CD', company: 'Galpão Logístico SP', quote: 'Apresentei o certificado na entrevista e consegui a vaga na mesma semana!', rating: 5 }
    ],
    jobOpportunities: ['Centros de Distribuição (Mercado Livre, Amazon, etc.)', 'Indústrias Metalúrgicas e Químicas', 'Supermercados Atacadistas', 'Portos e Terminais Retroportuários'],
    careerFields: ['Logística Interna', 'Operação de Máquinas']
  },
  {
    id: 'prod-nr35',
    name: 'NR 35 — Segurança no Trabalho em Altura',
    codeSKU: 'PRM-NR35-06',
    category: 'Normas Regulamentadoras (NRs)',
    subcategory: 'Segurança Ocupacional',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Treinamento obrigatório para atividades executadas acima de 2 metros do nível inferior com risco de queda.',
    fullDescription: 'Capacitação essencial em NR 35 para trabalhadores e encarregados que atuam em altura. Abrange Análise de Risco (AR), Permissão de Trabalho (PT), sistemas de proteção contra quedas (SPCQ), seleção e inspeção de EPIs/EPCs, nós e amarrações, condutas de emergência e primeiros socorros.',
    commercialSummary: 'Treinamento indispensável e obrigatório para construção civil, manutenção predial, telecomunicações e energia.',
    targetAudience: 'Eletricistas, pedreiros, montadores de andaimes, técnicos de telecomunicações, pintores e profissionais de manutenção predial/industrial.',
    relatedProfession: 'Técnico de Manutenção / Instalador / Montador Industrial',
    fieldOfActivity: 'Construção Civil, Telecomunicações, Energia Solar, Manutenção Industrial e Limpeza de Fachadas',
    objective: 'Garantir a integridade física do trabalhador por meio de procedimentos seguros e controle de riscos em trabalhos em altura.',
    problemSolved: 'Obrigatoriedade legal do Ministério do Trabalho para acesso a canteiros de obras e fábricas.',
    primaryBenefit: 'Certificado homologado em conformidade com as diretrizes do Ministério do Trabalho para admissão imediata.',
    secondaryBenefits: [
      'Material rico com ilustrações de pontos de ancoragem e talabartes',
      'Procedimentos de resgate e plano de emergência explicados passo a passo',
      'Certificado com validade de 2 anos',
      'Acesso imediato após confirmação do pagamento'
    ],
    expectedResults: [
      'Cumprimento rigoroso da NR 35 para liberação de trabalho',
      'Conscientização total contra quedas e uso correto de EPIs',
      'Entrada liberada em obras e auditorias de segurança'
    ],
    workloadHours: 8,
    modality: 'Online (EAD)',
    completionDeadline: 'Em até 2 dias',
    accessPeriod: 'Acesso garantido por 60 dias',
    prerequisites: [
      'Idade mínima de 18 anos',
      'Aptidão médica ocupacional para trabalho em altura (ASO)'
    ],
    syllabusModules: [
      { id: 'm1', title: 'Normas e Regulamentos Aplicáveis ao Trabalho em Altura', description: 'Diretrizes da NR 35, responsabilidades do empregador e empregado.', lessonsCount: 4 },
      { id: 'm2', title: 'Análise de Risco (AR) e Condições Impeditivas', description: 'Vento, chuva, proximidade de redes elétricas e iluminação.', lessonsCount: 6 },
      { id: 'm3', title: 'Sistemas de Proteção Contra Quedas (EPIs e Ancoragens)', description: 'Cinto tipo paraquedista, talabarte duplo, trava-quedas e linhas de vida.', lessonsCount: 8 },
      { id: 'm4', title: 'Condutas em Emergências e Primeiros Socorros', description: 'Síndrome da suspensão inerte, resgate básico e primeiros atendimentos.', lessonsCount: 4 }
    ],
    certification: 'Certificado de Capacitação NR 35 Prime',
    certificateValidity: '2 anos (conforme informado na base Prime)',
    renewalRequired: true,
    renewalHours: 8,
    conclusionRequirements: 'Completar o conteúdo na plataforma e obter aprovação no teste teórico.',
    examsRequired: 'Avaliação teórica na plataforma Prime.',
    relatedRegulatoryBodies: ['Ministério do Trabalho e Emprego (MTE)'],
    applicableLaws: ['Portaria MTE NR 35', 'Portaria 3.214/78'],
    legalStatus: 'APROVADO',
    price: 189.00,
    promoPrice: 139.90,
    installments: '12x de R$ 13,90',
    paymentMethods: ['Pix', 'Cartão', 'Boleto'],
    ctaText: 'Matricular no Treinamento NR 35',
    whatsappNumber: '5531999999999',
    websiteUrl: 'https://www.primetransito.com.br',
    primaryPainPoint: 'Sem a reciclagem ou curso de NR 35, o técnico é barrado na portaria da obra ou cliente.',
    primaryDesire: 'Obter o certificado regularizado rapidamente para não perder o dia de trabalho ou serviço.',
    promisedTransformation: 'Fique 100% regularizado com a NR 35 e trabalhe com total segurança e conformidade legal.',
    keyDifferentiators: [
      'Emissão ágil do certificado após aprovação',
      'Conteúdo objetivo focado na prevenção real de acidentes',
      'Suporte técnico de excelência desde 2015'
    ],
    salesArguments: [
      'Qualquer serviço acima de 2 metros exige obrigatoriamente a NR 35.',
      'Conclua em poucas horas no seu computador ou celular.',
      'Certificado aceito em empresas de todo o território nacional.'
    ],
    commonObjections: [
      { id: 'obj1', objection: 'Qual a validade do certificado de NR 35?', response: 'Conforme a norma, a validade do treinamento é de 2 anos, devendo ser renovado após esse período.' }
    ],
    faqs: [
      { id: 'faq1', question: 'Qual a carga horária mínima?', answer: 'A carga horária é de 8 horas/aula para capacitação inicial.' }
    ],
    testimonials: [
      { id: 't1', name: 'Leandro Castro', role: 'Técnico de Energia Solar', company: 'Soltech Painéis', quote: 'Plataforma excelente, fiz a noite e no dia seguinte já estava com o certificado em mãos para apresentar na empresa.', rating: 5 }
    ],
    jobOpportunities: ['Instalação de Painéis Solares', 'Telecomunicações e Fibra Óptica', 'Construção Civil e Reformas', 'Manutenção Industrial'],
    careerFields: ['Segurança do Trabalho', 'Construção e Montagem']
  },
  {
    id: 'prod-escavadeira',
    name: 'Operador de Escavadeira Hidráulica — Máquinas Pesadas',
    codeSKU: 'PRM-ESC-07',
    category: 'Cursos Operacionais',
    subcategory: 'Linha Amarela / Terraplanagem',
    coverImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Qualificação profissional para operação e segurança de escavadeiras hidráulicas em terraplanagem e mineração.',
    fullDescription: 'Curso preparatório para operadores de escavadeiras hidráulicas de esteiras e rodas. Abrange comandos de joysticks, hidráulica básica, posicionamento seguro em taludes, valas e trincheiras, escavação, carregamento de caminhões basculantes, NR 11, NR 12 e NR 18.',
    commercialSummary: 'Formação para uma das máquinas mais valorizadas da construção pesada, mineração e agronegócio com excelentes ganhos salariais.',
    targetAudience: 'Profissionais que buscam qualificação para operar escavadeiras hidráulicas em obras de infraestrutura, mineração, saneamento e agronegócio.',
    relatedProfession: 'Operador de Escavadeira Hidráulica / Operador de Máquinas Pesadas',
    fieldOfActivity: 'Terraplanagem, Mineração, Construção de Rodovias, Saneamento e Agronegócio',
    objective: 'Capacitar o operador no manuseio seguro, procedimentos de terraplanagem, escavação e manutenção preventiva de escavadeiras.',
    problemSolved: 'Escassez de mão de obra qualificada com noções sólidas de segurança em obras pesadas.',
    primaryBenefit: 'Certificado de capacitação técnica reconhecido para contratação em construtoras e mineradoras.',
    secondaryBenefits: [
      'Guia de comandos dos joysticks (padrão ISO e SAE)',
      'Técnicas de segurança em taludes e estabilização de encostas',
      'Check-list diário de inspeção da máquina',
      'Certificado com QR Code de autenticação'
    ],
    expectedResults: [
      'Domínio dos procedimentos operacionais e normas de segurança',
      'Competência para disputar vagas de operador inicial em obras',
      'Redução de quebras de equipamento e custos de manutenção'
    ],
    workloadHours: 40,
    modality: 'Online (EAD)',
    completionDeadline: 'Em até 7 dias',
    accessPeriod: 'Disponível por 60 dias',
    prerequisites: [
      'Idade mínima de 18 anos',
      'Ensino Fundamental recomendável',
      'Desejável CNH C, D ou E para locomoção em vias públicas'
    ],
    syllabusModules: [
      { id: 'm1', title: 'Componentes Mecânicos e Sistemas Hidráulicos', description: 'Motor diesel, bombas de pistão, cilindros, esteiras e sapatas.', lessonsCount: 10 },
      { id: 'm2', title: 'Normas de Segurança (NR 11, NR 12 e NR 18)', description: 'Distância de segurança de redes de energia, estabilidade em taludes e valas.', lessonsCount: 10 },
      { id: 'm3', title: 'Técnicas de Escavação, Nivelamento e Carga', description: 'Ângulo de ataque da caçamba, ciclo de giro e carregamento de basculantes.', lessonsCount: 12 },
      { id: 'm4', title: 'Manutenção Preventiva e Inspeção Diária', description: 'Engraxamento de pinos, filtros, nível de óleo hidráulico e tensão das esteiras.', lessonsCount: 8 }
    ],
    certification: 'Certificado de Operador de Escavadeira Hidráulica Prime',
    certificateValidity: 'Validade de acordo com as normas da empresa/MTE',
    renewalRequired: false,
    conclusionRequirements: 'Concluir todas as aulas e atingir nota mínima nas avaliações do curso.',
    examsRequired: 'Avaliação teórica na plataforma Prime.',
    relatedRegulatoryBodies: ['Ministério do Trabalho e Emprego (MTE)'],
    applicableLaws: ['NR 11', 'NR 12', 'NR 18'],
    legalStatus: 'APROVADO',
    legalNotes: 'A aceitação e exigência de prática supervisionada em campo segue os critérios de contratação de cada empregador.',
    price: 349.00,
    promoPrice: 249.90,
    installments: '12x de R$ 24,90',
    paymentMethods: ['Cartão', 'Pix', 'Boleto'],
    ctaText: 'Quero Ser Operador de Escavadeira',
    whatsappNumber: '5531999999999',
    websiteUrl: 'https://www.primetransito.com.br',
    primaryPainPoint: 'Vagas de operador de máquinas exigem certificado e conhecimentos de segurança que o candidato não possui.',
    primaryDesire: 'Conquistar uma qualificação técnica de peso para trabalhar em grandes obras e mineradoras.',
    promisedTransformation: 'Aprenda as regras de operação e segurança das máquinas amarelas e impulsione sua carreira na construção pesada.',
    keyDifferentiators: [
      'Metodologia desenvolvida por especialistas em trânsito e máquinas desde 2015',
      'Aulas práticas em vídeo e esquemas detalhados de operação',
      'Certificado com validade em todo o território nacional'
    ],
    salesArguments: [
      'A mineração e o agronegócio pagam excelentes salários para operadores de escavadeira.',
      'Você estuda no seu horário sem sair de casa.',
      'Empresa séria com mais de uma década de mercado.'
    ],
    commonObjections: [
      { id: 'obj1', objection: 'O certificado é aceito em empresas de mineração?', response: 'Sim, nosso certificado atesta a capacitação teórica nas normas de segurança NR 11, NR 12 e NR 18 exigidas pelas empresas.' }
    ],
    faqs: [
      { id: 'faq1', question: 'Qual a carga horária do curso?', answer: 'A carga horária é de 40 horas/aula.' }
    ],
    testimonials: [
      { id: 't1', name: 'Jonas Ferreira', role: 'Operador de Máquinas', company: 'Construtora Vale', quote: 'Muito completo! Mostra todos os ângulos de escavação e os cuidados fundamentais com a estabilidade da máquina.', rating: 5 }
    ],
    jobOpportunities: ['Mineradoras e Pedreiras', 'Construtoras de Rodovias e Barragens', 'Obras de Saneamento e Drenagem', 'Agronegócio e Abertura de Açudes'],
    careerFields: ['Construção Pesada', 'Mineração', 'Terraplanagem']
  },
  {
    id: 'prod-direcao-defensiva',
    name: 'Direção Defensiva & Percepção de Risco — Curso de Extensão',
    codeSKU: 'PRM-DEF-08',
    category: 'Cursos de Extensão',
    subcategory: 'Capacitação Profissional de Trânsito',
    coverImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Treinamento focado em prevenção de acidentes, antecipação de riscos e direção econômica para frotistas.',
    fullDescription: 'Curso de aperfeiçoamento para motoristas particulares, frotistas e profissionais de transporte. Apresenta técnicas modernas para antecipar perigos, evitar colisões, lidar com condições adversas de pista, clima e tráfego, além de fundamentos de condução econômica para redução de custos com combustível e manutenção.',
    commercialSummary: 'Capacitação ideal para empresas que buscam reduzir acidentes e custos operacionais de suas frotas.',
    targetAudience: 'Motoristas corporativos, condutores de frotas leves e pesadas, motoristas de aplicativos e condutores que buscam aprimoramento.',
    relatedProfession: 'Motorista Corporativo / Condutor Profissional',
    fieldOfActivity: 'Frotas Corporativas, Empresas de Transporte, Serviços e Logística',
    objective: 'Desenvolver a consciência preventiva do condutor, reduzindo índices de sinistros e promovendo um trânsito mais seguro.',
    problemSolved: 'Altos custos com combustível, desgaste prematuro de veículos e índices elevados de acidentes em frotas.',
    primaryBenefit: 'Certificado de extensão profissional que valoriza o currículo e atende exigências de segurança corporativa.',
    secondaryBenefits: [
      '20 horas de conteúdo focado em situações reais de trânsito',
      'Técnicas de direção econômica para economizar até 15% de combustível',
      'Estudo 100% online em qualquer dispositivo',
      'Certificado digital instantâneo'
    ],
    expectedResults: [
      'Redução drástica de multas e acidentes de trânsito',
      'Economia de pneus, freios e consumo de combustível',
      'Melhoria na pontuação e no perfil de seguro do condutor'
    ],
    workloadHours: 20,
    modality: 'Online (EAD)',
    completionDeadline: 'Em até 4 dias',
    accessPeriod: 'Acesso garantido por 60 dias',
    prerequisites: [
      'Possuir CNH válida em qualquer categoria (A, B, C, D ou E)'
    ],
    syllabusModules: [
      { id: 'm1', title: 'Conceitos e Elementos da Direção Defensiva', description: 'Conhecimento, atenção, previsão, decisão e habilidade ao volante.', lessonsCount: 5 },
      { id: 'm2', title: 'Condições Adversas e Prevenção de Colisões', description: 'Chuva, neblina, noite, pista molhada (aquaplanagem) e ultrapassagens seguras.', lessonsCount: 6 },
      { id: 'm3', title: 'Percepção de Risco e Tomada de Decisão Rápida', description: 'Pontos cegos, distância de seguimento e reação a pedestres e ciclistas.', lessonsCount: 5 },
      { id: 'm4', title: 'Direção Econômica e Preservação do Veículo', description: 'Uso correto da faixa de rotação, marchas, frenagem suave e manutenção básica.', lessonsCount: 4 }
    ],
    certification: 'Certificado de Curso de Extensão em Direção Defensiva Prime',
    certificateValidity: 'Vitalício / Recomendada atualização anual pelas empresas',
    renewalRequired: false,
    conclusionRequirements: 'Concluir todos os módulos e avaliações do curso.',
    examsRequired: 'Avaliação teórica na plataforma Prime.',
    relatedRegulatoryBodies: ['SENATRAN', 'DETRAN'],
    applicableLaws: ['Código de Trânsito Brasileiro (CTB)'],
    legalStatus: 'APROVADO',
    price: 149.00,
    promoPrice: 99.90,
    installments: '10x de R$ 11,90',
    paymentMethods: ['Pix', 'Cartão', 'Boleto'],
    ctaText: 'Fazer Curso de Direção Defensiva',
    whatsappNumber: '5531999999999',
    websiteUrl: 'https://www.primetransito.com.br',
    primaryPainPoint: 'Motoristas desatentos geram prejuízos com colisões, multas e alto consumo de combustível.',
    primaryDesire: 'Tornar-se um condutor exemplar, seguro e valorizado pelas empresas contratantes.',
    promisedTransformation: 'Domine técnicas avançadas para antecipar perigos e dirigir com máxima segurança e economia.',
    keyDifferentiators: [
      'Desenvolvido por pós-graduados em gestão e planejamento de trânsito',
      'Didática prática e objetiva focada na realidade brasileira',
      'Tradição e excelência desde 2015'
    ],
    salesArguments: [
      'Empresas exigem direção defensiva no processo seletivo de motoristas.',
      'Curso rápido, acessível e 100% online.',
      'Certificado válido em todo o Brasil.'
    ],
    commonObjections: [
      { id: 'obj1', objection: 'Serve para quem tem CNH B?', response: 'Sim, o curso de Direção Defensiva é aberto para todas as categorias de CNH (A, B, C, D e E).' }
    ],
    faqs: [
      { id: 'faq1', question: 'O curso tem validade?', answer: 'O certificado é emitido como extensão profissional e não expira, mas recomendamos reciclagem bienal.' }
    ],
    testimonials: [
      { id: 't1', name: 'Marcelo Rezende', role: 'Motorista Executivo', company: 'Frota Prime', quote: 'Muito bom! Aprendi técnicas de frenagem e posicionamento que uso todo dia.', rating: 5 }
    ],
    jobOpportunities: ['Frotas de Empresas', 'Motoristas de Diretoria e Executivos', 'Transporte de Cargas Leves', 'Aplicativos de Mobilidade'],
    careerFields: ['Transporte Corporativo', 'Gestão de Frotas']
  }
];
