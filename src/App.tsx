// Personal faculty website — single-file React component
// Notes for customization:
// - Replace placeholder links (Scholar, GitHub, CV, Email) below.
// - Update news, publications, teaching, and service arrays.
// - Export as a static site by embedding in a minimal Vite/Next app or by converting to HTML.
// - TailwindCSS classes are used; in environments without Tailwind, replace with inline styles.

import React from "react";

// ---------- Data you can edit ----------
const PROFILE = {
  name: "Md Shafiuzzaman",
  title: "Ph.D. Candidate, Computer Science",
  affiliation: "University of California, Santa Barbara — Verification Lab (VLab)",
  advisor: "Advisor: Prof. Tevfik Bultan",
  location: "Santa Barbara, CA",
  email: "mailto:YOUR_EMAIL@ucsb.edu",
  scholar: "https://scholar.google.com/citations?user=YOUR_ID",
  github: "https://github.com/shafiuzzaman-md",
  linkedin: "https://www.linkedin.com/in/YOUR_ID/",
  twitter: "https://x.com/YOUR_ID",
  cv: "./Shafiuzzaman_CV.pdf",
  headshot: "https://avatars.githubusercontent.com/u/000000?v=4", // replace with your photo URL
  keywords: [
    "software security",
    "symbolic execution",
    "static analysis",
    "firmware analysis (UEFI)",
    "LLM-assisted verification",
    "vulnerability discovery"
  ],
};

const NEWS = [
  {
    date: "Oct 2024",
    text:
      "Our paper ‘STASE: Static Analysis–Guided Symbolic Execution for UEFI Vulnerability Signature Generation’ was accepted to ASE 2024.",
    link: "https://dl.acm.org/doi/10.1145/3691620.3695543",
  },
  { date: "Mar 2025", text: "Leading VLab efforts on memory-aware symbolic execution for exploit-chain analysis." },
  { date: "Aug 2025", text: "Mentoring undergraduate researchers in UCSB ERSP on KLEE and CodeQL." },
];

const RESEARCH_AREAS = [
  {
    title: "Symbolic & Hybrid Program Analysis",
    desc:
      "Scaling path exploration with rule-based static prefilters, directed assertions, and solver-friendly encodings for security-critical code.",
  },
  {
    title: "Firmware Security (UEFI)",
    desc:
      "Automating harness generation and memory-aware models to find and characterize high-privilege vulnerabilities in UEFI and embedded stacks.",
  },
  {
    title: "LLM-Assisted Verification",
    desc:
      "Integrating LLMs with CodeQL/KLEE pipelines for stub synthesis, entrypoint selection, and human-in-the-loop triage.",
  },
];

const SELECTED_PUBLICATIONS = [
  {
    title:
      "STASE: Static Analysis–Guided Symbolic Execution for UEFI Vulnerability Signature Generation",
    authors: [
      "Md Shafiuzzaman",
      "Safia Tuba Zaman",
      "Tevfik Bultan",
      // add co-authors as appropriate
    ],
    venue: "ASE 2024 (A*)",
    link: "https://dl.acm.org/doi/10.1145/3691620.3695543",
    badges: ["UEFI", "Symbolic Execution", "Static Analysis"],
    abstract:
      "STASE combines rule-based static analysis with symbolic execution to improve precision and scalability, generating actionable vulnerability signatures.",
    resources: [
      { label: "Paper", url: "https://dl.acm.org/doi/10.1145/3691620.3695543" },
      { label: "Code (WIP)", url: "https://github.com/shafiuzzaman-md" },
    ],
  },
  // Add more publications here
];

const TEACHING = [
  {
    term: "2024–2025",
    course: "Mentor, UCSB ERSP (Undergraduate Research)",
    role: "Mentor",
    notes: "Reading group on symbolic execution (KLEE) and static analysis (CodeQL).",
  },
];

const SERVICE = [
  { year: "2025", item: "Advanced Graduate Student Mentor, UCSB Graduate Scholars Program" },
  { year: "2024–2025", item: "Reviewer/Artifact evaluation volunteer (selected SE venues)" },
];

