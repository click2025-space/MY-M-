import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, Sparkles, Heart } from 'lucide-react';
import { StarfieldCanvas } from '@/components/cinematic/StarfieldCanvas';
import { OceanMoonShimmer } from '@/components/cinematic/OceanMoonShimmer';
import { ArabianPalaceSkyline } from '@/components/cinematic/ArabianPalaceSkyline';
import { FloatingJourneyHUD, SCENES } from '@/components/cinematic/FloatingJourneyHUD';
import { MagicalPortals } from '@/components/cinematic/MagicalPortals';
import { WaxSealLetter } from '@/components/cinematic/WaxSealLetter';
import { PreEntryRomanticIntro } from '@/components/cinematic/PreEntryRomanticIntro';
import { TheWayISeeYou } from '@/components/cinematic/TheWayISeeYou';
import { BackgroundSoundtrack } from '@/components/cinematic/BackgroundSoundtrack';

function SceneKicker({ number, titleEn }: { number: string; titleEn: string }) {
  return (
    <div className="reveal mb-4 flex items-center justify-center gap-3 text-xs tracking-widest text-[#A9C8F0] uppercase">
      <span className="h-px w-8 bg-current/40" />
      <span className="serif font-semibold">{number} · {titleEn}</span>
      <span className="h-px w-8 bg-current/40" />
    </div>
  );
}

function SceneHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="reveal reveal-delay-1 text-center mb-8">
      <h2 className="arabic text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#FFF0D6] drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
        {title}
      </h2>
      {subtitle && (
        <p className="arabic text-base sm:text-xl text-[#A9C8F0] mt-3 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function StoryCopy({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`story-copy arabic text-center mx-auto max-w-3xl space-y-4 ${className}`}>
      {children}
    </div>
  );
}

