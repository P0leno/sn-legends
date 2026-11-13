import { useEffect, useRef } from 'react';

interface Spore {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  speed: number;
  baseAlpha: number;
  tint: 0 | 1;
}

interface ForestSporesProps {
  reducedMotion: boolean;
  pointerRef?: React.RefObject<{ x: number; y: number; active: boolean } | null>;
}

/**
 * Lightweight GPU-friendly forest fireflies overlay + optional desktop canopy beam.
 * Pre-renders radial sprites once to avoid per-frame allocations,
 * and pauses automatically when offscreen or tab is hidden.
 */
export function ForestSpores({ reducedMotion, pointerRef }: ForestSporesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const createGlowSprite = (r: number, g: number, b: number) => {
      const sprite = document.createElement('canvas');
      sprite.width = 32;
      sprite.height = 32;
      const sctx = sprite.getContext('2d');
      if (!sctx) return sprite;
      const grad = sctx.createRadialGradient(16, 16, 1, 16, 16, 16);
      grad.addColorStop(0, `rgba(245, 255, 248, 0.95)`);
      grad.addColorStop(0.28, `rgba(${r}, ${g}, ${b}, 0.7)`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 32, 32);
      return sprite;
    };

    const createBeamSprite = () => {
      const sprite = document.createElement('canvas');
      sprite.width = 256;
      sprite.height = 256;
      const sctx = sprite.getContext('2d');
      if (!sctx) return sprite;
      const grad = sctx.createRadialGradient(128, 128, 4, 128, 128, 128);
      grad.addColorStop(0, 'rgba(94, 240, 155, 0.14)');
      grad.addColorStop(0.45, 'rgba(56, 201, 119, 0.05)');
      grad.addColorStop(1, 'rgba(56, 201, 119, 0)');
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 256, 256);
      return sprite;
    };

    const sprites = [createGlowSprite(94, 240, 155), createGlowSprite(188, 248, 162)];
    const beamSprite = createBeamSprite();

    let width = 0;
    let height = 0;
    let dpr = 1;
    let spores: Spore[] = [];
    let smoothX = 0.5;
    let smoothY = 0.45;
    let smoothBeamAlpha = 0;

    const seedSpores = (w: number, h: number) => {
      const count = w < 680 ? 11 : 22;
      spores = Array.from({ length: count }, (_, idx) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 14,
        vy: -(8 + Math.random() * 14),
        size: 10 + Math.random() * 16,
        phase: Math.random() * Math.PI * 2,
        speed: 0.9 + Math.random() * 1.4,
        baseAlpha: 0.25 + Math.random() * 0.45,
        tint: idx % 4 === 0 ? 1 : 0,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (spores.length === 0) {
        seedSpores(width, height);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let rafId = 0;
    let isVisible = true;
    let isTabVisible = !document.hidden;
    let lastTs = performance.now();

    const frame = (now: number) => {
      if (!isVisible || !isTabVisible) {
        rafId = 0;
        return;
      }
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;

      ctx.clearRect(0, 0, width, height);
      const t = now * 0.001;

      const ptr = pointerRef?.current;
      const targetAlpha = ptr?.active ? 1 : 0;
      smoothBeamAlpha += (targetAlpha - smoothBeamAlpha) * Math.min(1, dt * 8);
      if (ptr && ptr.active) {
        smoothX += (ptr.x - smoothX) * Math.min(1, dt * 10);
        smoothY += (ptr.y - smoothY) * Math.min(1, dt * 10);
      }
      if (smoothBeamAlpha > 0.01) {
        const beamSize = Math.max(width, height) * 0.56;
        ctx.globalAlpha = smoothBeamAlpha;
        ctx.drawImage(
          beamSprite,
          smoothX * width - beamSize * 0.5,
          smoothY * height - beamSize * 0.5,
          beamSize,
          beamSize
        );
      }

      for (let i = 0; i < spores.length; i += 1) {
        const s = spores[i];
        s.x += (s.vx + Math.sin(t * 0.8 + s.phase) * 7) * dt;
        s.y += s.vy * dt;

        if (s.y < -s.size) {
          s.y = height + s.size;
          s.x = Math.random() * width;
        }
        if (s.x < -s.size) s.x = width + s.size;
        if (s.x > width + s.size) s.x = -s.size;

        const twinkle = 0.48 + 0.52 * Math.sin(t * s.speed + s.phase);
        ctx.globalAlpha = s.baseAlpha * twinkle;
        ctx.drawImage(sprites[s.tint], s.x - s.size * 0.5, s.y - s.size * 0.5, s.size, s.size);
      }
      ctx.globalAlpha = 1;
      rafId = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (!rafId && isVisible && isTabVisible) {
        lastTs = performance.now();
        rafId = window.requestAnimationFrame(frame);
      }
    };

    const stop = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) start();
      else stop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion, pointerRef]);

  if (reducedMotion) return null;

  return <canvas ref={canvasRef} className="hero-spores-canvas" aria-hidden="true" />;
}
