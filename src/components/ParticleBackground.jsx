import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

// Detect mobile/touch
const IS_MOBILE = typeof window !== 'undefined' && (
  window.matchMedia('(hover: none) and (pointer: coarse)').matches
  || window.innerWidth < 768
);

// Optimize particle counts on mobile to prevent performance lag
const PARTICLE_COUNT = IS_MOBILE ? 12 : 50;
const MAX_DIST = IS_MOBILE ? 90 : 140;
const MOUSE_ATTRACT_RADIUS = 220;
const MOUSE_ATTRACT_STRENGTH = 0.018;
const BASE_SPEED = IS_MOBILE ? 0.25 : 0.45;

function createParticle(w, h) {
  const angle = Math.random() * Math.PI * 2;
  const speed = BASE_SPEED * (0.5 + Math.random() * 0.5);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 1.5 + Math.random() * 1.5,
    alpha: 0.3 + Math.random() * 0.5,
  };
}

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    mouse: { x: -9999, y: -9999 },
    lastMouseMove: Date.now(),
    animId: null,
    w: 0,
    h: 0,
  });
  const { theme } = useTheme();

  // Soft pink + soft blue palette
  const colors = theme === 'dark'
    ? ['#FF7DA8', '#60A5FA', '#93C5FD', '#FFAEC9', '#7DD3FC']
    : ['#E25B8B', '#3B82F6', '#60A5FA', '#F78CB3', '#93C5FD'];

  const colorsRef = useRef(colors);
  colorsRef.current = colors;

  const draw = useCallback(() => {
    const s = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Reset mouse to inactive if stationary
    if (Date.now() - s.lastMouseMove > 3000) {
      s.mouse = { x: -9999, y: -9999 };
    }

    const { w, h, particles, mouse } = s;

    if (!w || !h || w < 20 || h < 20) {
      s.animId = requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, w, h);

    const colorsList = colorsRef.current && colorsRef.current.length > 0
      ? colorsRef.current
      : ['#60A5FA'];

    // Update + draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Mouse attraction — only on desktop
      if (!IS_MOBILE) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_ATTRACT_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_ATTRACT_RADIUS) * MOUSE_ATTRACT_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = BASE_SPEED * 2.5;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Return to base speed when far
        if (dist >= MOUSE_ATTRACT_RADIUS) {
          p.vx *= 0.995;
          p.vy *= 0.995;
          const curSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (curSpeed < BASE_SPEED * 0.3) {
            p.vx += (Math.random() - 0.5) * 0.05;
            p.vy += (Math.random() - 0.5) * 0.05;
          }
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < p.radius) {
        p.x = p.radius;
        p.vx = Math.abs(p.vx);
      } else if (p.x > w - p.radius) {
        p.x = w - p.radius;
        p.vx = -Math.abs(p.vx);
      }
      if (p.y < p.radius) {
        p.y = p.radius;
        p.vy = Math.abs(p.vy);
      } else if (p.y > h - p.radius) {
        p.y = h - p.radius;
        p.vy = -Math.abs(p.vy);
      }

      // Draw particle
      const colorIdx = i % colorsList.length;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = colorsList[colorIdx];
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Draw connections between nearby particles (Optimized connection loop)
    const maxDistSq = MAX_DIST * MAX_DIST;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        
        // Fast squared distance check to avoid Math.sqrt calls on mobile/desktop
        const distSq = dx * dx + dy * dy;
        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / MAX_DIST) * 0.22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = colorsList[i % colorsList.length];
          ctx.globalAlpha = alpha;
          ctx.lineWidth = IS_MOBILE ? 0.6 : 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // Lines to cursor — desktop only
      if (!IS_MOBILE && mouse.x > 0 && mouse.y > 0) {
        const a = particles[i];
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < MOUSE_ATTRACT_RADIUS * 0.75) {
          const alpha = (1 - mdist / (MOUSE_ATTRACT_RADIUS * 0.75)) * 0.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = colorsList[i % colorsList.length];
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Soft glow at cursor — desktop only
    if (!IS_MOBILE && mouse.x > 0 && mouse.y > 0) {
      const glowColor = theme === 'dark'
        ? 'rgba(255,125,168,0.15)'
        : 'rgba(226,91,139,0.12)';
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 50);
      grad.addColorStop(0, glowColor);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    s.animId = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animTimer;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      if (!w || !h || w < 20 || h < 20) return;

      const oldW = stateRef.current.w;
      const oldH = stateRef.current.h;

      // Ignore vertical-only height changes on mobile to prevent URL address bar scroll resizing lag
      if (IS_MOBILE && oldW > 0 && w === oldW) {
        return;
      }

      canvas.width = w;
      canvas.height = h;
      stateRef.current.w = w;
      stateRef.current.h = h;

      if (stateRef.current.particles.length === 0) {
        stateRef.current.particles = Array.from(
          { length: PARTICLE_COUNT },
          () => createParticle(w, h)
        );
      } else if (oldW > 0 && oldH > 0) {
        stateRef.current.particles.forEach(p => {
          p.x = (p.x / oldW) * w;
          p.y = (p.y / oldH) * h;
        });
      }
    };

    // Delay canvas processing start by 150ms to yield thread for FCP/LCP paint
    animTimer = setTimeout(() => {
      resize();
      stateRef.current.animId = requestAnimationFrame(draw);
    }, 150);

    const onMouseMove = (e) => {
      if (IS_MOBILE || e.pointerType === 'touch' || e.pointerType === 'pen') {
        stateRef.current.mouse = { x: -9999, y: -9999 };
        return;
      }
      stateRef.current.mouse = { x: e.clientX, y: e.clientY };
      stateRef.current.lastMouseMove = Date.now();
    };

    const onMouseLeave = () => {
      stateRef.current.mouse = { x: -9999, y: -9999 };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const handleVisibility = () => {
      cancelAnimationFrame(stateRef.current.animId);
      if (!document.hidden && stateRef.current.w > 0) {
        stateRef.current.animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearTimeout(animTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(stateRef.current.animId);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