function SceneNavigationButtons({
  prevIndex,
  nextIndex,
  onGo,
}: {
  prevIndex?: number;
  nextIndex?: number;
  onGo: (index: number) => void;
}) {
  return (
    <div className="reveal reveal-delay-3 mt-12 flex flex-wrap items-center justify-center gap-4">
      {prevIndex !== undefined && (
        <button
          onClick={() => onGo(prevIndex)}
          className="flex items-center gap-2 rounded-full border border-[#A9C8F0]/30 bg-[#07152F]/70 px-5 py-2.5 text-sm font-semibold text-[#A9C8F0] backdrop-blur-md transition-all hover:border-[#A9C8F0] hover:text-[#FFF0D6]"
        >
          <ArrowRight className="h-4 w-4" /> ارجعي خطوة
        </button>
      )}
      {nextIndex !== undefined && (
        <button
          onClick={() => onGo(nextIndex)}
          className="flex items-center gap-2 rounded-full bg-[#B5263D] px-7 py-3 text-sm sm:text-base font-bold text-[#FFF0D6] shadow-[0_4px_20px_rgba(181,38,61,0.5)] transition-all hover:bg-[#E35D73] hover:scale-105"
        >
          كمّلي الرحلة <ArrowLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default function StoryPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Manage body scroll overflow: completely lock scroll while intro is visible
  useEffect(() => {
    if (!hasEntered) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasEntered]);

  // Update scroll progress & active scene (only when inside main journey)
  useEffect(() => {
    if (!hasEntered) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));

      // Find visible scene
      for (let i = SCENES.length - 1; i >= 0; i--) {
        const el = document.getElementById(SCENES[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveScene(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasEntered]);

  // IntersectionObserver for reveal animations
  useEffect(() => {
    if (!hasEntered) return;

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hasEntered, activeScene]);

  // Keyboard navigation (only active when main journey has been entered)
  useEffect(() => {
    if (!hasEntered) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (activeScene < SCENES.length - 1) {
          e.preventDefault();
          navigateTo(activeScene + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (activeScene > 0) {
          e.preventDefault();
          navigateTo(activeScene - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasEntered, activeScene]);

  const navigateTo = (index: number) => {
    const bounded = Math.max(0, Math.min(SCENES.length - 1, index));
    const target = document.getElementById(SCENES[bounded].id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const restartJourney = () => {
    navigateTo(0);
  };

  return (
    <>
      {/* Background Romantic Soundtrack (Autoplays on open & loops upon finish) */}
      <BackgroundSoundtrack />

      {/* ========================================================= */}
      {/* PRE-ENTRY ROMANTIC INTRO SCREEN                           */}
      {/* Full-screen magical moment with Flying Carpet & Question  */}
      {/* ========================================================= */}
      {!hasEntered && (
        <PreEntryRomanticIntro
          onEnter={() => {
            setHasEntered(true);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* MAIN STORY JOURNEY (COMPLETELY HIDDEN UNTIL ENTERED)      */}
      {/* ========================================================= */}
      <div
        ref={containerRef}
        className={`story-shell min-h-screen bg-[#07152F] text-[#F7F1E8] ${
          paused ? 'pause-motion' : ''
        } ${!hasEntered ? 'hidden' : 'block'}`}
        dir="rtl"
        aria-hidden={!hasEntered}
      >
        {/* Background Starfield Canvas across the entire universe */}
        <StarfieldCanvas paused={paused} />

        {/* Floating Starlight Compass / Moon Navigation HUD */}
        <FloatingJourneyHUD
          currentSceneIndex={activeScene}
        onNavigate={navigateTo}
        onRestart={restartJourney}
        paused={paused}
        onTogglePause={() => setPaused((p) => !p)}
        progressPercent={progress}
      />

      {/* ========================================================= */}
      {/* SCENE 01 — THE SECRET GATE                                */}
      {/* ========================================================= */}
      <section
        id="scene-01"
        className="scene scene-gate relative flex min-h-screen flex-col items-center justify-start px-4 sm:px-6 text-center"
      >
        {/* Positioned directly beneath the golden MY M logo */}
        <div className="story-content relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center pt-[43vh] sm:pt-[44vh] pb-24">
          {/* Narrator lines placed directly UNDER the MY M word */}
          <div className="reveal space-y-1 sm:space-y-1.5 text-center mb-3">
            <p className="arabic text-sm sm:text-base md:text-lg font-medium text-[#F7F1E8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.98)]">
              كان فيه حكاية لسه ما بدأتش...
            </p>
            <p className="arabic text-sm sm:text-base md:text-lg font-medium text-[#F7F1E8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.98)]">
              و حكاية تانية، كان صاحبها فاكر إنه عارف نهايتها من قبل ما تبدأ...
            </p>
            <p className="arabic text-sm sm:text-base md:text-lg font-medium text-[#F7F1E8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.98)]">
              بس أوقات، أجمل الحكايات بتبدأ لما الدنيا تقرر تغيّرلك الطريق
            </p>
            <p className="arabic text-sm sm:text-base md:text-lg font-medium text-[#F7F1E8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.98)]">
              تعالي... عشان فيه عالم تاني مستنيكي..
            </p>
          </div>

          {/* Subtitle & Start Button */}
          <div className="reveal reveal-delay-1 flex flex-col items-center mt-1">
            <h2 className="arabic text-sm sm:text-base md:text-lg text-[#FFF0D6] font-bold drop-shadow-[0_2px_14px_rgba(0,0,0,0.98)] mb-1">
              طب استني... إنتِ بطلة الحكاية دي؟ 👀❤️
            </h2>
            <p className="arabic text-xs sm:text-sm text-[#A9C8F0] font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.98)] mb-3">
              حكاية صغيرة... وعالم كامل مستخبي جواها
            </p>

            <button
              onClick={() => navigateTo(1)}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#FFF0D6]/50 bg-[#B5263D] px-8 sm:px-10 py-2 sm:py-2.5 text-sm sm:text-base font-bold text-[#FFF0D6] shadow-[0_4px_25px_rgba(181,38,61,0.7)] transition-all hover:bg-[#E35D73] hover:scale-105"
            >
              <span>نبدأ الرحلة؟ 🌙</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 02 — THE WORLD BEFORE HER                           */}
      {/* ========================================================= */}
      <section
        id="scene-02"
        className="scene scene-city relative flex min-h-screen items-center justify-center px-6 py-28"
      >
        <ArabianPalaceSkyline opacity={0.65} />

        <div className="story-content relative z-10 max-w-4xl mx-auto">
          <SceneKicker number="02" titleEn="The World Before Her" />
          <SceneHeading title="قبل ما حضرتك تدخلي على الخط 😂" subtitle="عالمه قبلها · خطوات محسوبة وعقل يقود الطريق" />

          {/* Structured routine / discipline graphic */}
          <div className="reveal my-8 flex items-center justify-center">
            <div className="relative flex items-center gap-4 rounded-2xl border border-[#A9C8F0]/25 bg-[#0B2045]/60 px-6 py-4 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <div className="h-2.5 w-2.5 rounded-full bg-[#A9C8F0] animate-ping" />
              <span className="serif text-sm tracking-wider text-[#A9C8F0]">
                Calculated Ambition · Deep Night Routine
              </span>
            </div>
          </div>

          <StoryCopy>
            <p className="reveal text-xl sm:text-2xl font-bold text-[#FFF0D6]">
              "كان فيه شاب عنده أحلام كتير..."
            </p>
            <p className="reveal text-lg sm:text-xl text-[#F7F1E8]/90">
              "عقله مشغول ببكرة، وخطواته محسوبة، وعينه دايمًا على الحاجة اللي لسه ما وصلهاش."
            </p>
            <p className="reveal text-lg sm:text-xl text-[#E35D73] font-semibold">
              "ما كانش شخص من غير مشاعر... لكنه كان متعوّد يخلي عقله يقود الطريق."
            </p>
          </StoryCopy>

          <SceneNavigationButtons prevIndex={0} nextIndex={2} onGo={navigateTo} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 03 — THE UNEXPECTED MEETING                         */}
      {/* ========================================================= */}
      <section
        id="scene-03"
        className="scene scene-encounter relative flex min-h-screen items-center justify-center px-6 py-28 text-center"
      >
        {/* Soft horizon glow with burgundy & rose reflections */}
        <div className="horizon-glow" aria-hidden="true" />

        <div className="story-content relative z-10 max-w-4xl mx-auto">
          <SceneKicker number="03" titleEn="The Unexpected Meeting" />
          <SceneHeading title="إحنا جايين نتكلم في الشغل... أهو 😏" subtitle="المقابلة غير المتوقعة · حين تغيّر الصدفة شكل المستقبل" />

          <div className="reveal my-8 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E35D73]/50 bg-[#681A32]/40 text-[#E35D73] shadow-[0_0_25px_rgba(227,93,115,0.4)]">
              <Sparkles className="h-8 w-8 animate-pulse" />
            </div>
          </div>

          <StoryCopy>
            <p className="reveal text-xl sm:text-2xl text-[#FFF0D6]">
              "ما كانش بيدوّر على حكاية حب..."
            </p>
            <p className="reveal text-lg sm:text-xl text-[#F7F1E8]/90">
              "ولا كان عارف إن مقابلة بدأت بسبب الشغل ممكن تغيّر شكل المستقبل في عينيه."
            </p>
            <div className="reveal my-6 rounded-2xl border-y border-[#E35D73]/40 bg-[#07152F]/60 py-6 px-4">
              <p className="arabic text-2xl sm:text-3xl font-bold text-[#E35D73] leading-relaxed">
                "لكنه قابلها... ومن هنا، الحكاية بدأت تاخد طريق تاني."
              </p>
            </div>
          </StoryCopy>

          <SceneNavigationButtons prevIndex={1} nextIndex={3} onGo={navigateTo} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 04 — A NEW HORIZON                                  */}
      {/* ========================================================= */}
      <section
        id="scene-04"
        className="scene scene-opening relative flex min-h-screen items-center justify-center px-6 py-28 text-center"
      >
        <div className="cloud-layer" aria-hidden="true" />
        <ArabianPalaceSkyline opacity={0.4} />

        <div className="story-content relative z-10 max-w-4xl mx-auto">
          <SceneKicker number="04" titleEn="A New Horizon" />
          <SceneHeading title="شكله حبها ولا إيه؟ 😂❤️" subtitle="أفق جديد · لما الطريق بدأ ياخد اتجاه تاني" />

          {/* Cinematic English display quote */}
          <div className="reveal my-8 rounded-3xl border border-[#A9C8F0]/30 bg-gradient-to-r from-[#0B2045]/80 via-[#16376A]/70 to-[#0B2045]/80 p-8 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <span className="serif text-xs uppercase tracking-widest text-[#A9C8F0] block mb-2">
              The Evolution of Dreams
            </span>
            <p dir="ltr" className="serif text-2xl sm:text-4xl text-[#FFF0D6] font-semibold leading-relaxed">
              He used to work for his brain.
            </p>
            <p dir="ltr" className="serif text-2xl sm:text-4xl italic text-[#E35D73] font-semibold mt-1">
              Now he works for his brain and his heart.
            </p>
          </div>

          <StoryCopy>
            <p className="reveal text-lg sm:text-xl text-[#FFF0D6]">
              "الشاب اللي كان شايف حياته سلسلة من الأحلام اللي لازم يحققها..."
            </p>
            <p className="reveal text-lg sm:text-xl text-[#F7F1E8]/90">
              "بدأ يتخيّل إن فيه حد ممكن يشاركه الطريق."
            </p>
            <p className="reveal text-lg sm:text-xl text-[#A9C8F0] font-semibold">
              "مش عشان يتخلّى عن أحلامه..."
            </p>
            <p className="reveal text-xl sm:text-2xl font-bold text-[#E35D73] leading-relaxed">
              "لكن عشان بقى فيه احتمال جميل: إنه يحققها، ويكون جنبها وهي كمان بتحقق أحلامها."
            </p>
          </StoryCopy>

          <SceneNavigationButtons prevIndex={2} nextIndex={4} onGo={navigateTo} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 05 — A WHOLE NEW WORLD (Signature Scene!)           */}
      {/* ========================================================= */}
      <section
        id="scene-05"
        className="scene scene-flight relative flex min-h-screen items-center justify-center px-6 py-32 text-center"
      >
        {/* Shimmering ocean ripples over water */}
        <OceanMoonShimmer paused={paused} moonPosition={{ x: 75, y: 15 }} />
        <div className="cloud-layer" aria-hidden="true" />
        <ArabianPalaceSkyline opacity={0.5} />

        <div className="story-content relative z-10 max-w-4xl mx-auto">
          <SceneKicker number="05" titleEn="A Whole New World" />
          <SceneHeading title="القمر نزل يونس الواد ولا إيه؟ 🌙" subtitle="رحلة في عالم جديد · الجملة التي شرحت كل شيء" />

          {/* Narrator introduction */}
          <div className="reveal mb-6 space-y-2 text-[#A9C8F0]">
            <p className="arabic text-lg sm:text-xl">"وكان عنده طريقة غريبة شوية في وصف الحب..."</p>
            <p className="arabic text-base sm:text-lg text-[#FFF0D6]/80">
              "طريقة يمكن ما يفهمهاش غير اللي جرّب الإحساس ده فعلًا."
            </p>
          </div>

          {/* Iconic Quote Callout */}
          <blockquote className="reveal reveal-delay-2 relative my-10 overflow-hidden rounded-3xl border-2 border-[#E35D73]/60 bg-gradient-to-b from-[#07152F]/90 via-[#0B2045]/85 to-[#07152F]/95 p-8 sm:p-12 shadow-[0_20px_60px_rgba(181,38,61,0.35),0_0_30px_rgba(169,200,240,0.15)] backdrop-blur-lg">
            <span className="serif text-5xl sm:text-7xl text-[#E35D73] block mb-2" aria-hidden="true">
              “
            </span>
            <p className="arabic text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFF0D6] leading-[2.1] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              بيقولك إيه بقى لو حبيت بتبقى عامل زي الشخص اللي قاعد لوحده وشاف انعكاس القمر على البحر بليل وافتكر إن القمر نزل يقعد عشان يونسه
            </p>
            <footer className="serif text-sm tracking-wider text-[#A9C8F0] mt-6" dir="ltr">
              — His iconic words, preserved forever
            </footer>
          </blockquote>

          {/* Narrator continuing reflection */}
          <StoryCopy className="mt-8 space-y-3">
            <p className="reveal text-lg sm:text-xl text-[#F7F1E8]/90">
              "يمكن القمر ما نزلش فعلًا..."
            </p>
            <p className="reveal text-lg sm:text-xl text-[#F7F1E8]/90">
              "ويمكن البحر فضل زي ما هو..."
            </p>
            <p className="reveal text-xl sm:text-2xl font-bold text-[#E35D73] leading-relaxed">
              "بس أوقات، مجرد إن حاجة جميلة تظهر في عتمة وحدتك، بيخلّي الدنيا كلها تبان بشكل مختلف."
            </p>
          </StoryCopy>

          <SceneNavigationButtons prevIndex={3} nextIndex={5} onGo={navigateTo} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 06 — THREE POSSIBLE DESTINATIONS                    */}
      {/* ========================================================= */}
      <section
        id="scene-07"
        className="scene scene-destinations relative flex min-h-screen items-center justify-center px-6 py-28 text-center"
      >
        <div className="cloud-layer" aria-hidden="true" />

        <div className="story-content relative z-10 max-w-5xl mx-auto w-full">
          <SceneKicker number="06" titleEn="Three Possible Destinations" />
          <SceneHeading title="نحلم بإيه يا M؟ اختاري إنتِ بقى 😂✨" subtitle="ثلاث وجهات ممكنة · اختاري نافذة من النوافذ السحرية" />

          {/* Interactive 3 Floating Portals */}
          <MagicalPortals />

          <SceneNavigationButtons prevIndex={4} nextIndex={6} onGo={navigateTo} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 07 — THE WAY I SEE YOU — زي ما أنا شايفك ❤️         */}
      {/* ========================================================= */}
      <section
        id="scene-the-way-i-see-you"
        className="scene scene-the-way-i-see-you relative flex min-h-screen items-center justify-center px-4 sm:px-6 py-28 text-center"
      >
        <OceanMoonShimmer paused={paused} moonPosition={{ x: 50, y: 16 }} />

        <div className="story-content relative z-10 max-w-5xl mx-auto w-full">
          <SceneKicker number="07" titleEn="The Way I See You" />
          <SceneHeading
            title="THE WAY I SEE YOU — زي ما أنا شايفك ❤️"
            subtitle="لأن حبك مش مجرد حكاية... إنتِ الإنسانة اللي قلبي اختارها"
          />

          <TheWayISeeYou
            onContinueToPromise={() => navigateTo(7)}
            paused={paused}
          />

          <SceneNavigationButtons prevIndex={5} nextIndex={7} onGo={navigateTo} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 08 — THE PROMISE                                    */}
      {/* ========================================================= */}
      <section
        id="scene-08"
        className="scene scene-vow relative flex min-h-screen items-center justify-center px-6 py-32 text-center"
      >
        <OceanMoonShimmer paused={paused} moonPosition={{ x: 50, y: 18 }} />

        <div className="story-content relative z-10 max-w-4xl mx-auto">
          <SceneKicker number="08" titleEn="The Promise" />
          <SceneHeading title="المرة دي الكلام جد يا ستي ❤️" subtitle="الوعد الصادق · كلمات خرجت من قلبه دون زيف" />

          <StoryCopy className="mb-8">
            <p className="reveal text-lg sm:text-xl text-[#FFF0D6]">
              "وفيه حاجة تانية كان عايزها توصلها..."
            </p>
            <p className="reveal text-lg sm:text-xl text-[#F7F1E8]/90">
              "إن وجودها في حياته مش معناه إنه نسي أحلامه..."
            </p>
            <p className="reveal text-lg sm:text-xl text-[#A9C8F0] font-semibold">
              "لكن معناه إنه بقى شايف إن فيه أحلام ممكن تكون أجمل لما تتعاش مع حد."
            </p>
          </StoryCopy>

          {/* Direct Quotes Callout */}
          <div className="reveal reveal-delay-2 my-10 space-y-4">
            <div
              dir="ltr"
              className="rounded-2xl border-2 border-[#E35D73]/60 bg-gradient-to-r from-[#0B2045]/80 via-[#681A32]/70 to-[#0B2045]/80 p-6 backdrop-blur-md shadow-[0_10px_35px_rgba(181,38,61,0.3)]"
            >
              <p className="serif text-3xl sm:text-5xl font-bold italic text-[#FFF0D6]">
                “I really love you.”
              </p>
            </div>

            <div
              dir="ltr"
              className="rounded-2xl border-2 border-[#E35D73]/60 bg-gradient-to-r from-[#681A32]/70 via-[#0B2045]/80 to-[#681A32]/70 p-6 backdrop-blur-md shadow-[0_10px_35px_rgba(181,38,61,0.3)]"
            >
              <p className="serif text-3xl sm:text-5xl font-bold italic text-[#E35D73]">
                “I really will never let you go.”
              </p>
            </div>
            <p className="serif text-xs text-[#A9C8F0]/80 tracking-widest uppercase mt-2">
              — Mohamed's direct words
            </p>
          </div>

          <StoryCopy className="mt-8">
            <p className="reveal text-lg sm:text-xl text-[#F7F1E8]/90">
              "هو مش بيقول إن الطريق عمره ما هيتعبهم..."
            </p>
            <p className="reveal text-xl sm:text-2xl font-bold text-[#E35D73] leading-relaxed">
              "هو بيقول إنه عايز يفضل يختارها، ويثبتلها بالأفعال إن كلامه له معنى."
            </p>
          </StoryCopy>

          <SceneNavigationButtons prevIndex={6} nextIndex={8} onGo={navigateTo} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 09 & 10 — THE NARRATOR STEPS ASIDE & THE LETTER     */}
      {/* ========================================================= */}
      <section
        id="scene-09"
        className="scene scene-letter relative flex min-h-screen items-center justify-center px-6 py-28 text-center"
      >
        <div className="story-content relative z-10 max-w-4xl mx-auto w-full">
          <SceneKicker number="09" titleEn="The Narrator Steps Aside" />
          <SceneHeading title="الراوي هيسيبكم دقيقتين... عنده إحساس 😂" subtitle="الراوي يترك المساحة · حين تصمت كل الكلمات ليتكلم صاحب الحكاية" />

          {/* Narrator's farewell monologue */}
          <div className="reveal space-y-4 max-w-2xl mx-auto mb-10 text-center">
            <p className="arabic text-xl sm:text-2xl font-bold text-[#FFF0D6]">
              "ودي كانت الحكاية من برّه..."
            </p>
            <p className="arabic text-lg sm:text-xl text-[#F7F1E8]/90">
              "حكاية شاب كان عنده أحلام كتير، وقابل بنت خلّت المستقبل ياخد معنى جديد."
            </p>
            <p className="arabic text-lg sm:text-xl text-[#A9C8F0]">
              "لكن فيه كلام، مهما كان الراوي شاطر..."
            </p>
            <p className="arabic text-xl sm:text-2xl font-bold text-[#E35D73]">
              "مش هيقدر يقوله مكان صاحب الحكاية."
            </p>
            <div className="my-6 text-3xl text-[#E35D73]/60" aria-hidden="true">
              · · ·
            </div>
            <p className="arabic text-lg sm:text-xl text-[#FFF0D6]">
              "لأن الحكاية دي، في الآخر، مش حكاية الراوي."
            </p>
            <p className="arabic text-3xl sm:text-5xl font-bold text-[#FFF0D6]">
              "دي حكاية <span className="serif text-[#E35D73]">محمد...</span>"
            </p>
            <p className="arabic text-2xl sm:text-3xl font-bold text-[#A9C8F0]">
              "وحكايتها هي كمان."
            </p>
          </div>

          {/* Interactive Wax Seal Stamped with 'M' that unfolds into SCENE 10 */}
          <div id="scene-10">
            <WaxSealLetter onReplay={restartJourney} />
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="relative z-10 border-t border-white/10 bg-[#07152F] py-8 text-center text-xs text-[#A9C8F0]/60">
        <p className="serif text-sm text-[#FFF0D6] font-semibold mb-1">
          MY M <span className="text-[#E35D73]">❤️</span>
        </p>
        <p className="arabic">رحلة سينمائية اتكتبت بحب وإخلاص مخصوص لـ M.</p>
      </footer>
    </div>
  </>
);
}
