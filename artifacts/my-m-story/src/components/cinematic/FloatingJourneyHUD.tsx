import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Pause, Play, Sparkles, Compass } from 'lucide-react';

export interface SceneMeta {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  moonPhase: string; // emoji or symbol
}

export const SCENES: SceneMeta[] = [
  { id: 'scene-01', number: '01', title: 'طب استني... إنتِ بطلة الحكاية دي؟ 👀❤️', subtitle: 'The Secret Gate', moonPhase: '🌑' },
  { id: 'scene-02', number: '02', title: 'قبل ما حضرتك تدخلي على الخط 😂', subtitle: 'The World Before Her', moonPhase: '🌒' },
  { id: 'scene-03', number: '03', title: 'إحنا جايين نتكلم في الشغل... أهو 😏', subtitle: 'The Unexpected Meeting', moonPhase: '🌓' },
  { id: 'scene-04', number: '04', title: 'شكله حبها ولا إيه؟ 😂❤️', subtitle: 'A New Horizon', moonPhase: '🌔' },
  { id: 'scene-05', number: '05', title: 'القمر نزل يونس الواد ولا إيه؟ 🌙', subtitle: 'A Whole New World', moonPhase: '🌕' },
  { id: 'scene-07', number: '06', title: 'نحلم بإيه يا M؟ اختاري إنتِ بقى 😂✨', subtitle: 'Three Possible Destinations', moonPhase: '🌖' },
  { id: 'scene-the-way-i-see-you', number: '07', title: 'زي ما أنا شايفك ❤️', subtitle: 'The Way I See You', moonPhase: '💖' },
  { id: 'scene-08', number: '08', title: 'المرة دي الكلام جد يا ستي ❤️', subtitle: 'The Promise', moonPhase: '🌗' },
  { id: 'scene-09', number: '09', title: 'الراوي هيسيبكم دقيقتين... عنده إحساس 😂', subtitle: 'The Narrator Steps Aside', moonPhase: '🌙' },
  { id: 'scene-10', number: '10', title: 'خلاص بقى... محمد عايز يقولك حاجة 🥹❤️', subtitle: 'The Letter from M ❤️', moonPhase: '✨' },
];

interface FloatingJourneyHUDProps {
  currentSceneIndex: number;
  onNavigate: (index: number) => void;
  onRestart: () => void;
  paused: boolean;
  onTogglePause: () => void;
  progressPercent: number;
}

