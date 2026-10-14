import { useState } from 'react';
import { Heart, Sparkles, RotateCcw, ArrowDown } from 'lucide-react';

interface WaxSealLetterProps {
  onReplay: () => void;
}

export function WaxSealLetter({ onReplay }: WaxSealLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCracking, setIsCracking] = useState(false);

  const handleOpenLetter = () => {
    setIsCracking(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsCracking(false);
    }, 600);
  };

  return (
    <div className="relative mx-auto my-12 max-w-4xl" dir="rtl">
      {!isOpen ? (
        /* SCENE 09: Sealed Letter with Wax Stamp */
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
          <div className="relative cursor-pointer group" onClick={handleOpenLetter}>
            {/* Ambient Red & Moonlight Glow behind envelope */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#B5263D]/30 via-[#E35D73]/20 to-[#A9C8F0]/30 blur-2xl group-hover:opacity-100 opacity-60 transition-opacity" />

            {/* Sealed Envelope Graphic */}
            <div className="relative w-80 sm:w-96 rounded-2xl border-2 border-[#B5263D]/50 bg-gradient-to-b from-[#FFF0D6] via-[#F7F1E8] to-[#E3D4BE] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-[#07152F]">
              {/* Envelope flap lines */}
              <div className="absolute top-0 left-0 right-0 h-28 border-b border-[#07152F]/15 bg-gradient-to-b from-[#F2E5D0] to-transparent clip-path-triangle pointer-events-none" />

              <div className="pt-12 pb-6 flex flex-col items-center">
                <span className="serif text-xs uppercase tracking-widest text-[#B5263D] font-bold mb-2">
                  To My M ❤️ · Personal & Sealed
                </span>
                <span className="arabic text-sm sm:text-base text-[#07152F]/80 font-bold">
                  خلاص بقى... محمد عايز يقولك حاجة 🥹❤️
                </span>

                {/* Wax Seal Button */}
                <div className="mt-8 relative">
                  <div className="absolute -inset-2 rounded-full bg-[#B5263D]/40 blur-md group-hover:scale-125 transition-transform" />
                  <button
                    aria-label="كسر الختم وفتح الخطاب"
                    className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#E35D73] bg-[#B5263D] shadow-[0_8px_25px_rgba(181,38,61,0.6)] transition-transform duration-300 ${
                      isCracking ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                    }`}
                  >
                    <span className="serif text-3xl font-bold text-[#FFF0D6]">M</span>
                    <Heart className="absolute -bottom-1 -right-1 h-5 w-5 text-[#FFF0D6] fill-current" />
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs text-[#B5263D] font-semibold animate-bounce">
                  <span>انقري لكسر الختم وقراءة الخطاب</span>
                  <ArrowDown className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SCENE 10: Unfolded Personal Letter */
        <article
          id="personal-letter-full"
          className="relative overflow-hidden rounded-3xl border-2 border-[#B5263D]/50 bg-gradient-to-b from-[#FFF0D6] via-[#F7F1E8] to-[#F2E5D0] p-7 sm:p-14 shadow-[0_30px_90px_rgba(7,21,47,0.8),inset_0_0_80px_rgba(181,38,61,0.06)] text-[#07152F] animate-in zoom-in-95 fade-in duration-700"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 right-4 text-[#B5263D]/30 text-2xl font-serif select-none">✦</div>
          <div className="absolute top-4 left-4 text-[#B5263D]/30 text-2xl font-serif select-none">✦</div>
          <div className="absolute bottom-4 right-4 text-[#B5263D]/30 text-2xl font-serif select-none">✦</div>
          <div className="absolute bottom-4 left-4 text-[#B5263D]/30 text-2xl font-serif select-none">✦</div>

          {/* Letter Header */}
          <div className="flex items-center justify-between border-b border-[#B5263D]/25 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B5263D] text-[#FFF0D6] shadow-[0_2px_10px_rgba(181,38,61,0.4)]">
                <span className="serif font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="serif text-xl sm:text-2xl font-bold text-[#B5263D]" dir="ltr">
                  To my M... ❤️
                </h3>
                <span className="serif text-xs text-[#07152F]/60">A letter from Mohamed</span>
              </div>
            </div>

            <span className="arabic text-xs sm:text-sm text-[#B5263D] font-bold flex items-center gap-1">
              <Sparkles className="h-4 w-4" /> خلاص بقى... محمد عايز يقولك حاجة 🥹❤️
            </span>
          </div>

          {/* Mohamed's Authentic Letter Body */}
          <div className="space-y-6 text-right leading-loose">
            <h4 className="arabic text-2xl sm:text-3xl font-bold text-[#B5263D] mb-6">
              يا M،
            </h4>

            <p className="arabic text-lg sm:text-xl text-[#07152F]/90 leading-[2.2]">
              يمكن مهما حاولت أكتبلك عن كل حاجة بحبها فيكي، هفضل حاسس إن فيه كلام أكتر جوايا لسه ما عرفتش أقوله.
            </p>

            <p className="arabic text-lg sm:text-xl text-[#07152F]/90 leading-[2.2]">
              بحب جمالك، وابتسامتك، وعينيكي، وطريقتك في الكلام… وبحب تفاصيل صغيرة فيكي يمكن ما فكرتيش قبل كده إن حد ممكن ياخد باله منها.
            </p>

            <p className="arabic text-lg sm:text-xl font-bold text-[#681A32] leading-[2.2]">
              بس أكتر من كل ده، بحب الإنسانة اللي إنتِ عليها.
            </p>

            <p className="arabic text-lg sm:text-xl text-[#07152F]/90 leading-[2.2]">
              بحب قلبك، وبحب الطفلة اللي جواكي، وبحب قوتك، وبحب إن ورا القوة دي رقة وجمال يمكن مش كل الناس تعرف تشوفهم.
            </p>

            <p className="arabic text-lg sm:text-xl text-[#07152F]/90 leading-[2.2]">
              إنتِ أول حب ليا، والإنسانة اللي خلتني أفكر إن المستقبل ممكن يبقى أحلى لما يكون فيه حد بنحبه وبنشجعه، وحد بيشجعنا وإحنا بنحاول نوصل.
            </p>

            <p className="arabic text-lg sm:text-xl text-[#07152F]/90 leading-[2.2]">
              ونفسي أكون ليكي الشخص اللي يؤمن بيكي حتى في الأيام اللي إنتِ نفسك تشكي فيها في قدراتك. الشخص اللي يفرح لفرحتك من قلبه، ويحترم أحلامك، ويسيبلك المساحة تكبري وتحققي اللي نفسك فيه.
            </p>

            <p className="arabic text-lg sm:text-xl text-[#07152F]/90 leading-[2.2]">
              أنا مش عايز أكون سبب إنك تبقي شخص تاني… أنا عايز أحبك وإنتِ بتبقي أكتر نسخة حقيقية من نفسك.
            </p>

            <p className="arabic text-lg sm:text-xl text-[#07152F]/90 leading-[2.2]">
              ولو سألتيني إيه اللي نفسي فيه من كل الحكاية دي، هقولك إني نفسي نكبر، ونتعلم، ونتغير للأحسن، ونفضل نكتشف في بعض حاجات جديدة تستاهل الحب.
            </p>

            <p className="arabic text-lg sm:text-xl text-[#07152F]/90 leading-[2.2]">
              نفسي بعد سنين، لما نبص لورا، نكون فخورين بنفسنا وبكل خطوة تعبنا فيها، ونبص لبعض ونفتكر إننا حاولنا نكون سند حقيقي لبعض، مش مجرد كلام حلو في بداية الحكاية.
            </p>

            <p className="arabic text-lg sm:text-xl text-[#07152F]/90 leading-[2.2]">
              يا M، أنا مش عارف أقدر أوصفلك قد إيه إنتِ غالية عندي، بس عارف إني مبسوط إن الدنيا جمعتني بيكي، وإن من بين كل الطرق اللي كان ممكن أمشيها، فيه طريق خلاني أعرفك.
            </p>

            <p className="arabic text-xl sm:text-2xl font-bold text-[#B5263D] leading-[2.3] pt-4">
              أنا بحبك… مش بس عشان إنتِ جميلة في عيني، لكن عشان كل يوم بعرف فيه عنك حاجة جديدة، بلاقي سبب جديد يخليني أحب الإنسانة اللي ورا الجمال ده.
            </p>

            {/* Preserved Iconic Words Callout */}
            <div className="my-8 rounded-2xl border-r-4 border-[#B5263D] bg-[#B5263D]/5 p-6 text-center">
              <p dir="ltr" className="serif text-2xl sm:text-3xl italic text-[#B5263D] font-semibold mb-2">
                "I really love you."
              </p>
              <p dir="ltr" className="serif text-2xl sm:text-3xl italic text-[#B5263D] font-semibold mb-4">
                "I really will never let you go."
              </p>
              <div className="mx-auto h-px w-24 bg-[#B5263D]/30 my-4" />
              <p className="arabic text-base sm:text-lg text-[#07152F]/90 leading-relaxed">
                "بيقولك إيه بقى، لو حبيت بتبقى عامل زي الشخص اللي قاعد لوحده وشاف انعكاس القمر على البحر بليل، وافتكر إن القمر نزل يقعد عشان يونسه."
              </p>
            </div>

            {/* English Closing from Section 13 */}
            <div dir="ltr" className="my-10 rounded-2xl border border-[#B5263D]/20 bg-[#FFF0D6]/50 p-6 sm:p-8 text-left space-y-3 font-serif">
              <p className="text-lg sm:text-xl text-[#07152F]/90 italic">
                And if I could choose again, knowing everything I know now…
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-[#B5263D]">
                I'd still want to meet you.
              </p>
              <p className="text-xl sm:text-2xl font-semibold text-[#B5263D]">
                I'd still want to know you.
              </p>
              <p className="text-xl sm:text-2xl font-bold text-[#681A32]">
                And I'd still choose to love you.
              </p>
            </div>
          </div>

          {/* Signature */}
          <div className="mt-12 border-t border-[#B5263D]/25 pt-8 flex flex-col items-start" dir="ltr">
            <span className="signature text-3xl sm:text-4xl text-[#07152F]/80">Forever choosing you,</span>
            <span className="serif text-4xl sm:text-5xl font-bold text-[#B5263D] mt-2 flex items-center gap-2">
              M <span className="text-3xl text-[#E35D73]">❤️</span>
            </span>
          </div>

          {/* Postscript playful note by narrator */}
          <div className="mt-12 rounded-2xl border border-dashed border-[#B5263D]/40 bg-[#FFF0D6]/60 p-5 text-center">
            <p className="arabic text-base sm:text-lg text-[#07152F] font-semibold leading-relaxed">
              وبالمناسبة... كل ده عشان يقولك بحبك، بدل ما يبعتلك رسالة واتساب زي أي بني آدم طبيعي 😂😭❤️
            </p>
          </div>

          {/* Replay Control */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-[#B5263D]/20 pt-8">
            <button
              onClick={onReplay}
              className="flex items-center gap-2 rounded-full bg-[#B5263D] px-8 py-3.5 text-base font-bold text-[#FFF0D6] shadow-[0_10px_25px_rgba(181,38,61,0.5)] transition-all hover:bg-[#E35D73] hover:scale-105"
            >
              <RotateCcw className="h-5 w-5" />
              <span>نعيش الرحلة من أول وجديد؟ 🌙</span>
            </button>
          </div>
        </article>
      )}
    </div>
  );
}
