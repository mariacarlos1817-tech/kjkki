import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Copy, 
  Check, 
  Layers, 
  ShieldAlert, 
  Award,
  BookOpen
} from 'lucide-react';
import { Product, BrandKit } from '../types';
import { AIGeneratorService } from '../services/aiGenerator';

interface CopywritingStudioViewProps {
  selectedProduct: Product;
  brandKit: BrandKit;
}

export const CopywritingStudioView: React.FC<CopywritingStudioViewProps> = ({
  selectedProduct,
  brandKit
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const frameworks = React.useMemo(() => {
    return AIGeneratorService.generateCopyFrameworks(selectedProduct, brandKit);
  }, [selectedProduct, brandKit]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#f2ca50] uppercase tracking-wider mb-1">
            Copywriting & Frameworks Studio
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#e5e2e1] font-heading">
            Frameworks de Alta Conversão
          </h1>
          <p className="text-xs text-[#a09885] mt-1">
            Textos estruturados nos modelos clássicos de copywriting: AIDA, PAS e BAB.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AIDA Card */}
        <div className="studio-card rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#242424] pb-2">
              <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider font-mono">
                {frameworks.aida.framework}
              </span>
              <button
                onClick={() => handleCopy(`AIDA:\nA: ${frameworks.aida.attention}\nI: ${frameworks.aida.interest}\nD: ${frameworks.aida.desire}\nA: ${frameworks.aida.action}`, 'aida')}
                className="p-1 rounded bg-[#222] text-[#857d6e] hover:text-[#f2ca50] cursor-pointer"
              >
                {copiedKey === 'aida' ? <Check className="w-3.5 h-3.5 text-[#7ee787]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-[#f2ca50] block">Atenção (Attention):</strong>
                <p className="text-[#d0c5af] mt-0.5">{frameworks.aida.attention}</p>
              </div>
              <div>
                <strong className="text-[#f2ca50] block">Interesse (Interest):</strong>
                <p className="text-[#d0c5af] mt-0.5">{frameworks.aida.interest}</p>
              </div>
              <div>
                <strong className="text-[#f2ca50] block">Desejo (Desire):</strong>
                <p className="text-[#d0c5af] mt-0.5">{frameworks.aida.desire}</p>
              </div>
              <div>
                <strong className="text-[#f2ca50] block">Ação (Action):</strong>
                <p className="text-[#7ee787] mt-0.5 font-semibold">{frameworks.aida.action}</p>
              </div>
            </div>
          </div>
        </div>

        {/* PAS Card */}
        <div className="studio-card rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#242424] pb-2">
              <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider font-mono">
                {frameworks.pas.framework}
              </span>
              <button
                onClick={() => handleCopy(`PAS:\nProblema: ${frameworks.pas.problem}\nAgitação: ${frameworks.pas.agitation}\nSolução: ${frameworks.pas.solution}`, 'pas')}
                className="p-1 rounded bg-[#222] text-[#857d6e] hover:text-[#f2ca50] cursor-pointer"
              >
                {copiedKey === 'pas' ? <Check className="w-3.5 h-3.5 text-[#7ee787]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-[#ff7b7b] block">Problema (Problem):</strong>
                <p className="text-[#d0c5af] mt-0.5">{frameworks.pas.problem}</p>
              </div>
              <div>
                <strong className="text-[#ffbb7b] block">Agitação (Agitation):</strong>
                <p className="text-[#d0c5af] mt-0.5">{frameworks.pas.agitation}</p>
              </div>
              <div>
                <strong className="text-[#7ee787] block">Solução (Solution):</strong>
                <p className="text-[#7ee787] mt-0.5 font-semibold">{frameworks.pas.solution}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BAB Card */}
        <div className="studio-card rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#242424] pb-2">
              <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider font-mono">
                {frameworks.bab.framework}
              </span>
              <button
                onClick={() => handleCopy(`BAB:\nAntes: ${frameworks.bab.before}\nDepois: ${frameworks.bab.after}\nPonte: ${frameworks.bab.bridge}`, 'bab')}
                className="p-1 rounded bg-[#222] text-[#857d6e] hover:text-[#f2ca50] cursor-pointer"
              >
                {copiedKey === 'bab' ? <Check className="w-3.5 h-3.5 text-[#7ee787]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <strong className="text-[#a09885] block">Antes (Before):</strong>
                <p className="text-[#d0c5af] mt-0.5">{frameworks.bab.before}</p>
              </div>
              <div>
                <strong className="text-[#f2ca50] block">Depois (After):</strong>
                <p className="text-[#d0c5af] mt-0.5">{frameworks.bab.after}</p>
              </div>
              <div>
                <strong className="text-[#7ee787] block">Ponte (Bridge):</strong>
                <p className="text-[#7ee787] mt-0.5 font-semibold">{frameworks.bab.bridge}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
