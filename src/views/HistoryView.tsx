import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Copy, 
  Check, 
  Search, 
  Filter, 
  Sparkles, 
  FileText,
  Clock
} from 'lucide-react';
import { GeneratedMaterial } from '../types';

interface HistoryViewProps {
  history: GeneratedMaterial[];
  onClearHistory: () => void;
  onNavigate: (view: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onClearHistory,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = history.filter(h =>
    h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.format.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (item: GeneratedMaterial) => {
    navigator.clipboard.writeText(item.content);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#f2ca50] uppercase tracking-wider mb-1">
            Auditoria & Log
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#e5e2e1] font-heading">
            Histórico de Gerações
          </h1>
          <p className="text-xs text-[#a09885] mt-1">
            Registro cronológico de todas as peças de marketing, roteiros e anúncios criados.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#3d2424] bg-[#1a1414] text-xs font-semibold text-[#ff7b7b] hover:bg-[#251818] cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Limpar Histórico
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between gap-4 bg-[#141414] border border-[#242424] rounded-xl p-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#857d6e]" />
          <input
            type="text"
            placeholder="Buscar no histórico de gerações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg studio-input text-xs text-[#e5e2e1]"
          />
        </div>

        <span className="text-xs text-[#857d6e]">
          {filtered.length} registro(s) encontrado(s)
        </span>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="studio-card p-12 text-center text-xs text-[#857d6e]">
            Nenhuma geração registrada ainda. Inicie gerando textos no Description Studio ou Super Kit.
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="studio-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-[#181818] transition-colors">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-[#d4af37]/20 text-[#f2ca50] px-2 py-0.5 rounded font-mono font-bold">
                    {item.format}
                  </span>
                  <span className="text-xs font-bold text-[#e5e2e1]">{item.productName}</span>
                  <span className="text-[10px] text-[#857d6e]">• {new Date(item.createdAt).toLocaleTimeString('pt-BR')}</span>
                </div>
                <h4 className="text-xs font-bold text-[#a09885]">{item.title}</h4>
                <p className="text-xs text-[#d0c5af] font-mono whitespace-pre-wrap line-clamp-2 bg-[#0d0d0d] p-2.5 rounded-lg border border-[#222]">
                  {item.content}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                <button
                  onClick={() => handleCopy(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] text-xs font-semibold text-[#f2ca50] hover:bg-[#333] cursor-pointer"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === item.id ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
