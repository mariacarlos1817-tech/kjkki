export type CourseModality = 'Online (EAD)' | 'Presencial' | 'Híbrido';
export type LegalStatus = 'APROVADO' | 'PENDENTE DE REVISÃO' | 'DESATUALIZADO';

export interface SyllabusModule {
  id: string;
  title: string;
  description: string;
  lessonsCount?: number;
}

export interface ObjectionItem {
  id: string;
  objection: string;
  response: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  codeSKU: string;
  category: 'Cursos Especializados' | 'Formação de Trânsito' | 'Normas Regulamentadoras (NRs)' | 'Cursos Operacionais' | 'Cursos de Extensão' | 'Cursos Acadêmicos' | 'Serviços ANTT' | 'Outros';
  subcategory?: string;
  coverImage: string;
  logoUrl?: string;
  
  // Informações Básicas
  shortDescription: string;
  fullDescription: string;
  commercialSummary: string;
  targetAudience: string;
  relatedProfession: string;
  fieldOfActivity: string;
  objective: string;
  problemSolved: string;
  primaryBenefit: string;
  secondaryBenefits: string[];
  expectedResults: string[];

  // Informações do Curso
  workloadHours: number | string;
  modality: CourseModality;
  completionDeadline: string; // ex: "Em até 7 dias"
  accessPeriod: string; // ex: "60 dias"
  prerequisites: string[];
  syllabusModules: SyllabusModule[];
  certification: string;
  certificateValidity: string; // ex: "5 anos", "2 anos", "Vitalício", "[INFORMAÇÃO A DEFINIR]"
  renewalRequired: boolean;
  renewalHours?: number | string;
  conclusionRequirements: string;
  examsRequired: string; // ex: "Sim, prova presencial no DETRAN" ou "Avaliação na plataforma"
  relatedRegulatoryBodies: string[]; // DETRAN, SENATRAN, ANTT, Ministério do Trabalho
  applicableLaws: string[]; // Resolução 1020/25, Lei 12.009/2009, etc.
  legalStatus: LegalStatus;
  legalNotes?: string;

  // Informações Comerciais
  price?: number;
  promoPrice?: number;
  installments?: string; // ex: "12x de R$ 29,90"
  paymentMethods?: string[]; // Cartão, Pix, Boleto
  discount?: string;
  bonuses?: string[];
  guaranteeDays?: number;
  ctaText: string;
  purchaseUrl?: string;
  whatsappNumber?: string;
  websiteUrl?: string;

  // Marketing Intel
  primaryPainPoint: string;
  primaryDesire: string;
  promisedTransformation: string;
  keyDifferentiators: string[];
  competitorDifferences?: string;
  salesArguments: string[];
  commonObjections: ObjectionItem[];
  faqs: FAQItem[];
  testimonials: TestimonialItem[];
  jobOpportunities: string[];
  careerFields: string[];
}

export interface BrandKit {
  companyName: string;
  tradingName: string;
  slogan: string;
  cnpj: string;
  foundedYear: number;
  primaryColor: string;
  accentColor: string;
  logoUrl: string;
  negativeLogoUrl: string;
  iconUrl: string;
  fonts: {
    heading: string;
    body: string;
  };
  voiceTone: string;
  directorName: string;
  directorRole: string;
  managerName: string;
  managerRole: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  instagram: string;
  address: string;
  differentials: string[];
}

export type DestinationChannel = ChannelDestination;
export type TextLength = DescriptionLength;
export type ImageAspectRatio = '1:1' | '4:5' | '9:16' | '16:9' | '1:1 (Feed)' | '4:5 (Instagram)' | '9:16 (Stories/Reels)' | '16:9 (Banner)';
export type AdObjective = 'Vendas / Conversão' | 'Geração de Leads' | 'Engajamento' | 'Tráfego';
export type AdAngle = 'Dor' | 'Benefício' | 'Profissão' | 'Agilidade' | 'Legalidade' | 'Autoridade' | 'Oferta';

