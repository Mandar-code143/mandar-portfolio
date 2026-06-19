export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/40 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 text-3xl font-light tracking-tight text-white/40 md:text-5xl"
          >
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
