import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  Check, 
  X, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product } from '../types';
import { AIGeneratorService } from '../services/aiGenerator';

interface PDFImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (product: Product) => void;
}

export const PDFImportModal: React.FC<PDFImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess
}) => {
  const [step, setStep] = useState<'upload' | 'review'>('upload');
  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedProduct, setExtractedProduct] = useState<Product | null>(null);

  if (!isOpen) return null;

  const handleSampleCatalog = () => {
    setFileName('Catalogo_Especializado_Prime_2025.pdf');
    const sample = `CURSO DE CONDUTOR DE TRANSPORTE ESCOLAR (50 HORAS)
Modalidade: 100% Online (EAD)
Órgão Regulador: SENATRAN / DETRAN
Carga horária total: 50 horas/aula
Público Alvo: Motoristas que desejam atuar no transporte escolar de crianças e adolescentes.
Pré-requisitos: Ter mais de 21 anos, CNH categoria D ou E, não ter cometido infrações gravíssimas nos últimos 12 meses.
Módulos:
1. Legislação de Trânsito específica e Estatuto da Criança e do Adolescente (ECA)
2. Direção Defensiva aplicada ao transporte coletivo escolar
3. Primeiros Socorros e Atendimento Emergencial
4. Relacionamento Interpessoal e Psicologia no Trânsito
Certificação: Válido por 5 anos em todo o Brasil.
Investimento: De R$ 349,00 por apenas R$ 249,90 em até 12x no cartão de crédito.`;
    setRawText(sample);
  };

  const handleProcess = () => {
    if (!rawText.trim()) {
      alert('Por favor, digite ou cole o texto do documento/PDF para análise da IA.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const parsed = AIGeneratorService.extractProductFromPDFText(rawText, fileName || 'Documento_Importado.pdf');
      setExtractedProduct(parsed);
      setStep('review');
      setIsProcessing(false);
      confetti({ particleCount: 50, spread: 60 });
    }, 400);
  };

  const handleConfirmImport = () => {
    if (extractedProduct) {
      onImportSuccess(extractedProduct);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#181818] border border-[#2d2d2d] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d2d2d] flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#203a20] border border-[#3d6e3d] flex items-center justify-center text-[#7ee787]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#e5e2e1] font-heading">
                Importador Inteligente de PDF / Portfólio
              </h2>
              <p className="text-xs text-[#857d6e]">
                A IA analisa o documento, extrai metadados pedagógicos e cadastra o curso automaticamente.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#857d6e] hover:text-[#e5e2e1] hover:bg-[#222] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {step === 'upload' && (
            <div className="space-y-4">
              {/* Drag & Drop Simulation Box */}
              <div className="border-2 border-dashed border-[#353535] hover:border-[#d4af37] rounded-2xl p-6 text-center space-y-3 bg-[#121212]/50 transition-colors">
                <FileText className="w-10 h-10 text-[#d4af37] mx-auto opacity-80" />
                <div>
                  <h3 className="text-sm font-bold text-[#e5e2e1]">
                    Cole o conteúdo do PDF ou escolha um exemplo
                  </h3>
                  <p className="text-xs text-[#857d6e] mt-1">
                    Suporta propostas comerciais, portfólios antigos, ementas de cursos e apostilas.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSampleCatalog}
                    className="px-4 py-1.5 rounded-lg bg-[#222] hover:bg-[#2a2a2a] text-xs font-semibold text-[#f2ca50] border border-[#333] cursor-pointer"
                  >
                    📄 Carregar Exemplo: Transporte Escolar (50h)
                  </button>
                </div>
              </div>

              {/* Text Area Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#a09885] flex items-center justify-between">
                  <span>Texto Extraído do Documento:</span>
                  <span className="text-[10px] text-[#857d6e]">A IA identificará normas e cargas horárias</span>
                </label>
                <textarea
                  rows={8}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Cole aqui o texto do PDF, ementa ou catálogo..."
                  className="w-full rounded-xl studio-input p-3.5 text-xs text-[#e5e2e1] font-mono leading-relaxed"
                />
              </div>
            </div>
          )}

          {step === 'review' && extractedProduct && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#172517] border border-[#2d4d2d] text-xs text-[#7ee787] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Dados extraídos com sucesso pela Inteligência Artificial! Revise as informações antes de salvar.</span>
              </div>

              <div className="studio-card rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#f2ca50] font-mono">{extractedProduct.codeSKU}</span>
                  <span className="text-xs text-[#857d6e]">{extractedProduct.category}</span>
                </div>

                <h3 className="text-base font-bold text-[#e5e2e1] font-heading">{extractedProduct.name}</h3>
                <p className="text-xs text-[#a09885]">{extractedProduct.shortDescription}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#242424] text-xs">
                  <div>
                    <span className="text-[#857d6e] block text-[10px]">Carga Horária</span>
                    <strong className="text-[#f2ca50]">{extractedProduct.workloadHours} horas</strong>
                  </div>
                  <div>
                    <span className="text-[#857d6e] block text-[10px]">Modalidade</span>
                    <strong className="text-[#e5e2e1]">{extractedProduct.modality}</strong>
                  </div>
                  <div>
                    <span className="text-[#857d6e] block text-[10px]">Preço Sugerido</span>
                    <strong className="text-[#7ee787]">R$ {extractedProduct.promoPrice?.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span className="text-[#857d6e] block text-[10px]">Status Legal</span>
                    <strong className="text-[#f2ca50]">{extractedProduct.legalStatus}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#242424] space-y-1 text-xs">
                  <span className="text-[#857d6e] font-bold block">Módulos Programáticos Identificados:</span>
                  {extractedProduct.syllabusModules.map((m, idx) => (
                    <div key={idx} className="text-[#d0c5af]">• {m.title}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2d2d2d] bg-[#141414] flex items-center justify-between">
          <button
            onClick={() => {
              if (step === 'review') setStep('upload');
              else onClose();
            }}
            className="px-4 py-2 rounded-lg border border-[#333] text-xs font-semibold text-[#857d6e] hover:text-[#e5e2e1] cursor-pointer"
          >
            {step === 'review' ? '← Voltar e Editar' : 'Cancelar'}
          </button>

          {step === 'upload' ? (
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-2 rounded-lg gold-gradient-bg text-[#0A0A0A] font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {isProcessing ? 'Analisando com IA...' : 'Analisar e Extrair Curso'}
            </button>
          ) : (
            <button
              onClick={handleConfirmImport}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0A0A] font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Confirmar e Adicionar à Base de Cursos
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
