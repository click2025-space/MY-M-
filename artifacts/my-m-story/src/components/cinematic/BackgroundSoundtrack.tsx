import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

let globalAudio: HTMLAudioElement | null = null;
const listeners = new Set<(playing: boolean) => void>();

function notifyListeners(playing: boolean) {
  listeners.forEach((fn) => fn(playing));
}

/**
 * Direct synchronous call to start the soundtrack.
 * Calling this directly inside any mobile touch/click handler
 * satisfies iOS Safari and Android Chrome user gesture policies.
 */
export function playSoundtrackNow() {
  if (globalAudio) {
    globalAudio.volume = 1.0;
    const playPromise = globalAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          notifyListeners(true);
        })
        .catch((err) => {
          console.log('Mobile audio play error:', err);
        });
    }
  }
}

export function pauseSoundtrackNow() {
  if (globalAudio) {
    globalAudio.pause();
    notifyListeners(false);
  }
}

export function toggleSoundtrackNow() {
  if (globalAudio) {
    if (globalAudio.paused) {
      playSoundtrackNow();
    } else {
      pauseSoundtrackNow();
    }
  }
}

interface BackgroundSoundtrackProps {
  className?: string;
}

export function BackgroundSoundtrack({ className = '' }: BackgroundSoundtrackProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showMobileNotice, setShowMobileNotice] = useState<boolean>(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    globalAudio = audio;
    audio.volume = 1.0;
    audio.loop = true;

    // Load audio buffer in memory so it's ready for instant playback
    audio.load();

    const updateState = (playing: boolean) => {
      setIsPlaying(playing);
      if (playing) {
        setShowMobileNotice(false);
      }
    };
    listeners.add(updateState);

    // Attempt standard desktop autoplay
    const tryAutoplay = () => {
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
          setShowMobileNotice(false);
        }).catch(() => {
          // Normal on mobile browsers before first gesture
          setShowMobileNotice(true);
        });
      }
    };
    tryAutoplay();

    // Attach synchronous mobile unlock handlers on document & window
    const unlockMobileAudio = () => {
      if (audio && audio.paused) {
        audio.volume = 1.0;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setShowMobileNotice(false);
          })
          .catch(() => {});
      }
    };

    // Listen on multiple touch / click events
    window.addEventListener('touchstart', unlockMobileAudio, { passive: true, once: true });
    window.addEventListener('touchend', unlockMobileAudio, { passive: true, once: true });
    window.addEventListener('click', unlockMobileAudio, { passive: true, once: true });
    window.addEventListener('pointerdown', unlockMobileAudio, { passive: true, once: true });

    return () => {
      listeners.delete(updateState);
      window.removeEventListener('touchstart', unlockMobileAudio);
      window.removeEventListener('touchend', unlockMobileAudio);
      window.removeEventListener('click', unlockMobileAudio);
      window.removeEventListener('pointerdown', unlockMobileAudio);
    };
  }, []);

  // When track finishes, replay automatically
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleToggle = () => {
    toggleSoundtrackNow();
  };

  return (
    <>
      {/* Native HTML5 Audio with playsInline & high compatibility for iOS and Android */}
      <audio
        ref={audioRef}
        src="/soundtrack.mp3"
        preload="auto"
        loop
        playsInline
        onEnded={handleEnded}
        onPlay={() => {
          setIsPlaying(true);
          setShowMobileNotice(false);
        }}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/soundtrack.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Soundtrack Control Pill */}
      <div
        className={`fixed top-4 left-4 sm:left-6 z-[60] flex items-center gap-2 pointer-events-auto select-none ${className}`}
        dir="rtl"
      >
        <button
          onClick={handleToggle}
          type="button"
          aria-label={isPlaying ? 'إيقاف الموسيقى مؤقتًا' : 'تشغيل الموسيقى الرومانسية'}
          title={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
          className={`group relative flex items-center gap-2 rounded-full border px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer active:scale-95 ${
            isPlaying
              ? 'border-[#E35D73]/60 bg-[#07152F]/90 text-[#FFF0D6] shadow-[0_0_15px_rgba(227,93,115,0.4)]'
              : 'border-[#A9C8F0]/40 bg-[#07152F]/85 text-[#FFF0D6] animate-pulse hover:border-[#E35D73]'
          }`}
        >
          {/* Animated soundwave bars when playing */}
          {isPlaying ? (
            <div className="flex items-end gap-[3px] h-3.5 w-4" aria-hidden="true">
              <span className="w-[3px] rounded-full bg-[#E35D73] animate-[pulse_1s_ease-in-out_infinite]" style={{ height: '70%' }} />
              <span className="w-[3px] rounded-full bg-[#FFF0D6] animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" style={{ height: '100%' }} />
              <span className="w-[3px] rounded-full bg-[#A9C8F0] animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" style={{ height: '50%' }} />
            </div>
          ) : (
            <VolumeX className="h-4 w-4 text-[#E35D73]" />
          )}

          <span className="arabic text-xs font-semibold">
            {isPlaying ? 'الموسيقى شغالة 🎵' : 'شغّلي الموسيقى 🎵'}
          </span>

          {isPlaying && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#B5263D]/25 to-[#A9C8F0]/15 blur-sm pointer-events-none -z-10" />
          )}
        </button>

        {/* Floating pulse indicator on mobile before user taps */}
        {showMobileNotice && !isPlaying && (
          <div
            onClick={playSoundtrackNow}
            className="flex items-center gap-1.5 rounded-full bg-[#B5263D] border border-[#FFF0D6]/40 px-3 py-1 text-[11px] font-bold text-[#FFF0D6] shadow-[0_0_15px_rgba(181,38,61,0.6)] animate-bounce cursor-pointer active:scale-95"
          >
            <Sparkles className="h-3 w-3 text-[#FFF0D6]" />
            <span>اضغطي هنا للصوت 🎶</span>
          </div>
        )}
      </div>
    </>
  );
}
