// Personal faculty website — single-file React component (TSX-friendly)
// TailwindCSS classes used for styling.

import React from "react";

// ---------- Data (synced with CV) ----------
const PROFILE = {
  name: "Md (Muhammad) Shafiuzzaman",
  title: "Ph.D. Candidate, Computer Science",
  affiliation:
    "Verification Lab (VLab), University of California, Santa Barbara (UCSB)",
  advisor: "Advisor: Prof. Tevfik Bultan",
  advisorUrl: "https://sites.cs.ucsb.edu/~bultan/",
  location: "Santa Barbara, CA",
  email: "mailto:mdshafiuzzaman@ucsb.edu",
  scholar:
    "https://scholar.google.com/citations?user=1mue4woAAAAJ&hl=en",
  github: "https://github.com/shafiuzzaman-md",
  linkedin: "https://www.linkedin.com/in/mdshafiuzzaman/",
  twitter: "", // leave empty if unused
  cv: "./Shafiuzzaman_CV_KAUST.pdf",
  headshot: "/headshot.jpg",
  keywords: [
    "generative AI",
    "agentic AI for code",
    "LLM-assisted formal methods",
    "symbolic execution",
    "static analysis",
    "hybrid program analysis",
    "firmware security (UEFI)",
    "large-scale/HPC code intelligence",
  ],
};

// News (reverse-chronological)
const NEWS = [
  {
    date: "Oct 2025",
    text: "Advanced Graduate Student Mentor (GSP) 2025–2026 cohort launched.",
    link: "https://www.graddiv.ucsb.edu/GSP",
  },
  {
    date: "Aug 2025",
    text:
      "Mentoring a new 5-student ERSP cohort on LLM-assisted fuzzing & symbolic-execution harness generation.",
    link: "https://ersp.cs.ucsb.edu/",
  },
  {
    date: "Mar 2025",
    text:
      "VehicleSec paper on stateful behavior inference & runtime enforcement accepted.",
  },
  {
    date: "Oct 2024",
    text: "Slides for my ASE 2024 talk on STASE.",
    link: "/STASE_ASE_FINAL.pdf",
  },
  {
    date: "Aug 2024",
    text:
      "‘STASE: Static Analysis Guided Symbolic Execution for UEFI Vulnerability Signature Generation’ accepted to ASE 2024.",
    link: "https://dl.acm.org/doi/10.1145/3691620.3695543",
  },
];

const RESEARCH_AREAS = [
  {
    title: "AI for Code Intelligence (GenAI/Agentic)",
    desc:
      "Designing agents that plan, verify, and refine code changes with contracts, static facts, and symbolic checks; safety and evidence-bearing loops.",
  },
  {
    title: "Hybrid Program Analysis at Scale",
    desc:
      "Combining static analysis, symbolic execution, and fuzzing with probabilistic guidance and HPC/GPU orchestration for large codebases.",
  },
  {
    title: "Firmware & CPS Security (UEFI/Automotive)",
    desc:
      "Memory-aware models, formal vulnerability signatures, and runtime enforcement for high-privilege firmware and in-vehicle networks.",
  },
];

const SELECTED_PUBLICATIONS = [
  {
    title:
      "STASE: Static Analysis–Guided Symbolic Execution for UEFI Vulnerability Signature Generation",
    authors: ["Md Shafiuzzaman", "Safia Tuba Zaman", "Tevfik Bultan"],
    venue: "ASE 2024 (A*)",
    link: "https://dl.acm.org/doi/10.1145/3691620.3695543",
    badges: ["UEFI", "Symbolic Execution", "Static Analysis"],
    abstract:
      "STASE unifies rule-based static analysis with symbolic execution to generate actionable vulnerability signatures that encode pre/postconditions and trigger inputs.",
    resources: [
      { label: "Paper", url: "https://dl.acm.org/doi/10.1145/3691620.3695543" },
      { label: "Slides", url: "/STASE_ASE_FINAL.pdf" },
      { label: "Code (WIP)", url: "https://github.com/shafiuzzaman-md" },
    ],
  },
  {
    title: "Rare Path Guided Fuzzing",
    authors: ["Md Shafiuzzaman", "et al."],
    venue: "ISSTA 2023",
    link: "https://doi.org/10.1145/3597926.3598136",
    badges: ["Fuzzing", "Probabilistic Guidance"],
    abstract:
      "Models path rarity with concolic seeding to improve coverage and fault discovery over baseline fuzzers on real targets.",
    resources: [
      { label: "Paper", url: "https://doi.org/10.1145/3597926.3598136" },
    ],
  },
  {
    title:
      "Stateful Behavior Inference and Runtime Enforcement for Vehicle Network Security",
    authors: ["Md Shafiuzzaman", "et al."],
    venue: "USENIX VehicleSec 2025",
    link: "",
    badges: ["Automotive", "Runtime Enforcement", "CPS"],
    abstract:
      "Bridges verification artifacts to in-vehicle runtime monitors with explainable state inference and enforceable policies.",
    resources: [],
  },
  {
    title:
      "CHAINER: Discovering Vulnerability Chains with Memory-Aware Symbolic Analysis",
    authors: ["Md Shafiuzzaman", "et al."],
    venue: "Under submission",
    link: "",
    badges: ["Exploit Chains", "Symbolic Analysis"],
    abstract:
      "Synthesizes exploit chains by composing formal vulnerability signatures with a memory-aware privilege model.",
    resources: [],
  },
];

