import { useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Sparkles } from 'lucide-react';

interface JournalEntry {
  titleEn: string;
  titleAr: string;
  detail: string;
  reflection: string;
}

const ENTRIES: JournalEntry[] = [
  {
    titleEn: 'To support her dreams.',
    titleAr: 'أن يدعم أحلامها بكل صدق',
    detail: 'إنه يشجّعها على أحلامها، زي ما نفسه يلاقي منها نفس التشجيع.',
    reflection: 'كل حلم كبير بيبدأ بحد مؤمن بيك من غير شروط.',
  },
  {
    titleEn: 'To be patient.',
    titleAr: 'أن يكون صبورًا وواعيًا',
    detail: 'إنه يفهم خوفها، ويديها مساحة تطمّن فيها براحتها.',
    reflection: 'الأمان الحقيقي ما بيجيش بالعافية، بيجي بالوقت والصبر واللين.',
  },
  {
    titleEn: 'To be someone she can trust.',
    titleAr: 'أن يكون ملاذًا تثق به',
    detail: 'إنها تقدر تتكلم معاه على طبيعتها، من غير ما تخاف إنها لازم تبقى قوية طول الوقت.',
    reflection: 'مساحة دافية تخلّصك من أي تعب، وتقولي فيها كل اللي في قلبك.',
  },
  {
    titleEn: 'To face difficult days together.',
    titleAr: 'أن يقفا معًا أمام الأيام الصعبة',
    detail: 'إنهم يتعلموا من الأيام الصعبة، مش بس يستمتعوا بالأيام الحلوة.',
    reflection: 'العلاقة الحقيقية مش اللي مفيهاش مطبات، هي اللي الإيدين بتفضل ماسكة بعض وسط العواصف.',
  },
  {
    titleEn: 'To build a shared future.',
    titleAr: 'أن يبنيا مستقبلًا مشتركًا جميلًا',
    detail: 'إن كل واحد فيهم يفضل شخصيته وأحلامه، وفي نفس الوقت يبنوا حاجة جميلة سوا.',
    reflection: 'مش اتنين بيذوبوا في بعض، اتنين بيكبروا سوا وكل واحد له جناحاته.',
  },
];

export function InteractiveJournal() {
  const [activeIdx, setActiveIdx] = useState(0);
  const entry = ENTRIES[activeIdx];

  return (
    <div className="relative mx-auto my-10 max-w-4xl" dir="rtl">
      {/* Warm Lantern & Ambient Lighting */}
      <div className="absolute -top-12 right-6 z-20 flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-14 w-14 rounded-full bg-[#FFF0D6]/20 blur-xl animate-pulse" />
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFF0D6]/40 bg-[#FFF0D6]/10 text-[#FFF0D6] shadow-[0_0_20px_rgba(255,240,214,0.4)]">
            🕯️
          </div>
        </div>
        <span className="serif text-xs italic tracking-wider text-[#FFF0D6]/80">
          Illuminated by warm lantern light
        </span>
      </div>

      {/* Royal Red Silk Ribbon Fluttering across the top */}
      <div className="absolute -top-4 left-10 z-20 flex items-center gap-1.5 rounded-full border border-[#B5263D]/60 bg-[#681A32]/80 px-3.5 py-1 text-xs text-[#FFF0D6] shadow-[0_0_15px_rgba(181,38,61,0.5)]">
        <Bookmark className="h-3.5 w-3.5 text-[#E35D73]" />
        <span className="arabic font-medium">أوراق من دفتره الخاص</span>
      </div>

      {/* Journal Book Container */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#B5263D]/40 bg-gradient-to-br from-[#FFF0D6] via-[#F7F1E8] to-[#EBDDC8] p-6 sm:p-10 shadow-[0_25px_70px_rgba(7,21,47,0.7),inset_0_0_60px_rgba(104,26,50,0.06)] text-[#07152F]">
        {/* Subtle Watermark M */}
        <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 select-none opacity-5 font-serif text-[18rem] text-[#B5263D]">
          M
        </div>

        {/* Header Tabs: 5 entries */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#07152F]/15 pb-5 mb-8">
          {ENTRIES.map((e, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm transition-all font-semibold ${
                activeIdx === idx
                  ? 'bg-[#B5263D] text-[#FFF0D6] shadow-[0_4px_12px_rgba(181,38,61,0.4)] scale-105'
                  : 'bg-[#07152F]/10 text-[#07152F]/70 hover:bg-[#07152F]/20'
              }`}
            >
              <span className="serif mr-1">0{idx + 1}.</span> {e.titleEn}
            </button>
          ))}
        </div>

        {/* Active Page Content */}
        <div className="min-h-[220px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="serif text-xs sm:text-sm font-semibold tracking-widest text-[#B5263D] uppercase">
                Goal 0{activeIdx + 1} of 05
              </span>
              <Sparkles className="h-4 w-4 text-[#B5263D]/60" />
            </div>

            <h3 className="serif text-2xl sm:text-3xl font-bold text-[#0B2045] mb-2" dir="ltr">
              {entry.titleEn}
            </h3>

            <p className="arabic text-xl sm:text-2xl font-bold text-[#B5263D] mb-5 leading-relaxed">
              {entry.titleAr}
            </p>

            <div className="rounded-xl border-r-4 border-[#B5263D] bg-black/5 p-4 sm:p-5 mb-4">
              <p className="arabic text-lg sm:text-xl text-[#07152F] font-semibold leading-relaxed">
                "{entry.detail}"
              </p>
            </div>

            <p className="arabic text-sm sm:text-base text-[#07152F]/75 italic">
              ✦ {entry.reflection}
            </p>
          </div>

          {/* Page Turn Controls */}
          <div className="flex items-center justify-between border-t border-[#07152F]/15 pt-5 mt-6">
            <button
              onClick={() => setActiveIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeIdx === 0}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#07152F] hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ArrowRight className="h-4 w-4" /> الصفحة السابقة
            </button>

            <span className="serif text-xs text-[#07152F]/60">
              Page {activeIdx + 1} / 5
            </span>

            <button
              onClick={() => setActiveIdx((prev) => Math.min(ENTRIES.length - 1, prev + 1))}
              disabled={activeIdx === ENTRIES.length - 1}
              className="flex items-center gap-1.5 rounded-lg bg-[#B5263D] px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#FFF0D6] shadow-[0_2px_8px_rgba(181,38,61,0.3)] hover:bg-[#8D2038] disabled:opacity-30 disabled:hover:bg-[#B5263D]"
            >
              الصفحة التالية <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