export function FloatingJourneyHUD({
  currentSceneIndex,
  onNavigate,
  onRestart,
  paused,
  onTogglePause,
  progressPercent,
}: FloatingJourneyHUDProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentScene = SCENES[currentSceneIndex] || SCENES[0];

  const handleNext = () => {
    if (currentSceneIndex < SCENES.length - 1) {
      onNavigate(currentSceneIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSceneIndex > 0) {
      onNavigate(currentSceneIndex - 1);
    }
  };

  return (
    <>
      {/* Top minimal starlight progress line */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-black/40 backdrop-blur-sm pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(progressPercent)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-[#B5263D] via-[#E35D73] to-[#A9C8F0] shadow-[0_0_12px_rgba(227,93,115,0.8)] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Discrete floating top watermark mark */}
      <div className="fixed top-4 right-6 z-40 flex items-center gap-3 pointer-events-auto">
        <button
          onClick={() => onNavigate(0)}
          className="group flex items-center gap-2 rounded-full border border-[#A9C8F0]/20 bg-[#07152F]/70 px-3.5 py-1.5 backdrop-blur-md text-[#FFF0D6] shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all hover:border-[#E35D73]/60 hover:bg-[#0B2045]"
          title="العودة إلى البداية"
          aria-label="العودة إلى بداية الرحلة"
        >
          <span className="serif text-sm tracking-widest text-[#FFF0D6] font-semibold">MY M</span>
          <span className="text-[#E35D73] text-sm group-hover:scale-125 transition-transform">❤️</span>
        </button>
      </div>

      {/* Floating HUD at bottom */}
      <nav
        aria-label="مسار الرحلة الخيالية"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-3 rounded-full border border-[#A9C8F0]/25 bg-[#07152F]/85 px-3 py-2 sm:px-4 sm:py-2.5 shadow-[0_10px_35px_rgba(7,21,47,0.7),0_0_20px_rgba(181,38,61,0.2)] backdrop-blur-xl transition-all"
      >
        {/* Previous scene button */}
        <button
          onClick={handlePrev}
          disabled={currentSceneIndex === 0}
          aria-label="المشهد السابق"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#A9C8F0] transition-all hover:bg-[#16376A] hover:text-[#FFF0D6] disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* Current scene button & indicator */}
        <button
          onClick={() => setDrawerOpen((prev) => !prev)}
          className="flex items-center gap-2.5 rounded-full px-3 py-1 text-right transition-colors hover:bg-white/5"
          title="عرض فصول الرحلة"
        >
          <span className="text-base sm:text-lg animate-pulse" aria-hidden="true">
            {currentScene.moonPhase}
          </span>
          <div className="flex flex-col">
            <span className="arabic text-xs sm:text-sm font-semibold text-[#FFF0D6] leading-none">
              {currentScene.number} · {currentScene.title}
            </span>
            <span className="serif text-[9px] sm:text-[10px] text-[#A9C8F0]/70 tracking-wider">
              {currentScene.subtitle}
            </span>
          </div>
          <Compass className="h-3.5 w-3.5 text-[#E35D73] mr-1" />
        </button>

        {/* Next scene button */}
        <button
          onClick={handleNext}
          disabled={currentSceneIndex === SCENES.length - 1}
          aria-label="المشهد التالي"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B5263D] text-[#FFF0D6] shadow-[0_0_15px_rgba(181,38,61,0.5)] transition-all hover:bg-[#E35D73] hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-[#B5263D]"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* Separator */}
        <div className="h-5 w-px bg-white/15 mx-0.5" />

        {/* Pause/Play ambient motion */}
        <button
          onClick={onTogglePause}
          aria-label={paused ? 'تشغيل الحركة' : 'إيقاف الحركة مؤقتًا'}
          title={paused ? 'تشغيل الحركة' : 'إيقاف الحركة مؤقتًا'}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#A9C8F0] hover:text-[#FFF0D6] hover:bg-white/10 transition-colors"
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>

        {/* Restart Journey button */}
        <button
          onClick={onRestart}
          aria-label="إعادة الرحلة من البداية"
          title="إعادة الرحلة من البداية"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#A9C8F0] hover:text-[#E35D73] hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </nav>

      {/* Quick Jump Drawer Modal */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-[#A9C8F0]/30 bg-[#07152F]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-right"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#E35D73]" />
                <h3 className="arabic text-xl font-bold text-[#FFF0D6]">محطات رحلة MY M ❤️</h3>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-full px-3 py-1 text-xs text-[#A9C8F0] hover:bg-white/10"
              >
                إغلاق ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    onNavigate(idx);
                    setDrawerOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-right transition-all ${
                    idx === currentSceneIndex
                      ? 'border-[#B5263D] bg-[#16376A]/70 text-[#FFF0D6] shadow-[0_0_15px_rgba(181,38,61,0.35)]'
                      : 'border-white/5 bg-[#0B2045]/50 text-[#A9C8F0] hover:border-[#A9C8F0]/40 hover:bg-[#16376A]/40 hover:text-white'
                  }`}
                >
                  <span className="text-xl" aria-hidden="true">{scene.moonPhase}</span>
                  <div className="flex flex-col">
                    <span className="arabic text-sm font-semibold text-[#FFF0D6]">
                      {scene.number}. {scene.title}
                    </span>
                    <span className="serif text-[11px] text-[#A9C8F0]/60">
                      {scene.subtitle}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-[#A9C8F0]/70">
              <span>رحلة إلى عالم جديد · MY M ❤️</span>
              <button
                onClick={() => {
                  onRestart();
                  setDrawerOpen(false);
                }}
                className="text-[#E35D73] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="h-3 w-3" /> البدء من المشهد الأول
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
