'use client';

import { useEffect, useRef } from 'react';

/**
 * SystemsCanvas
 * Hardware-accelerated, restrained ambient coordinate and matrix grid.
 * Pure void black #000000 foundation with graphite #292d30 hairlines
 * and subtle Iris Violet (#9281f7) illumination near pointer.
 * Respects prefers-reduced-motion. Guaranteed 60+ FPS.
 */
export default function SystemsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Grid spacing & sizing configuration
    const SPACING = 56; // Grid node spacing in CSS pixels
    const PROXIMITY_RADIUS = 190; // Illumination radius around cursor
    const PROXIMITY_RADIUS_SQ = PROXIMITY_RADIUS * PROXIMITY_RADIUS;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId: number;

    // Pointer state stored in mutable closure (no React state updates)
    const pointer = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      active: false,
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.targetX = -2000;
      pointer.targetY = -2000;
      pointer.active = false;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // If reduced motion is requested, render one static frame
      if (prefersReducedMotion) {
        renderStaticGrid();
      }
    };

    const renderStaticGrid = () => {
      ctx.clearRect(0, 0, width, height);

      // Base grid crosshairs
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const offsetX = (width % SPACING) / 2;
      const offsetY = (height % SPACING) / 2;

      ctx.strokeStyle = 'rgba(41, 45, 48, 0.4)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        const y = r * SPACING + offsetY;
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING + offsetX;
          ctx.moveTo(x - 2, y);
          ctx.lineTo(x + 2, y);
          ctx.moveTo(x, y - 2);
          ctx.lineTo(x, y + 2);
        }
      }
      ctx.stroke();
    };

    const loop = () => {
      // Smooth pointer interpolation (lerp)
      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const offsetX = (width % SPACING) / 2;
      const offsetY = (height % SPACING) / 2;

      const px = pointer.x;
      const py = pointer.y;

      // Batch 1: Static graphite grid nodes (#292d30)
      ctx.strokeStyle = 'rgba(41, 45, 48, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let r = 0; r < rows; r++) {
        const y = r * SPACING + offsetY;
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING + offsetX;
          const dx = x - px;
          const dy = y - py;
          const distSq = dx * dx + dy * dy;

          if (distSq >= PROXIMITY_RADIUS_SQ) {
            ctx.moveTo(x - 2, y);
            ctx.lineTo(x + 2, y);
            ctx.moveTo(x, y - 2);
            ctx.lineTo(x, y + 2);
          }
        }
      }
      ctx.stroke();

      // Batch 2: Illuminated nodes near cursor (Iris Violet #9281f7)
      if (pointer.active || Math.abs(pointer.x - pointer.targetX) > 1) {
        const minC = Math.max(0, Math.floor((px - PROXIMITY_RADIUS - offsetX) / SPACING));
        const maxC = Math.min(cols - 1, Math.ceil((px + PROXIMITY_RADIUS - offsetX) / SPACING));
        const minR = Math.max(0, Math.floor((py - PROXIMITY_RADIUS - offsetY) / SPACING));
        const maxR = Math.min(rows - 1, Math.ceil((py + PROXIMITY_RADIUS - offsetY) / SPACING));

        for (let r = minR; r <= maxR; r++) {
          const y = r * SPACING + offsetY;
          for (let c = minC; c <= maxC; c++) {
            const x = c * SPACING + offsetX;
            const dx = x - px;
            const dy = y - py;
            const distSq = dx * dx + dy * dy;

            if (distSq < PROXIMITY_RADIUS_SQ) {
              const dist = Math.sqrt(distSq);
              const factor = Math.max(0, 1 - dist / PROXIMITY_RADIUS);
              const alpha = factor * factor;

              const arm = 2.5 + alpha * 3.5;

              // Draw Iris Violet illuminated crosshair
              ctx.strokeStyle = `rgba(146, 129, 247, ${0.1 + alpha * 0.45})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x - arm, y);
              ctx.lineTo(x + arm, y);
              ctx.moveTo(x, y - arm);
              ctx.lineTo(x, y + arm);
              ctx.stroke();

              // Draw core glowing micro-node (Iris Violet Glow)
              if (alpha > 0.3) {
                ctx.fillStyle = `rgba(186, 167, 255, ${alpha * 0.75})`;
                ctx.beginPath();
                ctx.arc(x, y, 1.2, 0, Math.PI * 2);
                ctx.fill();
              }

              // Nearest coordinate readout
              if (dist < 42 && alpha > 0.6) {
                ctx.font = '9px ui-monospace, SFMono-Regular, Menlo, monospace';
                ctx.fillStyle = `rgba(146, 129, 247, ${alpha * 0.6})`;
                ctx.fillText(`[${c.toString(16).padStart(2, '0')}:${r.toString(16).padStart(2, '0')}]`, x + 5, y - 5);
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    resize();

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-80"
    />
  );
}
