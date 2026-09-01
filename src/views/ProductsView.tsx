import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Upload, 
  Clock, 
  Award, 
  DollarSign, 
  Check, 
  X,
  FileText,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';
import { Product, LegalStatus } from '../types';

interface ProductsViewProps {
  products: Product[];
  selectedProductId: string;
  onSelectProduct: (id: string) => void;
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onNavigate: (view: string) => void;
  onOpenImport: () => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  selectedProductId,
  onSelectProduct,
  onSaveProduct,
  onDeleteProduct,
  onNavigate,
  onOpenImport
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'course' | 'commercial' | 'intel' | 'legal'>('basic');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = [
    'all',
    'Cursos Especializados',
    'Formação de Trânsito',
    'Normas Regulamentadoras (NRs)',
    'Cursos Operacionais',
    'Cursos de Extensão',
    'Cursos Acadêmicos',
    'Serviços ANTT'
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.codeSKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.relatedProfession.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleStartNew = () => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: '',
      codeSKU: `PRM-CURSO-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Cursos Especializados',
      coverImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
      shortDescription: '',
      fullDescription: '',
      commercialSummary: '',
      targetAudience: '',
      relatedProfession: '',
      fieldOfActivity: '',
      objective: '',
      problemSolved: '',
      primaryBenefit: '',
      secondaryBenefits: [
        'Estudo 100% online com flexibilidade de horários',
        'Plataforma interativa acessível no celular e PC',
        'Suporte exclusivo durante todo o curso'
      ],
      expectedResults: [
        'Certificação rápida e homologada',
        'Prontidão para o mercado de trabalho'
      ],
      workloadHours: 50,
      modality: 'Online (EAD)',
      completionDeadline: 'Em até 7 dias',
      accessPeriod: '60 dias na plataforma',
      prerequisites: ['Ser maior de 21 anos', 'CNH válida quando aplicável'],
      syllabusModules: [
        { id: 'm1', title: 'Módulo 1: Introdução e Legislação', description: 'Conceitos fundamentais e normas.', lessonsCount: 10 }
      ],
      certification: 'Certificado de Conclusão emitido pela Prime',
      certificateValidity: 'Vitalício',
      renewalRequired: true,
      conclusionRequirements: 'Conclusão de todas as aulas e aproveitamento mínimo exigido.',
      examsRequired: 'Conforme regulamentação do órgão competente.',
      relatedRegulatoryBodies: ['SENATRAN', 'DETRAN'],
      applicableLaws: ['Resoluções vigentes'],
      legalStatus: 'PENDENTE DE REVISÃO',
      price: 349.00,
      promoPrice: 249.90,
      installments: '12x de R$ 24,90',
      paymentMethods: ['Cartão', 'Pix', 'Boleto'],
      ctaText: 'Matricule-se Agora',
      primaryPainPoint: '',
      primaryDesire: '',
      promisedTransformation: '',
      keyDifferentiators: [
        'Tradição desde 2015',
        'Plataforma homologada',
        'Suporte especializado'
      ],
      salesArguments: [
        'Qualificação exigida pelo mercado.',
        'Estudo no celular com flexibilidade.'
      ],
      commonObjections: [
        { id: 'obj1', objection: 'O curso é online?', response: 'Sim, 100% online com acesso 24 horas por dia.' }
      ],
      faqs: [
        { id: 'faq1', question: 'Qual a carga horária?', answer: 'Carga horária oficial de acordo com as normas.' }
      ],
      testimonials: [],
      jobOpportunities: [],
      careerFields: []
    };
    setEditingProduct(newProd);
    setActiveTab('basic');
    setIsEditing(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setActiveTab('basic');
    setIsEditing(true);
  };

  const handleDuplicate = (product: Product) => {
    const duplicated: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      name: `${product.name} (Cópia)`,
      codeSKU: `${product.codeSKU}-CP`
    };
    onSaveProduct(duplicated);
  };

  const handleSave = () => {
    if (!editingProduct || !editingProduct.name.trim()) {
      alert('Por favor, informe ao menos o Nome do Produto/Curso.');
      return;
    }
    onSaveProduct(editingProduct);
    setIsEditing(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#e5e2e1] font-heading">
            Produtos & Cursos Cadastrados
          </h1>
          <p className="text-xs text-[#a09885] mt-1">
            Cadastre os detalhes do curso uma única vez para abastecer todas as ferramentas de IA.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-products-import-pdf"
            onClick={onOpenImport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#353535] bg-[#1a1a1a] text-xs font-semibold text-[#e5e2e1] hover:border-[#d4af37] hover:text-[#f2ca50] transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4 text-[#d4af37]" />
            Importar Portfólio / PDF
          </button>
          <button
            id="btn-products-new-course"
            onClick={handleStartNew}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg gold-gradient-bg text-[#0A0A0A] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#141414] border border-[#242424] rounded-xl p-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#857d6e]" />
          <input
            type="text"
            placeholder="Filtrar por nome, SKU ou profissão..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg studio-input text-xs text-[#e5e2e1] focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <Filter className="w-4 h-4 text-[#857d6e] shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
                  : 'bg-[#1c1c1c] text-[#857d6e] hover:text-[#e5e2e1] border border-transparent'
              }`}
            >
              {cat === 'all' ? 'Todos os Cursos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => {
          const isSelected = product.id === selectedProductId;

          return (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className={`studio-card rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                isSelected
                  ? 'border-[#d4af37] bg-[#1a1712] ring-1 ring-[#d4af37]/30 shadow-lg shadow-[#d4af37]/5'
                  : 'hover:bg-[#181818]'
              }`}
            >
              <div>
                {/* Image Cover */}
                <div className="relative h-40 w-full overflow-hidden bg-[#0d0d0d]">
                  <img
                    src={product.coverImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#0A0A0A]/80 backdrop-blur-md text-[#f2ca50] font-mono font-bold border border-[#d4af37]/30">
                      {product.codeSKU}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#0A0A0A]/80 backdrop-blur-md text-[#7ee787] font-semibold flex items-center gap-1 border border-[#2d4d2d]">
                      <ShieldCheck className="w-3 h-3" />
                      {product.legalStatus}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#d4af37] text-[#0A0A0A] font-bold">
                      {product.workloadHours}h
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] text-[#a09885] uppercase tracking-wider font-semibold">
                      {product.category}
                    </span>
                    <h3 className="text-base font-bold text-[#e5e2e1] font-heading mt-0.5 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#857d6e] line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  <div className="pt-2 border-t border-[#242424] flex items-center justify-between text-xs text-[#a09885]">
                    <span>Modalidade:</span>
                    <span className="text-[#e5e2e1] font-medium">{product.modality}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#a09885]">
                    <span>Investimento:</span>
                    <span className="text-[#f2ca50] font-bold">
                      {product.promoPrice ? `R$ ${product.promoPrice.toFixed(2)}` : 'Sob Consulta'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-[#121212] border-t border-[#222] flex items-center justify-between gap-2">
                <button
                  id={`btn-select-product-${product.id}`}
                  onClick={() => {
                    onSelectProduct(product.id);
                  }}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#d4af37]/20 text-[#f2ca50] border border-[#d4af37]/40'
                      : 'bg-[#222] text-[#e5e2e1] hover:bg-[#333]'
                  }`}
                >
                  {isSelected ? '✓ Selecionado' : 'Selecionar'}
                </button>

                <button
                  id={`btn-product-superkit-${product.id}`}
                  onClick={() => {
                    onSelectProduct(product.id);
                    onNavigate('super-kit');
                  }}
                  title="Gerar Super Kit deste curso"
                  className="p-1.5 rounded-lg bg-[#242013] border border-[#d4af37]/30 text-[#f2ca50] hover:bg-[#d4af37]/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                </button>

                <button
                  id={`btn-edit-product-${product.id}`}
                  onClick={() => handleEdit(product)}
                  title="Editar informações do curso"
                  className="p-1.5 rounded-lg bg-[#222] text-[#a09885] hover:text-[#e5e2e1] hover:bg-[#333] transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  id={`btn-duplicate-product-${product.id}`}
                  onClick={() => handleDuplicate(product)}
                  title="Duplicar curso"
                  className="p-1.5 rounded-lg bg-[#222] text-[#a09885] hover:text-[#e5e2e1] hover:bg-[#333] transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Edit / Create Modal (5 Complete Tabs matching user requirements) */}
      {isEditing && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#181818] border border-[#2d2d2d] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#2d2d2d] flex items-center justify-between bg-[#141414]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg gold-gradient-bg flex items-center justify-center text-[#0A0A0A] font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#e5e2e1] font-heading">
                    {editingProduct.id.includes('Date') ? 'Cadastrar Novo Produto / Curso' : 'Editar Informações do Curso'}
                  </h2>
                  <p className="text-xs text-[#857d6e]">
                    Preencha os dados completos para abastecer com precisão os geradores de marketing.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-lg text-[#857d6e] hover:text-[#e5e2e1] hover:bg-[#222] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tab Headers */}
            <div className="flex border-b border-[#2d2d2d] bg-[#121212] overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  activeTab === 'basic'
                    ? 'border-[#d4af37] text-[#f2ca50] bg-[#242424]/30'
                    : 'border-transparent text-[#857d6e] hover:text-[#e5e2e1]'
                }`}
              >
                1. Informações Básicas
              </button>
              <button
                onClick={() => setActiveTab('course')}
                className={`px-5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  activeTab === 'course'
                    ? 'border-[#d4af37] text-[#f2ca50] bg-[#242424]/30'
                    : 'border-transparent text-[#857d6e] hover:text-[#e5e2e1]'
                }`}
              >
                2. Detalhes do Curso
              </button>
              <button
                onClick={() => setActiveTab('commercial')}
                className={`px-5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  activeTab === 'commercial'
                    ? 'border-[#d4af37] text-[#f2ca50] bg-[#242424]/30'
                    : 'border-transparent text-[#857d6e] hover:text-[#e5e2e1]'
                }`}
              >
                3. Comercial
              </button>
              <button
                onClick={() => setActiveTab('intel')}
                className={`px-5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  activeTab === 'intel'
                    ? 'border-[#d4af37] text-[#f2ca50] bg-[#242424]/30'
                    : 'border-transparent text-[#857d6e] hover:text-[#e5e2e1]'
                }`}
              >
                4. Marketing Intel
              </button>
              <button
                onClick={() => setActiveTab('legal')}
                className={`px-5 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  activeTab === 'legal'
                    ? 'border-[#d4af37] text-[#f2ca50] bg-[#242424]/30'
                    : 'border-transparent text-[#857d6e] hover:text-[#e5e2e1]'
                }`}
              >
                5. Jurídico & Conformidade
              </button>
            </div>

            {/* Modal Body Tabs */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: BÁSICO */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#a09885] mb-1">
                          Nome do Produto / Curso *
                        </label>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          placeholder="Ex: MOPP — Movimentação de Produtos Perigosos"
                          className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#a09885] mb-1">
                            Categoria
                          </label>
                          <select
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                            className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                          >
                            <option value="Cursos Especializados">Cursos Especializados</option>
                            <option value="Formação de Trânsito">Formação de Trânsito</option>
                            <option value="Normas Regulamentadoras (NRs)">Normas Regulamentadoras (NRs)</option>
                            <option value="Cursos Operacionais">Cursos Operacionais</option>
                            <option value="Cursos de Extensão">Cursos de Extensão</option>
                            <option value="Cursos Acadêmicos">Cursos Acadêmicos</option>
                            <option value="Serviços ANTT">Serviços ANTT</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#a09885] mb-1">
                            Código / SKU
                          </label>
                          <input
                            type="text"
                            value={editingProduct.codeSKU}
                            onChange={(e) => setEditingProduct({ ...editingProduct, codeSKU: e.target.value })}
                            className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#a09885] mb-1">
                            Profissão Relacionada
                          </label>
                          <input
                            type="text"
                            value={editingProduct.relatedProfession}
                            onChange={(e) => setEditingProduct({ ...editingProduct, relatedProfession: e.target.value })}
                            placeholder="Ex: Motorista Carreteiro"
                            className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#a09885] mb-1">
                            Área de Atuação
                          </label>
                          <input
                            type="text"
                            value={editingProduct.fieldOfActivity}
                            onChange={(e) => setEditingProduct({ ...editingProduct, fieldOfActivity: e.target.value })}
                            placeholder="Ex: Transporte de Combustíveis e Química"
                            className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#a09885] mb-1">
                          Descrição Resumida (Proposta de Valor)
                        </label>
                        <textarea
                          rows={3}
                          value={editingProduct.shortDescription}
                          onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                          placeholder="Uma breve descrição da capacitação..."
                          className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                        />
                      </div>
                    </div>

                    {/* Image Box & Direct Upload */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-[#a09885]">
                          Imagem de Capa do Curso
                        </label>
                        {editingProduct.coverImage && (
                          <button
                            type="button"
                            onClick={() => setEditingProduct({ ...editingProduct, coverImage: '' })}
                            className="text-[10px] text-[#ff7b7b] hover:underline cursor-pointer"
                          >
                            Remover
                          </button>
                        )}
                      </div>

                      {/* Preview or Empty Area */}
                      <div className="relative border border-[#2d2d2d] rounded-xl overflow-hidden h-36 bg-[#0d0d0d] flex items-center justify-center group">
                        {editingProduct.coverImage ? (
                          <>
                            <img
                              src={editingProduct.coverImage}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <label className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-black text-xs font-bold cursor-pointer hover:brightness-110">
                                Trocar Imagem
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        if (ev.target?.result) {
                                          setEditingProduct({ ...editingProduct, coverImage: ev.target.result as string });
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </>
                        ) : (
                          <label className="w-full h-full flex flex-col items-center justify-center text-[#857d6e] p-4 cursor-pointer hover:bg-[#141414] transition-colors border-2 border-dashed border-[#262626] rounded-xl">
                            <Upload className="w-6 h-6 text-[#d4af37] mb-1.5 opacity-80" />
                            <span className="text-xs font-semibold text-[#e5e2e1]">Clique ou arraste uma foto</span>
                            <span className="text-[10px] text-[#6b6456] mt-0.5">PNG, JPG, WebP</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    if (ev.target?.result) {
                                      setEditingProduct({ ...editingProduct, coverImage: ev.target.result as string });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>

                      {/* URL input */}
                      <input
                        type="text"
                        value={editingProduct.coverImage}
                        onChange={(e) => setEditingProduct({ ...editingProduct, coverImage: e.target.value })}
                        placeholder="Ou cole a URL direta da imagem (https://...)"
                        className="w-full rounded-lg studio-input px-3 py-1.5 text-[11px] text-[#e5e2e1]"
                      />

                      {/* Quick Presets */}
                      <div className="pt-1">
                        <span className="text-[10px] font-semibold text-[#857d6e] block mb-1">Fotos sugeridas:</span>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { name: 'Cargas', url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=80' },
                            { name: 'Máquinas', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80' },
                            { name: 'Saúde', url: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&auto=format&fit=crop&q=80' },
                            { name: 'Escolar', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80' }
                          ].map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => setEditingProduct({ ...editingProduct, coverImage: preset.url })}
                              className="text-[10px] px-1.5 py-1 rounded bg-[#141414] hover:bg-[#222] border border-[#262626] text-[#a09885] hover:text-[#f2ca50] truncate transition-colors"
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DETALHES DO CURSO */}
              {activeTab === 'course' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Carga Horária (h)
                      </label>
                      <input
                        type="number"
                        value={editingProduct.workloadHours}
                        onChange={(e) => setEditingProduct({ ...editingProduct, workloadHours: Number(e.target.value) })}
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Modalidade
                      </label>
                      <select
                        value={editingProduct.modality}
                        onChange={(e) => setEditingProduct({ ...editingProduct, modality: e.target.value as any })}
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      >
                        <option value="Online (EAD)">Online (EAD)</option>
                        <option value="Híbrido">Híbrido</option>
                        <option value="Presencial">Presencial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Prazo de Conclusão
                      </label>
                      <input
                        type="text"
                        value={editingProduct.completionDeadline}
                        onChange={(e) => setEditingProduct({ ...editingProduct, completionDeadline: e.target.value })}
                        placeholder="Ex: Em até 7 dias"
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Certificação Emitida
                      </label>
                      <input
                        type="text"
                        value={editingProduct.certification}
                        onChange={(e) => setEditingProduct({ ...editingProduct, certification: e.target.value })}
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Validade do Certificado
                      </label>
                      <input
                        type="text"
                        value={editingProduct.certificateValidity}
                        onChange={(e) => setEditingProduct({ ...editingProduct, certificateValidity: e.target.value })}
                        placeholder="Ex: 5 anos, 2 anos, Vitalício"
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#a09885] mb-1">
                      Exames e Avaliações Exigidas
                    </label>
                    <textarea
                      rows={2}
                      value={editingProduct.examsRequired}
                      onChange={(e) => setEditingProduct({ ...editingProduct, examsRequired: e.target.value })}
                      placeholder="Ex: Prova teórica presencial no DETRAN após conclusão na plataforma..."
                      className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: COMERCIAL */}
              {activeTab === 'commercial' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Preço De (R$)
                      </label>
                      <input
                        type="number"
                        value={editingProduct.price || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        placeholder="349.00"
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Preço Por / Promocional (R$)
                      </label>
                      <input
                        type="number"
                        value={editingProduct.promoPrice || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, promoPrice: Number(e.target.value) })}
                        placeholder="249.90"
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Parcelamento
                      </label>
                      <input
                        type="text"
                        value={editingProduct.installments || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, installments: e.target.value })}
                        placeholder="Ex: 12x de R$ 24,90"
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Texto da Chamada para Ação (CTA)
                      </label>
                      <input
                        type="text"
                        value={editingProduct.ctaText}
                        onChange={(e) => setEditingProduct({ ...editingProduct, ctaText: e.target.value })}
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Garantia Incondicional (Dias)
                      </label>
                      <input
                        type="number"
                        value={editingProduct.guaranteeDays || 7}
                        onChange={(e) => setEditingProduct({ ...editingProduct, guaranteeDays: Number(e.target.value) })}
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: MARKETING INTEL */}
              {activeTab === 'intel' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#a09885] mb-1">
                      Principal Dor / Frustração do Cliente
                    </label>
                    <textarea
                      rows={2}
                      value={editingProduct.primaryPainPoint}
                      onChange={(e) => setEditingProduct({ ...editingProduct, primaryPainPoint: e.target.value })}
                      placeholder="Ex: Perda de vagas com altos salários por falta de curso na CNH..."
                      className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#a09885] mb-1">
                      Transformação Prometida
                    </label>
                    <textarea
                      rows={2}
                      value={editingProduct.promisedTransformation}
                      onChange={(e) => setEditingProduct({ ...editingProduct, promisedTransformation: e.target.value })}
                      placeholder="Ex: Conquiste sua especialização e trabalhe nas maiores transportadoras..."
                      className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#a09885] mb-1">
                      Público-Alvo Específico
                    </label>
                    <input
                      type="text"
                      value={editingProduct.targetAudience}
                      onChange={(e) => setEditingProduct({ ...editingProduct, targetAudience: e.target.value })}
                      placeholder="Ex: Motoristas com CNH B, C, D ou E maiores de 21 anos"
                      className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: JURÍDICO & CONFORMIDADE */}
              {activeTab === 'legal' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#1f1d13] border border-[#d4af37]/30 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#f2ca50] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#a09885]">
                      <strong className="text-[#f2ca50] block mb-1">Regra de Segurança Jurídica:</strong>
                      A IA utilizará estritamente as resoluções e normas cadastradas abaixo. Nunca invente dados regulatórios para manter 100% de conformidade com o DETRAN/SENATRAN/MTE.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Status de Conformidade
                      </label>
                      <select
                        value={editingProduct.legalStatus}
                        onChange={(e) => setEditingProduct({ ...editingProduct, legalStatus: e.target.value as LegalStatus })}
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      >
                        <option value="APROVADO">APROVADO (Liberado para IA)</option>
                        <option value="PENDENTE DE REVISÃO">PENDENTE DE REVISÃO</option>
                        <option value="DESATUALIZADO">DESATUALIZADO</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#a09885] mb-1">
                        Leis e Resoluções Aplicáveis
                      </label>
                      <input
                        type="text"
                        value={editingProduct.applicableLaws.join(', ')}
                        onChange={(e) => setEditingProduct({ 
                          ...editingProduct, 
                          applicableLaws: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        })}
                        placeholder="Ex: Resolução 1020/25, Resolução CONTRAN 789/20"
                        className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#a09885] mb-1">
                      Observações Legais Específicas
                    </label>
                    <textarea
                      rows={3}
                      value={editingProduct.legalNotes || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, legalNotes: e.target.value })}
                      placeholder="Ex: Validade vitalícia com atualização periódica..."
                      className="w-full rounded-lg studio-input px-3.5 py-2 text-xs text-[#e5e2e1]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#2d2d2d] bg-[#141414] flex items-center justify-between">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg border border-[#333] text-xs font-semibold text-[#857d6e] hover:text-[#e5e2e1] cursor-pointer"
              >
                Cancelar
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg gold-gradient-bg text-[#0A0A0A] text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Salvar Produto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