export interface AdVariation {
  angle: string;
  hook: string;
  headline: string;
  primaryText: string;
  cta: string;
}

export type ChannelDestination = 
  | 'Facebook' 
  | 'Instagram' 
  | 'WhatsApp' 
  | 'Catálogo WhatsApp' 
  | 'Site' 
  | 'Página de Vendas' 
  | 'Google' 
  | 'E-mail' 
  | 'Anúncio Meta' 
  | 'Marketplace' 
  | 'Folder' 
  | 'Portfólio' 
  | 'Apresentação Comercial' 
  | 'Banner' 
  | 'Vídeo';

export type DescriptionLength = 'micro' | 'curta' | 'media' | 'completa' | 'seo';

export type ToneOfVoice = 
  | 'Profissional'
  | 'Comercial'
  | 'Direto'
  | 'Educativo'
  | 'Institucional'
  | 'Premium'
  | 'Urgente'
  | 'Inspirador'
  | 'Autoridade'
  | 'Popular'
  | 'Informativo'
  | 'Persuasivo'
  | 'Humanizado';

export type CopyFramework = 
  | 'AIDA' 
  | 'PAS' 
  | 'BAB' 
  | '4Ps' 
  | 'Problem-Solution' 
  | 'Storytelling' 
  | 'Feature-Advantage-Benefit';

export interface GeneratedMaterial {
  id: string;
  title: string;
  category: 'Divulgação' | 'Comercial' | 'Vendas' | 'Publicidade' | 'Vídeo' | 'Prompts';
  type: string;
  productId: string;
  productName: string;
  content: string;
  metadata?: Record<string, any>;
  createdAt: string;
  isFavorite: boolean;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  productId: string;
  productName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'Ativo' | 'Concluído' | 'Rascunho';
  itemsCount: number;
  materials: GeneratedMaterial[];
  isFavorite?: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  productId: string;
  productName: string;
  objective: string;
  targetAudience: string;
  offer: string;
  startDate: string;
  endDate?: string;
  channel: string;
  tone: ToneOfVoice;
  materialsCount: number;
}

export interface Persona {
  id: string;
  name: string;
  ageRange: string;
  currentRole: string;
  targetCourseId: string;
  goal: string;
  biggestPain: string;
  objections: string[];
  buyingTrigger: string;
  preferredChannel: string;
}

export interface VideoScene {
  sceneNumber: number;
  durationSeconds: number;
  visual: string;
  action: string;
  camera: string;
  narration: string;
  textOnScreen: string;
  audioPrompt: string;
}

export interface VideoScript {
  title: string;
  hook: string;
  problem: string;
  development: string;
  benefit: string;
  offer: string;
  cta: string;
  toolTarget: 'Veo' | 'Sora' | 'Kling' | 'Runway' | 'Geral';
  scenes: VideoScene[];
}

export interface ImageCompanionTexts {
  headlineOverlay: string;
  subheadline: string;
  badgeText: string;
  socialCaption: string;
  metaAdPrimaryText: string;
  metaAdHeadline: string;
  metaAdDescription: string;
  ctaText: string;
  hashtags: string[];
}

export interface ImagePromptConcept {
  id: string;
  title: string;
  aspectRatio: '1:1' | '4:5' | '9:16' | '16:9';
  headline: string;
  cta: string;
  objective: string;
  product: string;
  audience: string;
  character: string;
  environment: string;
  vehicleOrEquipment: string;
  lighting: string;
  composition: string;
  mood: string;
  fullPrompt: string;
  negativePrompt: string;
  styleCategory?: 'Photorealistic' | 'Cinematic' | 'Studio' | 'Advertising' | 'PracticalAction';
  enginePreset?: 'Midjourney v6' | 'Flux.1' | 'DALL-E 3' | 'SDXL' | 'Imagen 3';
  companionTexts?: ImageCompanionTexts;
}

export interface SalesPageSection {
  id: string;
  sectionNumber: number;
  title: string;
  type: string;
  content: any;
  enabled: boolean;
}
