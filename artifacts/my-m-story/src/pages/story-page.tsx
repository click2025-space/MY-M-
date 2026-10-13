import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pause, Play, SkipForward, Sparkles } from 'lucide-react';

const chapters = [
  { id: 'gate', label: 'البوابة' },
  { id: 'before', label: 'عالمه قبلها' },
  { id: 'encounter', label: 'المقابلة' },
  { id: 'opening', label: 'عالم جديد' },
  { id: 'flight', label: 'رحلة القمر' },
  { id: 'hopes', label: 'أمنياته' },
  { id: 'dreams', label: 'احتمالات جميلة' },
  { id: 'vow', label: 'كلماته' },
  { id: 'letter-chapter', label: 'الخطاب' },
];

const dreams = [
  {
    title: 'A quiet day by the sea 🌊',
    line: 'يوم هادي، والبحر قدامهم، ومفيش حاجة مستعجلة.',
    response: 'اختيار على مهله... حتى الموج هنا مش مستعجل.',
  },
  {
    title: 'A home full of laughter 🏡',
    line: 'مكان بسيط، بس مليان تفاصيل صغيرة تخلي الأيام أحلى.',
    response: 'تفاصيل صغيرة، وضحكة تاخد راحتها... احتمال دافي.',
  },
  {
    title: 'Two dreams, one journey ✨',
    line: 'كل واحد بيكبر في طريقه، وفي نفس الوقت بيشجّع التاني يكمل.',
    response: 'حلمين ماشيين جنب بعض... وكل واحد له سماه.',
  },
];

function SceneHeading({ index, title }: { index: string; title: string }) {
  return (
    <>
      <span className="chapter-kicker eyebrow arabic">{index} / حكاية لسه بتتكتب</span>
      <h2 id={`title-${index}`} className="chapter-heading arabic">{title}</h2>
    </>
  );
}

function StoryText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`story-copy arabic text-center ${className}`}>{children}</div>;
}

function ChapterActions({
  back,
  next,
  onBack,
  onNext,
}: {
  back?: string;
  next?: string;
  onBack?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="journey-end-controls">
      {back && <button className="story-button ghost-button" onClick={onBack} data-testid={`button-back-${back}`}>
        <ArrowRight size={16} aria-hidden="true" /> ارجعي خطوة
      </button>}
      {next && <button className="story-button" onClick={onNext} data-testid={`button-continue-${next}`}>
        كمّلي الرحلة <ArrowLeft size={16} aria-hidden="true" />
      </button>}
    </div>
  );
}

