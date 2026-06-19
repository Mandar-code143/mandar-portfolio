import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portraitCyber from "@/assets/portrait-cyber.jpg";
import portraitGlow from "@/assets/portrait-glow.jpg";
import smartathon2 from "@/assets/smartathon2.png";
import ScrambleHeading from "@/components/ScrambleHeading";
import { LiveLeetCode, LiveGitHub } from "@/components/LiveStats";

gsap.registerPlugin(ScrollTrigger);

/* ============== REAL DATA (sourced from resume + CV) ============== */

const projects = [
  {
    n: "01",
    title: "UrbanFlow AI",
    tag: "Computer Vision · IEEE Recognised",
    year: "2024",
    role: "Lead Developer & System Architect",
    summary:
      "Real-time intelligent traffic management. YOLOv8 detects vehicle density from live camera feeds; a FastAPI service computes optimal signal timing and pushes it to a JavaScript dashboard.",
    bullets: [
      "End-to-end ML pipeline — YOLOv8 vehicle detection on live frames",
      "FastAPI backend exposes density + signal-state via REST",
      "JS dashboard visualises traffic, signal phase and system health",
      "Clean three-module split: ML layer → API → frontend",
    ],
    award: "Special Mention · IEEE Smartathon 2.0 — St. Joseph's College, Chennai",
    stack: ["Python", "OpenCV", "YOLOv8", "FastAPI", "JavaScript"],
    live: "https://smart-flow-lens.lovable.app",
    repo: "https://github.com/Mandar-code143/Urban-flow-ai",
  },
  {
    n: "02",
    title: "Krushi Rojgar Sandhi",
    tag: "Full-Stack · Multilingual · Rural Access",
    year: "2024",
    role: "Full-Stack Developer",
    summary:
      "Multilingual AI platform connecting rural farmers and workers to government employment schemes. Auto-fills scheme application forms and generates supporting documents.",
    bullets: [
      "Mobile-first React / Next.js frontend tuned for low digital-literacy users",
      "Node.js / Express REST API with validation middleware",
      "Auto document-generation module for government scheme forms",
      "Regional-language support across multiple Indian languages",
    ],
    stack: ["React", "Next.js", "Node.js", "Express"],
    live: "https://kisanbandhu-2-0-frontend-m4ww.vercel.app/",
    repo: "https://github.com/Mandar-code143/kisanbandhu-2.0",
  },
  {
    n: "03",
    title: "AI Resume Builder",
    tag: "LLM · FastAPI · Product",
    year: "2024",
    role: "Full-Stack Developer",
    summary:
      "Guided React form feeds engineered Groq LLM prompts; the system returns recruiter-optimised, ATS-ready resume drafts. Reduced peers' manual resume time by ~80%.",
    bullets: [
      "Prompt templates produce structured, ATS-friendly output",
      "FastAPI orchestrates LLM calls + input validation",
      "Multi-step React form for clean data capture",
    ],
    stack: ["FastAPI", "Python", "Groq API", "React"],
    repo: "https://github.com/Mandar-code143",
  },
  {
    n: "04",
    title: "Jarvis AI Assistant",
    tag: "Voice · LLM · Automation",
    year: "2024",
    role: "Developer",
    summary:
      "Python voice-activated assistant. Speech recognition captures intent; Groq LLM produces context-aware responses; automation modules handle email drafts, reminders and routine tasks.",
    bullets: [
      "Real-time voice command capture + intent classification",
      "Groq LLM with multi-turn context for natural orchestration",
      "Modular automation: email, scheduling, workflow triggers",
    ],
    stack: ["Python", "Groq API", "SpeechRecognition"],
    repo: "https://github.com/Mandar-code143/Jarvis-Voice-Assistant",
  },
  {
    n: "05",
    title: "WhatsApp Bot · Smart Trip AI",
    tag: "LLM · Conversational",
    year: "2024",
    role: "Developer",
    summary:
      "AI-powered WhatsApp chatbot with a Groq LLM response engine, plus Smart Trip AI — an LLM travel planner that turns destination / budget / interests into a full personalised itinerary.",
    bullets: [
      "Message routing + session management for WhatsApp chatbot",
      "LLM itinerary generation from structured preferences",
    ],
    stack: ["Python", "WhatsApp API", "Groq API"],
    repo: "https://github.com/Mandar-code143/whatsapp-auto-chatbot",
  },
];

