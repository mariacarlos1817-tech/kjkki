import React from 'react';

interface NexLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'text-only' | 'badge';
  className?: string;
  showSubtitle?: boolean;
}

export const NexLogo: React.FC<NexLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  showSubtitle = true
}) => {
  // Dimension helpers
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20'
  }[size];

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl'
  }[size];

  const subTextSize = {
    sm: 'text-[8px]',
    md: 'text-[9px]',
    lg: 'text-[11px]',
    xl: 'text-[13px]'
  }[size];

  // SVG representation of the 3D Metallic Emerald 'N' with pixel dispersion
  const LogoIcon = (
    <div className={`relative ${iconDimensions} shrink-0 flex items-center justify-center`}>
      <svg 
        viewBox="0 0 120 120" 
        className="w-full h-full drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer Ring Gradient */}
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* 3D Emerald Metallic N Gradients */}
          <linearGradient id="emeraldStemLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          <linearGradient id="emeraldDiagonal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="30%" stopColor="#10b981" />
            <stop offset="70%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="emeraldStemRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="40%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="specularGlow" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#a7f3d0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
          </linearGradient>

          {/* Dark Pixel Shadow */}
          <radialGradient id="pixelDarkGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
        </defs>

        {/* Outer Circular Ring */}
        <circle cx="60" cy="60" r="56" stroke="url(#ringGrad)" strokeWidth="3" opacity="0.85" />
        <circle cx="60" cy="60" r="54" fill="#0b120f" fillOpacity="0.85" />

        {/* Left Side Dispersed Pixel Blocks (Dark slate / Carbon) */}
        <g fill="#1e2d24">
          <rect x="22" y="72" width="4.5" height="4.5" rx="0.5" />
          <rect x="27" y="66" width="5" height="5" rx="0.5" />
          <rect x="24" y="60" width="5.5" height="5.5" rx="0.5" />
          <rect x="29" y="54" width="6" height="6" rx="0.5" />
          <rect x="30" y="44" width="5" height="5" rx="0.5" />
          <rect x="33" y="38" width="5" height="5" rx="0.5" />
          <rect x="27" y="78" width="5" height="5" rx="0.5" />
          <rect x="33" y="73" width="5.5" height="5.5" rx="0.5" />
          <rect x="35" y="64" width="6" height="6" rx="0.5" />
          <rect x="36" y="53" width="6" height="6" rx="0.5" />
          <rect x="40" y="72" width="5.5" height="5.5" rx="0.5" />
        </g>

        {/* Right Side Dispersed Pixel Blocks (Soft Emerald) */}
        <g fill="#10b981">
          <rect x="92" y="24" width="4.5" height="4.5" rx="0.5" fill="#34d399" opacity="0.9" />
          <rect x="85" y="28" width="5" height="5" rx="0.5" fill="#10b981" />
          <rect x="91" y="34" width="5.5" height="5.5" rx="0.5" fill="#6ee7b7" />
          <rect x="83" y="37" width="6" height="6" rx="0.5" fill="#10b981" />
          <rect x="89" y="44" width="5.5" height="5.5" rx="0.5" fill="#059669" />
          <rect x="84" y="48" width="5.5" height="5.5" rx="0.5" fill="#10b981" />
          <rect x="82" y="22" width="4.5" height="4.5" rx="0.5" fill="#34d399" />
          <rect x="76" y="27" width="5.5" height="5.5" rx="0.5" fill="#10b981" />
          <rect x="73" y="35" width="6" height="6" rx="0.5" fill="#6ee7b7" />
        </g>

        {/* Left Column of 'N' */}
        <path
          d="M38 32 C38 30 40 28 42 28 H49 V86 C49 89 46 91 43 91 H39 C38 91 38 89 38 86 Z"
          fill="url(#emeraldStemLeft)"
        />

        {/* 3D Diagonal Fold / Ribbon of 'N' */}
        <path
          d="M39 30 C45 30 52 35 60 48 L76 74 C80 81 83 88 83 91 C83 93 81 94 77 94 C71 94 66 90 58 78 L43 51 C40 46 38 40 39 30 Z"
          fill="url(#emeraldDiagonal)"
        />

        {/* Specular Highlight Streak on Diagonal */}
        <path
          d="M48 36 L72 75 C75 80 78 85 79 88 C79 86 77 82 73 75 L51 38 C49 35 48 35 48 36 Z"
          fill="url(#specularGlow)"
          opacity="0.6"
        />

        {/* Right Column of 'N' */}
        <path
          d="M71 30 C71 28 73 28 75 28 H82 C84 28 85 30 85 33 V86 C85 89 83 91 80 91 H73 C71 91 71 89 71 86 Z"
          fill="url(#emeraldStemRight)"
        />

        {/* Subtle base shadow under N */}
        <ellipse cx="60" cy="98" rx="26" ry="3.5" fill="#000000" opacity="0.45" />
      </svg>
    </div>
  );

  if (variant === 'badge' || variant === 'compact') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {LogoIcon}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {LogoIcon}

      <div className="flex flex-col justify-center">
        {/* Main Logo Text: NexMarketing */}
        <div className={`font-black tracking-tight font-heading flex items-center leading-none ${textSize}`}>
          <span className="text-[#ffffff]">Nex</span>
          <span className="text-[#10b981] drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]">M</span>
          <span className="text-[#ffffff]">arketing</span>
        </div>

        {/* Subtitle / Agency branding */}
        {showSubtitle && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`font-bold tracking-wider uppercase text-[#34d399] ${subTextSize}`}>
              Next Studio
            </span>
            <span className={`text-[#6ee7b7]/60 font-medium ${subTextSize}`}>•</span>
            <span className={`font-medium tracking-wide text-[#94a3b8] uppercase ${subTextSize}`}>
              Marketing Inteligente
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
