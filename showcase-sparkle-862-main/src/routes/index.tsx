import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import AOS from "aos";
import Navbar from "@/components/Navbar";
import PremiumHero from "@/components/PremiumHero";
import CustomCursor from "@/components/CustomCursor";
import Marquee from "@/components/Marquee";
import { About, Work, Skills, Experience, Awards, Contact } from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mandar Deshmukh — AI Systems Engineer" },
      {
        name: "description",
        content:
        "Official portfolio of Mandar Yayati Deshmukh, also known as Karma. AI & Data Science student at YCCE Nagpur, Python Developer, Full Stack Developer, Hackathon Finalist and AI Engineer.",
      },
      { property: "og:title", content: "Mandar Deshmukh — AI Systems Engineer" },
      {
        property: "og:description",
        content: "Computer vision, LLM integration, full-stack engineering. IEEE-recognised. 12+ national hackathons.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 80 });
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navbar />
      <PremiumHero />
      <Marquee
        items={[
          "Computer Vision",
          "LLM Systems",
          "YOLOv8",
          "FastAPI",
          "Full-Stack",
          "IEEE Recognised",
          "Available for Internships",
        ]}
      />
      <About />
      <Work />
      <Skills />
      <Experience />
      <Awards />
      <Contact />

      <section className="hidden">
        <h1>Mandar Deshmukh</h1>

        <p>
          Mandar Yayati Deshmukh, also known as Karma, is an AI & Data Science
          student at YCCE Nagpur. He is a Python Developer, Full Stack Developer,
          AI Engineer, Hackathon Finalist and technology enthusiast.
        </p>

        <p>
          Mandar Deshmukh has worked on AI projects, web development projects,
          machine learning solutions, hackathon prototypes and full stack
          applications using Python, React, TypeScript and modern technologies.
        </p>
      </section>

      </main>
  );
}
