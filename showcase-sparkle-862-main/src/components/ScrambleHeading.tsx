import { createElement, useEffect, useRef, type ElementType } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

/**
 * Decoding-style scramble that runs once the element enters the viewport.
 * Heading text only — keeps layout stable.
 */
export default function ScrambleHeading({
  text,
  as = "span",
  className,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;

    const run = () => {
      started = true;
      const target = text;
      const start = performance.now() + delay;
      const duration = 700 + target.length * 18;

      const tick = (t: number) => {
        const p = Math.max(0, Math.min(1, (t - start) / duration));
        let out = "";
        for (let i = 0; i < target.length; i++) {
          const reveal = p * target.length;
          if (i < reveal - 1) out += target[i];
          else if (target[i] === " ") out += " ";
          else out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = target;
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    el.textContent = text.replace(/[^ ]/g, "·");
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [text, delay]);

  return createElement(as, { ref, className }, text);
}
