import { useEffect, useRef } from 'react';

interface StarfieldCanvasProps {
  paused?: boolean;
  className?: string;
}

export function StarfieldCanvas({ paused = false, className = '' }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.min(180, Math.floor((width * height) / 8000));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.85 ? '#FFF0D6' : Math.random() > 0.4 ? '#A9C8F0' : '#FFFFFF',
      offset: Math.random() * Math.PI * 2,
    }));

    // Shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }

    let shootingStar: ShootingStar | null = null;
    let lastShootingTime = Date.now();

    const spawnShootingStar = () => {
      shootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 6 + 4,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
        alpha: 1,
        active: true,
      };
      lastShootingTime = Date.now();
    };

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Stars
      for (const star of stars) {
        if (!paused) {
          star.alpha = 0.25 + 0.75 * Math.abs(Math.sin(tick * star.speed + star.offset));
        }
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow on brighter stars
        if (star.size > 1.4 && star.alpha > 0.7) {
          ctx.globalAlpha = star.alpha * 0.35;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Check shooting star
      const now = Date.now();
      if (!paused && !shootingStar && now - lastShootingTime > 7000 && Math.random() < 0.015) {
        spawnShootingStar();
      }

      if (shootingStar && shootingStar.active) {
        const { x, y, length, speed, angle, alpha } = shootingStar;
        const tailX = x - Math.cos(angle) * length;
        const tailY = y - Math.sin(angle) * length;

        const grad = ctx.createLinearGradient(tailX, tailY, x, y);
        grad.addColorStop(0, 'rgba(227, 93, 115, 0)');
        grad.addColorStop(0.7, 'rgba(169, 200, 240, 0.6)');
        grad.addColorStop(1, 'rgba(255, 240, 214, 0.95)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x, y);
        ctx.stroke();

        if (!paused) {
          shootingStar.x += Math.cos(angle) * speed;
          shootingStar.y += Math.sin(angle) * speed;
          shootingStar.alpha -= 0.012;
          if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
            shootingStar.active = false;
            shootingStar = null;
          }
        }
      }

      ctx.globalAlpha = 1;
      tick++;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
