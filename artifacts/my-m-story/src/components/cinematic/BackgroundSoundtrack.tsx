import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

interface BackgroundSoundtrackProps {
  className?: string;
}

export function BackgroundSoundtrack({ className = '' }: BackgroundSoundtrackProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Setup Web Audio API gain boost for very high volume
  const setupGainBoost = (audio: HTMLAudioElement) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx && !gainNodeRef.current) {
        const ctx = new AudioCtx();
        const source = ctx.createMediaElementSource(audio);
        const gain = ctx.createGain();
        gain.gain.value = 1.4; // High volume boost (140%)
        source.connect(gain);
        gain.connect(ctx.destination);
        gainNodeRef.current = gain;
        audioCtxRef.current = ctx;
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
    } catch (e) {
      // Native volume 1.0 fallback
      console.log('Audio boost fallback to standard volume 1.0');
    }
  };

  // Attempt autoplay immediately on mount and fallback to first user gesture
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 1.0; // Maximum standard volume
    audio.loop = true;

    // Try playing immediately at high volume
    const startAudio = () => {
      setupGainBoost(audio);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowPrompt(false);
          })
          .catch(() => {
            // Browser policy requires a user touch/click first
            setShowPrompt(true);
          });
      }
    };

    startAudio();

    // Global listener for first user interaction to unlock full volume playback immediately
    const handleFirstUserInteraction = () => {
      setHasInteracted(true);
      if (audio) {
        setupGainBoost(audio);
        audio.volume = 1.0;
        if (audio.paused) {
          audio.play()
            .then(() => {
              setIsPlaying(true);
              setShowPrompt(false);
            })
            .catch(() => {});
        }
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('pointerdown', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('play-soundtrack-high-volume', handleFirstUserInteraction);
    };

    window.addEventListener('click', handleFirstUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { passive: true });
    window.addEventListener('pointerdown', handleFirstUserInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { passive: true });
    window.addEventListener('play-soundtrack-high-volume', handleFirstUserInteraction);

    return () => {
      cleanupListeners();
    };
  }, []);

  // Ensure loop / replay when track finishes
  const handleEnded = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setShowPrompt(false);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      {/* Hidden audio element with dual sources */}
      <audio
        ref={audioRef}
        src="/soundtrack.mp3"
        preload="auto"
        loop
        playsInline
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/soundtrack.mp3" type="audio/mpeg" />
        <source src="/WhatsApp Audio 2026-10-14 at 4.39.22 PM.mpeg" type="audio/mpeg" />
      </audio>

      {/* Floating Soundtrack Control Button */}
      <div
        className={`fixed top-4 left-4 sm:left-6 z-[60] flex items-center gap-2 pointer-events-auto select-none ${className}`}
        dir="rtl"
      >
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'إيقاف الموسيقى مؤقتًا' : 'تشغيل الموسيقى الرومانسية'}
          title={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
          className={`group relative flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer ${
            isPlaying
              ? 'border-[#E35D73]/60 bg-[#07152F]/85 text-[#FFF0D6] shadow-[0_0_15px_rgba(227,93,115,0.3)]'
              : 'border-[#A9C8F0]/30 bg-[#07152F]/70 text-[#A9C8F0] hover:border-[#E35D73]/50 hover:text-[#FFF0D6]'
          }`}
        >
          {/* Soundwave animation bars when playing */}
          {isPlaying ? (
            <div className="flex items-end gap-[3px] h-3.5 w-4" aria-hidden="true">
              <span className="w-[3px] rounded-full bg-[#E35D73] animate-[pulse_1s_ease-in-out_infinite]" style={{ height: '65%' }} />
              <span className="w-[3px] rounded-full bg-[#FFF0D6] animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" style={{ height: '100%' }} />
              <span className="w-[3px] rounded-full bg-[#A9C8F0] animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" style={{ height: '45%' }} />
            </div>
          ) : (
            <VolumeX className="h-4 w-4 text-[#A9C8F0]/80 group-hover:text-[#E35D73] transition-colors" />
          )}

          <span className="arabic text-xs font-semibold">
            {isPlaying ? 'الموسيقى شغالة 🎵' : 'تشغيل الموسيقى 🎵'}
          </span>

          {/* Gentle glow effect when playing */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#B5263D]/20 to-[#A9C8F0]/10 blur-sm pointer-events-none -z-10" />
          )}
        </button>

        {/* Subtle one-time invitation badge if browser initially blocked autoplay */}
        {showPrompt && !isPlaying && (
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#B5263D]/90 border border-[#FFF0D6]/40 px-3 py-1 text-[11px] font-bold text-[#FFF0D6] shadow-lg animate-bounce">
            <Sparkles className="h-3 w-3 text-[#FFF0D6]" />
            <span>انقري هنا لتشغيل الموسيقى 🎶</span>
          </div>
        )}
      </div>
    </>
  );
}
