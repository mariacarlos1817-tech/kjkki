import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  FolderPlus, 
  Search, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  FileText, 
  Calendar, 
  Check, 
  Copy,
  Layers,
  Eye,
  X,
  MessageSquare,
  Printer,
  Download,
  Share2,
  Tag,
  Clock,
  BookOpen,
  Star,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project, GeneratedMaterial } from '../types';

interface ProjectsLibraryViewProps {
  projects: Project[];
  savedMaterials: GeneratedMaterial[];
  onToggleFavoriteMaterial?: (id: string) => void;
  onToggleFavoriteProject?: (id: string) => void;
  onDeleteProject?: (id: string) => void;
  onDeleteMaterial?: (id: string) => void;
  onNavigate: (view: string) => void;
}

export const ProjectsLibraryView: React.FC<ProjectsLibraryViewProps> = ({
  projects,
  savedMaterials,
  onToggleFavoriteMaterial,
  onToggleFavoriteProject,
  onDeleteProject,
  onDeleteMaterial,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'materials' | 'favorites'>('projects');
  const [favoritesSubTab, setFavoritesSubTab] = useState<'all' | 'materials' | 'projects'>('all');
  const [onlyFavoritesFilter, setOnlyFavoritesFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewMaterial, setPreviewMaterial] = useState<GeneratedMaterial | null>(null);
  const [modalCopied, setModalCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Keyboard shortcut: ESC to close preview modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewMaterial) {
        setPreviewMaterial(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewMaterial]);

  // Keep previewMaterial synced with latest isFavorite state
  const currentPreview = previewMaterial 
    ? savedMaterials.find(m => m.id === previewMaterial.id) || previewMaterial
    : null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2200);
  };

  const handleToggleFavMat = (mat: GeneratedMaterial, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onToggleFavoriteMaterial) {
      onToggleFavoriteMaterial(mat.id);
      showToast(mat.isFavorite ? `Removido dos favoritos: ${mat.title}` : `⭐ Favoritado com sucesso: ${mat.title}`);
    }
  };

  const handleToggleFavProj = (proj: Project, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onToggleFavoriteProject) {
      onToggleFavoriteProject(proj.id);
      showToast(proj.isFavorite ? `Removido dos favoritos: ${proj.name}` : `⭐ Projeto favoritado: ${proj.name}`);
    }
  };

  const favoriteMaterials = savedMaterials.filter(m => m.isFavorite);
  const favoriteProjects = projects.filter(p => p.isFavorite);
  const totalFavoritesCount = favoriteMaterials.length + favoriteProjects.length;

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFav = onlyFavoritesFilter ? p.isFavorite : true;
    return matchesSearch && matchesFav;
  });

  const filteredMaterials = savedMaterials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (m.category && m.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (m.type && m.type.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFav = onlyFavoritesFilter ? m.isFavorite : true;
    return matchesSearch && matchesFav;
  });

  const filteredFavMaterials = favoriteMaterials.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.category && m.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (m.type && m.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFavProjects = favoriteProjects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyMaterial = (mat: GeneratedMaterial, isFromModal = false) => {
    navigator.clipboard.writeText(mat.content);
    if (isFromModal) {
      setModalCopied(true);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      setTimeout(() => setModalCopied(false), 2000);
    } else {
      setCopiedId(mat.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleShareWhatsApp = (mat: GeneratedMaterial) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mat.content)}`;
    window.open(url, '_blank');
  };

  const handleDownloadTxt = (mat: GeneratedMaterial) => {
    const element = document.createElement('a');
    const file = new Blob([mat.content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${mat.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getMetrics = (content: string) => {
    const chars = content.length;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const lines = content.split('\n').length;
    return { chars, words, lines };
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c1a13] border border-[#10b981] text-[#34d399] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-[#34d399]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#34d399] uppercase tracking-wider mb-1">
            Biblioteca Central
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#f0fdf4] font-heading">
            Projetos & Materiais Salvos
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1">
            Acesse seus kits de vendas, materiais favoritados e campanhas com gerenciamento rápido e exportação instantânea.
          </p>
        </div>
      </div>

      {/* Main Tabs & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0a120e] border border-[#192720] rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              setActiveTab('projects');
              setOnlyFavoritesFilter(false);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40 shadow-sm'
                : 'bg-[#121f18] text-[#64748b] hover:text-[#f0fdf4]'
            }`}
          >
            Projetos ({projects.length})
          </button>
          
          <button
            onClick={() => {
              setActiveTab('materials');
              setOnlyFavoritesFilter(false);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'materials'
                ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40 shadow-sm'
                : 'bg-[#121f18] text-[#64748b] hover:text-[#f0fdf4]'
            }`}
          >
            Materiais Salvos ({savedMaterials.length})
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-[#10b981] text-[#080d0b] shadow-lg shadow-[#10b981]/20 border border-[#34d399]'
                : 'bg-[#121f18] text-[#facc15] hover:text-[#fde047] border border-[#facc15]/30'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${activeTab === 'favorites' ? 'fill-[#080d0b]' : 'fill-[#facc15]'}`} />
            <span>Favoritos ({totalFavoritesCount})</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {activeTab !== 'favorites' && (
            <button
              onClick={() => setOnlyFavoritesFilter(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
                onlyFavoritesFilter
                  ? 'bg-[#facc15]/20 text-[#facc15] border border-[#facc15]/50 font-bold'
                  : 'bg-[#121f18] text-[#64748b] hover:text-[#facc15] border border-[#192720]'
              }`}
              title="Filtrar apenas favoritos nesta aba"
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavoritesFilter ? 'fill-[#facc15]' : ''}`} />
              <span className="hidden sm:inline">Apenas Favoritos</span>
            </button>
          )}

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
            <input
              type="text"
              placeholder="Buscar por título, curso ou tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg studio-input text-xs text-[#f0fdf4] bg-[#080d0b] border border-[#192720] focus:border-[#10b981]"
            />
          </div>
        </div>
      </div>

      {/* ===================== FAVORITES TAB ===================== */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          {/* Sub-tabs for Favorites */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0c1611] p-3 rounded-xl border border-[#193b29]">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-[#facc15] text-[#facc15]" />
              <span className="text-xs font-bold text-[#f0fdf4]">
                Filtro de Favoritos:
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setFavoritesSubTab('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    favoritesSubTab === 'all'
                      ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40'
                      : 'text-[#64748b] hover:text-[#f0fdf4]'
                  }`}
                >
                  Tudo ({totalFavoritesCount})
                </button>
                <button
                  onClick={() => setFavoritesSubTab('materials')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    favoritesSubTab === 'materials'
                      ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40'
                      : 'text-[#64748b] hover:text-[#f0fdf4]'
                  }`}
                >
                  Materiais ({favoriteMaterials.length})
                </button>
                <button
                  onClick={() => setFavoritesSubTab('projects')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    favoritesSubTab === 'projects'
                      ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40'
                      : 'text-[#64748b] hover:text-[#f0fdf4]'
                  }`}
                >
                  Projetos ({favoriteProjects.length})
                </button>
              </div>
            </div>

            <span className="text-[11px] text-[#64748b]">
              Itens com estrela ativada ficam fixados no topo para acesso instantâneo.
            </span>
          </div>

          {totalFavoritesCount === 0 ? (
            <div className="studio-card p-12 text-center rounded-xl space-y-3 border-dashed border-[#193b29]">
              <div className="w-12 h-12 rounded-full bg-[#16251e] text-[#facc15] flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 fill-none text-[#facc15]" />
              </div>
              <h3 className="text-sm font-bold text-[#f0fdf4]">Você ainda não favoritou nenhum material ou projeto</h3>
              <p className="text-xs text-[#64748b] max-w-md mx-auto">
                Clique no ícone de estrela em qualquer material ou projeto para fixá-lo aqui e encontrá-lo instantaneamente sempre que precisar.
              </p>
              <button
                onClick={() => setActiveTab('materials')}
                className="px-4 py-2 rounded-lg bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30 text-xs font-bold hover:bg-[#10b981]/25 transition-all cursor-pointer"
              >
                Explorar Materiais Salvos
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Favorite Materials Section */}
              {(favoritesSubTab === 'all' || favoritesSubTab === 'materials') && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#34d399] uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      Materiais Favoritos ({filteredFavMaterials.length})
                    </h3>
                  </div>

                  {filteredFavMaterials.length === 0 ? (
                    <div className="p-6 bg-[#080d0b] rounded-xl border border-[#192720] text-center text-xs text-[#64748b]">
                      Nenhum material favorito encontrado com os filtros atuais.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredFavMaterials.map((mat) => (
                        <div 
                          key={mat.id} 
                          className="studio-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-[#10b981]/40 bg-[#0a1811] shadow-lg shadow-[#10b981]/5 hover:border-[#10b981] transition-all group"
                        >
                          <div 
                            className="space-y-1.5 flex-1 cursor-pointer"
                            onClick={() => setPreviewMaterial(mat)}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] bg-[#10b981]/25 text-[#34d399] px-2 py-0.5 rounded font-bold font-mono">
                                {mat.type || mat.category || 'Texto'}
                              </span>
                              <span className="text-[10px] bg-[#facc15]/20 text-[#facc15] px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-[#facc15]" />
                                Favorito
                              </span>
                              <span className="text-xs font-semibold text-[#cbd5e1]">{mat.productName}</span>
                              <span className="text-[10px] text-[#64748b]">
                                • {new Date(mat.createdAt).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-[#f0fdf4] group-hover:text-[#34d399] transition-colors flex items-center gap-1.5">
                              {mat.title}
                            </h4>
                            <p className="text-xs text-[#94a3b8] line-clamp-2 font-mono bg-[#080d0b] p-2.5 rounded-lg border border-[#192720]">
                              {mat.content}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              onClick={(e) => handleToggleFavMat(mat, e)}
                              className="p-1.5 rounded-lg text-[#facc15] hover:bg-[#16251e] transition-colors cursor-pointer"
                              title="Remover dos favoritos"
                            >
                              <Star className="w-4 h-4 fill-[#facc15]" />
                            </button>

                            <button
                              onClick={() => setPreviewMaterial(mat)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981]/15 text-xs font-semibold text-[#34d399] hover:bg-[#10b981]/25 border border-[#10b981]/30 transition-all cursor-pointer"
                              title="Visualizar em tela cheia"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Visualizar</span>
                            </button>

                            <button
                              onClick={() => handleCopyMaterial(mat)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16251e] text-xs font-semibold text-[#cbd5e1] hover:text-[#34d399] hover:bg-[#1f3329] transition-all cursor-pointer"
                              title="Copiar texto"
                            >
                              {copiedId === mat.id ? <Check className="w-3.5 h-3.5 text-[#34d399]" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedId === mat.id ? 'Copiado!' : 'Copiar'}</span>
                            </button>

                            {onDeleteMaterial && (
                              <button
                                onClick={() => onDeleteMaterial(mat.id)}
                                className="p-1.5 rounded-lg bg-[#16251e] text-[#64748b] hover:text-[#f87171] hover:bg-[#2e1717] transition-all cursor-pointer"
                                title="Excluir material"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Favorite Projects Section */}
              {(favoritesSubTab === 'all' || favoritesSubTab === 'projects') && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#34d399] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Projetos Favoritos ({filteredFavProjects.length})
                    </h3>
                  </div>

                  {filteredFavProjects.length === 0 ? (
                    <div className="p-6 bg-[#080d0b] rounded-xl border border-[#192720] text-center text-xs text-[#64748b]">
                      Nenhum projeto favorito encontrado.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredFavProjects.map((proj) => (
                        <div 
                          key={proj.id} 
                          className="studio-card rounded-xl p-5 space-y-3 flex flex-col justify-between border-[#10b981]/40 bg-[#0a1811] shadow-lg shadow-[#10b981]/5 hover:border-[#10b981] transition-all"
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#34d399] truncate">{proj.productName}</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={(e) => handleToggleFavProj(proj, e)}
                                  className="p-1 text-[#facc15] hover:bg-[#16251e] rounded transition-colors"
                                  title="Remover projeto dos favoritos"
                                >
                                  <Star className="w-3.5 h-3.5 fill-[#facc15]" />
                                </button>
                                <span className="text-[10px] bg-[#10b981]/20 text-[#34d399] px-2 py-0.5 rounded font-bold">
                                  {proj.status}
                                </span>
                              </div>
                            </div>
                            <h3 className="text-sm font-bold text-[#f0fdf4] font-heading mt-2">{proj.name}</h3>
                            <p className="text-xs text-[#94a3b8] mt-1 line-clamp-2">{proj.description}</p>
                          </div>

                          <div className="pt-3 border-t border-[#193b29] flex items-center justify-between text-xs">
                            <span className="text-[#64748b] text-[11px]">{proj.createdAt}</span>
                            <button
                              onClick={() => onNavigate('super-kit')}
                              className="text-[#34d399] font-bold hover:underline cursor-pointer"
                            >
                              Abrir Kit →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ===================== PROJECTS TAB ===================== */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full studio-card p-12 text-center text-xs text-[#64748b]">
              {onlyFavoritesFilter 
                ? 'Nenhum projeto marcado como favorito.' 
                : 'Nenhum projeto salvo no momento. Gere um Super Kit para salvar automaticamente.'}
            </div>
          ) : (
            filteredProjects.map((proj) => (
              <div 
                key={proj.id} 
                className={`studio-card rounded-xl p-5 space-y-3 flex flex-col justify-between transition-all ${
                  proj.isFavorite ? 'border-[#10b981]/40 bg-[#0a1811]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#34d399] truncate">{proj.productName}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleToggleFavProj(proj, e)}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          proj.isFavorite ? 'text-[#facc15]' : 'text-[#475569] hover:text-[#facc15]'
                        }`}
                        title={proj.isFavorite ? "Remover dos favoritos" : "Favoritar projeto"}
                      >
                        <Star className={`w-3.5 h-3.5 ${proj.isFavorite ? 'fill-[#facc15]' : 'fill-none'}`} />
                      </button>
                      <span className="text-[10px] bg-[#10b981]/20 text-[#34d399] px-2 py-0.5 rounded font-bold">
                        {proj.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#f0fdf4] font-heading mt-2 flex items-center gap-1.5">
                    {proj.name}
                  </h3>
                  <p className="text-xs text-[#64748b] mt-1 line-clamp-2">{proj.description}</p>
                </div>

                <div className="pt-3 border-t border-[#192720] flex items-center justify-between text-xs">
                  <span className="text-[#64748b] text-[11px]">{proj.createdAt}</span>
                  <div className="flex items-center gap-3">
                    {onDeleteProject && (
                      <button
                        onClick={() => onDeleteProject(proj.id)}
                        className="text-[#64748b] hover:text-[#f87171] transition-colors cursor-pointer"
                        title="Excluir projeto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onNavigate('super-kit')}
                      className="text-[#34d399] font-bold hover:underline cursor-pointer"
                    >
                      Abrir Kit →
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ===================== MATERIALS TAB ===================== */}
      {activeTab === 'materials' && (
        <div className="space-y-3">
          {filteredMaterials.length === 0 ? (
            <div className="studio-card p-12 text-center text-xs text-[#64748b]">
              {onlyFavoritesFilter 
                ? 'Nenhum material marcado como favorito.' 
                : 'Nenhum material salvo individualmente. Use o botão "Salvar" no Description Studio ou nos geradores.'}
            </div>
          ) : (
            filteredMaterials.map((mat) => (
              <div 
                key={mat.id} 
                className={`studio-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group ${
                  mat.isFavorite 
                    ? 'border-[#10b981]/40 bg-[#0a1811] hover:border-[#10b981]' 
                    : 'hover:border-[#10b981]/40'
                }`}
              >
                <div 
                  className="space-y-1.5 flex-1 cursor-pointer"
                  onClick={() => setPreviewMaterial(mat)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#10b981]/20 text-[#34d399] px-2 py-0.5 rounded font-bold font-mono">
                      {mat.type || mat.category || 'Texto'}
                    </span>
                    {mat.isFavorite && (
                      <span className="text-[10px] bg-[#facc15]/20 text-[#facc15] px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-[#facc15]" />
                        Favorito
                      </span>
                    )}
                    <span className="text-xs font-semibold text-[#64748b]">{mat.productName}</span>
                    <span className="text-[10px] text-[#475569]">
                      • {new Date(mat.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#f0fdf4] group-hover:text-[#34d399] transition-colors flex items-center gap-1.5">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-[#94a3b8] line-clamp-2 font-mono bg-[#080d0b] p-2 rounded-lg border border-[#192720]">
                    {mat.content}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={(e) => handleToggleFavMat(mat, e)}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                      mat.isFavorite
                        ? 'text-[#facc15] hover:bg-[#16251e]'
                        : 'text-[#475569] hover:text-[#facc15] hover:bg-[#16251e]'
                    }`}
                    title={mat.isFavorite ? "Remover dos favoritos" : "Favoritar este material"}
                  >
                    <Star className={`w-4 h-4 ${mat.isFavorite ? 'fill-[#facc15]' : 'fill-none'}`} />
                  </button>

                  <button
                    onClick={() => setPreviewMaterial(mat)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981]/15 text-xs font-semibold text-[#34d399] hover:bg-[#10b981]/25 border border-[#10b981]/30 transition-all cursor-pointer"
                    title="Visualizar em tela cheia"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visualizar</span>
                  </button>

                  <button
                    onClick={() => handleCopyMaterial(mat)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16251e] text-xs font-semibold text-[#cbd5e1] hover:text-[#34d399] hover:bg-[#1f3329] transition-all cursor-pointer"
                    title="Copiar texto"
                  >
                    {copiedId === mat.id ? <Check className="w-3.5 h-3.5 text-[#34d399]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === mat.id ? 'Copiado!' : 'Copiar'}</span>
                  </button>

                  {onDeleteMaterial && (
                    <button
                      onClick={() => onDeleteMaterial(mat.id)}
                      className="p-1.5 rounded-lg bg-[#16251e] text-[#64748b] hover:text-[#f87171] hover:bg-[#2e1717] transition-all cursor-pointer"
                      title="Excluir material"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Quick-Preview Modal */}
      {currentPreview && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setPreviewMaterial(null)}
        >
          <div 
            className="bg-[#0c1611] border border-[#193b29] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#192720] flex items-center justify-between bg-[#080d0b]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-[#10b981]/20 text-[#34d399] px-2.5 py-0.5 rounded font-mono font-bold">
                    {currentPreview.type || currentPreview.category}
                  </span>
                  {currentPreview.isFavorite && (
                    <span className="text-[11px] bg-[#facc15]/20 text-[#facc15] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#facc15]" />
                      Favorito
                    </span>
                  )}
                  <span className="text-xs font-semibold text-[#64748b]">
                    Curso: {currentPreview.productName}
                  </span>
                  <span className="text-[10px] text-[#475569]">
                    • {new Date(currentPreview.createdAt).toLocaleString('pt-BR')}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#f0fdf4] font-heading">
                  {currentPreview.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleFavMat(currentPreview)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                    currentPreview.isFavorite 
                      ? 'bg-[#facc15]/15 border-[#facc15]/40 text-[#facc15]' 
                      : 'bg-[#16251e] border-[#192720] text-[#64748b] hover:text-[#facc15]'
                  }`}
                  title={currentPreview.isFavorite ? "Remover dos favoritos" : "Favoritar este material"}
                >
                  <Star className={`w-4 h-4 ${currentPreview.isFavorite ? 'fill-[#facc15]' : 'fill-none'}`} />
                  <span className="hidden sm:inline">{currentPreview.isFavorite ? 'Favorito' : 'Favoritar'}</span>
                </button>

                <button
                  onClick={() => setPreviewMaterial(null)}
                  className="p-2 rounded-xl text-[#64748b] hover:text-[#f0fdf4] hover:bg-[#16251e] transition-colors cursor-pointer"
                  title="Fechar modal (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Full formatted content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {/* Content Metrics Bar */}
              {(() => {
                const { chars, words, lines } = getMetrics(currentPreview.content);
                return (
                  <div className="flex items-center justify-between px-4 py-2 bg-[#080d0b] rounded-xl border border-[#192720] text-xs text-[#64748b]">
                    <div className="flex items-center gap-4">
                      <span><strong>{words}</strong> palavras</span>
                      <span>•</span>
                      <span><strong>{chars}</strong> caracteres</span>
                      <span>•</span>
                      <span><strong>{lines}</strong> linhas</span>
                    </div>

                    {currentPreview.tags && currentPreview.tags.length > 0 && (
                      <div className="hidden sm:flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#34d399]" />
                        {currentPreview.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] bg-[#121f18] text-[#94a3b8] px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Text Container */}
              <div className="bg-[#080d0b] rounded-xl p-5 border border-[#192720] font-mono text-xs text-[#f0fdf4] whitespace-pre-wrap leading-relaxed selection:bg-[#10b981]/30 selection:text-[#34d399] max-h-[55vh] overflow-y-auto">
                {currentPreview.content}
              </div>
            </div>

            {/* Modal Footer Toolbar */}
            <div className="px-6 py-4 border-t border-[#192720] bg-[#080d0b] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareWhatsApp(currentPreview)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 text-xs font-bold transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enviar no WhatsApp</span>
                </button>

                <button
                  onClick={() => handleDownloadTxt(currentPreview)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#121f18] text-[#64748b] hover:text-[#f0fdf4] hover:bg-[#192f23] border border-[#192720] text-xs font-semibold transition-all cursor-pointer"
                  title="Baixar arquivo de texto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar TXT</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewMaterial(null)}
                  className="px-4 py-2 rounded-lg border border-[#192720] text-xs font-semibold text-[#64748b] hover:text-[#f0fdf4] cursor-pointer"
                >
                  Fechar
                </button>

                <button
                  onClick={() => handleCopyMaterial(currentPreview, true)}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg emerald-gradient-bg text-[#080d0b] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  {modalCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{modalCopied ? 'Texto Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


