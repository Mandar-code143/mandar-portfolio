import { useEffect, useState } from "react";

type LeetStats = {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  ranking?: number;
};

type GhStats = {
  publicRepos: number;
  followers: number;
  following: number;
  avatar: string;
};

const LC_USER = "karma1431";
const GH_USER = "Mandar-code143";

// Public, no-key LeetCode proxy (CORS-enabled). Falls back gracefully if down.
const LC_ENDPOINTS = [
  `https://leetcode-stats-api.herokuapp.com/${LC_USER}`,
  `https://alfa-leetcode-api.onrender.com/${LC_USER}/solved`,
];

export function LiveLeetCode() {
  const [s, setS] = useState<LeetStats | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      for (const url of LC_ENDPOINTS) {
        try {
          const r = await fetch(url);
          if (!r.ok) continue;
          const j = await r.json();
          const totalSolved = j.totalSolved ?? j.solvedProblem ?? 0;
          if (!totalSolved) continue;
          if (!alive) return;
          setS({
            totalSolved,
            easy: j.easySolved ?? 0,
            medium: j.mediumSolved ?? 0,
            hard: j.hardSolved ?? 0,
            easyTotal: j.totalEasy ?? 800,
            mediumTotal: j.totalMedium ?? 1700,
            hardTotal: j.totalHard ?? 750,
            ranking: j.ranking,
          });
          return;
        } catch { /* try next */ }
      }
      if (alive) setErr(true);
    })();
    return () => { alive = false; };
  }, []);

  const bar = (v: number, t: number) => `${Math.min(100, (v / Math.max(1, t)) * 100)}%`;

  return (
    <div className="group rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-sm transition hover:border-cyan-glow/40">
      <div className="flex items-center justify-between">
        <div className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">LeetCode · Live</div>
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] tracking-[0.25em] text-white/60 uppercase">
          @{LC_USER}
        </span>
      </div>

      <div className="mt-4 flex items-end gap-3">
        <div className="text-3xl font-light tabular-nums text-white">
          {s ? s.totalSolved : err ? "—" : "···"}
        </div>
        <div className="pb-1.5 text-[10px] tracking-[0.2em] text-white/50 uppercase">
          problems solved
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {[
          { l: "Easy", v: s?.easy ?? 0, t: s?.easyTotal ?? 800, c: "from-emerald-400 to-emerald-300" },
          { l: "Medium", v: s?.medium ?? 0, t: s?.mediumTotal ?? 1700, c: "from-amber-400 to-orange-400" },
          { l: "Hard", v: s?.hard ?? 0, t: s?.hardTotal ?? 750, c: "from-rose-500 to-pink-500" },
        ].map((row) => (
          <div key={row.l}>
            <div className="flex justify-between text-[9px] tracking-[0.2em] text-white/50 uppercase">
              <span>{row.l}</span>
              <span className="tabular-nums">{row.v}/{row.t}</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${row.c} transition-all duration-1000`}
                style={{ width: s ? bar(row.v, row.t) : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>

      <a
        href={`https://leetcode.com/u/${LC_USER}/`}
        target="_blank" rel="noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 text-xs text-cyan-glow transition hover:opacity-80"
      >
        View profile
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export function LiveGitHub() {
  const [s, setS] = useState<GhStats | null>(null);
  const [repos, setRepos] = useState<Array<{ name: string; description: string | null; stargazers_count: number; language: string | null; html_url: string }>>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`).then(r => r.json()),
          fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=6`).then(r => r.json()),
        ]);
        if (!alive) return;
        setS({
          publicRepos: u.public_repos ?? 0,
          followers: u.followers ?? 0,
          following: u.following ?? 0,
          avatar: u.avatar_url ?? "",
        });
        if (Array.isArray(r)) setRepos(r);
      } catch { /* offline / rate-limited */ }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-card/40 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="text-[10px] tracking-[0.3em] text-cyan-glow uppercase">GitHub · Live</div>
        <a
          href={`https://github.com/${GH_USER}`}
          target="_blank" rel="noreferrer"
          className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] tracking-[0.25em] text-white/60 uppercase transition hover:text-white"
        >
          @{GH_USER}
        </a>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { v: s?.publicRepos, l: "Repos" },
          { v: s?.followers, l: "Followers" },
          { v: s?.following, l: "Following" },
        ].map((x) => (
          <div key={x.l} className="rounded-lg border border-white/5 bg-white/[0.02] py-3">
            <div className="text-xl font-light tabular-nums text-white">{x.v ?? "···"}</div>
            <div className="mt-0.5 text-[9px] tracking-[0.25em] text-white/40 uppercase">{x.l}</div>
          </div>
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {repos.slice(0, 4).map((r) => (
          <li key={r.name}>
            <a
              href={r.html_url}
              target="_blank" rel="noreferrer"
              className="group flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs transition hover:border-cyan-glow/30 hover:bg-white/[0.04]"
            >
              <span className="truncate text-white/85 group-hover:text-white">{r.name}</span>
              <span className="flex shrink-0 items-center gap-2 text-[10px] text-white/40">
                {r.language && <span>{r.language}</span>}
                {r.stargazers_count > 0 && <span>★ {r.stargazers_count}</span>}
              </span>
            </a>
          </li>
        ))}
        {repos.length === 0 && (
          <li className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-3 text-xs text-white/40">
            Loading repositories…
          </li>
        )}
      </ul>
    </div>
  );
}