const TEACHING = [
  {
    term: "2025–2026",
    course: "Advanced Graduate Student Mentor, UCSB Graduate Scholars Program (GSP)",
    role: "Mentor",
    notes:
      "Cohort-based mentoring; monthly meetings and 1:1s; NSF GRFP statement reviews and mock panels.",
  },
  {
    term: "2025–2026",
    course:
      "Undergraduate Research Mentor, UCSB Early Research Scholars Program (ERSP)",
    role: "Mentor",
    notes:
      "LLM-assisted fuzzing & symbolic-execution harness generation; 5-student cohort.",
  },
  {
    term: "2023–2024",
    course:
      "Undergraduate Research Mentor, UCSB Early Research Scholars Program (ERSP)",
    role: "Mentor",
    notes:
      "Vulnerability Signature Generation with symbolic execution; 4-student cohort (3 quarters).",
  },
  {
    term: "Summer 2022",
    course: "CMPSC 130A: Data Structures & Algorithms I (UCSB)",
    role: "Instructor",
    notes: "Course design, lectures, assessments, mentoring.",
  },
];

const SERVICE = [
  {
    year: "2025–2026",
    item:
      "Advanced Graduate Student Mentor, UCSB Graduate Scholars Program (GSP); NSF GRFP coaching (rubrics, reviews, mock panels).",
  },
  {
    year: "2023–2025",
    item:
      "Reviewer / Artifact Evaluation, premier SE venues (ICSE, ASE, FSE, ISSTA).",
  },
  {
    year: "Ongoing",
    item:
      "Open-source tools and reproducible research artifacts (containers, fixed seeds, telemetry).",
  },
];

// keep mentee names private unless consented
const STUDENTS = [
  { name: "ERSP Cohort (2025–2026)", note: "LLM-assisted harness generation (5 students)" },
  { name: "ERSP Cohort (2023–2024)", note: "Vulnerability Signature Generation (4 students)" },
];

const FOOTER_LINKS = [
  { label: "Email", href: PROFILE.email },
  { label: "CV", href: PROFILE.cv },
  { label: "Google Scholar", href: PROFILE.scholar },
  { label: "GitHub", href: PROFILE.github },
  { label: "LinkedIn", href: PROFILE.linkedin },
  // only show Twitter if provided
  ...(PROFILE.twitter ? [{ label: "X/Twitter", href: PROFILE.twitter }] : []),
];

// --------------------------------------

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24" aria-label={title}>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