function StoryPage() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [skipMotion, setSkipMotion] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [selectedDream, setSelectedDream] = useState<number | null>(null);
  const [replayCount, setReplayCount] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = query.matches;
    const sync = () => { reducedMotion.current = query.matches; };
    query.addEventListener?.('change', sync);
    return () => query.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [letterOpen]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window) || reducedMotion.current || skipMotion) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [skipMotion, letterOpen]);

  useEffect(() => {
    const nodes = chapters.map(({ id }) => document.getElementById(id)).filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        const index = chapters.findIndex(({ id }) => id === visible.target.id);
        if (index >= 0) setActive(index);
      }
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0, .15, .4, .7] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [letterOpen]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion.current || skipMotion ? 'auto' : 'smooth', block: 'start' });
  };
  const goChapter = (index: number) => {
    const bounded = Math.max(0, Math.min(chapters.length - 1, index));
    goTo(chapters[bounded].id);
  };
  const openLetter = () => {
    setLetterOpen(true);
    window.setTimeout(() => goTo('personal-letter'), 80);
  };
  const replay = () => {
    setLetterOpen(false);
    setSelectedDream(null);
    setReplayCount((count) => count + 1);
    window.setTimeout(() => goTo('gate'), 50);
  };

  return (
    <main className={`story-shell min-h-[100dvh] ${paused ? 'pause-motion' : ''} ${skipMotion || reducedMotion.current ? 'skip-motion' : ''}`}>
      <a href="#gate" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#B5263D] focus:px-4 focus:py-2 focus:text-[#F7F1E8]">
        تخطي إلى الحكاية
      </a>
      <div className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-white/10" aria-label={`وصلتي لـ ${Math.round(progress)} بالمية من الرحلة`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
        <div className="journey-progress h-full" style={{ width: `${progress}%` }} />
      </div>
      <header className="journey-header fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-6 py-4 text-[#F7F1E8] md:px-10">
        <a href="#gate" dir="ltr" aria-label="العودة لبداية الحكاية" className="serif text-xl tracking-wide" data-testid="link-story-home">
          M<span className="text-[#E35D73]">.</span>
        </a>
        <nav aria-label="فصول الرحلة" className="journey-nav flex items-center gap-5">
          {chapters.map((chapter, index) => (
            <a key={chapter.id} href={`#${chapter.id}`} onClick={(event) => { event.preventDefault(); goChapter(index); }}
              aria-current={active === index ? 'step' : undefined}
              className="chapter-link arabic text-sm" data-testid={`link-chapter-${index + 1}`}>
              {chapter.label}
            </a>
          ))}
        </nav>
        <span className="eyebrow arabic hidden text-[#A9C8F0] sm:block">عالم اتفتح ليكي</span>
      </header>

      <aside className="journey-controls" aria-label="مؤشر فصول الرحلة">
        <div className="journey-dots">
          {chapters.map((chapter, index) => (
            <button key={chapter.id} className="journey-dot" onClick={() => goChapter(index)}
              aria-label={`انتقلي إلى الفصل ${index + 1}: ${chapter.label}`}
              aria-current={active === index ? 'step' : undefined} data-testid={`button-jump-chapter-${index + 1}`} />
          ))}
        </div>
      </aside>
      <div className="journey-tools" aria-label="أدوات الرحلة">
        <button className="icon-control" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'استئناف الحركة' : 'إيقاف الحركة مؤقتًا'} aria-pressed={paused} data-testid="button-pause-motion">
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
        <button className="icon-control" onClick={() => setSkipMotion((value) => !value)} aria-label={skipMotion ? 'تشغيل الحركة الهادئة' : 'تخطي الحركة'} aria-pressed={skipMotion} data-testid="button-skip-motion">
          <SkipForward size={16} />
        </button>
      </div>

      <section id="gate" className="scene scene-gate scene-transition flex items-center justify-center" aria-labelledby="gate-title">
        <div className="moon-disc" aria-hidden="true" />
        <div className="horizon-glow" aria-hidden="true" />
        <div className="cloud-layer" aria-hidden="true" />
        <div className="light-ribbon" aria-hidden="true" />
        <div className="story-content text-center">
          <div className="reveal eyebrow mb-7 flex items-center justify-center gap-3 text-[#A9C8F0]"><span className="h-px w-8 bg-current/60" /> حكاية خاصة بـ M <span className="h-px w-8 bg-current/60" /></div>
          <p className="reveal eyebrow mb-5 text-[#A9C8F0]">01 / بوابة لعالم مجهول</p>
          <h1 id="gate-title" className="reveal reveal-delay-1 arabic mx-auto mb-8 max-w-5xl text-5xl font-bold leading-[1.3] text-[#FFF0D6] md:text-7xl">
            كان فيه حكاية
            <br />
            <span className="text-[#E35D73]">لسه ما بدأتش...</span>
          </h1>
          <StoryText className="reveal reveal-delay-2">
            <p>وحكاية تانية، كان صاحبها فاكر إنه عارف نهايتها من قبل ما تبدأ.</p>
            <p>كان فاكر إن الحكاية كلها في الطريق اللي بيمشيه...</p>
            <p>لحد ما قابل بنت، ما كانتش تعرف إنها هتبقى جزء من حكاية عمره ما خطط يكتبها.</p>
            <p className="rose-line">والأغرب؟</p>
            <p>إنه ما كانش بيدوّر عليها أصلًا.</p>
            <p>بس أوقات، أجمل الحكايات بتبدأ لما الدنيا تقرر تغيّرلك الطريق.</p>
            <p className="warm-line">تعالي... عشان فيه عالم تاني مستنيكي.</p>
          </StoryText>
          <div className="reveal reveal-delay-3 mt-10">
            <button className="story-button" onClick={() => goChapter(1)} data-testid="button-start-journey">
              نبدأ الرحلة؟ 🌙 <ArrowLeft size={17} aria-hidden="true" />
            </button>
          </div>
          <div className="absolute bottom-[-5rem] left-1/2 -translate-x-1/2" aria-hidden="true">
            <span className="serif floating-mark text-8xl text-[#E35D73]/10">M</span>
          </div>
        </div>
      </section>

      <section id="before" className="scene scene-city" aria-labelledby="title-02">
        <div className="cloud-layer" aria-hidden="true" />
        <div className="story-content">
          <SceneHeading index="02" title="كل حاجة في مكانها" />
          <div className="grid items-center gap-12 md:grid-cols-[.7fr_1.3fr]">
            <div className="reveal mx-auto flex aspect-[4/5] w-full max-w-[17rem] items-center justify-center border border-[#A9C8F0]/25 bg-[#07152F]/40 text-center">
              <div>
                <span className="serif block text-[9rem] leading-none text-[#A9C8F0]/50">M</span>
                <span className="eyebrow arabic text-[#FFF0D6]/80">أحلام، وخطوات محسوبة</span>
              </div>
            </div>
            <StoryText>
              <p className="reveal">كان فيه شاب عنده أحلام كتير...</p>
              <p className="reveal reveal-delay-1">عقله مشغول ببكرة، وخطواته محسوبة، وعينه دايمًا على الحاجة اللي لسه ما وصلهاش.</p>
              <p className="reveal">كان الشاب ده بيعيش أيامه كأنها جدول لازم يخلّصه.</p>
              <p className="reveal reveal-delay-1 warm-line">شغل ورا شغل.<br />حلم ورا حلم.</p>
              <p className="reveal">وكل خطوة محسوبة عشان يقرب من المستقبل اللي رسمه لنفسه.</p>
              <p className="reveal">ما كانش شخص من غير مشاعر...</p>
              <p className="reveal">بالعكس، كان عنده شغف وطموح وحاجات كتير نفسه يحققها.</p>
              <p className="reveal">بس كان متخيّل إن كل اللي محتاجه عشان يوصل هو عقله، ومجهوده، وإصراره.</p>
              <p className="reveal">ما كانش يعرف إن في يوم، قلبه هيبقى عنده رأي تاني في شكل المستقبل.</p>
              <p className="reveal rose-line">ما كانش شخص من غير مشاعر... لكنه كان متعوّد يخلي عقله يقود الطريق.</p>
            </StoryText>
          </div>
          <ChapterActions back="before" next="encounter" onBack={() => goChapter(0)} onNext={() => goChapter(2)} />
        </div>
      </section>

      <section id="encounter" className="scene scene-encounter" aria-labelledby="title-03">
        <div className="horizon-glow" aria-hidden="true" />
        <div className="story-content text-center">
          <SceneHeading index="03" title="حصلت بالصدفة؟" />
          <StoryText>
            <p className="reveal">وفي يوم عادي جدًا، وسط شغل حكاياتي والكلام عن دار نشر...</p>
            <p className="reveal reveal-delay-1">كان المفروض حد تاني هو اللي يتكلم معاها.</p>
            <p className="reveal">لكن الموضوع اتأخر، والشاب ده هو اللي دخل مكانه واتكلم معاها.</p>
            <p className="reveal reveal-delay-1">كان داخل يخلّص شغل.</p>
            <p className="reveal">مفيش خطة رومانسية، ولا مشهد متحضّر، ولا حتى فكرة إن اليوم ده ممكن يبقى بداية حاجة مختلفة.</p>
          </StoryText>
          <div className="reveal my-12 flex items-center justify-center gap-5 text-[#E35D73]" aria-hidden="true">
            <span className="h-px w-16 bg-current/50" /><Sparkles size={17} /><span className="h-px w-16 bg-current/50" />
          </div>
          <div className="reveal mx-auto max-w-3xl border border-[#A9C8F0]/25 bg-[#07152F]/40 px-6 py-8 md:px-12">
            <p className="arabic text-2xl leading-relaxed text-[#FFF0D6] md:text-3xl">بس الحياة ساعات بتكتب أحلى فصولها من غير ما تستأذن أصحاب الحكاية.</p>
          </div>
          <StoryText className="mt-10">
            <p className="reveal">مقابلة عادية في ظاهرها...</p>
            <p className="reveal reveal-delay-1">لكن بالنسبة له، كانت بداية إحساس ما كانش عامل حسابه.</p>
            <p className="reveal rose-line">لأن من أول مرة، البنت دي سابت جواه أثر أكبر من اللي كان متوقعه.</p>
            <p className="reveal">ما كانش بيدوّر على حكاية حب...</p>
            <p className="reveal">ولا كان عارف إن مقابلة بدأت بسبب الشغل ممكن تغيّر شكل المستقبل في عينيه.</p>
            <p className="reveal warm-line">لكنه قابلها... ومن هنا، الحكاية بدأت تاخد طريق تاني.</p>
          </StoryText>
          <ChapterActions back="encounter" next="opening" onBack={() => goChapter(1)} onNext={() => goChapter(3)} />
        </div>
      </section>

      <section id="opening" className="scene scene-opening" aria-labelledby="title-04">
        <div className="moon-disc" aria-hidden="true" />
        <div className="cloud-layer" aria-hidden="true" />
        <div className="story-content">
          <SceneHeading index="04" title="لما الطريق اتغيّر" />
          <StoryText>
            <p className="reveal">ومن هنا، بدأت الحكاية تتغيّر.</p>
            <p className="reveal reveal-delay-1">الشاب اللي كان شايف حياته سلسلة من الأحلام اللي لازم يحققها...</p>
            <p className="reveal">بدأ يتخيّل إن فيه حد ممكن يشاركه الطريق.</p>
            <p className="reveal reveal-delay-1">ما فقدش طموحه.<br />وما تخلّاش عن أحلامه.</p>
            <p className="reveal">لكن الأحلام اللي كانت ساكنة في عقله بس، بقى ليها مكان في قلبه كمان.</p>
          </StoryText>
          <div className="reveal mx-auto my-14 max-w-4xl border-y border-[#A9C8F0]/25 py-9 text-center">
            <span className="eyebrow arabic mb-4 block text-[#A9C8F0]">العقل والقلب</span>
            <p dir="ltr" className="serif text-3xl leading-tight text-[#FFF0D6] md:text-5xl">
              He used to work for his brain.
              <br />
              <span className="italic text-[#E35D73]">Now he works for his brain and his heart.</span>
            </p>
          </div>
          <StoryText>
            <p className="reveal">بقى نفسه ينجح، ويكبر، ويبني حاجة كبيرة...</p>
            <p className="reveal reveal-delay-1">بس المرة دي، كان بيتخيّل إن فيه شريكة بتكبر معاه، وبتحقق أحلامها هي كمان، وإن كل واحد فيهم يقدر يسند التاني.</p>
            <p className="reveal">هو ما كانش بيدوّر على الحب...</p>
            <p className="reveal rose-line">لكن لما لقاه فيها، اكتشف إنه مش عايز يشوف المستقبل من غير ما يتخيّل وجودها فيه.</p>
            <p className="reveal">مش عشان يتخلّى عن أحلامه...</p>
            <p className="reveal warm-line">لكن عشان بقى فيه احتمال جميل: إنه يحققها، ويكون جنبها وهي كمان بتحقق أحلامها.</p>
          </StoryText>
          <ChapterActions back="opening" next="flight" onBack={() => goChapter(2)} onNext={() => goChapter(4)} />
        </div>
      </section>

      <section id="flight" className="scene scene-flight" aria-labelledby="title-05">
        <div className="cloud-layer" aria-hidden="true" />
        <div className="story-content">
          <div className="mb-12 md:grid md:grid-cols-[.7fr_1.3fr] md:items-end md:gap-12">
            <div className="reveal">
              <span className="eyebrow arabic mb-5 flex items-center gap-3 text-[#A9C8F0]">05 / على مهل، فوق البحر</span>
              <h2 id="title-05" className="chapter-heading arabic">عالم كامل<br />كان مستني...</h2>
              <p className="arabic -mt-5 mb-5 text-xl text-[#A9C8F0]">في جملة<br />بتشبهه...</p>
              <p className="flight-image-note arabic">القمر والبحر — حكاية لها مكانها</p>
            </div>
            <StoryText className="reveal text-right">
              <p>وفيه جملة كان بيقولها...</p>
              <p>جملة بسيطة، لكنها كانت بتشرح إحساس جواه بطريقة ما يعرفش يقولها بأي كلام تاني.</p>
              <p>وكان عنده طريقة غريبة شوية في وصف الحب...</p>
              <p>طريقة يمكن ما يفهمهاش غير اللي جرّب الإحساس ده فعلًا.</p>
            </StoryText>
          </div>
          <blockquote className="quote-panel reveal reveal-delay-1">
            <span className="serif mb-2 block text-6xl text-[#E35D73]" aria-hidden="true">“</span>
            <p className="arabic text-2xl leading-[1.9] text-[#FFF0D6] md:text-[2.15rem]">
              بيقولك إيه بقى، لو حبيت بتبقى عامل زي الشخص اللي قاعد لوحده وشاف انعكاس القمر على البحر بليل، وافتكر إن القمر نزل يقعد عشان يونسه.
            </p>
            <footer className="eyebrow arabic mt-5 text-[#A9C8F0]">— قالها هو</footer>
          </blockquote>
          <div className="reveal mx-auto grid max-w-5xl gap-8 border-t border-[#F7F1E8]/25 pt-8 md:grid-cols-[.3fr_1fr]">
            <span className="eyebrow arabic text-[#A9C8F0]">يمكن كان قصده إيه</span>
            <StoryText className="text-[#F7F1E8]/90 md:text-right">
              <p>يمكن هو ما كانش يقصد القمر لوحده...</p>
              <p>يمكن كان بيتكلم عن الإحساس إن حاجة بعيدة تبقى قريبة من القلب بشكل ما يتوصفش.</p>
              <p>وعن إن الواحد، حتى لو كان متعود يمشي لوحده، ممكن يقابل شخص يخلّيه يتمنى إن الطريق يفضل يجمعهم.</p>
              <p>ويمكن دي كانت طريقته في إنه يقولها، من غير ما يضطر يشرح كل اللي جواه...</p>
              <p className="rose-line">إن وجودها بقى فارق معاه.</p>
            </StoryText>
          </div>
          <ChapterActions back="flight" next="hopes" onBack={() => goChapter(3)} onNext={() => goChapter(5)} />
        </div>
      </section>

      <section id="hopes" className="scene scene-journal" aria-labelledby="title-06">
        <div className="cloud-layer" aria-hidden="true" />
        <div className="story-content">
          <SceneHeading index="06" title="الحب فعل كل يوم" />
          <div className="journal-card reveal">
            <span className="eyebrow arabic text-[#E88998]">أمنيات بيحملها معاه</span>
            <ul className="arabic mt-5 list-none p-0">
              <li>إنه يدعم أحلامها بنفس الجدية اللي بيدعم بيها أحلامه.</li>
              <li>إنه يكون صبور لما المستقبل يبقى مخيف.</li>
              <li>إنه يبقى شخص تقدر تتكلم معاه بصراحة وترتاح جنبه.</li>
              <li>إنهم يشاركوا الأيام الصعبة، زي الأيام الحلوة.</li>
              <li>إنهم يبنوا مستقبل سوا من غير ما حد فيهم يتنازل عن نفسه.</li>
            </ul>
          </div>
          <StoryText>
            <p className="reveal">ولما عرفها أكتر، بدأ يفهم إن الحب مش مجرد إحساس قوي في البداية.</p>
            <p className="reveal reveal-delay-1">الحب كمان اهتمام، وصبر، واحترام، وإن الواحد يكون مستعد يسمع ويفهم ويتعلم.</p>
            <p className="reveal">كان عايزها تعرف إنها مش مضطرة تواجه كل حاجة لوحدها.</p>
            <p className="reveal reveal-delay-1">وإن أحلامها ليها مكان، وإن نجاحها مش بعيد عن الحكاية دي.</p>
            <p className="reveal">ولما كان بيقولها إنها مسؤوليته، كان يقصد إنه واخد ثقتها بجدية...</p>
            <p className="reveal">وإنه عايز يكون سند ليها، زي ما يتمنى إنهم يفضلوا سند لبعض.</p>
          </StoryText>
          <div className="reveal mx-auto my-12 max-w-3xl border-r-2 border-[#B5263D] bg-[#102B59]/70 px-7 py-8 text-right md:px-12">
            <p className="arabic text-2xl leading-[1.9] md:text-3xl">هو مش شايف إن الحب معناه إن كل حاجة هتبقى سهلة...</p>
            <p className="arabic mt-4 text-2xl leading-[1.9] md:text-3xl">هو عارف إن فيه أيام صعبة، واختلافات، وحاجات محتاجة وقت.</p>
            <p className="arabic mt-4 text-2xl leading-[1.9] md:text-3xl">بس نفسه يبقى فيه مكان لكل واحد فيهم...</p>
            <p className="arabic mt-4 text-2xl leading-[1.9] md:text-3xl">مكان يقدروا فيه يحلموا، ويتعلموا، ويغلطوا، ويحاولوا من جديد.</p>
          </div>
          <p className="reveal arabic mx-auto max-w-3xl text-center text-xl leading-[1.9] text-[#FFF0D6] md:text-2xl">لكن يقدر يختار كل يوم إنه يحافظ على الحب اللي بينهم، ويثبت لها بالأفعال إن كلامه مش مجرد لحظة حلوة.</p>
          <ChapterActions back="hopes" next="dreams" onBack={() => goChapter(4)} onNext={() => goChapter(6)} />
        </div>
      </section>

      <section id="dreams" className="scene scene-destinations" aria-labelledby="title-07">
        <div className="moon-disc" aria-hidden="true" />
        <div className="horizon-glow" aria-hidden="true" />
        <div className="story-content">
          <SceneHeading index="07" title="مستقبل لسه بيتكتب" />
          <StoryText>
            <p className="reveal">وعند طرف الشرفة، والنور بيبدأ يلمس الجبال...</p>
            <p className="reveal reveal-delay-1">لسه فيه أكتر من احتمال جميل ممكن يتخيّله.</p>
            <p className="reveal rose-line">اختاري نافذة من النوافذ دي، وخلي الرحلة تلفّ ناحيتها.</p>
          </StoryText>
          <div className="dream-grid" role="group" aria-label="اختاري احتمالًا جميلًا">
            {dreams.map((dream, index) => (
              <button key={dream.title} className="dream-choice arabic" onClick={() => setSelectedDream(index)}
                aria-pressed={selectedDream === index} data-testid={`button-dream-${index + 1}`}>
                <strong dir="ltr">{dream.title}</strong>
                <span>{dream.line}</span>
              </button>
            ))}
          </div>
          <p className="dream-response arabic" aria-live="polite" data-testid="text-dream-response">
            {selectedDream === null ? 'كلها احتمالات... والاختيار ليكي.' : dreams[selectedDream].response}
          </p>
          <ChapterActions back="dreams" next="vow" onBack={() => goChapter(5)} onNext={() => goChapter(7)} />
        </div>
      </section>

      <section id="vow" className="scene scene-vow" aria-labelledby="title-08">
        <div className="horizon-glow" aria-hidden="true" />
        <div className="story-content">
          <SceneHeading index="08" title="كلماته زي ما قالها" />
          <StoryText>
            <p className="reveal">وفيه حاجة تانية كان عايزها توصلها...</p>
            <p className="reveal reveal-delay-1">إن وجودها في حياته مش معناه إنه نسي أحلامه...</p>
            <p className="reveal">لكن معناه إنه بقى شايف إن فيه أحلام ممكن تكون أجمل لما تتعاش مع حد.</p>
            <p className="reveal">ولما كان بيقولها إنها مسؤوليته، كان يقصد إنه واخد ثقتها بجدية...</p>
            <p className="reveal">هو ما يقدرش يوعدها إن الحياة هتفضل سهلة...</p>
          </StoryText>
          <div className="promise-lines">
            <div dir="ltr" className="promise-line serif reveal">“I really love you.”</div>
            <div dir="ltr" className="promise-line serif reveal reveal-delay-1">“I really will never let you go.”</div>
          </div>
          <p className="reveal eyebrow mt-5 text-center text-[#A9C8F0]">— كلمات محمد، زي ما قالها</p>
          <StoryText className="mt-10">
            <p className="reveal">هو مش بيقول إن الطريق عمره ما هيتعبهم...</p>
            <p className="reveal reveal-delay-1">هو بيقول إنه عايز يفضل يختارها، ويثبتلها بالأفعال إن كلامه له معنى.</p>
          </StoryText>
          <ChapterActions back="vow" next="letter" onBack={() => goChapter(6)} onNext={() => goChapter(8)} />
        </div>
      </section>

      <section id="letter-chapter" className="scene scene-letter" aria-labelledby="title-09">
        <div className="moon-disc" aria-hidden="true" />
        <div className="story-content text-center">
          <SceneHeading index="09" title="الراوي يسيب المساحة" />
          <StoryText>
            <p className="reveal">ودي كانت الحكاية من برّه...</p>
            <p className="reveal reveal-delay-1">حكاية شاب كان عنده أحلام كتير، وقابل بنت خلّت المستقبل ياخد معنى جديد.</p>
            <p className="reveal">لكن فيه كلام، مهما كان الراوي شاطر...</p>
            <p className="reveal reveal-delay-1">مش هيقدر يقوله مكان صاحب الحكاية.</p>
          </StoryText>
          <div className="reveal my-10 text-4xl text-[#E35D73]/85" aria-hidden="true">· · ·</div>
          <div className="reveal">
            <p className="arabic text-xl leading-[1.9] text-[#F7F1E8]/85 md:text-2xl">لأن الحكاية دي، في الآخر، مش حكاية الراوي.</p>
            <p className="arabic mt-5 text-4xl text-[#FFF0D6] md:text-6xl">دي حكاية <span className="serif italic text-[#E35D73]">محمد...</span></p>
            <p className="arabic mt-2 text-2xl text-[#F7F1E8]/90 md:text-3xl">وحكايتها هي كمان.</p>
          </div>
          <ChapterActions back="letter" next="personal-letter" onBack={() => goChapter(7)} onNext={openLetter} />
          {letterOpen && <article id="personal-letter" className="letter-paper letter-open mx-auto mt-14 max-w-3xl px-7 py-12 text-right md:px-16 md:py-16" aria-label="خطاب محمد">
            <div className="mb-12 flex items-start justify-between">
              <span className="eyebrow arabic text-[#3c302b]">كلام من M</span>
              <span className="text-2xl text-[#B5263D]" aria-hidden="true">✳</span>
            </div>
            <div dir="ltr" className="letter-signature text-left text-3xl text-[#B5263D] md:text-4xl">To my M... ❤️</div>
            <div className="my-12 space-y-8 text-center">
              <p dir="ltr" className="serif text-3xl italic text-[#3c302b] md:text-4xl">I really love you.</p>
              <p dir="ltr" className="serif text-3xl italic text-[#3c302b] md:text-4xl">I really will never let you go.</p>
              <div className="mx-auto h-px w-12 bg-[#B5263D]/50" />
              <p className="arabic text-2xl leading-[2] text-[#3c302b] md:text-3xl">
                بيقولك إيه بقى، لو حبيت بتبقى عامل زي الشخص اللي قاعد لوحده وشاف انعكاس القمر على البحر بليل، وافتكر إن القمر نزل يقعد عشان يونسه.
              </p>
            </div>
            <div className="mt-16 border-t border-[#3c302b]/25 pt-8">
              <p dir="ltr" className="serif text-xl italic text-[#3c302b]">Forever choosing you,</p>
              <p dir="ltr" className="letter-signature mt-3 text-4xl text-[#B5263D]">M ❤️</p>
            </div>
            <div className="mt-12 border-t border-dashed border-[#3c302b]/35 pt-7 text-center">
              <p className="arabic text-xl leading-[1.9] text-[#3c302b] md:text-2xl">وبالمناسبة... كل ده عشان يقولك بحبك، بدل ما يبعتلك رسالة واتساب زي أي بني آدم طبيعي 😂😭❤️</p>
            </div>
          </article>}
          {letterOpen && <div className="journey-end-controls">
            <button className="story-button ghost-button" onClick={() => setLetterOpen(false)} data-testid="button-close-letter">اقفلي الخطاب <ArrowUp size={16} aria-hidden="true" /></button>
            <button className="story-button" onClick={replay} data-testid="button-replay-journey">ارجعي عيشي الرحلة من أولها <ArrowDown size={16} aria-hidden="true" /></button>
          </div>}
          {!letterOpen && <p className="eyebrow mt-7 text-[#A9C8F0]">الفصل الأخير — كلام من صاحب الحكاية</p>}
        </div>
      </section>

      <footer className="relative bg-[#07152F] px-6 py-12 text-center text-[#F7F1E8]">
        <p dir="ltr" className="serif text-2xl">M<span className="text-[#E35D73]">.</span></p>
        <p className="arabic mt-2 text-sm text-[#A9C8F0]">حكاية اتكتبت على مهل.</p>
        <button onClick={replay} className="eyebrow arabic mt-6 inline-flex items-center gap-2 text-[#E88998]" data-testid="button-replay-footer">
          ارجعي للبداية <ArrowUp size={13} aria-hidden="true" />
        </button>
        <span className="visually-hidden" aria-live="polite">عدد مرات بداية الرحلة {replayCount}</span>
      </footer>
    </main>
  );
}

export default StoryPage;
