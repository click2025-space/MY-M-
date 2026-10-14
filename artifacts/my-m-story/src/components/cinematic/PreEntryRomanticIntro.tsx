import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface PreEntryRomanticIntroProps {
  onEnter: () => void;
}

export function PreEntryRomanticIntro({ onEnter }: PreEntryRomanticIntroProps) {
  // Step 1: First message + «كمّلي معايا ❤️»
  // Step 2: Second message + «قولي يا سيدي 😂»
  // Step 3: Final question “Do you trust me, my señorita?” + «طب يلا بينا يا محمد ❤️»
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isStepChanging, setIsStepChanging] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Advance exactly one step on user click with a subtle, quick crossfade
  const handleAdvance = (next: 2 | 3) => {
    if (isStepChanging || isFadingOut) return;
    try {
      window.dispatchEvent(new CustomEvent('play-soundtrack-high-volume'));
    } catch {}
    setIsStepChanging(true);
    setTimeout(() => {
      setStep(next);
      setIsStepChanging(false);
    }, 200);
  };

  // Final entry button click: fade out smoothly and enter the main journey
  const handleFinalEntry = () => {
    if (isFadingOut) return;
    try {
      window.dispatchEvent(new CustomEvent('play-soundtrack-high-volume'));
    } catch {}
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  // Keyboard navigation support: Enter or Space activates the active button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (step === 1) {
          handleAdvance(2);
        } else if (step === 2) {
          handleAdvance(3);
        } else if (step === 3) {
          handleFinalEntry();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, isStepChanging, isFadingOut]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-[#07152F] select-none transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ isolation: 'isolate' }}
      dir="rtl"
    >
      {/* ========================================================= */}
      {/* 1. PEACEFUL NIGHTTIME BACKGROUND (STATIC / LIGHTWEIGHT)   */}
      {/* ========================================================= */}
      {/* Deep midnight sky gradient */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050E22] via-[#07152F] to-[#0B2045]"
        aria-hidden="true"
      />

      {/* A few subtle, motionless star points */}
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12%" cy="18%" r="1" fill="#FFF0D6" opacity="0.6" />
          <circle cx="28%" cy="12%" r="1.5" fill="#FFF0D6" opacity="0.8" />
          <circle cx="22%" cy="32%" r="1" fill="#A9C8F0" opacity="0.5" />
          <circle cx="42%" cy="15%" r="1" fill="#FFF0D6" opacity="0.6" />
          <circle cx="72%" cy="20%" r="1.5" fill="#FFF0D6" opacity="0.75" />
          <circle cx="84%" cy="14%" r="1" fill="#A9C8F0" opacity="0.6" />
          <circle cx="88%" cy="28%" r="1" fill="#FFF0D6" opacity="0.5" />
          <circle cx="64%" cy="35%" r="1" fill="#A9C8F0" opacity="0.4" />
          <circle cx="16%" cy="45%" r="1" fill="#FFF0D6" opacity="0.5" />
        </svg>
      </div>

      {/* The luminous, quiet moon */}
      <div
        className="pointer-events-none absolute top-[9%] sm:top-[12%] left-1/2 -translate-x-1/2 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="absolute h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-[#FFF0D6]/15 blur-3xl" />
        <div className="absolute h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-[#A9C8F0]/10 blur-xl" />

        <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-[#FFFDF7] via-[#FFF0D6] to-[#E5D7BE] shadow-[0_0_40px_rgba(255,240,214,0.5),0_0_80px_rgba(169,200,240,0.2)]">
          <div className="absolute top-[26%] left-[28%] h-5 w-5 rounded-full bg-[#DACAB0]/30 blur-[1px]" />
          <div className="absolute top-[48%] left-[44%] h-7 w-7 rounded-full bg-[#DACAB0]/25 blur-[1px]" />
          <div className="absolute top-[34%] right-[24%] h-5 w-5 rounded-full bg-[#DACAB0]/25 blur-[1px]" />
        </div>
      </div>

      {/* Calm Ocean Layer (lower 40% of the screen) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-b from-[#0B2045] via-[#07152F] to-[#050E22]"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[280px] sm:w-[420px] bg-gradient-to-b from-[#FFF0D6]/20 via-[#A9C8F0]/10 to-transparent blur-2xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[60%] w-[120px] sm:w-[180px] bg-gradient-to-b from-[#FFF0D6]/35 via-[#FFF0D6]/10 to-transparent blur-md" />
      </div>

      {/* Distant Arabian Palace Silhouette at the horizon */}
      <div
        className="pointer-events-none absolute top-[57%] sm:top-[56%] left-0 right-0 h-[12vh] min-h-[70px] max-h-[110px] opacity-60 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 180V120H90V98C90 85 102 76 110 62C118 76 130 85 130 98V120H180V75H192V42C192 28 199 18 203 4C207 18 214 28 214 42V75H226V120H320V102C320 90 330 80 340 66C350 80 360 90 360 102V120H430V84H442V46C442 32 450 22 454 8C458 22 466 32 466 46V84H478V120H580V98C580 85 592 74 605 60C618 74 630 85 630 98V120H710V74H722V34C722 22 730 14 734 2C738 14 746 22 746 34V74H758V120H850V105C850 94 862 84 875 70C888 84 900 94 900 105V120H990V78H1002V42C1002 28 1010 18 1014 4C1018 18 1026 28 1026 42V78H1038V120H1130V98C1130 84 1142 72 1155 58C1168 72 1180 84 1180 98V120H1270V84H1282V48C1282 35 1290 26 1294 12C1298 26 1306 35 1306 48V84H1318V120H1440V180H0Z"
            fill="#06142E"
          />
          <circle cx="203" cy="4" r="2" fill="#FFF0D6" opacity="0.7" />
          <circle cx="454" cy="8" r="2" fill="#FFF0D6" opacity="0.7" />
          <circle cx="734" cy="2" r="2.5" fill="#FFF0D6" opacity="0.8" />
          <circle cx="1014" cy="4" r="2" fill="#FFF0D6" opacity="0.7" />
        </svg>
      </div>

      {/* Small Royal-Red Accent: Delicate Flowing Ribbon Illustration */}
      <div
        className="pointer-events-none absolute bottom-[14%] right-[6%] sm:right-[12%] opacity-70"
        aria-hidden="true"
      >
        <svg width="180" height="70" viewBox="0 0 180 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 55 C45 20, 85 65, 125 35 C145 20, 165 40, 175 30"
            stroke="#B5263D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M8 54 C46 22, 86 64, 125 34 C144 21, 164 39, 173 29"
            stroke="#E35D73"
            strokeWidth="0.8"
            strokeOpacity="0.8"
          />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 2. USER-CONTROLLED DIALOGUE EXPERIENCE                    */}
      {/* ========================================================= */}
      {/* Top subtle category marker */}
      <div className="relative z-20 pt-8 sm:pt-12 text-center">
        <span className="serif text-xs sm:text-sm tracking-[0.25em] uppercase text-[#A9C8F0]/50">
          HEKAYATY · A Moment of Trust
        </span>
      </div>

      {/* Center Dialogue Container (Centered on screen) */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto w-full my-auto">
        <div
          className={`transition-opacity duration-200 ease-in-out w-full flex flex-col items-center ${
            isStepChanging ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* STEP 1: FIRST MESSAGE + «كمّلي معايا ❤️» */}
          {step === 1 && (
            <div className="flex flex-col items-center space-y-8 sm:space-y-10 w-full">
              <p className="arabic text-2xl sm:text-3xl md:text-4xl font-semibold text-[#FFF0D6] leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] max-w-2xl mx-auto">
                «بصي... أنا ممكن أقولك إن فيه حاجة حلوة مستنياكي جوّه، بس الكلام لوحده مش هيكفي.»
              </p>

              <button
                type="button"
                onClick={() => handleAdvance(2)}
                aria-label="كمّلي معايا"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#B5263D] hover:bg-[#681A32] border border-[#FFF0D6]/40 hover:border-[#FFF0D6] px-8 sm:px-10 py-3.5 sm:py-4 text-lg sm:text-xl font-bold text-[#FFF0D6] shadow-[0_4px_25px_rgba(181,38,61,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#A9C8F0] cursor-pointer"
              >
                <span className="arabic tracking-wide">كمّلي معايا</span>
                <Heart className="h-5 w-5 fill-[#FFF0D6] text-[#FFF0D6] transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>
          )}

          {/* STEP 2: SECOND MESSAGE + «قولي يا سيدي 😂» */}
          {step === 2 && (
            <div className="flex flex-col items-center space-y-8 sm:space-y-10 w-full">
              <p className="arabic text-2xl sm:text-3xl md:text-4xl font-semibold text-[#FFF0D6] leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] max-w-2xl mx-auto">
                «فكنت عايز أسألك سؤال صغير كده...»
              </p>

              <button
                type="button"
                onClick={() => handleAdvance(3)}
                aria-label="قولي يا سيدي"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#B5263D] hover:bg-[#681A32] border border-[#FFF0D6]/40 hover:border-[#FFF0D6] px-8 sm:px-10 py-3.5 sm:py-4 text-lg sm:text-xl font-bold text-[#FFF0D6] shadow-[0_4px_25px_rgba(181,38,61,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#A9C8F0] cursor-pointer"
              >
                <span className="arabic tracking-wide">قولي يا سيدي 😂</span>
              </button>
            </div>
          )}

          {/* STEP 3: FINAL QUESTION + «طب يلا بينا يا محمد ❤️» */}
          {step === 3 && (
            <div className="flex flex-col items-center space-y-8 sm:space-y-10 w-full">
              <div dir="ltr" className="relative px-4 text-center">
                <h1 className="serif italic text-3xl sm:text-5xl md:text-6xl font-semibold text-[#FFF0D6] tracking-tight leading-tight drop-shadow-[0_0_25px_rgba(255,240,214,0.45)]">
                  “Do you trust me, my señorita?”
                </h1>
                <p className="serif text-xs sm:text-sm tracking-[0.2em] uppercase text-[#A9C8F0]/60 mt-3 sm:mt-4">
                  A question from Mohamed to M ❤️
                </p>
              </div>

              <button
                id="intro-entry-btn"
                type="button"
                onClick={handleFinalEntry}
                disabled={isFadingOut}
                aria-label="طب يلا بينا يا محمد - الدخول إلى رحلة M"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#B5263D] hover:bg-[#681A32] border border-[#FFF0D6]/40 hover:border-[#FFF0D6] px-8 sm:px-10 py-3.5 sm:py-4 text-lg sm:text-xl font-bold text-[#FFF0D6] shadow-[0_4px_25px_rgba(181,38,61,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#A9C8F0] cursor-pointer"
              >
                <span className="arabic tracking-wide">طب يلا بينا يا محمد</span>
                <Heart className="h-5 w-5 fill-[#FFF0D6] text-[#FFF0D6] transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mohamed's Kind Soundtrack Dedication */}
      <div className="relative z-20 px-4 text-center max-w-xl mx-auto my-2 animate-in fade-in duration-700">
        <div
          onClick={() => {
            try {
              window.dispatchEvent(new CustomEvent('play-soundtrack-high-volume'));
            } catch {}
          }}
          className="inline-flex items-center gap-2.5 rounded-full border border-[#E35D73]/35 bg-[#0B2045]/85 px-4 sm:px-6 py-2 backdrop-blur-md text-[#FFF0D6] shadow-[0_4px_25px_rgba(7,21,47,0.7),0_0_15px_rgba(181,38,61,0.2)] cursor-pointer hover:border-[#E35D73]/70 hover:scale-[1.02] transition-all"
        >
          <span className="text-sm sm:text-base text-[#E35D73]" aria-hidden="true">🎵</span>
          <p className="arabic text-xs sm:text-sm font-medium text-[#FFF0D6] leading-relaxed">
            المزيكا دي معمولة مخصوص ليكي... محمد هو اللي عملها وركّبها عشانك بكل حب، علّي الصوت وعيشي الحكاية 🥹❤️
          </p>
        </div>
      </div>

      {/* Bottom spacer for balance */}
      <div className="relative z-20 pb-6 sm:pb-10 text-center">
        <span className="text-xs text-[#A9C8F0]/30 tracking-widest">
          {step === 1 ? '١ / ٣' : step === 2 ? '٢ / ٣' : '٣ / ٣'}
        </span>
      </div>
    </div>
  );
}
