import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Singularity — A Gravity Game · Mandar Deshmukh" },
      {
        name: "description",
        content:
          "Singularity — a minimalist gravity-physics game built with real Newtonian mechanics. Bend a photon's path through cyan rings using your cursor as a gravity well.",
      },
      { property: "og:title", content: "Singularity — Play the Gravity Game" },
      {
        property: "og:description",
        content:
          "Real-time n-body inspired physics in the browser. Bend a photon through rings using mouse gravity.",
      },
    ],
  }),
  component: PlayPage,
});

type Particle = { x: number; y: number; vx: number; vy: number; life: number };
type Ring = { x: number; y: number; r: number; born: number; passed: boolean };

function PlayPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [best, setBest] = useState(0);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(60);
  const [strength, setStrength] = useState(1.2);

  useEffect(() => {
    const stored = Number(localStorage.getItem("singularity_best") || "0");
    setBest(stored);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let last = performance.now();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, y: -9999, down: false };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onDown = () => (mouse.down = true);
    const onUp = () => (mouse.down = false);
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    // Photon (the particle being controlled)
    const w = () => canvas.getBoundingClientRect().width;
    const h = () => canvas.getBoundingClientRect().height;
    const photon = { x: w() / 2, y: h() / 2, vx: 90, vy: -40 };
    let trail: Particle[] = [];
    let rings: Ring[] = [];
    let stars: { x: number; y: number; z: number }[] = Array.from({ length: 110 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      z: Math.random() * 0.8 + 0.2,
    }));
    let localScore = 0;
    let localCombo = 1;
    let comboTimer = 0;
    let ringTimer = 0;
    let timeLeft = 60;
    let gameOver = false;

    const spawnRing = () => {
      const margin = 80;
      rings.push({
        x: margin + Math.random() * (w() - margin * 2),
        y: margin + Math.random() * (h() - margin * 2),
        r: 22 + Math.random() * 8,
        born: performance.now(),
        passed: false,
      });
    };
    for (let i = 0; i < 3; i++) spawnRing();

    const reset = () => {
      photon.x = w() / 2;
      photon.y = h() / 2;
      photon.vx = 90 + (Math.random() - 0.5) * 60;
      photon.vy = (Math.random() - 0.5) * 60;
      trail = [];
      rings = [];
      for (let i = 0; i < 3; i++) spawnRing();
      localScore = 0;
      localCombo = 1;
      timeLeft = 60;
      gameOver = false;
      setScore(0);
      setCombo(1);
      setTime(60);
    };

    (canvas as any).__reset = reset;

    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      if (running && !gameOver) {
        timeLeft -= dt;
        if (timeLeft <= 0) {
          timeLeft = 0;
          gameOver = true;
          setRunning(false);
          const b = Math.max(best, localScore);
          setBest(b);
          localStorage.setItem("singularity_best", String(b));
        }
        setTime(Math.ceil(timeLeft));
      }

      // Physics — only when running
      if (running && !gameOver) {
        // Newtonian gravity toward mouse: F = G * m / r^2
        if (mouse.x > -1000) {
          const dx = mouse.x - photon.x;
          const dy = mouse.y - photon.y;
          const d2 = Math.max(400, dx * dx + dy * dy);
          const d = Math.sqrt(d2);
          const G = 18000 * strength * (mouse.down ? 2.4 : 1);
          const a = G / d2;
          photon.vx += (dx / d) * a * dt * 60;
          photon.vy += (dy / d) * a * dt * 60;
        }
        // Mild drag so it stays controllable
        photon.vx *= 0.995;
        photon.vy *= 0.995;
        // Cap speed
        const sp = Math.hypot(photon.vx, photon.vy);
        const max = 420;
        if (sp > max) {
          photon.vx = (photon.vx / sp) * max;
          photon.vy = (photon.vy / sp) * max;
        }
        photon.x += photon.vx * dt;
        photon.y += photon.vy * dt;

        // Bounce off walls
        if (photon.x < 8) {
          photon.x = 8;
          photon.vx = Math.abs(photon.vx) * 0.85;
        } else if (photon.x > w() - 8) {
          photon.x = w() - 8;
          photon.vx = -Math.abs(photon.vx) * 0.85;
        }
        if (photon.y < 8) {
          photon.y = 8;
          photon.vy = Math.abs(photon.vy) * 0.85;
        } else if (photon.y > h() - 8) {
          photon.y = h() - 8;
          photon.vy = -Math.abs(photon.vy) * 0.85;
        }

        trail.push({ x: photon.x, y: photon.y, vx: 0, vy: 0, life: 1 });
        if (trail.length > 70) trail.shift();

        // Ring detection
        for (const ring of rings) {
          if (ring.passed) continue;
          const d = Math.hypot(ring.x - photon.x, ring.y - photon.y);
          if (d < ring.r - 4) {
            ring.passed = true;
            localCombo = Math.min(8, localCombo + 1);
            const pts = 10 * localCombo;
            localScore += pts;
            timeLeft = Math.min(60, timeLeft + 1.2);
            comboTimer = 2;
            setScore(localScore);
            setCombo(localCombo);
            setTime(Math.ceil(timeLeft));
          }
        }
        rings = rings.filter((r) => !r.passed);
        ringTimer -= dt;
        if (ringTimer <= 0 && rings.length < 4) {
          spawnRing();
          ringTimer = 1.2;
        }

        comboTimer -= dt;
        if (comboTimer <= 0 && localCombo > 1) {
          localCombo = Math.max(1, localCombo - 1);
          comboTimer = 1.5;
          setCombo(localCombo);
        }
      }

      // ---- RENDER ----
      ctx.fillStyle = "rgba(8, 10, 20, 0.35)";
      ctx.fillRect(0, 0, w(), h());

      // Star drift
      ctx.fillStyle = "rgba(180, 230, 255, 0.4)";
      for (const s of stars) {
        s.x += (running ? 0.15 : 0.05) * s.z;
        if (s.x > w()) s.x = 0;
        ctx.globalAlpha = 0.25 + s.z * 0.5;
        ctx.fillRect(s.x, s.y, s.z * 1.6, s.z * 1.6);
      }
      ctx.globalAlpha = 1;

      // Mouse gravity well halo
      if (mouse.x > -1000 && running && !gameOver) {
        const r = mouse.down ? 95 : 70;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, r);
        grad.addColorStop(0, "rgba(120, 220, 255, 0.45)");
        grad.addColorStop(0.6, "rgba(120, 220, 255, 0.08)");
        grad.addColorStop(1, "rgba(120, 220, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - r, mouse.y - r, r * 2, r * 2);
        ctx.strokeStyle = "rgba(180, 240, 255, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.down ? 14 : 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rings
      for (const ring of rings) {
        const age = (performance.now() - ring.born) / 1000;
        const pulse = 1 + Math.sin(age * 4) * 0.06;
        ctx.strokeStyle = "rgba(120, 240, 255, 0.85)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r * pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "rgba(120, 240, 255, 0.18)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r * pulse + 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Trail
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        const alpha = (i / trail.length) * 0.7;
        ctx.fillStyle = `rgba(150, 230, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 1.5 + (i / trail.length) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Photon
      const pg = ctx.createRadialGradient(photon.x, photon.y, 0, photon.x, photon.y, 22);
      pg.addColorStop(0, "rgba(255, 255, 255, 1)");
      pg.addColorStop(0.4, "rgba(150, 240, 255, 0.9)");
      pg.addColorStop(1, "rgba(100, 200, 255, 0)");
      ctx.fillStyle = pg;
      ctx.fillRect(photon.x - 22, photon.y - 22, 44, 44);

      // Idle state overlay
      if (!running) {
        ctx.fillStyle = "rgba(0,0,0,0.35)";
        ctx.fillRect(0, 0, w(), h());
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.font = "300 28px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(gameOver ? "TIME'S UP" : "PRESS START", w() / 2, h() / 2 - 6);
        ctx.font = "300 12px 'Space Grotesk', sans-serif";
        ctx.fillStyle = "rgba(180,230,255,0.7)";
        ctx.fillText(
          gameOver ? `Final Score: ${localScore}` : "Cursor = gravity well · click = stronger pull",
          w() / 2,
          h() / 2 + 18,
        );
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [running, strength, best]);

  const startGame = () => {
    const c = canvasRef.current as any;
    if (c?.__reset) c.__reset();
    setRunning(true);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="px-6 pt-32 pb-12 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-[10px] tracking-[0.35em] text-cyan-glow uppercase">
                · The Lab · Singularity
              </div>
              <h1 className="mt-3 text-4xl font-light tracking-tight md:text-6xl">
                Bend light with{" "}
                <span className="text-gradient">gravity</span>.
              </h1>
              <p className="mt-4 max-w-xl text-sm text-white/60 md:text-base">
                A tiny physics game. Real Newtonian{" "}
                <span className="font-mono text-cyan-glow">F = G·m / r²</span>{" "}
                runs on every frame. Your cursor is a singularity. Steer the
                photon through the rings — don&apos;t let time hit zero.
              </p>
            </div>
            <Link
              to="/"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[10px] tracking-[0.25em] text-white/80 uppercase backdrop-blur-md transition hover:bg-white/10"
            >
              ← Back to portfolio
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_280px]">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60">
              <canvas
                ref={canvasRef}
                className="block h-[60vh] min-h-[420px] w-full cursor-crosshair touch-none"
              />
              <div className="pointer-events-none absolute top-4 left-4 flex gap-3 text-[10px] tracking-[0.2em] uppercase">
                <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-white/70 backdrop-blur-md">
                  Score <span className="ml-2 font-mono text-cyan-glow">{score}</span>
                </div>
                <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-white/70 backdrop-blur-md">
                  Combo <span className="ml-2 font-mono text-cyan-glow">×{combo}</span>
                </div>
                <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-white/70 backdrop-blur-md">
                  Time <span className="ml-2 font-mono text-cyan-glow">{time}s</span>
                </div>
              </div>
            </div>

            <aside className="flex flex-col gap-4">
              <div className="rounded-2xl border border-white/10 bg-card/40 p-5 backdrop-blur-sm">
                <div className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">
                  Best Run
                </div>
                <div className="mt-2 text-4xl font-light text-white">{best}</div>
                <div className="mt-1 text-[10px] tracking-[0.25em] text-white/40 uppercase">
                  Stored locally
                </div>
              </div>

              <button
                onClick={startGame}
                className="rounded-full bg-white px-5 py-3 text-xs font-medium tracking-[0.25em] text-black uppercase transition hover:scale-[1.02] hover:bg-cyan-glow"
              >
                {running ? "Restart" : "Start"}
              </button>

              <div className="rounded-2xl border border-white/10 bg-card/40 p-5 text-xs text-white/70 backdrop-blur-sm">
                <div className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">
                  Gravity strength
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={2.5}
                  step={0.1}
                  value={strength}
                  onChange={(e) => setStrength(Number(e.target.value))}
                  className="mt-3 w-full accent-cyan-glow"
                />
                <div className="mt-1 flex justify-between text-[10px] tracking-[0.2em] text-white/40 uppercase">
                  <span>Soft</span>
                  <span className="font-mono text-cyan-glow">G ×{strength.toFixed(1)}</span>
                  <span>Crush</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card/40 p-5 text-xs leading-relaxed text-white/60 backdrop-blur-sm">
                <div className="mb-2 text-[10px] tracking-[0.3em] text-cyan-glow uppercase">
                  Rules
                </div>
                <ul className="space-y-1.5">
                  <li>· Cursor pulls the photon.</li>
                  <li>· Click + hold for stronger gravity.</li>
                  <li>· Each ring = +10 × combo. Adds time.</li>
                  <li>· Walls bounce. Don&apos;t orbit forever.</li>
                </ul>
              </div>
            </aside>
          </div>

          <p className="mt-10 max-w-2xl text-xs text-white/40">
            Built in a single canvas with hand-rolled Euler integration, a
            soft-clamped inverse-square force, velocity damping, and a 70-frame
            ribbon trail. No physics library — just math.
          </p>
        </div>
      </section>
    </main>
  );
}