const STUDENTS = [
  { name: "Ben Carter", note: "ERSP mentee (KLEE install & Juliet CWE mini-project)" },
  { name: "Luis Blanco", note: "ERSP mentee (CodeQL query packs for UAF/OOB)" },
];

const FOOTER_LINKS = [
  { label: "Email", href: PROFILE.email },
  { label: "CV", href: PROFILE.cv },
  { label: "Google Scholar", href: PROFILE.scholar },
  { label: "GitHub", href: PROFILE.github },
  { label: "LinkedIn", href: PROFILE.linkedin },
  { label: "X/Twitter", href: PROFILE.twitter },
];
// --------------------------------------

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24" aria-label={title}>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full border px-2 py-0.5 text-xs">{children}</span>;
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
        <a href="#top" className="font-semibold tracking-tight">{PROFILE.name}</a>
        <div className="hidden md:flex gap-4 text-sm">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="hover:underline decoration-2 underline-offset-4">
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{PROFILE.name}</h1>
          <p className="mt-1 text-neutral-700">{PROFILE.title}</p>
          <p className="text-neutral-700">{PROFILE.affiliation}</p>
          <p className="text-neutral-600">{PROFILE.advisor}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROFILE.keywords.map((k) => (
              <Badge key={k}>{k}</Badge>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={PROFILE.email} className="px-4 py-2 rounded-xl border shadow-sm hover:shadow transition">Email</a>
            <a href={PROFILE.cv} className="px-4 py-2 rounded-xl border shadow-sm hover:shadow transition">CV</a>
            <a href={PROFILE.scholar} className="px-4 py-2 rounded-xl border shadow-sm hover:shadow transition">Google Scholar</a>
            <a href={PROFILE.github} className="px-4 py-2 rounded-xl border shadow-sm hover:shadow transition">GitHub</a>
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
        I design scalable, precise, and developer-friendly tools for securing complex software systems. My work unifies
        rule-based static analysis, symbolic execution, and memory-aware models to detect vulnerabilities and synthesize
        actionable signatures in firmware and systems software.
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
            <a className="font-semibold hover:underline decoration-2 underline-offset-4" href={p.link}>
              {p.title}
            </a>
            <div className="text-sm text-neutral-700 mt-1">{p.authors.join(", ")}</div>
            <div className="text-sm text-neutral-600">{p.venue}</div>
            {p.abstract && <p className="text-sm mt-2 text-neutral-700">{p.abstract}</p>}
            {p.resources?.length ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {p.resources.map((r) => (
                  <a key={r.url} href={r.url} className="text-sm px-3 py-1 rounded-xl border hover:shadow">
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
                <div className="text-sm text-neutral-600">{t.role} • {t.term}</div>
              </div>
              {t.notes && <div className="text-sm text-neutral-700 mt-1 md:mt-0">{t.notes}</div>}
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
            <span className="font-medium text-neutral-900">{s.year}:</span> {s.item}
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
            <div className="text-sm text-neutral-500 mt-0.5 w-24 shrink-0">{n.date}</div>
            <div className="text-neutral-800">
              {n.link ? (
                <a className="hover:underline decoration-2 underline-offset-4" href={n.link}>{n.text}</a>
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
          The best way to reach me is by email. I am also active on GitHub and occasionally on X/Twitter.
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
            <a key={l.href} href={l.href} className="hover:underline">{l.label}</a>
          ))}
        </div>
      </div>
      {/* Structured data for better SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: PROFILE.name,
          jobTitle: PROFILE.title,
          affiliation: PROFILE.affiliation,
          url: typeof window !== 'undefined' ? window.location.href : "",
          sameAs: [PROFILE.github, PROFILE.scholar, PROFILE.linkedin, PROFILE.twitter],
          knowsAbout: PROFILE.keywords,
        }),
      }} />
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
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">About</h2>
            <p className="text-neutral-700 bg-white rounded-2xl border p-4">
              I am a Ph.D. candidate in Computer Science at UCSB's Verification Laboratory. My research focuses on
              software security and verification—particularly symbolic execution, static analysis, and hybrid techniques
              for firmware and systems software. I build tools and workflows that help developers quickly triage,
              reproduce, and mitigate complex vulnerabilities.
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
