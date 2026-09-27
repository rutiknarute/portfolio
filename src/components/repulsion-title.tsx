"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; hx: number; hy: number; vx: number; vy: number; size: number; shade: number; phase: number; energy: number };

export function RepulsionTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!title || !canvas || !context) return;
    const heading = title, surface = canvas, ctx = context;
    const motion = matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)");
    let particles: Particle[] = [];
    let pointer: { x: number; y: number } | null = null;
    let frame = 0, previousTime = 0, width = 0, height = 0;
    let disposed = false;
    let colors: string[] = [];
    let flowX = 0, flowY = 0, lastPointerTime = 0;

    function paint() {
      ctx.clearRect(0, 0, width, height);
      for (let shade = 0; shade < colors.length; shade++) {
        ctx.fillStyle = colors[shade];
        ctx.strokeStyle = colors[shade];
        ctx.lineWidth = 0.6;
        for (const p of particles) {
          if (p.shade !== shade) continue;
          const speed = Math.hypot(p.vx, p.vy);
          if (speed > 90) {
            const length = Math.min(7, speed * 0.014);
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.vx / speed * length, p.y - p.vy / speed * length);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }
    }

    function build() {
      cancelAnimationFrame(frame);
      frame = previousTime = 0;
      pointer = null;
      flowX = flowY = lastPointerTime = 0;
      const rect = heading.getBoundingClientRect();
      const padding = 144;
      width = rect.width + padding * 2;
      height = rect.height + padding * 2;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      surface.width = Math.round(width * dpr);
      surface.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mask = document.createElement("canvas");
      mask.width = Math.ceil(width);
      mask.height = Math.ceil(height);
      const maskCtx = mask.getContext("2d", { willReadFrequently: true });
      if (!maskCtx) return;
      maskCtx.fillStyle = "white";
      maskCtx.textBaseline = "alphabetic";
      const lines = Array.from(heading.querySelectorAll<HTMLElement>(".particle-line"));
      colors = lines.map((line) => getComputedStyle(line).color);
      const lineEnds = lines.map((line) => padding + line.getBoundingClientRect().bottom - rect.top);
      for (const line of lines) {
        const style = getComputedStyle(line);
        const bounds = line.getBoundingClientRect();
        maskCtx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        maskCtx.letterSpacing = style.letterSpacing;
        const text = line.textContent || "";
        const metrics = maskCtx.measureText(text);
        const inkHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        maskCtx.fillText(text, padding + (rect.width - metrics.width) / 2, padding + bounds.top - rect.top + (bounds.height - inkHeight) / 2 + metrics.actualBoundingBoxAscent);
      }
      const pixels = maskCtx.getImageData(0, 0, mask.width, mask.height).data;
      particles = [];
      const step = rect.width < 500 ? 1.05 : 1.2;
      // Seeded jitter makes an organic dust texture that stays stable on resize.
      let seed = 17;
      const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      for (let y = 0; y < mask.height; y += step) {
        for (let x = 0; x < mask.width; x += step) {
          const px = x + random() * step, py = y + random() * step;
          if (px >= mask.width || py >= mask.height || pixels[(Math.floor(py) * mask.width + Math.floor(px)) * 4 + 3] < 150) continue;
          const fringe = random() < 0.09;
          const hx = px + (fringe ? (random() - 0.5) * 7 : 0);
          const hy = py + (fringe ? (random() - 0.5) * 7 : 0);
          particles.push({ x: hx, y: hy, hx, hy, vx: 0, vy: 0, size: fringe ? 0.3 : 0.4 + random() * 0.45, shade: Math.max(0, lineEnds.findIndex((end) => py < end)), phase: random() * Math.PI * 2, energy: 0.45 + random() * 0.85 });
        }
      }
      paint();
      heading.dataset.ready = "true";
    }

    function animate(time: number) {
      const dt = Math.min((time - (previousTime || time - 16.67)) / 1000, 0.032);
      previousTime = time;
      const rect = surface.getBoundingClientRect();
      const radius = Math.min(140, (width - 288) * 0.23);
      flowX *= Math.exp(-8 * dt);
      flowY *= Math.exp(-8 * dt);
      if (Math.abs(flowX) + Math.abs(flowY) < 0.05) flowX = flowY = 0;
      let moving = false;
      for (const p of particles) {
        let tx = p.hx, ty = p.hy;
        if (pointer) {
          const dx = p.hx - (pointer.x - rect.left), dy = p.hy - (pointer.y - rect.top);
          const distance = Math.hypot(dx, dy);
          if (distance < radius) {
            const influence = 1 - distance / radius;
            // Varied energy and curl dissolve the uniform circular rim into dust.
            const force = Math.min(112, (radius - distance) * p.energy);
            const curl = Math.sin(p.hx * 0.035 + p.hy * 0.023 + p.phase);
            const angle = Math.atan2(dy, dx) + influence * (0.85 + curl * 0.7);
            const turbulence = influence * influence * 20;
            tx += Math.cos(angle) * force + Math.cos(p.phase) * turbulence + flowX * influence * p.energy;
            ty += Math.sin(angle) * force + Math.sin(p.phase) * turbulence + flowY * influence * p.energy;
          }
        }
        p.vx += ((tx - p.x) * 85 - p.vx * 13) * dt;
        p.vy += ((ty - p.y) * 85 - p.vy * 13) * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const unsettled = Math.abs(tx - p.x) + Math.abs(ty - p.y) + Math.abs(p.vx) + Math.abs(p.vy) > 0.08;
        if (!unsettled) { p.x = tx; p.y = ty; p.vx = p.vy = 0; }
        moving ||= unsettled;
      }
      paint();
      frame = moving || flowX !== 0 || flowY !== 0 ? requestAnimationFrame(animate) : 0;
      if (!moving) previousTime = 0;
    }
    function start() { if (!frame && motion.matches) frame = requestAnimationFrame(animate); }
    function move(event: PointerEvent) {
      if (!motion.matches || event.pointerType !== "mouse") return;
      if (pointer) {
        const elapsed = Math.max(8, event.timeStamp - lastPointerTime);
        flowX = Math.max(-24, Math.min(24, (event.clientX - pointer.x) / elapsed * 15));
        flowY = Math.max(-24, Math.min(24, (event.clientY - pointer.y) / elapsed * 15));
      }
      lastPointerTime = event.timeStamp;
      pointer = { x: event.clientX, y: event.clientY };
      start();
    }
    function leave() { pointer = null; start(); }
    const observer = new ResizeObserver(build);
    observer.observe(heading);
    void document.fonts.ready.then(() => { if (!disposed) build(); });
    heading.addEventListener("pointermove", move);
    heading.addEventListener("pointerleave", leave);
    heading.addEventListener("pointercancel", leave);
    window.addEventListener("blur", build);
    window.addEventListener("scroll", leave, { passive: true });
    motion.addEventListener("change", build);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      heading.removeEventListener("pointermove", move);
      heading.removeEventListener("pointerleave", leave);
      heading.removeEventListener("pointercancel", leave);
      window.removeEventListener("blur", build);
      window.removeEventListener("scroll", leave);
      motion.removeEventListener("change", build);
    };
  }, []);

  return (
    <h1 className="hero-title particle-title" ref={titleRef} aria-label="Make AI useful.">
      <span className="particle-line" aria-hidden="true">Make AI</span>
      <span className="particle-line" aria-hidden="true">useful.</span>
      <canvas className="particle-canvas" ref={canvasRef} aria-hidden="true" />
    </h1>
  );
}
