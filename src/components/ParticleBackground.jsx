import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const PARTICLE_COUNT = 80;
const MAX_DIST = 140;
const MOUSE_ATTRACT_RADIUS = 220;
const MOUSE_ATTRACT_STRENGTH = 0.018;
const BASE_SPEED = 0.45;

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
    animId: null,
    w: 0,
    h: 0,
  });
  const { theme } = useTheme();

  // Soft pink + soft blue palette (no purple)
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
    const { w, h, particles, mouse } = s;

    ctx.clearRect(0, 0, w, h);

    // Update + draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Mouse attraction
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

      // Gradually return to base speed when far from mouse
      if (dist >= MOUSE_ATTRACT_RADIUS) {
        p.vx *= 0.995;
        p.vy *= 0.995;
        const curSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (curSpeed < BASE_SPEED * 0.3) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges (even spread, no accumulation)
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
      const colorIdx = i % colorsRef.current.length;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = colorsRef.current[colorIdx];
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = colorsRef.current[i % colorsRef.current.length];
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      // Lines from particle to cursor
      const a = particles[i];
      const mdx = a.x - mouse.x;
      const mdy = a.y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < MOUSE_ATTRACT_RADIUS * 0.75) {
        const alpha = (1 - mdist / (MOUSE_ATTRACT_RADIUS * 0.75)) * 0.4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = colorsRef.current[i % colorsRef.current.length];
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // Soft glow at cursor
    if (mouse.x > 0 && mouse.y > 0) {
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
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      stateRef.current.w = w;
      stateRef.current.h = h;
      if (stateRef.current.particles.length === 0) {
        stateRef.current.particles = Array.from(
          { length: PARTICLE_COUNT },
          () => createParticle(w, h)
        );
      }
    };

    const onMouseMove = (e) => {
      // Fixed canvas occupies the full viewport so clientX = canvas X
      stateRef.current.mouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      stateRef.current.mouse = { x: -9999, y: -9999 };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    stateRef.current.animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
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
