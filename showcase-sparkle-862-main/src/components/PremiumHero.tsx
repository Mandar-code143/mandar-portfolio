import { useEffect, useRef } from "react";
import gsap from "gsap";
import image1Asset from "@/assets/hero-image1.png";
import image2Asset from "@/assets/hero-image2.png";

export default function PremiumHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const topImageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0, radius: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const top = topImageRef.current;
    if (!section || !top) return;

    // Initial mask center (off-screen)
    pos.current = { x: -500, y: -500, radius: 0 };

    const setMask = () => {
      top.style.maskImage = `radial-gradient(circle ${pos.current.radius}px at ${pos.current.x}px ${pos.current.y}px, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 80%, black 100%)`;
      top.style.webkitMaskImage = top.style.maskImage;
    };

    const quickX = gsap.quickTo(pos.current, "x", { duration: 0.5, ease: "power3.out" });
    const quickY = gsap.quickTo(pos.current, "y", { duration: 0.5, ease: "power3.out" });
    const quickR = gsap.quickTo(pos.current, "radius", { duration: 0.8, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      quickX(e.clientX - rect.left);
      quickY(e.clientY - rect.top);
      quickR(260);
    };
    const handleLeave = () => {
      quickR(0);
    };
    const handleEnter = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      pos.current.x = e.clientX - rect.left;
      pos.current.y = e.clientY - rect.top;
      quickR(260);
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    section.addEventListener("mouseenter", handleEnter);

    gsap.ticker.add(setMask);

    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.4 });
    tl.from(eyebrowRef.current, { y: 30, opacity: 0, duration: 0.8 })
      .from(headingRef.current, { y: 60, opacity: 0, duration: 1.1 }, "-=0.5")
      .from(subRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.7")
      .from(ctaRef.current?.children ?? [], { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.5");

    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      section.removeEventListener("mouseenter", handleEnter);
      gsap.ticker.remove(setMask);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-background"
    >
      {/* Animated glow backgrounds */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-glow/30 blur-[120px] glow-pulse" />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-cyan-glow/25 blur-[140px] glow-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div className="pointer-events-none absolute inset-0 grain-bg opacity-40" />

      {/* Bottom image layer (image2) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
        data-aos="fade-up"
      >
        <img
          src={image2Asset}
          alt="Mandar Deshmukh"
          className="h-full w-full object-cover object-center opacity-90 md:object-contain"
        />
      </div>

      {/* Top image layer (image1) with mask reveal */}
      <div
        ref={topImageRef}
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        style={{ willChange: "mask-image" }}
      >
        <img
          src={image1Asset}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center md:object-contain"
        />
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-background via-background/40 to-background/60" />

      {/* Top-right tag */}
      <div
        className="absolute top-24 right-6 z-40 hidden items-center gap-2 text-[10px] tracking-[0.3em] text-white/50 uppercase md:flex"
        data-aos="fade-down"
        data-aos-delay="600"
      >
        <span className="h-px w-8 bg-white/30" />
        Portfolio · 2026
      </div>

      {/* Bottom-left content */}
      <div className="absolute bottom-0 left-0 right-0 z-40 px-6 pb-12 md:px-16 md:pb-20">
        <div className="max-w-3xl">
          <div
            ref={eyebrowRef}
            className="mb-5 flex items-center gap-3 text-[10px] font-medium tracking-[0.35em] text-cyan-glow uppercase"
          >
            <span className="h-px w-10 bg-cyan-glow/60" />
            AI Systems Engineer
          </div>
          <h1
            ref={headingRef}
            className="text-5xl font-light leading-[0.95] tracking-tight text-gradient md:text-7xl lg:text-8xl"
          >
            Mandar
            <br />
            <span className="font-normal">Deshmukh.</span>
          </h1>
          <p
            ref={subRef}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base"
          >
            Building production-deployed computer vision systems and LLM-powered
            products. IEEE-recognized engineer. 12+ national hackathons.
            Shipping real things — fast.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-medium tracking-wide text-black uppercase transition-all hover:scale-105 hover:bg-cyan-glow"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-2 py-3 text-xs font-medium tracking-[0.2em] text-white uppercase"
            >
              Get in touch
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-40 hidden flex-col items-center gap-2 md:flex">
        <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
        <div className="h-12 w-px overflow-hidden bg-white/10">
          <div className="h-full w-full origin-top animate-pulse bg-cyan-glow" />
        </div>
      </div>
    </section>
  );
}
