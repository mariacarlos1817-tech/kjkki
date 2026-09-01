import React, { useState, useEffect } from 'react';
import { initialProducts } from './data/initialProducts';
import { initialBrandKit } from './data/initialBrandKit';
import { Product, BrandKit, GeneratedMaterial, Project, Campaign } from './types';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { PDFImportModal } from './components/PDFImportModal';

// Views
import { DashboardView } from './views/DashboardView';
import { ProductsView } from './views/ProductsView';
import { CentralMateriaisView } from './views/CentralMateriaisView';
import { SuperKitView } from './views/SuperKitView';
import { DescriptionStudioView } from './views/DescriptionStudioView';
import { WhatsAppSalesView } from './views/WhatsAppSalesView';
import { MetaContentStudioView } from './views/MetaContentStudioView';
import { SalesPageStudioView } from './views/SalesPageStudioView';
import { PortfolioBuilderView } from './views/PortfolioBuilderView';
import { CatalogStudioView } from './views/CatalogStudioView';
import { CreativeStudioView } from './views/CreativeStudioView';
import { CopywritingStudioView } from './views/CopywritingStudioView';
import { ProjectsLibraryView } from './views/ProjectsLibraryView';
import { BrandKitView } from './views/BrandKitView';
import { HistoryView } from './views/HistoryView';

