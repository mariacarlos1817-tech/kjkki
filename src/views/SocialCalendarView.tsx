import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Copy, 
  Check, 
  Sparkles, 
  Share2, 
  Download,
  Clock,
  Layers
} from 'lucide-react';
import { Product, BrandKit } from '../types';
import { AIGeneratorService } from '../services/aiGenerator';

interface SocialCalendarViewProps {
  selectedProduct: Product;
  brandKit: BrandKit;
}

export const SocialCalendarView: React.FC<SocialCalendarViewProps> = ({
  selectedProduct,
  brandKit
}) => {
  const [daysCount, setDaysCount] = useState<number>(7);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const calendar = React.useMemo(() => {
    return AIGeneratorService.generateSocialCalendar(selectedProduct, brandKit, daysCount);
  }, [selectedProduct, brandKit, daysCount]);

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
            Social Media Studio
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#e5e2e1] font-heading">
            Calendário Editorial de Conteúdo
          </h1>
          <p className="text-xs text-[#a09885] mt-1">
            Planejamento estruturado de postagens para Instagram, Facebook e WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[7, 15, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDaysCount(d)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                daysCount === d
                  ? 'bg-[#d4af37]/25 text-[#f2ca50] border border-[#d4af37]/40'
                  : 'bg-[#181818] text-[#857d6e] hover:text-[#e5e2e1]'
              }`}
            >
              {d} Dias
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {calendar.map((item) => (
          <div key={item.day} className="studio-card rounded-xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#f2ca50] font-mono">
                  Dia {item.day < 10 ? `0${item.day}` : item.day}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#222] text-[#a09885] font-bold">
                  {item.format}
                </span>
              </div>

              <h3 className="text-xs font-bold text-[#e5e2e1] font-heading">{item.headline}</h3>
              <p className="text-xs text-[#857d6e] leading-relaxed whitespace-pre-wrap">{item.caption}</p>
            </div>

            <div className="pt-2 border-t border-[#242424] flex items-center justify-between">
              <span className="text-[11px] text-[#f2ca50] truncate max-w-[150px]">{item.cta}</span>
              <button
                onClick={() => handleCopy(`${item.headline}\n\n${item.caption}\n\nCTA: ${item.cta}`, `day-${item.day}`)}
                className="p-1 rounded bg-[#222] text-[#857d6e] hover:text-[#f2ca50] cursor-pointer shrink-0"
              >
                {copiedKey === `day-${item.day}` ? <Check className="w-3.5 h-3.5 text-[#7ee787]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