function Nav() {
  const items = [
    { label: "About", href: "#about" },
    { label: "Research", href: "#research" },
    { label: "Publications", href: "#publications" },
    { label: "Teaching", href: "#teaching" },
    { label: "Service", href: "#service" },
    { label: "Students", href: "#students" },
    { label: "News", href: "#news" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">
          {PROFILE.name}
        </a>
        <div className="hidden md:flex gap-4 text-sm">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="hover:underline decoration-2 underline-offset-4"
            >
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="pt-24" id="top">
      <div className="mx-auto max-w-5xl px-4 grid md:grid-cols-[auto,1fr] gap-6 items-center">
        <img
          src={PROFILE.headshot}
          alt={PROFILE.name}
          className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover shadow"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {PROFILE.name}
          </h1>
          <p className="mt-1 text-neutral-700">{PROFILE.title}</p>
          <p className="text-neutral-700">{PROFILE.affiliation}</p>
          <p className="text-neutral-600">
            <a
              href={PROFILE.advisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-2 underline-offset-4"
            >
              {PROFILE.advisor}
            </a>
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {PROFILE.keywords.map((k) => (
              <Badge key={k}>{k}</Badge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={PROFILE.email}
              className="px-4 py-2 rounded-xl border shadow-sm hover:shadow transition"
            >
              Email
            </a>
            <a
              href={PROFILE.cv}
              className="px-4 py-2 rounded-xl border shadow-sm hover:shadow transition"
            >
              CV
            </a>
            <a
              href={PROFILE.scholar}
              className="px-4 py-2 rounded-xl border shadow-sm hover:shadow transition"
            >
              Google Scholar
            </a>
            <a
              href={PROFILE.github}
              className="px-4 py-2 rounded-xl border shadow-sm hover:shadow transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function Research() {
  return (
    <Section id="research" title="Research">
      <p className="text-neutral-700">
        I build AI-assisted formal methods and hybrid analyses (static + symbolic
        execution + fuzzing) that scale to large codebases and produce
        machine-checkable security artifacts. My current focus areas include:
        agentic AI for code, memory-aware vulnerability signatures, and
        runtime enforcement for CPS/automotive systems. Experiments are designed
        for reproducibility and HPC/GPU execution.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {RESEARCH_AREAS.map((a) => (
          <div key={a.title} className="rounded-2xl border p-4 shadow-sm bg-white">
            <h3 className="font-semibold mb-1">{a.title}</h3>
            <p className="text-sm text-neutral-700">{a.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Publications() {
  return (
    <Section id="publications" title="Selected Publications">
      <ul className="space-y-6">
        {SELECTED_PUBLICATIONS.map((p, idx) => (
          <li key={idx} className="rounded-2xl border p-4 bg-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {p.badges?.map((b) => (
                <Badge key={b}>{b}</Badge>
              ))}
            </div>
            <a
              className="font-semibold hover:underline decoration-2 underline-offset-4"
              href={p.link || "#"}
            >
              {p.title}
            </a>
            <div className="text-sm text-neutral-700 mt-1">
              {p.authors.join(", ")}
            </div>
            <div className="text-sm text-neutral-600">{p.venue}</div>
            {p.abstract && (
              <p className="text-sm mt-2 text-neutral-700">{p.abstract}</p>
            )}
            {p.resources?.length ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {p.resources.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    className="text-sm px-3 py-1 rounded-xl border hover:shadow"
                  >
                    {r.label}
                  </a>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Teaching() {
  return (
    <Section id="teaching" title="Teaching & Mentoring">
      <ul className="divide-y">
        {TEACHING.map((t, i) => (
          <li key={i} className="py-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-medium">{t.course}</div>
                <div className="text-sm text-neutral-600">
                  {t.role} • {t.term}
                </div>
              </div>
              {t.notes && (
                <div className="text-sm text-neutral-700 mt-1 md:mt-0">
                  {t.notes}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Service() {
  return (
    <Section id="service" title="Service">
      <ul className="list-disc pl-6">
        {SERVICE.map((s, i) => (
          <li key={i} className="text-neutral-700">
            <span className="font-medium text-neutral-900">{s.year}:</span>{" "}
            {s.item}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Students() {
  return (
    <Section id="students" title="Students">
      <ul className="grid md:grid-cols-2 gap-3">
        {STUDENTS.map((s, i) => (
          <li key={i} className="rounded-xl border p-3 bg-white">
            <div className="font-medium">{s.name}</div>
            <div className="text-sm text-neutral-700">{s.note}</div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function News() {
  return (
    <Section id="news" title="News">
      <ul className="divide-y">
        {NEWS.map((n, i) => (
          <li key={i} className="py-3 flex items-start gap-3">
            <div className="text-sm text-neutral-500 mt-0.5 w-24 shrink-0">
              {n.date}
            </div>
            <div className="text-neutral-800">
              {n.link ? (
                <a
                  className="hover:underline decoration-2 underline-offset-4"
                  href={n.link}
                >
                  {n.text}
                </a>
              ) : (
                n.text
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="rounded-2xl border p-4 bg-white">
        <p className="text-neutral-700">
          The best way to reach me is by email. I’m also active on GitHub.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {FOOTER_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="px-4 py-2 rounded-xl border hover:shadow">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 py-8 text-sm text-neutral-600">
      <div className="mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
        <div className="flex flex-wrap gap-4">
          {FOOTER_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:underline">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Md Shafiuzzaman",
            alternateName: [
              "Mohammad Shafiuzzaman",
              "Muhammad Shafiuzzaman",
            ],
            additionalName: ["Mohammad"],
            jobTitle: PROFILE.title,
            affiliation: PROFILE.affiliation,
            url:
              typeof window !== "undefined" ? window.location.href : "",
            sameAs: [
              PROFILE.github,
              PROFILE.scholar,
              PROFILE.linkedin,
              ...(PROFILE.twitter ? [PROFILE.twitter] : []),
            ],
            knowsAbout: PROFILE.keywords,
          }),
        }}
      />
    </footer>
  );
}

export default function FacultySite() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Nav />
      <main className="mx-auto max-w-5xl px-4">
        <Hero />
        <div className="my-10 grid gap-10">
          <section id="about" className="scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              About
            </h2>
              <p className="text-neutral-700 bg-white rounded-2xl border p-4">
                I’m a Ph.D. candidate in Computer Science at UCSB’s Verification Lab. I build
                LLM-/agentic-AI–assisted formal methods and hybrid analyses (static, symbolic
                execution, and fuzzing) that scale to large codebases via containerized,
                parallelizable workflows. My framework, STASE, uncovered zero-day UEFI issues,
                confirmed CVEs, and was integrated in DARPA HARDEN with transition to U.S.
                Army adversarial testing workflows.
              </p>

          </section>
          <Research />
          <Publications />
          <Teaching />
          <Service />
          <Students />
          <News />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