const skillGroups = [
  { title: "Languages", items: ["Python · Advanced", "JavaScript · Advanced", "TypeScript", "C++", "C"] },
  {
    title: "AI / ML",
    items: ["Computer Vision", "YOLOv8", "OpenCV", "LLM Integration", "Groq API", "Prompt Engineering", "Speech Recognition", "NLP Fundamentals"],
  },
  {
    title: "Web & Backend",
    items: ["FastAPI", "React.js", "Next.js", "Node.js", "Express.js", "REST API Design", "HTML5", "CSS3"],
  },
  {
    title: "Tooling",
    items: ["Git · GitHub", "Vercel", "Netlify", "VS Code", "Postman", "Linux / Bash", "npm / pip"],
  },
];

const awards = [
  { title: "Special Mention · UrbanFlow AI", where: "IEEE Smartathon 2.0 · St. Joseph's College of Engineering, Chennai", year: "2024" },
  { title: "1st Prize — Coding Quiz", where: "Compufest · YCCE ACM Student Chapter", year: "2024" },
  { title: "Round 2 Finalist", where: "Technical Business Incubator · National Startup Selection Program", year: "2024" },
  { title: "12+ National Hackathons", where: "Genathon 3.0 · No-Code AI · E-Cell NEC · YASH · Launchpad ISTE", year: "2023–24" },
  { title: "Co-Head of Sponsorship", where: "Code-Titans Tech Society (CTSC), YCCE", year: "2024–25" },
  { title: "Technical Executive", where: "ISTE Chapter, YCCE", year: "2023–24" },
];

/* =============================== ABOUT =============================== */