export default function App() {
  // Products state (persisted to localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('prime_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialProducts;
      }
    }
    return initialProducts;
  });

  // Active product selection
  const [selectedProductId, setSelectedProductId] = useState<string>(() => localStorage.getItem('prime_selected_product') || initialProducts[0]?.id || '');

  // Brand kit state
  const [brandKit, setBrandKit] = useState<BrandKit>(() => {
    const saved = localStorage.getItem('prime_brand_kit');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialBrandKit;
      }
    }
    return initialBrandKit;
  });

  // Generated materials library state
  const [savedMaterials, setSavedMaterials] = useState<GeneratedMaterial[]>(() => {
    const saved = localStorage.getItem('prime_materials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Saved projects
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('prime_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // History state
  const [history, setHistory] = useState<GeneratedMaterial[]>(() => {
    const saved = localStorage.getItem('prime_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('prime_campaigns');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Current view
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isImportOpen, setIsImportOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('prime_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('prime_selected_product', selectedProductId);
  }, [selectedProductId]);

  useEffect(() => {
    localStorage.setItem('prime_brand_kit', JSON.stringify(brandKit));
  }, [brandKit]);

  useEffect(() => {
    localStorage.setItem('prime_materials', JSON.stringify(savedMaterials));
  }, [savedMaterials]);

  useEffect(() => {
    localStorage.setItem('prime_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('prime_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('prime_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  // Collapsible Sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('prime_sidebar_collapsed') === 'true';
  });

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('prime_sidebar_collapsed', String(next));
      return next;
    });
  };

  // Selected product entity
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0] || initialProducts[0];

  useEffect(() => {
    if (selectedProduct && selectedProduct.id !== selectedProductId) {
      setSelectedProductId(selectedProduct.id);
    }
  }, [selectedProduct, selectedProductId]);

  // Navigation helper
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save/Update product
  const handleSaveProduct = (prod: Product) => {
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === prod.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = prod;
        return copy;
      }
      return [prod, ...prev];
    });
    setSelectedProductId(prod.id);
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    if (products.length <= 1) {
      alert('É necessário manter pelo menos um curso cadastrado.');
      return;
    }
    setProducts(prev => prev.filter(p => p.id !== id));
    if (selectedProductId === id) {
      const remaining = products.filter(p => p.id !== id);
      setSelectedProductId(remaining[0].id);
    }
  };

  // Save single material
  const handleSaveMaterial = (material: GeneratedMaterial) => {
    setSavedMaterials(prev => [material, ...prev]);
    setHistory(prev => [material, ...prev]);
  };

  const handleSaveCampaign = (campaign: Campaign) => {
    setCampaigns(prev => {
      const existingIndex = prev.findIndex(item => item.id === campaign.id);
      if (existingIndex < 0) return [campaign, ...prev];
      const next = [...prev];
      next[existingIndex] = campaign;
      return next;
    });
  };

  // Toggle favorite for material
  const handleToggleFavoriteMaterial = (id: string) => {
    setSavedMaterials(prev => 
      prev.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m)
    );
    setHistory(prev => 
      prev.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m)
    );
  };

  const handleUpdateMaterial = (id: string, changes: Partial<GeneratedMaterial>) => {
    setSavedMaterials(prev => prev.map(material => material.id === id ? { ...material, ...changes } : material));
    setHistory(prev => prev.map(material => material.id === id ? { ...material, ...changes } : material));
  };

  // Toggle favorite for project
  const handleToggleFavoriteProject = (id: string) => {
    setProjects(prev => 
      prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)
    );
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Save project
  const handleSaveProject = (projectData: Partial<Project>) => {
    const materials = savedMaterials.filter(m => m.productId === selectedProduct.id);
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: projectData.name || `Projeto ${selectedProduct.name}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      description: projectData.description || 'Kit completo de divulgação',
      status: projectData.status || 'Ativo',
      createdAt: new Date().toLocaleDateString('pt-BR'),
      updatedAt: new Date().toLocaleDateString('pt-BR'),
      itemsCount: materials.length,
      materials,
      isFavorite: false
    };
    setProjects(prev => [newProject, ...prev]);
  };

  // Import product callback
  const handleImportSuccess = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setSelectedProductId(newProduct.id);
    setCurrentView('produtos');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e5e2e1] flex font-sans antialiased selection:bg-[#d4af37]/30 selection:text-[#f2ca50]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        products={products}
        selectedProductId={selectedProductId}
        onSelectProduct={setSelectedProductId}
        onNewProduct={() => {
          setCurrentView('produtos');
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />

      {/* Main Container */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} flex flex-col min-h-screen transition-all duration-200`}>
        {/* Topbar */}
        <Topbar
          products={products}
          selectedProductId={selectedProductId}
          onSelectProduct={setSelectedProductId}
          onOpenImport={() => setIsImportOpen(true)}
          onOpenSuperKit={() => setCurrentView('super-kit')}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5 max-w-7xl w-full mx-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              products={products}
              selectedProduct={selectedProduct}
              brandKit={brandKit}
              onSelectProduct={setSelectedProductId}
              onNavigate={handleNavigate}
              onOpenImport={() => setIsImportOpen(true)}
              recentMaterials={savedMaterials.slice(0, 5)}
            />
          )}

          {currentView === 'produtos' && (
            <ProductsView
              products={products}
              selectedProductId={selectedProductId}
              onSelectProduct={setSelectedProductId}
              onSaveProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
              onNavigate={handleNavigate}
              onOpenImport={() => setIsImportOpen(true)}
            />
          )}

          {currentView === 'central-materiais' && (
            <CentralMateriaisView
              selectedProduct={selectedProduct}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'super-kit' && (
            <SuperKitView
              selectedProduct={selectedProduct}
              brandKit={brandKit}
              onSaveToProject={handleSaveProject}
            />
          )}

          {currentView === 'descriptions' && (
            <DescriptionStudioView
              selectedProduct={selectedProduct}
              brandKit={brandKit}
              onSaveMaterial={handleSaveMaterial}
            />
          )}

          {currentView === 'whatsapp' && (
            <WhatsAppSalesView
              selectedProduct={selectedProduct}
              brandKit={brandKit}
            />
          )}

          {currentView === 'meta-ads' && (
            <MetaContentStudioView
              selectedProduct={selectedProduct}
              brandKit={brandKit}
              campaigns={campaigns}
              onSaveCampaign={handleSaveCampaign}
              onSaveMaterial={handleSaveMaterial}
            />
          )}

          {currentView === 'sales-page' && (
            <SalesPageStudioView
              selectedProduct={selectedProduct}
              brandKit={brandKit}
            />
          )}

          {currentView === 'portfolio' && (
            <PortfolioBuilderView
              products={products}
              brandKit={brandKit}
            />
          )}

          {currentView === 'catalogo' && (
            <CatalogStudioView
              products={products}
              brandKit={brandKit}
              onSelectProduct={setSelectedProductId}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'creative' && (
            <CreativeStudioView
              selectedProduct={selectedProduct}
              brandKit={brandKit}
              onUpdateProduct={handleSaveProduct}
            />
          )}

          {currentView === 'copywriting' && (
            <CopywritingStudioView
              selectedProduct={selectedProduct}
              brandKit={brandKit}
            />
          )}

          {currentView === 'projetos' && (
            <ProjectsLibraryView
              projects={projects}
              savedMaterials={savedMaterials}
              onToggleFavoriteMaterial={handleToggleFavoriteMaterial}
              onToggleFavoriteProject={handleToggleFavoriteProject}
              onDeleteProject={handleDeleteProject}
              onDeleteMaterial={(id) => setSavedMaterials(prev => prev.filter(m => m.id !== id))}
              onUpdateMaterial={handleUpdateMaterial}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'brand-kit' && (
            <BrandKitView
              brandKit={brandKit}
              onUpdateBrandKit={setBrandKit}
            />
          )}

          {currentView === 'historico' && (
            <HistoryView
              history={history}
              onClearHistory={() => setHistory([])}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* PDF Import Modal */}
      <PDFImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportSuccess={handleImportSuccess}
      />
    </div>
  );
}
