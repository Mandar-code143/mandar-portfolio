import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useRouterState } from "@tanstack/react-router";

const navItems = [
  { label: "Home", to: "/", hash: "" },
  { label: "Work", to: "/", hash: "work" },
  { label: "Skills", to: "/", hash: "skills" },
  { label: "Journey", to: "/journey", hash: "" },
  { label: "Play", to: "/play", hash: "" },
  { label: "Contact", to: "/", hash: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -40,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (open) {
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.5, ease: "power3.out" });
      gsap.fromTo(
        ".mobile-nav-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.1 },
      );
    } else {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
    }
    if (dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll(".morph-dot");
      gsap.to(dots, { scale: open ? 0 : 1, duration: 0.35, stagger: 0.03, ease: "power3.inOut" });
      gsap.to(".morph-x", { scale: open ? 1 : 0, rotate: open ? 0 : -90, duration: 0.45, ease: "power3.inOut" });
    }
  }, [open]);

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.to === "/play") return pathname === "/play";
    if (item.to === "/journey") return pathname === "/journey";
    return pathname === "/";
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2"
      >
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-xl">
          <Link
            to="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            onMouseEnter={() => gsap.to(logoRef.current, { rotate: 180, duration: 0.6, ease: "power3.out" })}
            onMouseLeave={() => gsap.to(logoRef.current, { rotate: 0, duration: 0.6, ease: "power3.out" })}
          >
            <div
              ref={logoRef}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-cyan-glow/30 to-blue-glow/30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M4 20L12 4L20 20L12 14L4 20Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[10px] font-medium tracking-[0.25em] text-white/90 uppercase">
              Mandar / AI
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const href = item.hash ? `/#${item.hash}` : item.to;
              const active = isActive(item);
              return (
                <li key={item.label}>
                  {item.hash ? (
                    <a
                      href={href}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 ${
                        active ? "text-white" : "text-white/55 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 ${
                        active
                          ? "bg-white/10 text-white backdrop-blur-md"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <a
              href="/#contact"
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-transform hover:scale-105"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow"></span>
              </span>
              Available
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-md md:hidden"
            aria-label="Toggle menu"
          >
            <span className="text-[10px] font-medium tracking-[0.2em] text-white uppercase">
              {open ? "Close" : "Menu"}
            </span>
            <div ref={dotsRef} className="relative h-4 w-4">
              <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="morph-dot h-1.5 w-1.5 rounded-full bg-white" />
                ))}
              </div>
              <svg
                className="morph-x absolute inset-0 h-4 w-4 scale-0 text-white"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              >
                <path d="M6 6L18 18M6 18L18 6" />
              </svg>
            </div>
          </button>
        </div>
      </nav>

      <div
        ref={overlayRef}
        className="invisible fixed inset-0 z-40 opacity-0"
        style={{ visibility: "hidden" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-[oklch(0.1_0.02_240)] backdrop-blur-2xl" />
        <div className="relative flex h-full flex-col items-center justify-center gap-7">
          {navItems.map((item) =>
            item.hash ? (
              <a
                key={item.label}
                href={`/#${item.hash}`}
                onClick={() => setOpen(false)}
                className="mobile-nav-item text-4xl font-light tracking-tight text-white/70 transition-all hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="mobile-nav-item text-4xl font-light tracking-tight text-white/70 transition-all hover:text-white"
              >
                {item.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </>
  );
}
