import { useEffect, useRef } from 'react';

interface OceanMoonShimmerProps {
  paused?: boolean;
  className?: string;
  moonPosition?: { x: number; y: number }; // percentage 0-100
}

export function OceanMoonShimmer({
  paused = false,
  className = '',
  moonPosition = { x: 75, y: 15 },
}: OceanMoonShimmerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Moon reflection path: extends from moonPosition.x downward, widening as it approaches the bottom
      const startX = (moonPosition.x / 100) * width;
      const rows = 36;

      for (let i = 0; i < rows; i++) {
        const progress = i / rows; // 0 at top of water, 1 at bottom
        const y = progress * height;

        // Path widens as it comes closer to viewer
        const spread = (progress * 0.45 + 0.08) * width;
        const currentCenterX = startX + Math.sin(time * 0.015 + progress * 4) * 8;

        // Number of shimmering wavelets at this row
        const waveCount = Math.floor(progress * 18 + 6);

        for (let j = 0; j < waveCount; j++) {
          const waveProgress = (j - waveCount / 2) / (waveCount / 2); // -1 to 1
          const waveX = currentCenterX + waveProgress * (spread / 2);

          // Wavelet oscillation
          const waveShift = Math.sin(time * 0.04 + progress * 8 + j * 0.7) * 4;
          const waveWidth = (Math.sin(time * 0.03 + j * 1.3) * 0.5 + 0.5) * (progress * 28 + 12);
          const alpha = (1 - Math.abs(waveProgress)) * (0.15 + progress * 0.45) * (0.6 + Math.sin(time * 0.05 + j * 0.9) * 0.4);

          // Shimmer gradient
          const grad = ctx.createLinearGradient(waveX - waveWidth / 2, y, waveX + waveWidth / 2, y);
          // Highlight colors: ivory, moonlight blue, and subtle rose glimmer
          if (j % 5 === 0) {
            grad.addColorStop(0, 'rgba(227, 93, 115, 0)');
            grad.addColorStop(0.5, `rgba(255, 240, 214, ${alpha * 0.85})`);
            grad.addColorStop(1, 'rgba(227, 93, 115, 0)');
          } else {
            grad.addColorStop(0, 'rgba(169, 200, 240, 0)');
            grad.addColorStop(0.5, `rgba(255, 240, 214, ${alpha})`);
            grad.addColorStop(1, 'rgba(169, 200, 240, 0)');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(
            waveX,
            y + waveShift,
            waveWidth / 2,
            Math.max(1, progress * 2.2),
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      if (!paused) {
        time += 1;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [paused, moonPosition.x, moonPosition.y]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-80 ${className}`}
      aria-hidden="true"
    />
  );
}
