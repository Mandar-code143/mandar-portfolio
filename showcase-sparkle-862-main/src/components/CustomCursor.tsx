import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Magnetic custom cursor.
 * - Smooth follow with two layers (dot + ring).
 * - Grows + inverts on elements with [data-cursor="hover"] or anchors/buttons.
 * - Magnetically pulls toward [data-magnetic] elements.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return; // skip touch

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const lx = gsap.quickTo(label, "x", { duration: 0.35, ease: "power3" });
    const ly = gsap.quickTo(label, "y", { duration: 0.35, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dx(e.clientX); dy(e.clientY);
      rx(e.clientX); ry(e.clientY);
      lx(e.clientX); ly(e.clientY);
    };

    const setHover = (state: boolean, text?: string) => {
      gsap.to(ring, {
        scale: state ? 2.4 : 1,
        borderColor: state ? "rgba(125,230,255,0.9)" : "rgba(255,255,255,0.35)",
        duration: 0.35, ease: "power3.out",
      });
      gsap.to(dot, { scale: state ? 0 : 1, duration: 0.25, ease: "power3.out" });
      gsap.to(label, { autoAlpha: state && text ? 1 : 0, duration: 0.25 });
      if (text) label.textContent = text;
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      if (!t) return;
      setHover(true, t.dataset.cursor && t.dataset.cursor !== "hover" ? t.dataset.cursor : undefined);
    };
    const onOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest("a, button, [data-cursor]");
      if (!t) return;
      setHover(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 mix-blend-difference md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
      />
      <div
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden translate-x-3 translate-y-3 rounded-full bg-white px-2.5 py-1 text-[9px] font-medium tracking-[0.2em] text-black uppercase opacity-0 md:block"
      />
    </>
  );
}
