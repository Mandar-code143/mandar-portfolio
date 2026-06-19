import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AOS from "aos";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import portraitCyber from "@/assets/portrait-cyber.jpg";
import portraitGlow from "@/assets/portrait-glow.jpg";
import smartathon2 from "@/assets/smartathon2.png";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Journey — Mandar Deshmukh" },
      {
        name: "description",
        content:
          "The chronology of Mandar Deshmukh — milestones, recognitions, and shipped projects across hackathons, IEEE recognition, and AI/ML engineering.",
      },
      { property: "og:title", content: "Journey — Mandar Deshmukh" },
      {
        property: "og:description",
        content:
          "Timeline of an AI Systems Engineer — hackathons, IEEE recognition, shipped products.",
      },
      { property: "og:image", content: portraitCyber },
    ],
  }),
  component: JourneyPage,
});

const milestones = [
  {
    year: "2024",
    title: "Joined YCCE · B.E. AI & Data Science",
    where: "Yeshwantrao Chavan College of Engineering, Nagpur",
    note: "Started a four-year B.E. in AI & Data Science (2024–2028). First semester focused on Python, DSA fundamentals, and algorithmic thinking.",
  },
  {
    year: "2023–24",
    title: "Technical Executive · ISTE Chapter",
    where: "ISTE Chapter, YCCE",
    note: "Organised workshops, technical sessions and programming challenges. Mentored 100+ students in applied tech and competitive programming.",
  },
  {
    year: "2024",
    title: "First wave of national hackathons",
    where: "Genathon 3.0 · No-Code AI · E-Cell NEC · YASH · Launchpad ISTE",
    note: "Crossed the first set of what is now 12+ national-level hackathons and competitions.",
  },
  {
    year: "2024",
    title: "UrbanFlow AI — Special Mention",
    where: "IEEE Smartathon 2.0 · St. Joseph's College of Engineering, Chennai",
    note: "Built and deployed a YOLOv8 + OpenCV + FastAPI traffic-management system. Recognised among top engineering teams nationally.",
  },
  {
    year: "2024",
    title: "1st Prize · Coding Quiz",
    where: "Compufest · YCCE ACM Student Chapter",
    note: "First place in the ACM-organised algorithmic + language coding quiz.",
  },
  {
    year: "2024",
    title: "Shipped: Krushi Rojgar Sandhi, Jarvis AI, AI Resume Builder",
    where: "Personal · Production",
    note: "Three live LLM-integrated full-stack products shipped within a single year — rural services, voice assistant, and ATS-ready resume generator.",
  },
  {
    year: "2024",
    title: "Round 2 Finalist · Technical Business Incubator",
    where: "National Startup Selection Program",
    note: "Advanced to the second round of a rigorous 3-round national startup selection program.",
  },
  {
    year: "2024–25",
    title: "Co-Head of Sponsorship · CTSC",
    where: "Code-Titans Tech Society, YCCE",
    note: "Leading the sponsorship + corporate-outreach vertical for one of YCCE's flagship student tech societies.",
  },
  {
    year: "2026",
    title: "Third year · Building forward",
    where: "Semester V · Nagpur, India",
    note: "Currently in third year. Going deeper into computer vision, LLM systems, and production engineering. Shipping continues.",
  },
];

function JourneyPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 80 });
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navbar />

      <section className="relative overflow-hidden px-6 pt-32 pb-16 md:px-16">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-glow/15 blur-[160px] glow-pulse"
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-end gap-10 md:grid-cols-[1fr_360px]">
            <div data-aos="fade-up">
              <div className="text-[10px] tracking-[0.35em] text-cyan-glow uppercase">
                · The Timeline
              </div>
              <h1 className="mt-3 text-5xl font-light leading-[0.95] tracking-tight md:text-7xl">
                Four years, <br />
                <span className="text-gradient">one trajectory.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
                The compressed log of how a curious second-semester student became
                an IEEE-recognized engineer shipping production AI. No filler,
                only the moves that actually mattered.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  to="/"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[10px] tracking-[0.25em] text-white/80 uppercase backdrop-blur-md transition hover:bg-white/10"
                >
                  ← Home
                </Link>
                <Link
                  to="/play"
                  className="rounded-full bg-white px-5 py-2.5 text-[10px] tracking-[0.25em] text-black uppercase transition hover:bg-cyan-glow"
                >
                  Play Singularity →
                </Link>
              </div>
            </div>
            <div
              className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-black"
              data-aos="fade-left"
            >
              <img
                src={portraitGlow}
                alt="Mandar Deshmukh portrait"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] text-white/80 uppercase">
                Now · 2026
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 md:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[18px] w-px bg-gradient-to-b from-transparent via-cyan-glow/40 to-transparent md:left-1/2" />
            <ol className="space-y-12">
              {milestones.map((m, i) => {
                const left = i % 2 === 0;
                const isSmartathon = m.title.includes("UrbanFlow AI");
                return (
                  <li
                    key={`${m.year}-${m.title}`}
                    className="relative pl-14 md:pl-0"
                    data-aos="fade-up"
                    data-aos-delay={i * 60}
                  >
                    <span className="absolute top-2 left-[12px] z-10 flex h-3.5 w-3.5 -translate-x-1/2 md:left-1/2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-60" />
                      <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-cyan-glow ring-4 ring-background" />
                    </span>
                    <div
                      className={`md:grid md:grid-cols-2 md:gap-12 ${
                        left ? "" : "md:[&>*:first-child]:order-2"
                      }`}
                    >
                      <div className={`${left ? "md:text-right md:pr-10" : "md:pl-10"}`}>
                        <div className="text-[10px] tracking-[0.35em] text-cyan-glow uppercase">
                          {m.year}
                        </div>
                        <h3 className="mt-2 text-xl font-normal text-white md:text-2xl">
                          {m.title}
                        </h3>
                        <div className="mt-1 text-xs text-white/50">{m.where}</div>
                      </div>
                      <div
                        className={`mt-2 md:mt-0 ${
                          left ? "md:pl-10" : "md:pr-10 md:text-right"
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-white/65">{m.note}</p>

                        {/* Real Smartathon photo at the milestone */}
                        {isSmartathon && (
                          <button
                            onClick={() => setLightboxOpen(true)}
                            className="group mt-4 block w-full overflow-hidden rounded-xl border border-white/10 md:w-72"
                            data-cursor="Expand"
                          >
                            <img
                              src={smartathon2}
                              alt="IEEE Smartathon 2.0 Special Mention"
                              className="h-48 w-full object-cover object-top grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="px-3 py-2 text-[9px] tracking-[0.2em] text-white/40 uppercase">
                              Click to expand · Proof
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-6 pb-32 md:px-16">
        <div
          className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-card/40 p-8 backdrop-blur-sm md:flex-row"
          data-aos="fade-up"
        >
          <div>
            <div className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">
              Next chapter
            </div>
            <div className="mt-2 text-xl font-light text-white md:text-2xl">
              Building tools that don&apos;t exist yet.
            </div>
          </div>
          <Link
            to="/"
            hash="contact"
            className="rounded-full bg-white px-6 py-3 text-xs font-medium tracking-[0.25em] text-black uppercase transition hover:scale-105 hover:bg-cyan-glow"
          >
            Work together →
          </Link>
        </div>
      </section>

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
            src={smartathon2.url}
            alt="IEEE Smartathon 2.0 Special Mention — full size"
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