export function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4" data-aos="fade-up">
            <div className="text-[10px] tracking-[0.35em] text-cyan-glow uppercase">01 / About</div>
            <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
              <ScrambleHeading text="The engineer" />
              <br />
              <ScrambleHeading text="behind the build." delay={120} />
            </h2>
            <div
              className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-black"
              data-cursor="View"
            >
              <img
                src={portraitCyber}
                alt="Mandar Deshmukh portrait"
                className="h-full w-full object-cover grayscale-[15%] transition-all duration-700 hover:grayscale-0 hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-[9px] tracking-[0.3em] text-cyan-glow uppercase">Nagpur · IN</div>
                  <div className="mt-1 text-sm font-light text-white">Mandar Y. Deshmukh</div>
                </div>
                <div className="text-[9px] tracking-[0.25em] text-white/60 uppercase">· Live</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 md:pt-2" data-aos="fade-up" data-aos-delay="100">
            <p className="text-lg leading-relaxed text-white/75 md:text-xl">
              I&apos;m a <span className="text-white">third-year B.E. student in AI &amp; Data Science</span> at
              Yeshwantrao Chavan College of Engineering, Nagpur (YCCE, 2024–2028). I build production-deployed
              computer-vision systems and LLM-integrated products — from real-time YOLOv8 pipelines to voice-driven
              assistants.
            </p>
            <p className="mt-6 text-base leading-relaxed text-white/55">
              IEEE-recognised for <span className="text-white/80">UrbanFlow AI</span>. Co-Head of Sponsorship at
              Code-Titans Tech Society. Past Technical Executive at ISTE Chapter, YCCE. I prefer shipping small,
              measuring, and iterating — over talking about it.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { v: "12+", l: "National Hackathons" },
                { v: "5", l: "Shipped Projects" },
                { v: "IEEE", l: "Recognised" },
                { v: "100+", l: "Students Mentored" },
              ].map((s) => (
                <div
                  key={s.l}
                  data-cursor="hover"
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm transition hover:border-cyan-glow/40 hover:bg-white/[0.04]"
                >
                  <div className="text-2xl font-light text-white md:text-3xl">{s.v}</div>
                  <div className="mt-1 text-[10px] tracking-[0.25em] text-white/40 uppercase">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <LiveLeetCode />
              <LiveGitHub />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================== WORK (case studies) =========================== */

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".case-card");
      if (!cards.length) return;

      cards.forEach((card, i) => {
        if (i === 0) return;
        gsap.fromTo(
          card,
          { yPercent: 8, opacity: 0.4, scale: 0.97 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=120",
              end: "top center",
              scrub: true,
            },
          },
        );
      });

      // Progress line
      gsap.to(".case-progress", {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: track,
          start: "top center",
          end: "bottom center",
          scrub: 0.3,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative border-t border-white/5 px-6 py-32 md:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 flex items-end justify-between" data-aos="fade-up">
          <div>
            <div className="text-[10px] tracking-[0.35em] text-cyan-glow uppercase">02 / Selected Work</div>
            <h2 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">
              <ScrambleHeading text="Case studies." />
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/55">
              Real products. Real deployments. Real users.
            </p>
          </div>
          <div className="hidden text-[10px] tracking-[0.3em] text-white/40 uppercase md:block">
            Scroll ↓
          </div>
        </div>

        <div ref={trackRef} className="relative">
          <div className="absolute -left-2 top-0 bottom-0 hidden w-px bg-white/5 md:block">
            <div className="case-progress h-full origin-top scale-y-0 bg-gradient-to-b from-cyan-glow to-blue-glow" />
          </div>

          <div className="space-y-10">
            {projects.map((p) => (
              <article
                key={p.title}
                className="case-card group relative overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-sm transition-colors hover:border-cyan-glow/30 md:p-12"
              >
                <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-cyan-glow/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

                <div className="relative grid gap-8 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <div className="font-mono text-6xl font-light text-white/10 md:text-7xl">{p.n}</div>
                    <div className="mt-2 text-[10px] tracking-[0.3em] text-cyan-glow uppercase">{p.tag}</div>
                    <h3 className="mt-3 text-2xl font-normal text-white md:text-3xl">{p.title}</h3>
                    <div className="mt-2 text-xs text-white/45">{p.role} · {p.year}</div>

                    {p.award && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/5 px-3 py-1 text-[10px] tracking-[0.2em] text-cyan-glow uppercase">
                        <span className="h-1 w-1 rounded-full bg-cyan-glow" />
                        {p.award}
                      </div>
                    )}

                    {/* Real proof photo for UrbanFlow */}
                    {p.title === "UrbanFlow AI" && (
                      <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                        <img
                          src={smartathon2}
                          alt="Receiving Special Mention at IEEE Smartathon 2.0, St. Joseph's College of Engineering, Chennai"
                          className="h-40 w-full object-cover object-top grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="px-3 py-2 text-[9px] tracking-[0.2em] text-white/40 uppercase">
                          IEEE Smartathon 2.0 · Chennai · Live proof
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-8">
                    <p className="text-base leading-relaxed text-white/70">{p.summary}</p>

                    <ul className="mt-5 space-y-2">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm text-white/60">
                          <span className="mt-2 h-px w-4 shrink-0 bg-cyan-glow/60" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-wide text-white/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex items-center gap-5 text-xs">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor="Live"
                          className="group/link inline-flex items-center gap-1.5 text-cyan-glow transition-opacity hover:opacity-80"
                        >
                          Live demo
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover/link:translate-x-0.5">
                            <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      )}
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="Code"
                        className="inline-flex items-center gap-1.5 text-white/60 transition-opacity hover:text-white"
                      >
                        GitHub →
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ SKILLS ============================ */

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-white/5 px-6 py-32 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20" data-aos="fade-up">
          <div className="text-[10px] tracking-[0.35em] text-cyan-glow uppercase">03 / Stack</div>
          <h2 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">
            <ScrambleHeading text="Tools of the craft." />
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <div
              key={g.title}
              data-aos="fade-up"
              data-aos-delay={i * 60}
              className="bg-background p-8"
            >
              <div className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">{g.title}</div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    data-cursor="hover"
                    className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/80 transition hover:border-cyan-glow/40 hover:text-white"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================== EDUCATION + LEADERSHIP ========================== */

export function Experience() {
  const items = [
    {
      role: "Co-Head of Sponsorship",
      org: "Code-Titans Tech Society (CTSC) · YCCE",
      time: "2024 – 2025",
      points: [
        "Led the sponsorship + corporate-outreach vertical for CTSC",
        "Secured funding via targeted outreach to corporate sponsors",
        "Owned end-to-end sponsorship coordination, from pitch to delivery",
      ],
    },
    {
      role: "Technical Executive",
      org: "ISTE Chapter · YCCE",
      time: "2023 – 2024",
      points: [
        "Organised coding workshops, technical sessions and programming challenges",
        "Mentored 100+ students in competitive programming and applied tech",
        "Bridged academic curriculum with industry-relevant skills",
      ],
    },
  ];

  return (
    <section id="experience" className="relative border-t border-white/5 px-6 py-32 md:px-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="text-[10px] tracking-[0.35em] text-cyan-glow uppercase">04 / Education &amp; Leadership</div>
          <h2 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">
            <ScrambleHeading text="Campus & craft." />
          </h2>

          <div className="mt-8 rounded-2xl border border-white/10 bg-card/40 p-6">
            <div className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">Education</div>
            <div className="mt-3 text-lg font-normal text-white">YCCE, Nagpur</div>
            <div className="mt-1 text-xs text-white/55">
              B.E. in Artificial Intelligence &amp; Data Science
            </div>
            <div className="mt-1 text-[10px] tracking-[0.25em] text-white/40 uppercase">
              2024 — 2028 · Currently Semester V
            </div>
            <div className="mt-5 text-[10px] tracking-[0.25em] text-white/40 uppercase">Coursework</div>
            <div className="mt-2 text-xs text-white/60">
              DSA · OOP · Machine Learning · Computer Vision · DBMS · OS · Web Development
            </div>
            <div className="mt-5 text-[10px] tracking-[0.25em] text-white/40 uppercase">Societies</div>
            <div className="mt-2 text-xs text-white/60">
              ACM · ISTE · CTSC · IEEE-affiliated participant
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <ol className="space-y-6">
            {items.map((x, i) => (
              <li
                key={x.role}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="rounded-2xl border border-white/10 bg-card/40 p-7 backdrop-blur-sm transition hover:border-cyan-glow/30"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-normal text-white">{x.role}</h3>
                  <span className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">{x.time}</span>
                </div>
                <div className="mt-1 text-xs text-white/55">{x.org}</div>
                <ul className="mt-4 space-y-2">
                  {x.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-white/65">
                      <span className="mt-2 h-px w-4 shrink-0 bg-cyan-glow/60" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ============================ AWARDS ============================ */

export function Awards() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section id="awards" className="relative border-t border-white/5 px-6 py-32 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-end justify-between" data-aos="fade-up">
          <div>
            <div className="text-[10px] tracking-[0.35em] text-cyan-glow uppercase">05 / Recognition</div>
            <h2 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">
              <ScrambleHeading text="Awards & milestones." />
            </h2>
          </div>
          <Link
            to="/journey"
            data-cursor="Open"
            className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] tracking-[0.25em] text-white/70 uppercase backdrop-blur-md transition hover:bg-white/10 md:inline-block"
          >
            Full timeline →
          </Link>
        </div>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {awards.map((a, i) => (
            <li
              key={a.title}
              data-aos="fade-up"
              data-aos-delay={i * 50}
              data-cursor="hover"
              className="group flex flex-col gap-2 py-6 transition-colors hover:bg-white/[0.02] md:flex-row md:items-center md:justify-between md:gap-8 md:px-2"
            >
              <div className="flex-1">
                <div className="text-lg font-normal text-white md:text-xl">{a.title}</div>
                <div className="mt-1 text-xs text-white/50">{a.where}</div>
              </div>
              <div className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">{a.year}</div>
            </li>
          ))}
        </ul>

        {/* Proof wall — real photos */}
        <div className="mt-12" data-aos="fade-up">
          <div className="text-[10px] tracking-[0.35em] text-cyan-glow uppercase mb-5">Proof · Not claims</div>
          <div className="grid gap-4 md:grid-cols-2">
            <button
              onClick={() => setLightboxOpen(true)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black text-left transition hover:border-cyan-glow/30"
              data-cursor="Expand"
            >
              <img
                src={smartathon2}
                alt="Receiving Special Mention at IEEE Smartathon 2.0, St. Joseph's College of Engineering, Chennai"
                className="h-64 w-full object-cover object-top grayscale-[25%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs font-normal text-white">Special Mention · IEEE Smartathon 2.0</div>
                <div className="mt-1 text-[10px] text-white/50">St. Joseph's College of Engineering, Chennai · 2024</div>
              </div>
              <div className="absolute top-3 right-3 rounded-full border border-white/20 bg-black/40 px-2 py-1 text-[9px] tracking-wider text-white/70 uppercase backdrop-blur-sm">
                Click to expand
              </div>
            </button>

            <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8">
              <div className="text-2xl font-light text-gradient">1st Prize</div>
              <div className="mt-1 text-xs text-white/50">Compufest Coding Quiz · YCCE ACM Student Chapter</div>
              <div className="mt-4 text-sm leading-relaxed text-white/60">
                First place in the ACM-organised algorithmic + language coding quiz. No photo available yet —
                <span className="text-cyan-glow"> upload one and it goes here.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { v: "Special Mention", l: "IEEE Smartathon 2.0" },
            { v: "1st", l: "Compufest Coding Quiz" },
            { v: "Round 2", l: "Tech Biz Incubator" },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6"
            >
              <div className="text-2xl font-light text-gradient">{s.v}</div>
              <div className="mt-1 text-xs text-white/50">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs tracking-wider text-white uppercase backdrop-blur-sm transition hover:bg-white/20"
          >
            Close
          </button>
          <img
            src={smartathon2}
            alt="IEEE Smartathon 2.0 Special Mention — full size"
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

/* ============================ CONTACT ============================ */

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 px-6 py-32 md:px-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/20 blur-[140px] glow-pulse" />

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center" data-aos="fade-up">
          <div className="text-[10px] tracking-[0.35em] text-cyan-glow uppercase">06 / Contact</div>
          <h2 className="mt-6 text-5xl font-light tracking-tight text-gradient md:text-7xl">
            Let&apos;s build
            <br />
            something real.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/60">
            Open to internships, collaborations, and ambitious engineering problems.
            I reply within a day — try me.
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-card/40 p-8 backdrop-blur-md md:p-12">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, oklch(0.78 0.18 200 / 0.25), transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.65 0.22 250 / 0.2), transparent 50%)",
            }}
          />
          <div className="relative grid gap-8 md:grid-cols-3">
            {[
              { l: "Email", v: "mandardeshmukh167@gmail.com", href: "mailto:mandardeshmukh167@gmail.com" },
              { l: "Phone", v: "+91 96995 16587", href: "tel:+919699516587" },
              { l: "Location", v: "Nagpur · Maharashtra · IN" },
            ].map((c) =>
              c.href ? (
                <a
                  key={c.l}
                  href={c.href}
                  data-cursor="Tap"
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-cyan-glow/40 hover:bg-white/[0.04]"
                >
                  <div className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">{c.l}</div>
                  <div className="mt-3 truncate text-sm text-white">{c.v}</div>
                </a>
              ) : (
                <div key={c.l} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">{c.l}</div>
                  <div className="mt-3 truncate text-sm text-white">{c.v}</div>
                </div>
              ),
            )}
          </div>

          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/Mandar-code143"
              target="_blank" rel="noreferrer"
              data-cursor="GitHub"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs tracking-[0.2em] text-white uppercase transition hover:bg-white/10"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/mandar-deshmukh-48520a345"
              target="_blank" rel="noreferrer"
              data-cursor="LinkedIn"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs tracking-[0.2em] text-white uppercase transition hover:bg-white/10"
            >
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/karma1431/"
              target="_blank" rel="noreferrer"
              data-cursor="LeetCode"
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs tracking-[0.2em] text-white uppercase transition hover:bg-white/10"
            >
              LeetCode
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            to="/journey"
            data-cursor="Open"
            className="text-xs tracking-[0.3em] text-white/50 uppercase transition hover:text-white"
          >
            <img src={portraitGlow} alt="" className="hidden" />
            See the full journey →
          </Link>
          <div className="text-[10px] tracking-[0.25em] text-white/30 uppercase">
            © {new Date().getFullYear()} Mandar Y. Deshmukh — Built with intent.
          </div>
        </div>
      </div>
    </section>
  );
}
