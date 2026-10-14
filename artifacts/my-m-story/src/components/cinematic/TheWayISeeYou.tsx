import { useState } from 'react';
import {
  Heart,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Shield,
  Eye,
  Smile,
  Compass,
  Flame,
  Star,
  Quote,
} from 'lucide-react';

interface TheWayISeeYouProps {
  onContinueToPromise?: () => void;
  paused?: boolean;
}

export function TheWayISeeYou({ onContinueToPromise, paused = false }: TheWayISeeYouProps) {
  // Chapters:
  // 0: Introduction («أنا بحبك إنتِ»)
  // 1: Chapter 1 («ابتسامتك وعينيكي ✨»)
  // 2: Chapter 2 («قلبك والطفلة اللي جواكي 🥹»)
  // 3: Chapter 3 («قوتك… وإنك جيشي وسندي ⚔️❤️»)
  // 4: Chapter 4 («التفاصيل الصغيرة اللي بحبها فيكي ❤️»)
  // 5: Chapter 5 («أنا هنا يا M… وهفضل أختارك ❤️»)
  // 6: Chapter 6 («مش عايز أغيّرك… عايزنا نكبر سوا ✨»)
  // 7: Chapter 7 («أول حب ليا… والجزء الجميل من مستقبلي ❤️»)
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [littleThingsTab, setLittleThingsTab] = useState<number>(0);

  const chapterTitles = [
    { id: 0, title: 'البداية', labelEn: 'Introduction' },
    { id: 1, title: 'ابتسامتك وعينيكي', labelEn: 'Your Smile & Eyes' },
    { id: 2, title: 'قلبك والطفلة اللي جواكي', labelEn: 'Your Inner Child' },
    { id: 3, title: 'جيشي وسندي', labelEn: 'My Girl, My Army' },
    { id: 4, title: 'التفاصيل الصغيرة', labelEn: 'Little Things' },
    { id: 5, title: 'أنا هنا وهفضل أختارك', labelEn: 'Always Here' },
    { id: 6, title: 'عايزنا نكبر سوا', labelEn: 'Our Future' },
    { id: 7, title: 'أول حب ليا', labelEn: 'My First Love' },
  ];

  const handleNext = () => {
    if (activeChapter < 7) {
      setActiveChapter((c) => c + 1);
    } else if (onContinueToPromise) {
      onContinueToPromise();
    }
  };

  const handlePrev = () => {
    if (activeChapter > 0) {
      setActiveChapter((c) => c - 1);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto text-right" dir="rtl">
      {/* Decorative Moonlit Balcony Header Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E35D73]/40 bg-[#0B2045]/70 px-5 py-2 text-xs sm:text-sm font-semibold text-[#A9C8F0] backdrop-blur-md shadow-[0_0_20px_rgba(181,38,61,0.25)]">
          <Sparkles className="h-4 w-4 text-[#FFF0D6]" />
          <span className="serif tracking-widest text-[#FFF0D6]">THE WAY I SEE YOU</span>
          <span className="text-[#E35D73]">·</span>
          <span className="arabic">زي ما أنا شايفك ❤️</span>
        </div>
      </div>

      {/* Chapters Horizontal Navigation Tabs (Pill Navigation) */}
      <nav
        aria-label="فصول زي ما أنا شايفك"
        className="mb-8 flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto py-2 px-1 scrollbar-none"
      >
        {chapterTitles.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(ch.id)}
              className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#B5263D] to-[#681A32] text-[#FFF0D6] shadow-[0_0_15px_rgba(181,38,61,0.5)] border border-[#FFF0D6]/40 scale-105'
                  : 'bg-[#0B2045]/50 text-[#A9C8F0]/70 hover:text-[#FFF0D6] hover:bg-[#16376A]/60 border border-transparent'
              }`}
            >
              <span className="arabic">{ch.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Chapter Card (Ivory / Velvet Glass Paper with Ornamental Borders) */}
      <article
        className="relative overflow-hidden rounded-3xl border-2 border-[#E35D73]/40 bg-gradient-to-b from-[#0B2045]/90 via-[#07152F]/95 to-[#0B2045]/90 p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(7,21,47,0.9),0_0_40px_rgba(181,38,61,0.2)] backdrop-blur-xl transition-all duration-300"
      >
        {/* Subtle Lantern & Silk Ribbon SVG Flourish in the background */}
        <div className="pointer-events-none absolute top-4 left-6 opacity-30" aria-hidden="true">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <path d="M5 45 C35 15, 65 50, 95 25 C105 15, 115 30, 118 20" stroke="#B5263D" strokeWidth="2" />
            <circle cx="10" cy="15" r="4" fill="#FFF0D6" />
          </svg>
        </div>

        {/* ========================================================= */}
        {/* CHAPTER 0: INTRODUCTION («أنا بحبك إنتِ»)                   */}
        {/* ========================================================= */}
        {activeChapter === 0 && (
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <div className="serif text-xs sm:text-sm tracking-[0.25em] text-[#A9C8F0] uppercase">
              Introduction · ما وراء الحكاية
            </div>
            <h3 className="arabic text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFF0D6] leading-tight">
              أنا بحبك إنتِ... بكل تفاصيلك ❤️
            </h3>

            <div className="arabic text-lg sm:text-xl md:text-2xl text-[#F7F1E8] leading-relaxed space-y-4 pt-2">
              <p className="font-semibold text-[#FFF0D6]">
                "عارفة يا M…؟"
              </p>
              <p className="text-[#F7F1E8]/90">
                "إحنا حكينا كتير عن الحكاية اللي بدأت لما دخلتي حياتي، وعن الأحلام اللي بقيت أتخيّلها وإنتِ موجودة فيها…"
              </p>
              <p className="text-[#A9C8F0] font-medium">
                "بس فيه حاجة يمكن ما اتحكتش كفاية."
              </p>
              <p className="text-xl sm:text-2xl font-bold text-[#FFF0D6]">
                "إني مش بس بحب الحكاية اللي بدأت معاكي…"
              </p>
              <div className="my-4 inline-block rounded-2xl border border-[#B5263D]/50 bg-[#681A32]/40 px-6 py-4 shadow-[0_0_25px_rgba(181,38,61,0.3)]">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#E35D73]">
                  "أنا بحبك إنتِ."
                </p>
              </div>
              <p className="text-[#F7F1E8]/90 text-lg sm:text-xl leading-relaxed">
                "بحبك زي ما إنتِ، بكل تفاصيلك الصغيرة اللي يمكن تعدّي عليكي عادي… بس بالنسبالي، عمرها ما كانت عادية."
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CHAPTER 1: YOUR SMILE AND YOUR EYES                       */}
        {/* ========================================================= */}
        {activeChapter === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E35D73]/20 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B5263D]/30 border border-[#E35D73]/40 text-[#FFF0D6]">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <span className="serif text-xs text-[#A9C8F0] tracking-widest uppercase">Chapter 01</span>
                <h3 className="arabic text-2xl sm:text-3xl font-bold text-[#FFF0D6]">
                  ابتسامتك وعينيكي ✨
                </h3>
              </div>
            </div>

            <div className="arabic text-base sm:text-lg md:text-xl text-[#F7F1E8]/95 leading-[2.2] space-y-5 text-right">
              <p className="font-semibold text-[#FFF0D6] text-xl sm:text-2xl">
                "عارفة يا M؟ أنا ساعات بحس إنك مش واخدة بالك من جمالك زي ما أنا واخد بالي منه."
              </p>

              <div className="rounded-2xl border-r-4 border-[#E35D73] bg-[#07152F]/70 p-5 backdrop-blur-sm">
                <p className="text-[#FFF0D6] font-medium">
                  "بحب ابتسامتك… مش عشان هي حلوة وبس، لكن عشان بحب أشوفك مبسوطة، وبحب اللحظة اللي بتبتسمي فيها من قلبك، وكأن الدنيا كلها بتهدى شوية."
                </p>
              </div>

              <div className="rounded-2xl border-r-4 border-[#A9C8F0] bg-[#07152F]/70 p-5 backdrop-blur-sm">
                <p className="text-[#A9C8F0] font-medium">
                  "وبحب عينيكي… بحب أبص فيهم، وبحب تفاصيلهم، وبحب الإحساس اللي بيوصلني وأنا ببصلك. ساعات بحس إن عينيكي عندها كلام كتير، حتى وإنتِ ساكتة."
                </p>
              </div>

              <p className="text-[#F7F1E8]/90">
                "وبحب طريقة كلامك، ونبرة صوتك، وطريقتك وإنتِ بتحكيلي أي حاجة، حتى لو كانت أبسط تفاصيل يومك."
              </p>

              <p className="text-[#FFF0D6]/90">
                "يمكن بالنسبة ليكي دي حاجات عادية… لكن بالنسبالي، التفاصيل دي هي اللي بتخليكي إنتِ، مش أي حد تاني."
              </p>

              <div className="rounded-2xl border border-[#B5263D]/40 bg-gradient-to-r from-[#681A32]/60 via-[#0B2045]/60 to-[#681A32]/60 p-6 text-center">
                <p className="text-lg sm:text-2xl font-bold text-[#FFF0D6] leading-relaxed">
                  "أنا مش بحب صورة مثالية ليكي في خيالي… أنا بحبك إنتِ، بتفاصيلك الحقيقية اللي كل ما أعرفها أكتر، ألاقي نفسي بحبها أكتر."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CHAPTER 2: YOUR HEART AND YOUR INNER CHILD                */}
        {/* ========================================================= */}
        {activeChapter === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E35D73]/20 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B5263D]/30 border border-[#E35D73]/40 text-[#FFF0D6]">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <span className="serif text-xs text-[#A9C8F0] tracking-widest uppercase">Chapter 02</span>
                <h3 className="arabic text-2xl sm:text-3xl font-bold text-[#FFF0D6]">
                  قلبك والطفلة اللي جواكي 🥹
                </h3>
              </div>
            </div>

            <div className="arabic text-base sm:text-lg md:text-xl text-[#F7F1E8]/95 leading-[2.2] space-y-5 text-right">
              <p className="text-xl sm:text-2xl font-bold text-[#FFF0D6]">
                "فيه جزء فيكي بحبه أوي… الجزء اللي يمكن مش كل الناس بتشوفه."
              </p>

              <div className="rounded-2xl border border-[#FFF0D6]/20 bg-[#07152F]/70 p-6 backdrop-blur-md">
                <p className="text-lg sm:text-xl text-[#FFF0D6] leading-relaxed">
                  "الجزء الطفولي اللي جواكي، اللي بيخليني أشوف إن البنت القوية اللي بتواجه الدنيا ممكن يكون جواها قلب رقيق، بيزعل، ويفرح، ويحتاج يتحضن ويتطمن هو كمان."
                </p>
              </div>

              <p className="text-[#E35D73] font-semibold text-lg sm:text-xl">
                "أنا بحب إنك مش مضطرة تبقي قوية طول الوقت عشان أكون فخور بيكي."
              </p>

              <p className="text-[#F7F1E8]/90">
                "مش لازم تبقي عارفة تعملي كل حاجة، ولا لازم تلاقي حل لكل مشكلة، ولا لازم تخبي تعبك عشان تفضلي في عيني قوية."
              </p>

              <div className="rounded-2xl border-r-4 border-[#B5263D] bg-[#681A32]/30 p-5">
                <p className="text-lg sm:text-xl font-bold text-[#FFF0D6]">
                  "حتى في الأيام اللي مش هتحسي فيها إنك أحسن نسخة من نفسك، هتفضلي في عيني بنت جميلة تستاهل الحب والحنية والراحة."
                </p>
              </div>

              <p className="text-[#F7F1E8]/90">
                "ونفسي يبقى عندك معايا مساحة تكوني فيها على طبيعتك… تضحكي من قلبك، وتهزري، وتتكلمي كتير، وتسـكتي لما تحبي، وتعبّري عن ضعفك من غير ما تحسي إنك لازم تعتذري عنه."
              </p>

              <p className="text-xl sm:text-2xl font-bold text-[#A9C8F0] text-center pt-2">
                "أنا مش عايز أحب الجزء القوي منك وبس… أنا عايز أحبك بكل الأجزاء اللي بتكوّنك."
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CHAPTER 3: MY GIRL, MY ARMY                               */}
        {/* ========================================================= */}
        {activeChapter === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E35D73]/20 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B5263D]/30 border border-[#E35D73]/40 text-[#FFF0D6]">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="serif text-xs text-[#A9C8F0] tracking-widest uppercase">Chapter 03</span>
                <h3 className="arabic text-2xl sm:text-3xl font-bold text-[#FFF0D6]">
                  قوتك… وإنك جيشي وسندي ⚔️❤️
                </h3>
              </div>
            </div>

            <div className="arabic text-base sm:text-lg md:text-xl text-[#F7F1E8]/95 leading-[2.2] space-y-5 text-right">
              <p className="font-semibold text-[#FFF0D6] text-xl sm:text-2xl">
                "عارفة إيه من أكتر الحاجات اللي بحبها فيكي؟"
              </p>
              <p className="text-[#F7F1E8]/90">
                "إنك مش مجرد بنت دخلت حياتي وخلّتني أحبها… إنتِ بقيتي حد وجوده فارق معايا وأنا بحاول أبني مستقبلي."
              </p>
              <p className="text-[#A9C8F0]">
                "أنا عندي أحلام كتير، وطريق طويل نفسي أمشيه، وأيام هحتاج فيها أحاول تاني وتالت، وأوقات يمكن أشك في نفسي أو أتعب من الطريق."
              </p>
              <p className="text-[#F7F1E8]/90">
                "وفي وسط كل ده، فكرة إن فيه حد بحبه، ونفسي أشوفه مبسوط وفخور بيا، بتديني إحساس مختلف."
              </p>

              {/* Iconic Focal Point Box */}
              <div className="my-6 rounded-2xl border-2 border-[#E35D73] bg-gradient-to-r from-[#681A32]/80 via-[#0B2045]/80 to-[#681A32]/80 p-6 sm:p-8 text-center shadow-[0_10px_35px_rgba(181,38,61,0.4)]">
                <span className="serif text-sm tracking-widest text-[#FFF0D6]/70 uppercase block mb-2">
                  My Anchor & Strength
                </span>
                <h4 className="arabic text-3xl sm:text-5xl font-extrabold text-[#FFF0D6] mb-3">
                  "إنتِ جيشي يا M…"
                </h4>
                <p className="arabic text-base sm:text-xl text-[#FFF0D6]/90 max-w-2xl mx-auto leading-relaxed">
                  "مش لأنك مطالبة تحاربي كل معاركي، لكن لأن وجودك جنبي بيفكرني إن الحياة مش لازم تتعاش كلها لوحدنا."
                </p>
              </div>

              <p className="text-[#F7F1E8]/90">
                "ونفسي أكون أنا كمان جيشك، الشخص اللي تلاقيه بيشجعك لما تتعبي، وبيفرحلك لما تنجحي، ويفكرك بقيمتك لما تنسيها وسط ضغط الدنيا."
              </p>

              <div className="rounded-2xl border-r-4 border-[#A9C8F0] bg-[#07152F]/70 p-5">
                <p className="text-lg sm:text-xl text-[#FFF0D6] font-medium">
                  "أنا مش عايزك تبقي ضهر ليا وتنسي نفسك… أنا عايزنا نسند بعض، ونكبر سوا، وكل واحد فينا يبقى فخور بالطريق اللي التاني بيبنيه."
                </p>
              </div>

              <p className="text-xl sm:text-2xl font-bold text-[#E35D73] leading-relaxed pt-2">
                "وأجمل حاجة ممكن تحصل ليا مش إني أوصل لكل أحلامي وبس… لكن إني أشوفك وإنتِ كمان بتوصلي لأحلامك، وأكون موجود أقولك: أنا كنت عارف إنك تقدري."
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CHAPTER 4: THE LITTLE THINGS I LOVE (INTERACTIVE CARDS)   */}
        {/* ========================================================= */}
        {activeChapter === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E35D73]/20 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B5263D]/30 border border-[#E35D73]/40 text-[#FFF0D6]">
                <Smile className="h-5 w-5" />
              </div>
              <div>
                <span className="serif text-xs text-[#A9C8F0] tracking-widest uppercase">Chapter 04</span>
                <h3 className="arabic text-2xl sm:text-3xl font-bold text-[#FFF0D6]">
                  التفاصيل الصغيرة اللي بحبها فيكي ❤️
                </h3>
              </div>
            </div>

            {/* Interactive Sub-Cards Tabs */}
            <div className="flex items-center justify-center gap-2 pt-2 pb-4">
              {[
                { idx: 0, title: 'عفويتك وبراءتك' },
                { idx: 1, title: 'بساطة وجودك' },
                { idx: 2, title: 'رحلة اكتشاف لا تنتهي' },
              ].map((tab) => (
                <button
                  key={tab.idx}
                  onClick={() => setLittleThingsTab(tab.idx)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    littleThingsTab === tab.idx
                      ? 'bg-[#B5263D] text-[#FFF0D6] shadow-[0_0_15px_rgba(181,38,61,0.5)] border border-[#FFF0D6]/40'
                      : 'bg-[#07152F]/60 text-[#A9C8F0]/70 hover:text-[#FFF0D6]'
                  }`}
                >
                  <span className="arabic">{tab.title}</span>
                </button>
              ))}
            </div>

            {/* Sub-Card 0 */}
            {littleThingsTab === 0 && (
              <div className="rounded-2xl border border-[#E35D73]/40 bg-[#07152F]/80 p-6 sm:p-8 space-y-4 text-right">
                <p className="text-xl sm:text-2xl font-bold text-[#FFF0D6] leading-relaxed">
                  "عارفة؟ يمكن أكتر حاجة بحبها فيكي هي الحاجات اللي صعب أحطها في قائمة."
                </p>
                <div className="space-y-3 pt-2 text-lg sm:text-xl text-[#F7F1E8]/90 leading-relaxed">
                  <p className="flex items-center gap-2 text-[#E35D73] font-semibold">
                    <Heart className="h-4 w-4 fill-current flex-shrink-0" />
                    <span>طريقة ضحكتك.</span>
                  </p>
                  <p className="flex items-center gap-2 text-[#FFF0D6] font-medium">
                    <Heart className="h-4 w-4 fill-current text-[#E35D73] flex-shrink-0" />
                    <span>الطريقة اللي بتحكي بيها لما تكوني متحمسة لحاجة.</span>
                  </p>
                  <p className="flex items-center gap-2 text-[#A9C8F0] font-medium">
                    <Heart className="h-4 w-4 fill-current text-[#E35D73] flex-shrink-0" />
                    <span>نظرة عينيكي لما تكوني مركزة.</span>
                  </p>
                  <p className="flex items-center gap-2 text-[#F7F1E8] font-medium">
                    <Heart className="h-4 w-4 fill-current text-[#E35D73] flex-shrink-0" />
                    <span>اللحظات اللي بتبقي فيها عفوية من غير ما تفكري إنتِ شكلك عامل إزاي.</span>
                  </p>
                  <p className="text-[#FFF0D6]/90 pt-2 border-t border-white/10">
                    "حتى التفاصيل الصغيرة اللي ممكن تنسي إنك عملتيها، أنا ممكن أفتكرها عشان كانت منك إنتِ."
                  </p>
                </div>
              </div>
            )}

            {/* Sub-Card 1 */}
            {littleThingsTab === 1 && (
              <div className="rounded-2xl border border-[#E35D73]/40 bg-[#07152F]/80 p-6 sm:p-8 space-y-4 text-right">
                <p className="text-xl sm:text-2xl font-bold text-[#FFF0D6] leading-relaxed">
                  "أنا مش مستني منك كل يوم حاجة عظيمة عشان أحبك أكتر."
                </p>
                <p className="text-lg sm:text-xl text-[#F7F1E8]/90 leading-relaxed">
                  "مش مستني مفاجآت، ولا كلام مثالي، ولا إن كل يوم يبقى مختلف عن اللي قبله."
                </p>
                <div className="rounded-2xl border-r-4 border-[#B5263D] bg-[#681A32]/40 p-5">
                  <p className="text-lg sm:text-xl font-bold text-[#FFF0D6] leading-relaxed">
                    "ساعات رسالة صغيرة منك ممكن تفرّحني، وساعات حكاية عادية عن يومك ممكن تخليني مبسوط إني سمعتها منك."
                  </p>
                </div>
              </div>
            )}

            {/* Sub-Card 2 */}
            {littleThingsTab === 2 && (
              <div className="rounded-2xl border border-[#E35D73]/40 bg-[#07152F]/80 p-6 sm:p-8 space-y-4 text-right">
                <p className="text-lg sm:text-xl text-[#F7F1E8]/90 leading-relaxed">
                  "يمكن إنتِ مش عارفة قد إيه وجودك في تفاصيل يومي بيفرق… بس أنا نفسي أفضّل أتعرف عليكي، حتى بعد ما أعرف عنك حاجات كتير."
                </p>
                <div className="rounded-2xl border border-[#FFF0D6]/30 bg-gradient-to-r from-[#681A32]/60 to-[#0B2045]/70 p-6 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-[#FFF0D6] leading-relaxed">
                    "لأنك بالنسبالي مش حكاية خلصت أول ما عرفنا بعض… إنتِ إنسانة نفسي أفضل أكتشفها، وأفهمها، وأحبها مع مرور الوقت."
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* CHAPTER 5: I WILL ALWAYS BE HERE (CRITICAL REASSURANCE)    */}
        {/* ========================================================= */}
        {activeChapter === 5 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E35D73]/20 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B5263D]/30 border border-[#E35D73]/40 text-[#FFF0D6]">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <span className="serif text-xs text-[#A9C8F0] tracking-widest uppercase">Chapter 05</span>
                <h3 className="arabic text-2xl sm:text-3xl font-bold text-[#FFF0D6]">
                  أنا هنا يا M… وهفضل أختارك ❤️
                </h3>
              </div>
            </div>

            <div className="arabic text-base sm:text-lg md:text-xl text-[#F7F1E8]/95 leading-[2.2] space-y-5 text-right">
              <p className="text-xl sm:text-2xl font-bold text-[#FFF0D6]">
                "يا M، عايزك تعرفي حاجة…"
              </p>

              <div className="rounded-2xl border-r-4 border-[#E35D73] bg-[#07152F]/70 p-5">
                <p className="text-[#FFF0D6] font-medium">
                  "أنا مش هزهق منك عشان بتحكيلي كتير، ولا هملّ من تفاصيل يومك، ولا من الحاجات الصغيرة اللي بتحبي تحكيهالي حتى لو حسيتي إنها عادية ومش مهمة."
                </p>
              </div>

              <p className="text-[#A9C8F0] font-medium">
                "أنا عايز أسمعك… عايز أعرف يومك كان عامل إزاي، إيه اللي فرّحك، وإيه اللي ضايقك، وإيه اللي شاغل بالك، وحتى الحاجات اللي مش عارفة تشرحيها لسه."
              </p>

              <p className="text-[#F7F1E8]/90">
                "مش لازم يكون عندك كلام مهم كل مرة، ومش لازم تبقي مبسوطة طول الوقت عشان أحب وجودك. أنا بحب أسمعك لأن الكلام منك إنتِ له مكان مختلف عندي."
              </p>

              <p className="text-[#A9C8F0]">
                "ولو جه يوم حسيتي فيه إنك تعبانة أو مش قادرة تتكلمي، مش هضغط عليكي. هحترم مساحتك، وهفضل موجود لما تحبي تتكلمي."
              </p>

              <div className="rounded-2xl border-r-4 border-[#B5263D] bg-[#681A32]/40 p-5">
                <p className="text-lg sm:text-xl font-bold text-[#FFF0D6] leading-relaxed">
                  "أنا هنا يا M… مش بس في الأيام الحلوة اللي كل حاجة فيها ماشية زي ما إحنا عايزين، لكن كمان في الأيام اللي بتحتاج صبر وتفاهم ومحاولة من جديد."
                </p>
              </div>

              <p className="text-[#F7F1E8]/90">
                "أنا مش عايز أمشي أول ما الطريق يصعب، ولا أسيب إيدك لمجرد إننا اختلفنا أو إن فيه حاجة محتاجة وقت عشان تتصلح. أنا عايز أتعلم معاكي إزاي نعدّي الأيام الصعبة، وإزاي نسمع بعض، وإزاي نصلّح اللي بينا بدل ما نستسهل إننا نبعد."
              </p>

              <p className="text-[#FFF0D6]">
                "ومش هقولك إننا عمرنا ما هنختلف أو إن كل حاجة هتبقى مثالية… لكن هقولك إنك تستاهلي مني الصدق، والاحترام، والصبر، وإنّي أحاول بجد."
              </p>

              {/* Bold Commitment Callout */}
              <div className="rounded-2xl border-2 border-[#E35D73] bg-[#07152F]/90 p-6 sm:p-8 text-center shadow-[0_10px_35px_rgba(181,38,61,0.35)]">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFF0D6] leading-relaxed">
                  "أنا مش عايز أكون موجود في حياتك لما تكون سهلة وبس… أنا عايز أكون الشخص اللي تقدري تلاقيه جنبك وإحنا بنتعلم نواجه الحياة سوا."
                </p>
              </div>

              <p className="text-[#E35D73] font-bold text-lg sm:text-xl">
                "وهفضل أختارك يا M… مش مجرد كلمة حلوة بقولها النهارده، لكن اختيار نفسي أفضل أثبته كل يوم باهتمامي، واحترامي، وصدق مشاعري."
              </p>

              <p className="text-[#F7F1E8]/90">
                "ومهما اتغيرت الأيام، أنا مش عايزك تحسي إنك محتاجة تبقي شخص تاني عشان أفضل أحبك. أنا بحبك إنتِ… وبحب أتعرف عليكي أكتر، وأسمعك أكتر، وأفضل أكتشف التفاصيل اللي بتخلّيكي الإنسانة اللي قلبي اختارها."
              </p>

              {/* Centered Mandatory Climax Line */}
              <div className="my-8 rounded-3xl border border-[#FFF0D6]/40 bg-gradient-to-r from-[#681A32]/80 via-[#0B2045]/80 to-[#681A32]/80 p-8 text-center shadow-[0_0_40px_rgba(255,240,214,0.25)]">
                <h4 dir="ltr" className="serif italic text-2xl sm:text-4xl md:text-5xl font-bold text-[#FFF0D6] tracking-wide mb-3 drop-shadow-[0_0_20px_rgba(255,240,214,0.5)]">
                  “You will never be too much for me to listen to.”
                </h4>
                <p className="arabic text-lg sm:text-2xl font-bold text-[#E35D73] mt-2">
                  "عمرك ما هتكوني تقيلة عليا لمجرد إنك محتاجة حد يسمعك."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CHAPTER 6: YOUR DREAMS AND OUR FUTURE                     */}
        {/* ========================================================= */}
        {activeChapter === 6 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E35D73]/20 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B5263D]/30 border border-[#E35D73]/40 text-[#FFF0D6]">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <span className="serif text-xs text-[#A9C8F0] tracking-widest uppercase">Chapter 06</span>
                <h3 className="arabic text-2xl sm:text-3xl font-bold text-[#FFF0D6]">
                  مش عايز أغيّرك… عايزنا نكبر سوا ✨
                </h3>
              </div>
            </div>

            <div className="arabic text-base sm:text-lg md:text-xl text-[#F7F1E8]/95 leading-[2.2] space-y-5 text-right">
              <div className="rounded-2xl border border-[#FFF0D6]/20 bg-[#07152F]/70 p-6">
                <p className="text-xl sm:text-2xl font-bold text-[#FFF0D6] leading-relaxed">
                  "لو فيه حاجة أتمنى توصلك من كل الكلام ده، فهي إنك مش مطالبة تعملي حاجة معينة عشان تستحقي حبي."
                </p>
              </div>

              <div className="space-y-2 pr-4 border-r-2 border-[#E35D73] text-lg sm:text-xl text-[#F7F1E8]/90">
                <p>• مش لازم تفضلي قوية عشان أفتخر بيكي.</p>
                <p>• مش لازم تفضلي مبتسمة عشان أبقى مبسوط معاكي.</p>
                <p>• ومش لازم تكوني عارفة كل الإجابات عشان أحترمك وأقدّرك.</p>
              </div>

              <p className="text-[#A9C8F0] font-medium">
                "أنا عايز أعرفك على حقيقتك، وأديكي الفرصة تعرفيني على حقيقتي أنا كمان."
              </p>

              <p className="text-[#F7F1E8]/90">
                "ولو جه يوم كنتِ فيه تعبانة، أتمنى تعرفي إنك تقدري تتكلمي. ولو جه يوم كنتِ فيه خايفة، أتمنى نعرف نتكلم عن خوفنا بدل ما نخبيه عن بعض."
              </p>

              <div className="rounded-2xl border-r-4 border-[#B5263D] bg-[#681A32]/30 p-5">
                <p className="text-lg sm:text-xl font-bold text-[#FFF0D6]">
                  "ولو اختلفنا، أتمنى نفتكر إننا مش ضد بعض… إحنا شخصين بيحاولوا يفهموا بعض."
                </p>
              </div>

              <p className="text-[#F7F1E8]/90">
                "أنا مش بوعدك إن كل يوم هيبقى سهل، لكن أتمنى أكون شخص وجوده يهوّن عليكي الأيام الصعبة، زي ما أتمنى وجودك يهوّن عليا أيامي."
              </p>

              <div className="rounded-2xl border border-[#E35D73]/40 bg-gradient-to-r from-[#0B2045]/80 via-[#681A32]/60 to-[#0B2045]/80 p-6 text-center">
                <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFF0D6] leading-relaxed">
                  "نفسي حبنا يبقى مكان نرتاح فيه، مش امتحان لازم ننجح فيه كل يوم عشان نثبت إننا نستاهل بعض."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CHAPTER 7: MY FIRST LOVE                                  */}
        {/* ========================================================= */}
        {activeChapter === 7 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E35D73]/20 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B5263D]/30 border border-[#E35D73]/40 text-[#FFF0D6]">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <span className="serif text-xs text-[#A9C8F0] tracking-widest uppercase">Chapter 07</span>
                <h3 className="arabic text-2xl sm:text-3xl font-bold text-[#FFF0D6]">
                  أول حب ليا… والجزء الجميل من مستقبلي ❤️
                </h3>
              </div>
            </div>

            <div className="arabic text-base sm:text-lg md:text-xl text-[#F7F1E8]/95 leading-[2.2] space-y-5 text-right">
              <p className="text-2xl sm:text-4xl font-extrabold text-[#E35D73]">
                "إنتِ أول حب ليا يا M…"
              </p>

              <p className="text-[#FFF0D6] font-medium text-lg sm:text-xl">
                "وأنا مش بقولها عشان أخلي الكلام رومانسي، ولا عشان أقول جملة حلوة وخلاص."
              </p>

              <div className="rounded-2xl border-r-4 border-[#A9C8F0] bg-[#07152F]/70 p-5">
                <p className="text-lg sm:text-xl text-[#FFF0D6] leading-relaxed">
                  "أنا بقولها لأنك أول بنت خلتني أفكر في الحب بالشكل ده… إنك ممكن تبقى مركز في مستقبلك، وفي كل خطوة بتحاول تحسبها، وفجأة تلاقي نفسك بتفكر في حد وإنت بتخطط لبكرة."
                </p>
              </div>

              <p className="text-[#F7F1E8]/90">
                "بقيت أتخيل نجاحاتي، وأيامي الحلوة، وحتى اللحظات اللي هتعب فيها… وألاقيكي موجودة في الصورة."
              </p>

              <p className="text-[#F7F1E8]/90">
                "مش معنى كده إني عايز أغيّر كل حاجة في حياتي عشانك، ولا إني عايزك تغيّري حياتك عشاني. بالعكس… أنا بحب إن لكل واحد فينا أحلامه وشخصيته وطريقه."
              </p>

              <p className="text-[#A9C8F0] font-semibold text-lg sm:text-xl">
                "بس نفسي الطريقين دول يفضلوا يقربوا من بعض، ونفضل نختار إننا نمشي جنب بعض."
              </p>

              <div className="rounded-2xl border-2 border-[#B5263D] bg-gradient-to-r from-[#681A32]/70 via-[#0B2045]/80 to-[#681A32]/70 p-6 sm:p-8 text-center shadow-[0_10px_35px_rgba(181,38,61,0.3)]">
                <p className="text-xl sm:text-3xl font-extrabold text-[#FFF0D6] leading-relaxed">
                  "إنتِ مش حلم جه ياخد مكان أحلامي… إنتِ بقيتي جزء من المستقبل اللي نفسي أعيشه."
                </p>
              </div>

              <p className="text-lg sm:text-2xl font-bold text-[#E35D73] leading-relaxed pt-2 text-center">
                "ولو دي أول مرة قلبي يعرف الحب بالشكل ده، فنفسي أتعلم معاكي إزاي أخليه حب ناضج، مش بس كلام حلو… حب فيه احترام، وصبر، وصدق، واختيار بيتجدد كل يوم."
              </p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* INTERACTION CONTROLS (PREV / NEXT / CONTINUE)             */}
        {/* ========================================================= */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          {/* Back Step */}
          {activeChapter > 0 ? (
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 rounded-full border border-[#A9C8F0]/30 bg-[#07152F]/70 px-5 py-2.5 text-sm font-semibold text-[#A9C8F0] backdrop-blur-md transition-all hover:border-[#A9C8F0] hover:text-[#FFF0D6] cursor-pointer"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="arabic">الفصل السابق</span>
            </button>
          ) : (
            <div />
          )}

          {/* Forward Step */}
          {activeChapter < 7 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B5263D] to-[#681A32] px-7 py-3 text-sm sm:text-base font-bold text-[#FFF0D6] shadow-[0_4px_20px_rgba(181,38,61,0.5)] border border-[#FFF0D6]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="arabic">
                {activeChapter === 0 ? 'كمّلي معايا ❤️' : 'الفصل التالي'}
              </span>
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onContinueToPromise}
              className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#B5263D] via-[#E35D73] to-[#B5263D] px-8 py-3.5 text-base sm:text-lg font-bold text-[#FFF0D6] shadow-[0_4px_25px_rgba(181,38,61,0.7)] border border-[#FFF0D6]/50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="arabic">نروح لوعد محمد والخطاب؟ 💌</span>
              <Heart className="h-5 w-5 fill-current text-[#FFF0D6]" />
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
