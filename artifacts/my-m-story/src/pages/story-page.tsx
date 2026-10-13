import { useEffect, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, Heart, Moon, Sparkles } from 'lucide-react';

const chapters = [
  { id: 'top', label: 'البداية' },
  { id: 'meeting', label: 'المقابلة' },
  { id: 'moon', label: 'القمر والبحر' },
  { id: 'letter', label: 'الخطاب' },
];

function SceneHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      <span className="eyebrow mb-4 block text-[#a45b45]">{index} / حكاية</span>
      <h2 className="arabic text-4xl font-bold leading-tight text-[#352b23] md:text-6xl">{title}</h2>
      <span className="mx-auto mt-6 block h-px w-12 bg-[#b98258]" />
    </div>
  );
}

function StoryText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`story-line arabic text-center text-[1.45rem] leading-[1.85] md:text-[1.8rem] ${className}`}>{children}</div>;
}

function StoryPage() {
  const [letterOpen, setLetterOpen] = useState(false);
  const [progress, setProgress] = useState(0);

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
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [letterOpen]);

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="story-shell min-h-[100dvh]">
      <a href="#main-story" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#d5aa70] focus:px-4 focus:py-2">
        تخطي إلى الحكاية
      </a>
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-white/10" aria-hidden="true">
        <div className="h-full bg-[#d5aa70] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 text-[#f2e8d8] md:px-10">
        <a href="#top" dir="ltr" aria-label="العودة لبداية الحكاية" className="serif text-xl tracking-wide text-[#f2e8d8]" data-testid="link-story-home">
          M<span className="text-[#d5aa70]">.</span>
        </a>
        <nav aria-label="فصول الحكاية" className="hidden items-center gap-7 md:flex">
          {chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              onClick={chapter.id === 'letter' ? (event) => {
                event.preventDefault();
                setLetterOpen(true);
                window.setTimeout(() => goTo('letter'), 100);
              } : undefined}
              className="chapter-link arabic text-sm text-[#f2e8d8]/75"
              data-testid={`link-chapter-${chapter.id}`}
            >
              {chapter.label}
            </a>
          ))}
        </nav>
        <span className="eyebrow arabic text-[#d5aa70]">كل خطوة ليها معنى</span>
      </header>

      <section id="top" className="grain relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#19252a] px-6 pb-20 pt-24 text-[#f1e7d6]">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute -right-28 top-[10%] h-[36rem] w-[36rem] rounded-full border border-[#d6ad76]/15" />
          <div className="absolute -right-12 top-[18%] h-[31rem] w-[31rem] rounded-full border border-[#d6ad76]/10" />
          <div className="absolute bottom-0 left-0 h-[38%] w-full bg-gradient-to-t from-[#111b20] to-transparent" />
          <div className="floating-m absolute right-[15%] top-[22%] hidden font-serif text-[15rem] leading-none text-[#d6ad76]/[.08] md:block">M</div>
        </div>
        <div id="main-story" className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <div className="reveal mb-8 flex items-center justify-center gap-3 text-[#d6ad76]">
            <span className="h-px w-10 bg-current/50" />
            <span className="eyebrow">حكاية لسه بتتكتب</span>
            <span className="h-px w-10 bg-current/50" />
          </div>
          <h1 className="reveal reveal-delay-1 arabic mb-11 text-5xl font-bold leading-[1.28] tracking-tight md:text-7xl lg:text-[5.4rem]">
            كان فيه حكاية
            <br />
            <span className="text-[#d6ad76]">لسه ما بدأتش...</span>
          </h1>
          <div className="story-line reveal reveal-delay-2 arabic space-y-4 text-xl leading-[1.9] text-[#f1e7d6]/80 md:text-2xl">
            <p>وحكاية تانية، كان صاحبها فاكر إنه عارف نهايتها من قبل ما تبدأ.</p>
            <p>كان فيه شاب عنده أحلام كتير...</p>
            <p>عقله مشغول ببكرة، وخطواته محسوبة، وعينه دايمًا على الحاجة اللي لسه ما وصلهاش.</p>
          </div>
          <div className="reveal reveal-delay-3 mx-auto mt-12 max-w-2xl border-y border-[#f1e7d6]/15 py-7">
            <p className="arabic text-xl leading-[1.85] text-[#f1e7d6]/80 md:text-2xl">كان فاكر إن الحكاية كلها في الطريق اللي بيمشيه...</p>
            <p className="arabic mt-2 text-xl leading-[1.85] text-[#f1e7d6] md:text-2xl">لحد ما قابل بنت، ما كانتش تعرف إنها هتبقى جزء من حكاية عمره ما خطط يكتبها.</p>
          </div>
          <p className="reveal reveal-delay-3 arabic mt-9 text-2xl text-[#d6ad76]">والأغرب؟</p>
          <p className="reveal reveal-delay-3 arabic mt-2 text-xl text-[#f1e7d6]/75">إنه ما كانش بيدوّر عليها أصلًا.</p>
          <div className="reveal reveal-delay-3 mt-12">
            <p className="arabic mb-5 text-2xl md:text-3xl">تعالي نحكيلك الحكاية من أولها...</p>
            <button className="story-button" onClick={() => goTo('robot')} data-testid="button-discover-story">
              <span>أكتشف الحكاية 🌙</span>
              <ArrowDown size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="eyebrow arabic absolute bottom-6 left-6 hidden text-[#f1e7d6]/45 md:block">كمّلي على مهلك</div>
        <div className="absolute bottom-7 right-1/2 translate-x-1/2 animate-bounce text-[#d6ad76]/75" aria-hidden="true"><ChevronDown size={19} /></div>
      </section>

      <section id="robot" className="relative bg-[#e8dfd0] px-6 py-28 md:py-40">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[.7fr_1.3fr] md:gap-24">
          <div className="reveal relative mx-auto flex aspect-[4/5] w-full max-w-[19rem] items-center justify-center overflow-hidden rounded-t-[10rem] border border-[#a45b45]/25 bg-[#d9c8ae]">
            <div className="absolute inset-4 rounded-t-[9rem] border border-[#a45b45]/15" />
            <div className="absolute -left-10 bottom-5 h-52 w-52 rounded-full bg-[#bd795c]/15 blur-2xl" />
            <div className="relative text-center">
              <span className="serif block text-[10rem] leading-none text-[#a45b45]/80">M</span>
              <span className="eyebrow arabic text-[#735a46]">الشاب اللي كل حاجة عنده بحساب</span>
            </div>
            <span className="absolute bottom-7 left-7 text-[#a45b45]/60"><Sparkles size={20} /></span>
          </div>
          <div>
            <SceneHeading index="01" title="كل حاجة في مكانها" />
            <StoryText>
              <p className="reveal">كان الشاب ده بيعيش أيامه كأنها جدول لازم يخلّصه.</p>
              <p className="reveal reveal-delay-1 font-bold text-[#a45b45]">شغل ورا شغل.<br />حلم ورا حلم.</p>
              <p className="reveal">وكل خطوة محسوبة عشان يقرب من المستقبل اللي رسمه لنفسه.</p>
              <p className="reveal">ما كانش شخص من غير مشاعر...</p>
              <p className="reveal">بالعكس، كان عنده شغف وطموح وحاجات كتير نفسه يحققها.</p>
              <p className="reveal">بس كان متخيّل إن كل اللي محتاجه عشان يوصل هو عقله، ومجهوده، وإصراره.</p>
              <p className="reveal text-[#a45b45]">ما كانش يعرف إن في يوم، قلبه هيبقى عنده رأي تاني في شكل المستقبل.</p>
            </StoryText>
            <div className="mt-10 text-center">
              <button className="story-button" onClick={() => goTo('meeting')} data-testid="button-continue-robot">
                <span>كمّل الحكاية...</span><ArrowDown size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="meeting" className="grain relative bg-[#b7664d] px-6 py-28 text-[#fbf0df] md:py-40">
        <div className="absolute inset-y-0 left-0 hidden w-[30%] border-r border-[#f5e2c9]/15 md:block" aria-hidden="true">
          <span className="eyebrow arabic absolute bottom-14 left-8 [writing-mode:vertical-rl]">يوم عادي / بداية مختلفة</span>
        </div>
        <div className="relative mx-auto max-w-4xl">
          <SceneHeading index="02" title="حصلت بالصدفة؟" />
          <StoryText className="text-[#fbf0df]">
            <p className="reveal">وفي يوم عادي جدًا، وسط شغل حكاياتي والكلام عن دار نشر...</p>
            <p className="reveal reveal-delay-1">كان المفروض حد تاني هو اللي يتكلم معاها.</p>
            <p className="reveal">لكن الموضوع اتأخر، والشاب ده هو اللي دخل مكانه واتكلم معاها.</p>
            <p className="reveal reveal-delay-1">كان داخل يخلّص شغل.</p>
            <p className="reveal">مفيش خطة رومانسية، ولا مشهد متحضّر، ولا حتى فكرة إن اليوم ده ممكن يبقى بداية حاجة مختلفة.</p>
          </StoryText>
          <div className="reveal my-14 flex items-center justify-center gap-5 text-[#f5d4ab]/80" aria-hidden="true">
            <span className="h-px w-16 bg-current/50" /><Heart size={16} /><span className="h-px w-16 bg-current/50" />
          </div>
          <div className="reveal rounded-[2rem] border border-[#f5e2c9]/25 bg-[#713e37]/20 px-6 py-9 text-center md:px-14 md:py-12">
            <p className="arabic text-2xl leading-relaxed md:text-3xl">بس الحياة ساعات بتكتب أحلى فصولها من غير ما تستأذن أصحاب الحكاية.</p>
          </div>
          <StoryText className="mt-12 text-[#fbf0df]">
            <p className="reveal">مقابلة عادية في ظاهرها...</p>
            <p className="reveal reveal-delay-1">لكن بالنسبة له، كانت بداية إحساس ما كانش عامل حسابه.</p>
            <p className="reveal text-[#f5d4ab]">لأن من أول مرة، البنت دي سابت جواه أثر أكبر من اللي كان متوقعه.</p>
          </StoryText>
          <div className="mt-12 text-center">
            <button className="story-button ghost-button" onClick={() => goTo('change')} data-testid="button-continue-meeting">
              كمّلّي معاه <ArrowDown size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section id="change" className="bg-[#f0e8db] px-6 py-28 md:py-40">
        <div className="mx-auto max-w-5xl">
          <SceneHeading index="03" title="لما الطريق اتغيّر" />
          <div className="mx-auto mb-14 flex h-28 w-28 items-center justify-center rounded-full border border-[#b98258]/30 bg-[#e6d6c0] text-[#a45b45]">
            <Heart size={33} strokeWidth={1.2} />
          </div>
          <StoryText>
            <p className="reveal">ومن هنا، بدأت الحكاية تتغيّر.</p>
            <p className="reveal reveal-delay-1">الشاب اللي كان شايف حياته سلسلة من الأحلام اللي لازم يحققها...</p>
            <p className="reveal">بدأ يتخيّل إن فيه حد ممكن يشاركه الطريق.</p>
            <p className="reveal reveal-delay-1">ما فقدش طموحه.<br />وما تخلّاش عن أحلامه.</p>
            <p className="reveal">لكن الأحلام اللي كانت ساكنة في عقله بس، بقى ليها مكان في قلبه كمان.</p>
          </StoryText>
          <div className="reveal mx-auto my-20 max-w-4xl border-y border-[#a45b45]/25 py-10 text-center">
            <span className="eyebrow arabic mb-5 block text-[#a45b45]">العقل والقلب</span>
            <p dir="ltr" className="serif text-3xl leading-tight text-[#34332f] md:text-5xl">
              He used to work for his brain.
              <br />
              <span className="italic text-[#a45b45]">Now he works for his brain and his heart.</span>
            </p>
          </div>
          <StoryText>
            <p className="reveal">بقى نفسه ينجح، ويكبر، ويبني حاجة كبيرة...</p>
            <p className="reveal reveal-delay-1">بس المرة دي، كان بيتخيّل إن فيه شريكة بتكبر معاه، وبتحقق أحلامها هي كمان، وإن كل واحد فيهم يقدر يسند التاني.</p>
            <p className="reveal">هو ما كانش بيدوّر على الحب...</p>
            <p className="reveal text-[#a45b45]">لكن لما لقاه فيها، اكتشف إنه مش عايز يشوف المستقبل من غير ما يتخيّل وجودها فيه.</p>
          </StoryText>
        </div>
      </section>

      <section id="moon" className="moon-scene grain relative flex min-h-[100svh] items-center px-6 py-28 text-[#f2e9da] md:py-36">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-14 md:grid-cols-[.75fr_1.25fr]">
            <div className="reveal">
              <span className="eyebrow arabic mb-5 flex items-center gap-3 text-[#e0bd8d]"><Moon size={15} /> كلماته اللي فضلت</span>
              <h2 className="arabic text-4xl font-bold leading-tight md:text-6xl">في جملة<br />بتشبهه...</h2>
              <span className="mt-7 block h-px w-14 bg-[#d6ad76]" />
            </div>
            <div>
              <div className="reveal story-line arabic text-right text-xl leading-[1.8] text-[#f2e9da]/80 md:text-2xl">
                <p>وفيه جملة كان بيقولها...</p>
                <p>جملة بسيطة، لكنها كانت بتشرح إحساس جواه بطريقة ما يعرفش يقولها بأي كلام تاني.</p>
              </div>
              <blockquote className="moon-quote reveal reveal-delay-1 mt-9 border-r-2 border-[#d6ad76] pr-6 text-right md:pr-10">
                <span className="serif mb-3 block text-5xl text-[#d6ad76]" aria-hidden="true">“</span>
                <p className="arabic text-2xl leading-[1.9] text-[#fff7e9] md:text-[2.15rem]">
                  بيقولك إيه بقى، لو حبيت بتبقى عامل زي الشخص اللي قاعد لوحده وشاف انعكاس القمر على البحر بليل، وافتكر إن القمر نزل يقعد عشان يونسه.
                </p>
                <footer className="eyebrow arabic mt-5 text-[#d6ad76]">— قالها هو</footer>
              </blockquote>
            </div>
          </div>
          <div className="reveal mt-20 grid gap-8 border-t border-[#f2e9da]/20 pt-10 md:grid-cols-[.3fr_1fr]">
            <span className="eyebrow arabic text-[#d6ad76]">يمكن كان قصده إيه</span>
            <StoryText className="text-[#f2e9da]/85 md:text-right">
              <p>يمكن هو ما كانش يقصد القمر لوحده...</p>
              <p>يمكن كان بيتكلم عن الإحساس إن حاجة بعيدة تبقى قريبة من القلب بشكل ما يتوصفش.</p>
              <p>وعن إن الواحد، حتى لو كان متعود يمشي لوحده، ممكن يقابل شخص يخلّيه يتمنى إن الطريق يفضل يجمعهم.</p>
              <p>ويمكن دي كانت طريقته في إنه يقولها، من غير ما يضطر يشرح كل اللي جواه...</p>
              <p className="text-[#e3c598]">إن وجودها بقى فارق معاه.</p>
            </StoryText>
          </div>
          <div className="reveal mt-16 text-center">
            <button className="story-button ghost-button" onClick={() => goTo('promise')} data-testid="button-continue-moon">
              ولسه في الحكاية... <ArrowDown size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section id="promise" className="bg-[#e6dac8] px-6 py-28 md:py-40">
        <div className="mx-auto max-w-5xl">
          <SceneHeading index="04" title="الحب فعل كل يوم" />
          <div className="mx-auto mb-14 flex max-w-2xl items-center justify-center gap-4 text-[#a45b45]">
            <span className="h-px flex-1 bg-[#a45b45]/25" /><Heart size={19} fill="currentColor" /><span className="h-px flex-1 bg-[#a45b45]/25" />
          </div>
          <StoryText>
            <p className="reveal">ولما عرفها أكتر، بدأ يفهم إن الحب مش مجرد إحساس قوي في البداية.</p>
            <p className="reveal reveal-delay-1">الحب كمان اهتمام، وصبر، واحترام، وإن الواحد يكون مستعد يسمع ويفهم ويتعلم.</p>
            <p className="reveal">كان عايزها تعرف إنها مش مضطرة تواجه كل حاجة لوحدها.</p>
            <p className="reveal reveal-delay-1">وإن أحلامها ليها مكان، وإن نجاحها مش بعيد عن الحكاية دي.</p>
            <p className="reveal">ولما كان بيقولها إنها مسؤوليته، كان يقصد إنه واخد ثقتها بجدية...</p>
            <p className="reveal">وإنه عايز يكون سند ليها، زي ما يتمنى إنهم يفضلوا سند لبعض.</p>
          </StoryText>
          <div className="reveal mx-auto my-16 max-w-3xl border-r-2 border-[#a45b45] bg-[#f1e9dd]/60 px-7 py-8 text-right md:px-12">
            <p className="arabic text-2xl leading-[1.9] md:text-3xl">هو ما يقدرش يوعدها إن الحياة هتفضل سهلة...</p>
            <p className="arabic mt-4 text-2xl leading-[1.9] text-[#7b5a48] md:text-3xl">لكن يقدر يختار كل يوم إنه يحافظ على الحب اللي بينهم، ويثبت لها بالأفعال إن كلامه مش مجرد لحظة حلوة.</p>
          </div>
          <p className="reveal arabic mb-7 text-center text-2xl text-[#765b47]">وكان بيقولها:</p>
          <div className="reveal mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <div dir="ltr" className="serif flex min-h-40 items-center justify-center border border-[#ad7658]/35 bg-[#f1e9dd]/45 px-5 text-center text-3xl italic text-[#4a3d33] md:text-4xl">
              “I really love you.”
            </div>
            <div dir="ltr" className="serif flex min-h-40 items-center justify-center border border-[#ad7658]/35 bg-[#f1e9dd]/45 px-5 text-center text-3xl italic text-[#4a3d33] md:text-4xl">
              “I really will never let you go.”
            </div>
          </div>
          <p className="reveal eyebrow mt-7 text-center text-[#a45b45]">— كلمات محمد، زي ما قالها</p>
        </div>
      </section>

      <section className="relative bg-[#273338] px-6 py-28 text-[#eee3d2] md:py-40">
        <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-[#d6ad76]" />
        <div className="mx-auto max-w-4xl text-center">
          <span className="reveal eyebrow arabic mb-8 block text-[#d6ad76]">الراوي بيسيب المساحة لصاحب الحكاية</span>
          <StoryText className="text-[#eee3d2]">
            <p className="reveal">ودي كانت الحكاية من برّه...</p>
            <p className="reveal reveal-delay-1">حكاية شاب كان عنده أحلام كتير، وقابل بنت خلّت المستقبل ياخد معنى جديد.</p>
            <p className="reveal">لكن فيه كلام، مهما كان الراوي شاطر...</p>
            <p className="reveal reveal-delay-1">مش هيقدر يقوله مكان صاحب الحكاية.</p>
          </StoryText>
          <div className="reveal my-12 text-4xl text-[#d6ad76]/80" aria-hidden="true">· · ·</div>
          <div className="reveal">
            <p className="arabic text-xl leading-[1.9] text-[#eee3d2]/70 md:text-2xl">لأن الحكاية دي، في الآخر، مش حكاية الراوي.</p>
            <p className="arabic mt-5 text-4xl md:text-6xl">دي حكاية <span className="serif italic text-[#d6ad76]">محمد...</span></p>
            <p className="arabic mt-2 text-2xl text-[#eee3d2]/85 md:text-3xl">وحكايتها هي كمان.</p>
          </div>
          <button
            className="story-button mt-12"
            onClick={() => {
              if (letterOpen) {
                setLetterOpen(false);
              } else {
                setLetterOpen(true);
                window.setTimeout(() => goTo('letter'), 100);
              }
            }}
            aria-expanded={letterOpen}
            aria-controls="letter"
            data-testid="button-open-letter"
          >
            {letterOpen ? 'اقفلي الخطاب' : 'افتحي الخطاب'}
            <ArrowDown className={`transition-transform ${letterOpen ? 'rotate-180' : ''}`} size={16} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section id="letter" className={`bg-[#c9ae8b] px-5 py-20 transition-[padding] duration-500 md:px-8 md:py-28 ${letterOpen ? '' : 'hidden'}`}>
        <article className="letter-paper mx-auto max-w-3xl px-7 py-12 text-[#403328] md:px-16 md:py-16" aria-label="خطاب محمد" aria-hidden={!letterOpen}>
          <div className="mb-12 flex items-start justify-between">
            <span className="eyebrow arabic text-[#87634a]">كلام من M</span>
            <span className="text-2xl text-[#a45b45]" aria-hidden="true">✳</span>
          </div>
          <div dir="ltr" className="letter-signature text-3xl text-[#8b5141] md:text-4xl">To my M... ❤️</div>
          <div className="my-12 space-y-8 text-center">
            <p dir="ltr" className="serif text-3xl italic text-[#44372e] md:text-4xl">I really love you.</p>
            <p dir="ltr" className="serif text-3xl italic text-[#44372e] md:text-4xl">I really will never let you go.</p>
            <div className="mx-auto h-px w-12 bg-[#a45b45]/50" />
            <p className="arabic text-2xl leading-[2] md:text-3xl">
              بيقولك إيه بقى، لو حبيت بتبقى عامل زي الشخص اللي قاعد لوحده وشاف انعكاس القمر على البحر بليل، وافتكر إن القمر نزل يقعد عشان يونسه.
            </p>
          </div>
          <div className="mt-16 border-t border-[#72543a]/20 pt-8">
            <p dir="ltr" className="serif text-xl italic text-[#6a5242]">Forever choosing you,</p>
            <p dir="ltr" className="letter-signature mt-3 text-4xl text-[#8b5141]">M ❤️</p>
          </div>
          <div className="mt-12 border-t border-dashed border-[#72543a]/30 pt-7 text-center">
            <p className="arabic text-xl leading-[1.9] text-[#614c3c] md:text-2xl">وبالمناسبة... كل ده عشان يقولك بحبك، بدل ما يبعتلك رسالة واتساب زي أي بني آدم طبيعي 😂😭❤️</p>
          </div>
        </article>
        <div className="mt-8 text-center">
          <button className="story-button ghost-button !border-[#72543a]/45 !text-[#43372d] hover:!bg-[#72543a]/10" onClick={() => goTo('top')} data-testid="button-return-to-beginning">
            ارجعي لأول الحكاية <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </section>

      <footer className="bg-[#202a2e] px-6 py-10 text-center text-[#ddd0bd]">
        <p dir="ltr" className="serif text-2xl">M<span className="text-[#d6ad76]">.</span></p>
        <p className="arabic mt-2 text-sm text-[#ddd0bd]/60">حكاية اتكتبت على مهل.</p>
        <a href="#top" className="eyebrow mt-6 inline-flex items-center gap-2 text-[#d6ad76]" data-testid="link-back-to-top">
          ارجعي للبداية <ArrowUp size={12} aria-hidden="true" />
        </a>
      </footer>
    </main>
  );
}

export default StoryPage;
