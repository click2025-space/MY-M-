import { useState } from 'react';
import { Waves, Home, Sparkles, RotateCcw, Heart } from 'lucide-react';

interface Destination {
  id: string;
  icon: typeof Waves;
  titleEn: string;
  titleAr: string;
  tagline: string;
  egyptianResponse: string;
  gradient: string;
  accentColor: string;
}

const DESTINATIONS: Destination[] = [
  {
    id: 'sea',
    icon: Waves,
    titleEn: 'A Quiet Day by the Sea',
    titleAr: 'يوم هادئ على شاطئ البحر',
    tagline: 'يوم هادي، والبحر قدامهم، ومفيش حاجة مستعجلة.',
    egyptianResponse:
      'اختيار على مهله... حتى الموج هنا مش مستعجل. كوبايتين شاي بنعناع وبحر هادي، والوقت يقف شوية عشان نسمع بعض براحتنا. 🌊💙',
    gradient: 'from-[#0B2045] via-[#16376A] to-[#28548A]',
    accentColor: '#A9C8F0',
  },
  {
    id: 'home',
    icon: Home,
    titleEn: 'A Home Full of Laughter',
    titleAr: 'بيت دافئ يملأه الضحك',
    tagline: 'مكان بسيط، بس مليان تفاصيل صغيرة تخلي الأيام أحلى.',
    egyptianResponse:
      'تفاصيل صغيرة، وضحكة تاخد راحتها... بيت دافي ريحته قهوة ومفيهوش أي تصنّع، وكل ركن فيه حكاية بتفرّح وتنسّي تعب اليوم. 🏡✨',
    gradient: 'from-[#681A32] via-[#B5263D] to-[#07152F]',
    accentColor: '#E35D73',
  },
  {
    id: 'dreams',
    icon: Sparkles,
    titleEn: 'Two Dreams, One Journey',
    titleAr: 'حلمان في رحلة واحدة',
    tagline: 'كل واحد بيكبر في طريقه، وفي نفس الوقت بيشجّع التاني يكمل.',
    egyptianResponse:
      'حلمين ماشيين جنب بعض... كل واحد بيطير في سماه وبيحقق ذاته، وإيد ماسكة إيد تشجّع وتفرح بنجاح التاني أكتر من نجاحها. 🚀💫',
    gradient: 'from-[#16376A] via-[#681A32] to-[#FFF0D6]/20',
    accentColor: '#FFF0D6',
  },
];

export function MagicalPortals() {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  return (
    <div className="relative mx-auto my-12 max-w-5xl" dir="rtl">
      {/* 3 Floating Portals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DESTINATIONS.map((dest, idx) => {
          const Icon = dest.icon;
          const isSelected = selectedDest?.id === dest.id;

          return (
            <div
              key={dest.id}
              onClick={() => setSelectedDest(dest)}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-500 ${
                isSelected
                  ? 'border-[#E35D73] shadow-[0_0_40px_rgba(227,93,115,0.45)] scale-105 bg-[#07152F]/90'
                  : 'border-[#A9C8F0]/30 hover:border-[#E35D73]/60 bg-[#07152F]/70 hover:scale-[1.02] shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Portal Energy Gradient Ring */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${dest.gradient} opacity-20 group-hover:opacity-35 transition-opacity`}
              />

              {/* Shimmer beam inside portal */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-28 w-28 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all" />

              <div className="relative z-10 p-7 flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="serif text-xs uppercase tracking-widest text-[#A9C8F0]/70">
                      Destination 0{idx + 1}
                    </span>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/5 transition-transform group-hover:scale-110"
                      style={{ color: dest.accentColor }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h4 className="serif text-xl font-bold text-[#FFF0D6] mb-1" dir="ltr">
                    {dest.titleEn}
                  </h4>
                  <h5 className="arabic text-lg font-bold text-[#A9C8F0] mb-4">
                    {dest.titleAr}
                  </h5>

                  <p className="arabic text-base text-[#F7F1E8]/90 leading-relaxed">
                    "{dest.tagline}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#FFF0D6]/80">
                  <span className="arabic font-medium group-hover:text-[#E35D73] transition-colors">
                    {isSelected ? 'تم الاختيار ✨' : 'انقري لاكتشاف هذه الوجهة 🌙'}
                  </span>
                  <span className="text-base">✦</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Destination Feedback Dialogue */}
      {selectedDest && (
        <div className="mt-8 rounded-2xl border-2 border-[#E35D73]/50 bg-gradient-to-r from-[#07152F]/95 via-[#16376A]/90 to-[#07152F]/95 p-6 sm:p-8 shadow-[0_15px_50px_rgba(181,38,61,0.3)] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#B5263D] text-[#FFF0D6] shadow-[0_0_15px_rgba(181,38,61,0.6)]">
              <Heart className="h-6 w-6 fill-current animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="arabic text-sm font-semibold text-[#E35D73]">
                  إحساس من القلب · {selectedDest.titleAr}
                </span>
                <button
                  onClick={() => setSelectedDest(null)}
                  className="flex items-center gap-1 rounded-full px-3 py-1 text-xs text-[#A9C8F0] hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" /> تجربة وجهة أخرى
                </button>
              </div>

              <p className="arabic text-xl sm:text-2xl font-bold text-[#FFF0D6] leading-relaxed">
                "{selectedDest.egyptianResponse}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
