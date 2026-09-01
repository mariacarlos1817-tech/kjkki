import React, { useState, useEffect, useRef } from 'react';
import { 
  Palette, 
  Sparkles, 
  Copy, 
  Check, 
  Layers, 
  Image as ImageIcon, 
  Sliders, 
  Ratio, 
  Maximize2,
  RefreshCw,
  Camera,
  Plus,
  Edit3,
  Trash2,
  Upload,
  Download,
  Wand2,
  Eye,
  X,
  FileText,
  Tag,
  ArrowRight,
  ShieldCheck,
  Crop,
  Sun,
  Contrast,
  Droplet,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  Move,
  Type,
  Share2,
  Send,
  MessageSquare,
  Sparkle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, BrandKit, ImageAspectRatio, ImagePromptConcept, ImageCompanionTexts } from '../types';
import { AIGeneratorService } from '../services/aiGenerator';

interface CreativeStudioViewProps {
  selectedProduct: Product;
  brandKit: BrandKit;
  onUpdateProduct?: (product: Product) => void;
}

export const CreativeStudioView: React.FC<CreativeStudioViewProps> = ({
  selectedProduct,
  brandKit,
  onUpdateProduct
}) => {
  // Active Tab
  const [activeTab, setActiveTab] = useState<'editor' | 'generator' | 'library'>('editor');

  // Image Source & Upload
  const [imageSource, setImageSource] = useState<string>(selectedProduct.coverImage || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&auto=format&fit=crop&q=80');
  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number; ratio: number } | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Target Aspect Ratio for Editor & Generator
  const [targetRatio, setTargetRatio] = useState<'1:1' | '4:5' | '9:16' | '16:9'>('1:1');
  const [visualStyle, setVisualStyle] = useState<'Photorealistic' | 'Cinematic' | 'Studio' | 'Advertising' | 'PracticalAction'>('Photorealistic');
  const [targetEngine, setTargetEngine] = useState<'Midjourney v6' | 'Flux.1' | 'DALL-E 3' | 'SDXL' | 'Imagen 3'>('Midjourney v6');

  // Canvas Adjustments State
  const [scale, setScale] = useState<number>(1.0);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(105);
  const [goldenWarmth, setGoldenWarmth] = useState<number>(15);
  const [vignette, setVignette] = useState<number>(20);

  // Overlay Elements on Image
  const [showBadgeOverlay, setShowBadgeOverlay] = useState<boolean>(true);
  const [badgeText, setBadgeText] = useState<string>('HOMOLOGADO SENATRAN');
  const [showTitleOverlay, setShowTitleOverlay] = useState<boolean>(true);
  const [titleOverlayText, setTitleOverlayText] = useState<string>(selectedProduct.name.toUpperCase());
  const [showPriceOverlay, setShowPriceOverlay] = useState<boolean>(true);
  const [priceOverlayText, setPriceOverlayText] = useState<string>(
    selectedProduct.promoPrice ? `R$ ${selectedProduct.promoPrice.toFixed(2)}` : '100% ONLINE'
  );
  const [showGoldFrame, setShowGoldFrame] = useState<boolean>(true);

  // Canvas Reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Prompts Library State
  const [prompts, setPrompts] = useState<ImagePromptConcept[]>(() => {
    const saved = localStorage.getItem(`prime_prompts_${selectedProduct.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return AIGeneratorService.generateDefaultPromptLibrary(selectedProduct, brandKit);
  });

  const [selectedPromptId, setSelectedPromptId] = useState<string>(prompts[0]?.id || '1');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Custom Prompt Builder state
  const [customNotes, setCustomNotes] = useState<string>('');
  const [currentGeneratedPackage, setCurrentGeneratedPackage] = useState<ImagePromptConcept>(() => {
    return AIGeneratorService.generatePromptAndTextsForRatio(
      selectedProduct,
      brandKit,
      targetRatio,
      visualStyle,
      targetEngine
    );
  });

  // Modal states for Create/Edit Prompt
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingPrompt, setEditingPrompt] = useState<Partial<ImagePromptConcept>>({
    title: '',
    aspectRatio: '1:1',
    fullPrompt: '',
    negativePrompt: '',
    character: '',
    environment: '',
    lighting: '',
    mood: ''
  });

  // Update when product changes
  useEffect(() => {
    setImageSource(selectedProduct.coverImage || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&auto=format&fit=crop&q=80');
    setTitleOverlayText(selectedProduct.name.toUpperCase());
    setPriceOverlayText(selectedProduct.promoPrice ? `R$ ${selectedProduct.promoPrice.toFixed(2)}` : '100% ONLINE');

    const saved = localStorage.getItem(`prime_prompts_${selectedProduct.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setPrompts(parsed);
          setSelectedPromptId(parsed[0].id);
          return;
        }
      } catch (e) {}
    }
    const def = AIGeneratorService.generateDefaultPromptLibrary(selectedProduct, brandKit);
    setPrompts(def);
    setSelectedPromptId(def[0].id);
  }, [selectedProduct.id]);

  // Persist custom prompts
  useEffect(() => {
    localStorage.setItem(`prime_prompts_${selectedProduct.id}`, JSON.stringify(prompts));
  }, [prompts, selectedProduct.id]);

  // Measure natural dimensions of the loaded image
  useEffect(() => {
    if (!imageSource) return;
    setIsImageLoading(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setNaturalDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
        ratio: Number((img.naturalWidth / img.naturalHeight).toFixed(3))
      });
      setIsImageLoading(false);
      drawCanvas();
    };
    img.onerror = () => {
      setIsImageLoading(false);
    };
    img.src = imageSource;
  }, [imageSource]);

  // Redraw canvas whenever adjustments or target ratio change
  useEffect(() => {
    drawCanvas();
  }, [
    imageSource,
    targetRatio,
    scale,
    panX,
    panY,
    brightness,
    contrast,
    saturation,
    goldenWarmth,
    vignette,
    showBadgeOverlay,
    badgeText,
    showTitleOverlay,
    titleOverlayText,
    showPriceOverlay,
    priceOverlayText,
    showGoldFrame
  ]);

  // Draw on HTML5 Canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSource) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Define target dimensions based on aspect ratio
    let canvasW = 1080;
    let canvasH = 1080;
    if (targetRatio === '1:1') {
      canvasW = 1080;
      canvasH = 1080;
    } else if (targetRatio === '4:5') {
      canvasW = 1080;
      canvasH = 1350;
    } else if (targetRatio === '9:16') {
      canvasW = 1080;
      canvasH = 1920;
    } else if (targetRatio === '16:9') {
      canvasW = 1920;
      canvasH = 1080;
    }

    canvas.width = canvasW;
    canvas.height = canvasH;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // 1. Draw solid dark background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvasW, canvasH);

      // 2. Calculate cover scaling & pan
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const targetAr = canvasW / canvasH;

      let drawW = canvasW;
      let drawH = canvasH;

      if (imgRatio > targetAr) {
        drawH = canvasH;
        drawW = canvasH * imgRatio;
      } else {
        drawW = canvasW;
        drawH = canvasW / imgRatio;
      }

      drawW *= scale;
      drawH *= scale;

      const drawX = (canvasW - drawW) / 2 + (panX * (canvasW / 400));
      const drawY = (canvasH - drawH) / 2 + (panY * (canvasH / 400));

      // 3. Apply Filters (Brightness, Contrast, Saturation)
      ctx.save();
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      // 4. Golden Warmth Tint Layer
      if (goldenWarmth > 0) {
        ctx.save();
        ctx.fillStyle = `rgba(212, 175, 55, ${goldenWarmth / 350})`;
        ctx.globalCompositeOperation = 'color';
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.restore();
      }

      // 5. Vignette (Dark edge gradient)
      if (vignette > 0) {
        ctx.save();
        const rad = Math.max(canvasW, canvasH) / 1.4;
        const grad = ctx.createRadialGradient(
          canvasW / 2,
          canvasH / 2,
          rad * 0.3,
          canvasW / 2,
          canvasH / 2,
          rad
        );
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, `rgba(0,0,0,${(vignette / 100) * 0.75})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.restore();
      }

      // 6. Overlays (Brand Frame, Badge, Title Bar, Price)
      // Top Gradient shadow for text contrast
      ctx.save();
      const topGrad = ctx.createLinearGradient(0, 0, 0, canvasH * 0.25);
      topGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, canvasW, canvasH * 0.25);

      // Bottom Gradient shadow
      const bottomGrad = ctx.createLinearGradient(0, canvasH * 0.65, 0, canvasH);
      bottomGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      bottomGrad.addColorStop(1, 'rgba(0, 0, 0, 0.92)');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, canvasH * 0.65, canvasW, canvasH * 0.35);
      ctx.restore();

      // Gold Border Frame
      if (showGoldFrame) {
        ctx.save();
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = Math.round(canvasW * 0.012);
        ctx.strokeRect(
          canvasW * 0.02,
          canvasH * 0.02,
          canvasW * 0.96,
          canvasH * 0.96
        );
        ctx.restore();
      }

      // Top Badge
      if (showBadgeOverlay && badgeText.trim()) {
        ctx.save();
        const badgePaddingX = canvasW * 0.035;
        const badgePaddingY = canvasH * 0.012;
        const fontSize = Math.round(canvasW * 0.028);

        ctx.font = `bold ${fontSize}px sans-serif`;
        const textMetrics = ctx.measureText(badgeText);
        const boxW = textMetrics.width + (badgePaddingX * 2);
        const boxH = fontSize + (badgePaddingY * 2);
        const boxX = canvasW * 0.05;
        const boxY = canvasH * 0.05;

        // Badge Background (Gold Gradient)
        const badgeGrad = ctx.createLinearGradient(boxX, boxY, boxX + boxW, boxY + boxH);
        badgeGrad.addColorStop(0, '#f2ca50');
        badgeGrad.addColorStop(1, '#d4af37');
        ctx.fillStyle = badgeGrad;
        
        // Rounded Rect for badge
        ctx.beginPath();
        const r = 8;
        ctx.roundRect ? ctx.roundRect(boxX, boxY, boxW, boxH, r) : ctx.rect(boxX, boxY, boxW, boxH);
        ctx.fill();

        // Badge Text
        ctx.fillStyle = '#0a0a0a';
        ctx.textBaseline = 'middle';
        ctx.fillText(badgeText, boxX + badgePaddingX, boxY + boxH / 2);
        ctx.restore();
      }

      // Bottom Title Bar & Price Tag
      if (showTitleOverlay && titleOverlayText.trim()) {
        ctx.save();
        const titleFontSize = Math.round(canvasW * 0.048);
        ctx.font = `900 ${titleFontSize}px sans-serif`;
        ctx.fillStyle = '#f2ca50';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 8;
        ctx.textBaseline = 'bottom';
        
        const titleX = canvasW * 0.05;
        const titleY = canvasH * 0.91;
        ctx.fillText(titleOverlayText, titleX, titleY);

        if (showPriceOverlay && priceOverlayText.trim()) {
          const subFontSize = Math.round(canvasW * 0.028);
          ctx.font = `bold ${subFontSize}px sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`• ${priceOverlayText}`, titleX, canvasH * 0.955);
        }
        ctx.restore();
      }
    };
    img.src = imageSource;
  };

  // Trigger File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const url = event.target.result as string;
          setImageSource(url);
          confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Download Edited Image from Canvas
  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `prime-${selectedProduct.id}-${targetRatio.replace(':', '-')}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  // Set Edited Canvas as Course Cover Image
  const handleSetAsCourseCover = () => {
    const canvas = canvasRef.current;
    if (!canvas || !onUpdateProduct) return;
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onUpdateProduct({
      ...selectedProduct,
      coverImage: dataUrl
    });
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    setCopiedKey('cover-saved');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Regenerate prompt and texts package
  const handleGeneratePackage = () => {
    const pkg = AIGeneratorService.generatePromptAndTextsForRatio(
      selectedProduct,
      brandKit,
      targetRatio,
      visualStyle,
      targetEngine,
      customNotes.trim() || undefined
    );
    setCurrentGeneratedPackage(pkg);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  };

  // Add generated package to prompt library
  const handleSaveGeneratedToLibrary = () => {
    setPrompts(prev => [currentGeneratedPackage, ...prev]);
    setSelectedPromptId(currentGeneratedPackage.id);
    setActiveTab('library');
    confetti({ particleCount: 50, spread: 60 });
  };

  // Aspect ratio diagnosis calculation
  const getRatioDiagnosis = () => {
    if (!naturalDimensions) return null;
    const r = naturalDimensions.ratio;

    let targetValue = 1.0;
    if (targetRatio === '1:1') targetValue = 1.0;
    if (targetRatio === '4:5') targetValue = 0.8;
    if (targetRatio === '9:16') targetValue = 0.5625;
    if (targetRatio === '16:9') targetValue = 1.777;

    const diff = Math.abs(r - targetValue);
    const isExact = diff < 0.03;
    const isClose = diff < 0.15;

    let naturalLabel = 'Personalizada';
    if (Math.abs(r - 1.0) < 0.05) naturalLabel = '1:1 (Quadrado)';
    else if (Math.abs(r - 0.8) < 0.05) naturalLabel = '4:5 (Retrato)';
    else if (Math.abs(r - 0.5625) < 0.05) naturalLabel = '9:16 (Vertical)';
    else if (Math.abs(r - 1.777) < 0.05) naturalLabel = '16:9 (Panorâmico)';

    return {
      naturalLabel,
      isExact,
      isClose,
      diff,
      recommendation: isExact 
        ? 'Proporção nativa perfeita para a plataforma selecionada!' 
        : `A imagem possui proporção nativa de ${r}:1 (${naturalLabel}). O editor fará o recorte e enquadramento inteligente para ${targetRatio}.`
    };
  };

  const diagnosis = getRatioDiagnosis();
  const activePrompt = prompts.find(p => p.id === selectedPromptId) || prompts[0] || currentGeneratedPackage;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#121212] border border-[#242424] p-5 rounded-2xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center text-[#0A0A0A] shadow-md shadow-[#d4af37]/20 shrink-0">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-[#e5e2e1] font-heading tracking-tight">
                Creative Studio & Editor de Imagens
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full gold-gradient-bg text-[#0A0A0A] font-bold uppercase tracking-wider">
                IA + Canvas HD
              </span>
            </div>
            <p className="text-xs text-[#a09885] mt-0.5">
              Avalie proporções, edite imagens com filtros e elementos oficiais, e gere prompts sincronizados com textos de copy.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center bg-[#171717] border border-[#2a2a2a] p-1 rounded-xl shrink-0">
          <button
            id="tab-btn-editor"
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'editor'
                ? 'gold-gradient-bg text-[#0A0A0A] shadow-sm'
                : 'text-[#a09885] hover:text-[#e5e2e1]'
            }`}
          >
            <Crop className="w-3.5 h-3.5" />
            <span>Editor & Proporção</span>
          </button>

          <button
            id="tab-btn-generator"
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'generator'
                ? 'gold-gradient-bg text-[#0A0A0A] shadow-sm'
                : 'text-[#a09885] hover:text-[#e5e2e1]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gerador de Prompts + Copy</span>
          </button>

          <button
            id="tab-btn-library"
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'library'
                ? 'gold-gradient-bg text-[#0A0A0A] shadow-sm'
                : 'text-[#a09885] hover:text-[#e5e2e1]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Biblioteca de Prompts ({prompts.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: IMAGE EDITOR & ASPECT RATIO INSPECTOR */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Canvas Preview & Ratio Diagnosis */}
          <div className="lg:col-span-7 space-y-4">
            {/* Canvas Container Card */}
            <div className="bg-[#121212] border border-[#242424] rounded-2xl p-5 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                    Canvas HD ({targetRatio})
                  </span>
                  <span className="text-[10px] text-[#857d6e] bg-[#1a1a1a] px-2 py-0.5 rounded">
                    {targetRatio === '1:1' && '1080 × 1080 px • Feed Quadrado'}
                    {targetRatio === '4:5' && '1080 × 1350 px • Feed Retrato (Meta)'}
                    {targetRatio === '9:16' && '1080 × 1920 px • Stories / Reels'}
                    {targetRatio === '16:9' && '1920 × 1080 px • Banner / YouTube'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setScale(1.0);
                      setPanX(0);
                      setPanY(0);
                      setBrightness(100);
                      setContrast(100);
                      setSaturation(105);
                      setGoldenWarmth(15);
                      setVignette(20);
                    }}
                    className="text-[11px] text-[#a09885] hover:text-[#e5e2e1] flex items-center gap-1 bg-[#171717] px-2 py-1 rounded border border-[#2a2a2a] cursor-pointer"
                    title="Resetar ajustes de visualização"
                  >
                    <RefreshCw className="w-3 h-3" /> Resetar
                  </button>
                </div>
              </div>

              {/* Canvas viewport */}
              <div className="relative bg-[#0d0d0d] border border-[#242424] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center p-2 max-w-full max-h-[500px]">
                <canvas
                  ref={canvasRef}
                  className="max-h-[460px] max-w-full object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Action Buttons under Canvas */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <button
                  id="btn-download-canvas"
                  onClick={handleDownloadImage}
                  className="w-full py-2.5 px-4 rounded-xl gold-gradient-bg text-[#0A0A0A] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Imagem Editada (PNG HD)</span>
                </button>

                <button
                  id="btn-set-cover"
                  onClick={handleSetAsCourseCover}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#171717] border border-[#d4af37]/40 text-[#f2ca50] hover:bg-[#d4af37]/10 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedKey === 'cover-saved' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Capa do Curso Atualizada!</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Definir como Capa Oficial do Curso</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Diagnostic Card */}
            {diagnosis && (
              <div className="bg-[#121212] border border-[#242424] rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Ratio className="w-4 h-4 text-[#d4af37]" />
                    <h3 className="text-xs font-bold text-[#e5e2e1] uppercase tracking-wider">
                      Diagnóstico de Proporção & Resolução
                    </h3>
                  </div>
                  {diagnosis.isExact ? (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Proporção Ideal
                    </span>
                  ) : (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Recorte Inteligente Ativo
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-[#171717] rounded-xl border border-[#242424] mb-2">
                  <div>
                    <span className="text-[10px] text-[#857d6e] block">Resolução Nativa</span>
                    <span className="font-mono font-bold text-[#e5e2e1]">
                      {naturalDimensions?.width} × {naturalDimensions?.height} px
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#857d6e] block">Proporção Original</span>
                    <span className="font-mono font-bold text-[#f2ca50]">
                      {diagnosis.naturalLabel}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#857d6e] block">Alvo de Exportação</span>
                    <span className="font-mono font-bold text-[#d4af37]">
                      {targetRatio}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#a09885] leading-relaxed">
                  💡 {diagnosis.recommendation}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Controls, Upload & Overlays */}
          <div className="lg:col-span-5 space-y-4">
            {/* Image Selection & Upload */}
            <div className="bg-[#121212] border border-[#242424] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#e5e2e1] uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                  Imagem Fonte
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs gold-gradient-bg text-[#0A0A0A] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer hover:brightness-110 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir do Computador</span>
                </button>
              </div>

              {/* Quick Image Presets */}
              <div>
                <span className="text-[10px] text-[#857d6e] block mb-1.5 font-medium uppercase">
                  Ou escolha uma referência homologada:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Caminhão MOPP', url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&auto=format&fit=crop&q=80' },
                    { label: 'Máquina Pesada', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80' },
                    { label: 'Ambulância', url: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=1200&auto=format&fit=crop&q=80' },
                    { label: 'Estudo EAD', url: 'https://images.unsplash.com/photo-1584697964190-7bb8c5a2c418?w=1200&auto=format&fit=crop&q=80' }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImageSource(preset.url)}
                      className={`relative rounded-lg overflow-hidden border transition-all cursor-pointer h-14 ${
                        imageSource === preset.url ? 'border-[#d4af37] ring-1 ring-[#d4af37]' : 'border-[#242424] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-black/80 text-[8px] text-[#e5e2e1] font-semibold py-0.5 px-1 truncate text-center">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Aspect Ratio Selection */}
            <div className="bg-[#121212] border border-[#242424] rounded-2xl p-4 space-y-2">
              <label className="text-xs font-bold text-[#e5e2e1] uppercase tracking-wider flex items-center gap-1.5">
                <Ratio className="w-3.5 h-3.5 text-[#d4af37]" />
                Proporção do Enquadramento
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { ratio: '1:1', label: '1:1 Quadrado', desc: 'Instagram Feed' },
                  { ratio: '4:5', label: '4:5 Retrato', desc: 'Feed Vertical' },
                  { ratio: '9:16', label: '9:16 Vertical', desc: 'Stories / Reels' },
                  { ratio: '16:9', label: '16:9 Banner', desc: 'Site / YouTube' }
                ].map((item) => (
                  <button
                    key={item.ratio}
                    onClick={() => setTargetRatio(item.ratio as any)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      targetRatio === item.ratio
                        ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f2ca50] shadow-sm'
                        : 'bg-[#171717] border-[#242424] text-[#857d6e] hover:text-[#e5e2e1]'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.ratio}</div>
                    <div className="text-[9px] truncate">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Scale, Pan & Filter Sliders */}
            <div className="bg-[#121212] border border-[#242424] rounded-2xl p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#e5e2e1] uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#d4af37]" />
                  Ajustes de Posição & Filtros
                </label>
              </div>

              {/* Zoom & Pan */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="flex justify-between text-[#857d6e] text-[10px] mb-1">
                    <span>Zoom / Escala</span>
                    <span className="font-mono text-[#f2ca50]">{Math.round(scale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="2.5"
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full accent-[#d4af37] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[#857d6e] text-[10px] mb-1">
                    <span>Posição Vertical (Y)</span>
                    <span className="font-mono text-[#f2ca50]">{panY}</span>
                  </div>
                  <input
                    type="range"
                    min="-150"
                    max="150"
                    step="5"
                    value={panY}
                    onChange={(e) => setPanY(parseInt(e.target.value))}
                    className="w-full accent-[#d4af37] cursor-pointer"
                  />
                </div>
              </div>

              {/* Color Sliders */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-1 border-t border-[#242424]">
                <div>
                  <div className="flex justify-between text-[#857d6e] text-[10px] mb-1">
                    <span className="flex items-center gap-1"><Sun className="w-2.5 h-2.5" /> Brilho</span>
                    <span className="font-mono text-[#e5e2e1]">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="140"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full accent-[#d4af37] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[#857d6e] text-[10px] mb-1">
                    <span className="flex items-center gap-1"><Contrast className="w-2.5 h-2.5" /> Contraste</span>
                    <span className="font-mono text-[#e5e2e1]">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="140"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full accent-[#d4af37] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[#857d6e] text-[10px] mb-1">
                    <span className="flex items-center gap-1"><Flame className="w-2.5 h-2.5 text-[#d4af37]" /> Tom Dourado</span>
                    <span className="font-mono text-[#f2ca50]">{goldenWarmth}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={goldenWarmth}
                    onChange={(e) => setGoldenWarmth(parseInt(e.target.value))}
                    className="w-full accent-[#d4af37] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[#857d6e] text-[10px] mb-1">
                    <span className="flex items-center gap-1"><Droplet className="w-2.5 h-2.5" /> Vinheta</span>
                    <span className="font-mono text-[#e5e2e1]">{vignette}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={vignette}
                    onChange={(e) => setVignette(parseInt(e.target.value))}
                    className="w-full accent-[#d4af37] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Overlays & Brand Elements */}
            <div className="bg-[#121212] border border-[#242424] rounded-2xl p-4 space-y-3">
              <label className="text-xs font-bold text-[#e5e2e1] uppercase tracking-wider flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-[#d4af37]" />
                Elementos de Marca & Textos na Arte
              </label>

              {/* Badge Toggle & Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] text-[#a09885] flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showBadgeOverlay}
                      onChange={(e) => setShowBadgeOverlay(e.target.checked)}
                      className="accent-[#d4af37] rounded"
                    />
                    <span>Selo Oficial Superior</span>
                  </label>
                  <span className="text-[9px] text-[#f2ca50] font-bold">Dourado Prime</span>
                </div>
                {showBadgeOverlay && (
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] text-xs rounded-lg px-2.5 py-1.5 focus:border-[#d4af37] focus:outline-none"
                    placeholder="Ex: HOMOLOGADO SENATRAN"
                  />
                )}
              </div>

              {/* Title Overlay Toggle & Input */}
              <div className="space-y-1.5 pt-2 border-t border-[#242424]">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] text-[#a09885] flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showTitleOverlay}
                      onChange={(e) => setShowTitleOverlay(e.target.checked)}
                      className="accent-[#d4af37] rounded"
                    />
                    <span>Título do Curso Inferior</span>
                  </label>
                </div>
                {showTitleOverlay && (
                  <input
                    type="text"
                    value={titleOverlayText}
                    onChange={(e) => setTitleOverlayText(e.target.value)}
                    className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] text-xs rounded-lg px-2.5 py-1.5 focus:border-[#d4af37] focus:outline-none font-bold"
                    placeholder="Ex: CURSO MOPP 100% ONLINE"
                  />
                )}
              </div>

              {/* Price / Workload Pill */}
              <div className="space-y-1.5 pt-2 border-t border-[#242424]">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] text-[#a09885] flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPriceOverlay}
                      onChange={(e) => setShowPriceOverlay(e.target.checked)}
                      className="accent-[#d4af37] rounded"
                    />
                    <span>Preço / Carga Horária</span>
                  </label>
                </div>
                {showPriceOverlay && (
                  <input
                    type="text"
                    value={priceOverlayText}
                    onChange={(e) => setPriceOverlayText(e.target.value)}
                    className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] text-xs rounded-lg px-2.5 py-1.5 focus:border-[#d4af37] focus:outline-none"
                    placeholder="Ex: R$ 197,00 • 50 Horas"
                  />
                )}
              </div>

              {/* Frame Border */}
              <div className="pt-2 border-t border-[#242424]">
                <label className="text-[11px] text-[#a09885] flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showGoldFrame}
                    onChange={(e) => setShowGoldFrame(e.target.checked)}
                    className="accent-[#d4af37] rounded"
                  />
                  <span>Moldura Fina Dourada (#d4af37)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROMPT & COMPANION TEXT GENERATOR */}
      {activeTab === 'generator' && (
        <div className="space-y-6">
          {/* Generator Settings Bar */}
          <div className="bg-[#121212] border border-[#242424] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h2 className="text-sm font-black text-[#e5e2e1] uppercase tracking-wider">
                  Configurador de Criação Multimodal
                </h2>
              </div>
              <button
                id="btn-generate-prompt-package"
                onClick={handleGeneratePackage}
                className="gold-gradient-bg text-[#0A0A0A] font-bold text-xs px-4 py-2 rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Wand2 className="w-4 h-4" />
                <span>Gerar Prompt & Textos de Apoio</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* Aspect Ratio Select */}
              <div>
                <label className="text-[10px] text-[#857d6e] uppercase font-bold block mb-1">
                  1. Proporção da Arte
                </label>
                <select
                  value={targetRatio}
                  onChange={(e) => setTargetRatio(e.target.value as any)}
                  className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] rounded-lg p-2 focus:border-[#d4af37] focus:outline-none cursor-pointer"
                >
                  <option value="1:1">1:1 — Feed Quadrado (Instagram/Facebook)</option>
                  <option value="4:5">4:5 — Feed Retrato (Alta Atenção)</option>
                  <option value="9:16">9:16 — Vertical (Stories / Reels / TikTok)</option>
                  <option value="16:9">16:9 — Panorâmico (Banner / YouTube)</option>
                </select>
              </div>

              {/* Visual Style Select */}
              <div>
                <label className="text-[10px] text-[#857d6e] uppercase font-bold block mb-1">
                  2. Estilo Fotográfico
                </label>
                <select
                  value={visualStyle}
                  onChange={(e) => setVisualStyle(e.target.value as any)}
                  className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] rounded-lg p-2 focus:border-[#d4af37] focus:outline-none cursor-pointer"
                >
                  <option value="Photorealistic">Fotorrealista (Sony A7R V 85mm)</option>
                  <option value="Cinematic">Cinematográfico (Arri Alexa 35mm)</option>
                  <option value="Studio">Estúdio Comercial (Hasselblad)</option>
                  <option value="Advertising">Publicitário de Alta Conversão</option>
                  <option value="PracticalAction">Ação Prática & Operação (Leica)</option>
                </select>
              </div>

              {/* AI Engine Select */}
              <div>
                <label className="text-[10px] text-[#857d6e] uppercase font-bold block mb-1">
                  3. Motor de Imagem IA
                </label>
                <select
                  value={targetEngine}
                  onChange={(e) => setTargetEngine(e.target.value as any)}
                  className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] rounded-lg p-2 focus:border-[#d4af37] focus:outline-none cursor-pointer"
                >
                  <option value="Midjourney v6">Midjourney v6.1 (/imagine)</option>
                  <option value="Flux.1">Flux.1 Schnell / Dev</option>
                  <option value="DALL-E 3">OpenAI DALL-E 3</option>
                  <option value="SDXL">Stable Diffusion SDXL</option>
                  <option value="Imagen 3">Google Imagen 3</option>
                </select>
              </div>

              {/* Custom Element */}
              <div>
                <label className="text-[10px] text-[#857d6e] uppercase font-bold block mb-1">
                  4. Detalhes Adicionais (Opcional)
                </label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Ex: mulher especialista, cabine moderna..."
                  className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] rounded-lg p-2 focus:border-[#d4af37] focus:outline-none text-xs"
                />
              </div>
            </div>
          </div>

          {/* Generated Dual Results: Prompts + Companion Texts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: AI Image Prompt */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#121212] border border-[#242424] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#d4af37]" />
                    <h3 className="text-xs font-bold text-[#e5e2e1] uppercase tracking-wider">
                      Prompt Oficial da Imagem ({targetEngine})
                    </h3>
                  </div>
                  <span className="text-[10px] gold-gradient-bg text-[#0A0A0A] font-bold px-2 py-0.5 rounded-full font-mono">
                    --ar {targetRatio}
                  </span>
                </div>

                {/* Prompt Box */}
                <div className="relative bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl p-4 font-mono text-xs text-[#f2ca50] leading-relaxed select-all">
                  <p>{currentGeneratedPackage.fullPrompt}</p>
                  <button
                    onClick={() => handleCopy(currentGeneratedPackage.fullPrompt, 'gen-prompt')}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] text-[#a09885] hover:text-[#f2ca50] transition-colors cursor-pointer"
                    title="Copiar prompt da imagem"
                  >
                    {copiedKey === 'gen-prompt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Negative Prompt */}
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#857d6e] uppercase font-bold mb-1">
                    <span>Negative Prompt (Evitar defeitos)</span>
                    <button
                      onClick={() => handleCopy(currentGeneratedPackage.negativePrompt, 'gen-neg')}
                      className="text-[#d4af37] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Copy className="w-2.5 h-2.5" /> Copiar
                    </button>
                  </div>
                  <div className="bg-[#171717] border border-[#242424] rounded-lg p-2.5 font-mono text-[11px] text-[#a09885]">
                    {currentGeneratedPackage.negativePrompt}
                  </div>
                </div>

                {/* Technical Photographic Specifications */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[#171717] p-3 rounded-xl border border-[#242424]">
                  <div>
                    <span className="text-[9px] text-[#857d6e] uppercase font-bold block">Iluminação</span>
                    <span className="text-[11px] text-[#e5e2e1]">{currentGeneratedPackage.lighting}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#857d6e] uppercase font-bold block">Enquadramento</span>
                    <span className="text-[11px] text-[#e5e2e1]">{currentGeneratedPackage.composition}</span>
                  </div>
                </div>

                {/* Save to library CTA */}
                <button
                  onClick={handleSaveGeneratedToLibrary}
                  className="w-full py-2 px-3 rounded-xl bg-[#171717] border border-[#d4af37]/40 text-[#f2ca50] hover:bg-[#d4af37]/15 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Salvar este Prompt na Biblioteca</span>
                </button>
              </div>
            </div>

            {/* Right: Companion Texts & Ad Copy */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#121212] border border-[#242424] rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#d4af37]" />
                    <h3 className="text-xs font-bold text-[#e5e2e1] uppercase tracking-wider">
                      Textos & Copy para Acompanhar a Imagem
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      const allText = `--- TÍTULO PARA ARTE ---\n${currentGeneratedPackage.companionTexts?.headlineOverlay}\n\n--- SUBTÍTULO ---\n${currentGeneratedPackage.companionTexts?.subheadline}\n\n--- LEGENDA REDES SOCIAIS ---\n${currentGeneratedPackage.companionTexts?.socialCaption}\n\n--- ANÚNCIO META ADS ---\nTexto: ${currentGeneratedPackage.companionTexts?.metaAdPrimaryText}\nTítulo: ${currentGeneratedPackage.companionTexts?.metaAdHeadline}\nCTA: ${currentGeneratedPackage.companionTexts?.ctaText}`;
                      handleCopy(allText, 'all-copy');
                    }}
                    className="text-xs gold-gradient-bg text-[#0A0A0A] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'all-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copiar Todos os Textos</span>
                  </button>
                </div>

                {/* Overlay Texts on Design */}
                <div className="bg-[#171717] border border-[#242424] rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#857d6e] uppercase font-bold">1. Texto para Sobrepor na Arte</span>
                    <button
                      onClick={() => handleCopy(currentGeneratedPackage.companionTexts?.headlineOverlay || '', 'copy-overlay')}
                      className="text-[#d4af37] text-[10px] hover:underline cursor-pointer"
                    >
                      {copiedKey === 'copy-overlay' ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <div className="text-xs font-extrabold text-[#f2ca50]">
                    {currentGeneratedPackage.companionTexts?.headlineOverlay}
                  </div>
                  <div className="text-[11px] text-[#a09885]">
                    {currentGeneratedPackage.companionTexts?.subheadline}
                  </div>
                </div>

                {/* Social Media Post Caption */}
                <div className="bg-[#171717] border border-[#242424] rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#857d6e] uppercase font-bold">2. Legenda do Post (Instagram / Facebook)</span>
                    <button
                      onClick={() => handleCopy(currentGeneratedPackage.companionTexts?.socialCaption || '', 'copy-caption')}
                      className="text-[#d4af37] text-[10px] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedKey === 'copy-caption' ? 'Copiado!' : 'Copiar Legenda'}
                    </button>
                  </div>
                  <div className="text-xs text-[#e5e2e1] whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                    {currentGeneratedPackage.companionTexts?.socialCaption}
                  </div>
                </div>

                {/* Meta Ads Copy */}
                <div className="bg-[#171717] border border-[#242424] rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#857d6e] uppercase font-bold">3. Copy para Anúncio Pago (Meta Ads)</span>
                    <button
                      onClick={() => handleCopy(currentGeneratedPackage.companionTexts?.metaAdPrimaryText || '', 'copy-ads')}
                      className="text-[#d4af37] text-[10px] hover:underline cursor-pointer"
                    >
                      {copiedKey === 'copy-ads' ? 'Copiado!' : 'Copiar Anúncio'}
                    </button>
                  </div>
                  <div className="text-xs text-[#a09885]">
                    <span className="text-[#857d6e] block text-[10px]">Texto Principal:</span>
                    {currentGeneratedPackage.companionTexts?.metaAdPrimaryText}
                  </div>
                  <div className="text-xs text-[#f2ca50] font-bold">
                    <span className="text-[#857d6e] block text-[10px] font-normal">Título do Anúncio:</span>
                    {currentGeneratedPackage.companionTexts?.metaAdHeadline}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROMPTS LIBRARY & CRUD */}
      {activeTab === 'library' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#121212] border border-[#242424] p-4 rounded-2xl">
            <div>
              <h2 className="text-sm font-bold text-[#e5e2e1] uppercase tracking-wider">
                Conceitos Salvos para {selectedProduct.name}
              </h2>
              <p className="text-xs text-[#a09885]">
                Biblioteca customizável com proporções, parâmetros de câmera e scripts de apoio.
              </p>
            </div>

            <button
              onClick={() => {
                setModalMode('create');
                setEditingPrompt({
                  title: `Novo Criativo ${selectedProduct.name}`,
                  aspectRatio: '1:1',
                  product: selectedProduct.name,
                  fullPrompt: `Commercial advertising photo for ${selectedProduct.name}, highly realistic 8k --ar 1:1`,
                  negativePrompt: 'blurry, low quality, cartoon'
                });
                setIsModalOpen(true);
              }}
              className="gold-gradient-bg text-[#0A0A0A] font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer hover:brightness-110 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Criar Novo Prompt Manual</span>
            </button>
          </div>

          {/* Prompts Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-[#121212] border border-[#242424] hover:border-[#d4af37]/50 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#f2ca50] truncate">{prompt.title}</span>
                    <span className="text-[10px] font-mono bg-[#171717] border border-[#2a2a2a] text-[#d4af37] px-2 py-0.5 rounded-full font-bold">
                      {prompt.aspectRatio}
                    </span>
                  </div>

                  <p className="text-xs text-[#a09885] mb-2">{prompt.objective}</p>

                  <div className="bg-[#0d0d0d] border border-[#242424] rounded-lg p-3 font-mono text-[11px] text-[#e5e2e1] max-h-28 overflow-y-auto scrollbar-thin">
                    {prompt.fullPrompt}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#242424]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(prompt.fullPrompt, `lib-${prompt.id}`)}
                      className="text-xs bg-[#171717] hover:bg-[#252525] border border-[#2a2a2a] text-[#f2ca50] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedKey === `lib-${prompt.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copiar Prompt</span>
                    </button>

                    <button
                      onClick={() => {
                        setTargetRatio(prompt.aspectRatio);
                        setActiveTab('editor');
                      }}
                      className="text-xs text-[#a09885] hover:text-[#e5e2e1] px-2 py-1 cursor-pointer"
                      title="Abrir no Editor com esta proporção"
                    >
                      Abrir no Editor
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingPrompt(prompt);
                        setModalMode('edit');
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-[#857d6e] hover:text-[#f2ca50] transition-colors cursor-pointer"
                      title="Editar prompt"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Tem certeza que deseja excluir este prompt?')) {
                          setPrompts(prev => prev.filter(p => p.id !== prompt.id));
                        }
                      }}
                      className="p-1.5 text-[#857d6e] hover:text-red-400 transition-colors cursor-pointer"
                      title="Excluir prompt"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Create / Edit Prompt */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#242424] pb-3">
              <h3 className="text-sm font-bold text-[#e5e2e1] uppercase tracking-wider">
                {modalMode === 'create' ? 'Criar Novo Conceito de Prompt' : 'Editar Conceito de Prompt'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#857d6e] hover:text-[#e5e2e1] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] text-[#857d6e] uppercase font-bold block mb-1">Título do Conceito</label>
                <input
                  type="text"
                  value={editingPrompt.title || ''}
                  onChange={(e) => setEditingPrompt(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] rounded-lg p-2 focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#857d6e] uppercase font-bold block mb-1">Proporção</label>
                <select
                  value={editingPrompt.aspectRatio || '1:1'}
                  onChange={(e) => setEditingPrompt(prev => ({ ...prev, aspectRatio: e.target.value as any }))}
                  className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] rounded-lg p-2 focus:border-[#d4af37] focus:outline-none cursor-pointer"
                >
                  <option value="1:1">1:1 (Quadrado)</option>
                  <option value="4:5">4:5 (Retrato)</option>
                  <option value="9:16">9:16 (Vertical)</option>
                  <option value="16:9">16:9 (Panorâmico)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#857d6e] uppercase font-bold block mb-1">Prompt Completo (IA)</label>
                <textarea
                  rows={4}
                  value={editingPrompt.fullPrompt || ''}
                  onChange={(e) => setEditingPrompt(prev => ({ ...prev, fullPrompt: e.target.value }))}
                  className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] rounded-lg p-2 focus:border-[#d4af37] focus:outline-none font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#857d6e] uppercase font-bold block mb-1">Negative Prompt</label>
                <input
                  type="text"
                  value={editingPrompt.negativePrompt || ''}
                  onChange={(e) => setEditingPrompt(prev => ({ ...prev, negativePrompt: e.target.value }))}
                  className="w-full bg-[#171717] border border-[#2a2a2a] text-[#e5e2e1] rounded-lg p-2 focus:border-[#d4af37] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#242424]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-[#857d6e] hover:text-[#e5e2e1] text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  if (modalMode === 'create') {
                    const newP: ImagePromptConcept = {
                      id: `custom-${Date.now()}`,
                      title: editingPrompt.title || 'Novo Prompt',
                      aspectRatio: editingPrompt.aspectRatio || '1:1',
                      headline: editingPrompt.headline || '',
                      cta: 'Matricule-se',
                      objective: 'Criativo personalizado',
                      product: selectedProduct.name,
                      audience: selectedProduct.targetAudience,
                      character: 'Especialista',
                      environment: 'Rodovia',
                      vehicleOrEquipment: 'Veículo moderno',
                      lighting: 'Golden hour',
                      composition: 'Composição comercial',
                      mood: 'Confiança',
                      fullPrompt: editingPrompt.fullPrompt || '',
                      negativePrompt: editingPrompt.negativePrompt || ''
                    };
                    setPrompts(prev => [newP, ...prev]);
                  } else {
                    setPrompts(prev => prev.map(p => p.id === editingPrompt.id ? { ...p, ...editingPrompt } as ImagePromptConcept : p));
                  }
                  setIsModalOpen(false);
                }}
                className="gold-gradient-bg text-[#0A0A0A] font-bold text-xs px-4 py-2 rounded-xl cursor-pointer hover:brightness-110 shadow-sm"
              >
                Salvar Conceito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
