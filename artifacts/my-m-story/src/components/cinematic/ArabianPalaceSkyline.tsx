interface ArabianPalaceSkylineProps {
  className?: string;
  opacity?: number;
}

export function ArabianPalaceSkyline({ className = '', opacity = 0.85 }: ArabianPalaceSkylineProps) {
  return (
    <div
      className={`pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[22vh] min-h-[140px] max-h-[260px] overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="palaceGrad" x1="720" y1="0" x2="720" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B2045" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#07152F" stopOpacity="0.96" />
            <stop offset="100%" stopColor="#07152F" stopOpacity="1" />
          </linearGradient>

          <filter id="windowGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Distant background layer (silhouette) */}
        <path
          d="M0 280V180H60V140C60 120 75 110 85 90C95 110 110 120 110 140V180H160V110H175V60C175 40 185 30 190 10C195 30 205 40 205 60V110H220V180H310V150C310 135 320 125 330 105C340 125 350 135 350 150V180H420V120H435V70C435 50 445 40 450 20C455 40 465 50 465 70V120H480V180H560V145C560 130 575 115 590 95C605 115 620 130 620 145V180H710V105H725V50C725 35 735 25 740 5C745 25 755 35 755 50V105H770V180H860V155C860 140 875 125 890 105C905 125 920 140 920 155V180H1010V115H1025V65C1025 45 1035 35 1040 15C1045 35 1055 45 1055 65V115H1070V180H1160V140C1160 120 1175 105 1190 85C1205 105 1220 120 1220 140V180H1310V125H1325V75C1325 55 1335 45 1340 25C1345 45 1355 55 1355 75V125H1370V180H1440V280H0Z"
          fill="url(#palaceGrad)"
          opacity="0.9"
        />

        {/* Foreground detailed palace walls, arches and minarets */}
        <path
          d="M0 280V200H45V160C45 145 58 135 70 120C82 135 95 145 95 160V200H140V140H152V95C152 75 160 65 165 45C170 65 178 75 178 95V140H190V200H270V165C270 150 282 140 295 125C308 140 320 150 320 165V200H380V150H392V105C392 85 400 75 405 55C410 75 418 85 418 105V150H430V200H510V170C510 155 525 142 540 128C555 142 570 155 570 170V200H650V135H662V85C662 65 670 55 675 35C680 55 688 65 688 85V135H700V200H790V165C790 150 805 138 820 122C835 138 850 150 850 165V200H940V140H952V90C952 70 960 60 965 40C970 60 978 70 978 90V140H990V200H1080V175C1080 160 1095 148 1110 132C1125 148 1140 160 1140 175V200H1220V145H1232V100C1232 80 1240 70 1245 50C1250 70 1258 80 1258 100V145H1270V200H1360V165C1360 150 1375 138 1390 122C1405 138 1420 150 1420 165V200H1440V280H0Z"
          fill="#07152F"
        />

        {/* Glowing Palace Windows & Lanterns (Gold & Rose Glow) */}
        <g filter="url(#windowGlow)">
          {/* Minaret Crescent finials */}
          <circle cx="165" cy="42" r="3.5" fill="#FFF0D6" />
          <circle cx="405" cy="52" r="3" fill="#FFF0D6" />
          <circle cx="675" cy="32" r="4" fill="#FFF0D6" />
          <circle cx="965" cy="37" r="3.5" fill="#FFF0D6" />
          <circle cx="1245" cy="47" r="3.5" fill="#FFF0D6" />

          {/* Arched windows with warm lantern light */}
          <rect x="65" y="165" width="8" height="15" rx="4" fill="#FFF0D6" opacity="0.85" />
          <rect x="78" y="165" width="8" height="15" rx="4" fill="#E35D73" opacity="0.75" />
          <rect x="160" y="110" width="10" height="16" rx="5" fill="#FFF0D6" opacity="0.9" />
          <rect x="290" y="170" width="8" height="14" rx="4" fill="#FFF0D6" opacity="0.8" />
          <rect x="400" y="118" width="10" height="18" rx="5" fill="#FFF0D6" opacity="0.85" />
          <rect x="532" y="172" width="7" height="14" rx="3.5" fill="#E35D73" opacity="0.7" />
          <rect x="545" y="172" width="7" height="14" rx="3.5" fill="#FFF0D6" opacity="0.85" />
          <rect x="670" y="98" width="10" height="20" rx="5" fill="#FFF0D6" opacity="0.95" />
          <rect x="812" y="170" width="8" height="15" rx="4" fill="#FFF0D6" opacity="0.8" />
          <rect x="826" y="170" width="8" height="15" rx="4" fill="#E35D73" opacity="0.75" />
          <rect x="960" y="105" width="10" height="18" rx="5" fill="#FFF0D6" opacity="0.9" />
          <rect x="1102" y="180" width="8" height="14" rx="4" fill="#FFF0D6" opacity="0.75" />
          <rect x="1240" y="115" width="10" height="16" rx="5" fill="#FFF0D6" opacity="0.85" />
          <rect x="1382" y="170" width="8" height="15" rx="4" fill="#FFF0D6" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
