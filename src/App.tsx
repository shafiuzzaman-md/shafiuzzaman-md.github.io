import React from "react";

/* =========================
   Editable profile + content
   ========================= */
const PROFILE = {
  // For the hero and nav brand:
  name: "Md (Muhammad) Shafiuzzaman",

  title: "Ph.D. Candidate, Computer Science",
  affiliation: "University of California, Santa Barbara — Verification Lab (VLab)",

  // Advisor line with link
  advisor: "Prof. Tevfik Bultan",
  advisorUrl: "https://sites.cs.ucsb.edu/~bultan/",

  // Location (optional, not currently rendered)
  location: "Santa Barbara, CA",

  // Links
  email: "mailto:YOUR_UCSB_EMAIL", // e.g., mailto:shafiuzzaman@ucsb.edu
  scholar: "https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID",
  github: "https://github.com/shafiuzzaman-md",
  linkedin: "https://www.linkedin.com/in/YOUR_HANDLE/",
  twitter: "https://x.com/YOUR_HANDLE",
  cv: "/Shafiuzzaman_CV.pdf", // place the file in /public

  // Headshot served from /public (recommended) or import from src/assets
  headshot: "/headshot_600.webp",

  keywords: [
    "software security",
    "symbolic execution",
    "static analysis",
    "firmware analysis (UEFI)",
    "LLM-assisted verification",
    "vulnerability discovery",
  ],
};

const NEWS = [
  {
    date: "Aug 2025",
    text: "Mentoring undergraduate researchers in UCSB ERSP on KLEE and CodeQL.",
  },
  {
    date: "Mar 2025",
    text: "Leading VLab efforts on memory-aware symbolic execution for exploit-chain analysis.",
  },
  {
    date: "Oct 2024",
    text: "Slides for my ASE 2024 talk on STASE.",
    link: "/STASE_ASE_FINAL.pdf",
  },
  {
    date: "Aug 2024",
    text: "Our STASE paper was accepted to ASE 2024.",
    link: "https://dl.acm.org/doi/10.1145/3691620.3695543",
  },
];

const RESEARCH_AREAS = [
  {
    title: "Symbolic & Hybrid Program Analysis",
    desc:
      "Scaling path exploration with static prefilters, directed assertions, and solver-friendly encodings for security-critical code.",
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
  // Add more publications here…
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
  { year: "2024–2025", item: "Reviewer / Artifact Evaluation volunteer (selected SE venues)" },
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

/* =========================
   UI primitives (polished)
   ========================= */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-zinc-200 bg-white/70 px-2.5 py-0.5 text-[11px] leading-5 text-zinc-700">
      {children}
    </span>
  );
}

function Button({
  href,
  children,
  variant = "outline",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  const base =
    "inline-flex items-center rounded-xl px-4 py-2 text-sm transition shadow-sm";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-black"
      : "border border-zinc-200 bg-white hover:shadow";
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${styles}`}
    >
      {children}
    </a>
  );
}

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
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-5 text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/* =========================
   Layout components
   ========================= */
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
    <nav className="fixed inset-x-0 top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a href="#top" className="font-semibold tracking-tight">
          {PROFILE.name}
        </a>
        <div className="hidden gap-5 text-sm md:flex">
          {items.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="text-zinc-700 hover:text-black hover:underline underline-offset-4"
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
      <div className="mx-auto grid max-w-5xl items-center gap-7 px-4 md:grid-cols-[auto,1fr]">
        <img
          src={PROFILE.headshot}
          alt="Portrait of Md (Muhammad) Shafiuzzaman"
          loading="lazy"
          className="h-28 w-28 rounded-2xl object-cover ring-1 ring-zinc-200 md:h-36 md:w-36"
        />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {PROFILE.name}
          </h1>
          <p className="mt-1 text-zinc-700">{PROFILE.title}</p>
          <p className="text-zinc-700">{PROFILE.affiliation}</p>
          <p className="text-zinc-600">
            Advisor:{" "}
            <a
              href={PROFILE.advisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
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
            <Button href={PROFILE.cv} variant="primary">
              CV
            </Button>
            <Button href={PROFILE.email}>Email</Button>
            <Button href={PROFILE.scholar}>Google Scholar</Button>
            <Button href={PROFILE.github}>GitHub</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Research() {
  return (
    <Section id="research" title="Research">
      <p className="text-zinc-700">
        I build AI-assisted formal methods and hybrid analyses (static + symbolic
        execution + fuzzing) that scale to large codebases and yield
        machine-checkable security artifacts.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {RESEARCH_AREAS.map((a) => (
          <div
            key={a.title}
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <h3 className="mb-1 font-semibold">{a.title}</h3>
            <p className="text-sm text-zinc-700">{a.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Publications() {
  return (
    <Section id="publications" title="Selected Publications">
      <ul className="space-y-5">
        {SELECTED_PUBLICATIONS.map((p, idx) => (
          <li
            key={idx}
            className="rounded-2xl border border-zinc-200 bg-white p-4"
          >
            <div className="mb-2 flex flex-wrap gap-2">
              {p.badges?.map((b: string) => (
                <Badge key={b}>{b}</Badge>
              ))}
            </div>
            <a
              className="font-semibold hover:underline underline-offset-4"
              href={p.link || "#"}
              target={p.link ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {p.title}
            </a>
            <div className="mt-1 text-sm text-zinc-700">
              {p.authors.join(", ")}
            </div>
            <div className="text-sm text-zinc-500">{p.venue}</div>
            {p.abstract && (
              <p className="mt-2 text-sm text-zinc-700">{p.abstract}</p>
            )}
            {!!p.resources?.length && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.resources.map((r: { label: string; url: string }) => (
                  <Button key={r.url} href={r.url}>
                    {r.label}
                  </Button>
                ))}
              </div>
            )}
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
            <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div>
                <div className="font-medium">{t.course}</div>
                <div className="text-sm text-zinc-600">
                  {t.role} • {t.term}
                </div>
              </div>
              {t.notes && (
                <div className="mt-1 text-sm text-zinc-700 md:mt-0">{t.notes}</div>
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
          <li key={i} className="text-zinc-700">
            <span className="font-medium text-zinc-900">{s.year}:</span>{" "}
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
      <ul className="grid gap-3 md:grid-cols-2">
        {STUDENTS.map((s, i) => (
          <li key={i} className="rounded-xl border border-zinc-200 bg-white p-3">
            <div className="font-medium">{s.name}</div>
            <div className="text-sm text-zinc-700">{s.note}</div>
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
          <li key={i} className="flex items-start gap-3 py-3">
            <div className="mt-0.5 w-28 shrink-0 text-sm text-zinc-500">
              {n.date}
            </div>
            <div className="text-zinc-800">
              {n.link ? (
                <a
                  className="hover:underline underline-offset-4"
                  href={n.link}
                  target="_blank"
                  rel="noopener noreferrer"
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
      <div className="rounded-2xl border border-zinc-200 bg-white p-4">
        <p className="text-zinc-700">
          Best way to reach me is by email. I’m also active on GitHub.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {FOOTER_LINKS.map((l) => (
            <Button key={l.href} href={l.href}>
              {l.label}
            </Button>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-12 py-8 text-sm text-zinc-600">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 md:flex-row">
        <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
        <div className="flex flex-wrap gap-4">
          {FOOTER_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:underline">
              {l.label}
            </a>
          ))}
        </div>
      </div>

      {/* Structured data for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Md Shafiuzzaman",
            alternateName: [
              "Md (Muhammad) Shafiuzzaman",
              "Mohammad Shafiuzzaman",
              "Muhammad Shafiuzzaman",
            ],
            additionalName: ["Muhammad"],
            jobTitle: PROFILE.title,
            affiliation: PROFILE.affiliation,
            url: typeof window !== "undefined" ? window.location.href : "",
            sameAs: [PROFILE.github, PROFILE.scholar, PROFILE.linkedin, PROFILE.twitter],
            knowsAbout: PROFILE.keywords,
            colleague: [
              { "@type": "Person", name: PROFILE.advisor, url: PROFILE.advisorUrl },
            ],
          }),
        }}
      />
    </footer>
  );
}

/* =========================
   Page
   ========================= */
export default function FacultySite() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Nav />
      <main className="mx-auto max-w-5xl px-4">
        <Hero />
        <div className="my-12 grid gap-12">
          <section id="about" className="scroll-mt-28">
            <h2 className="mb-5 text-2xl md:text-3xl font-semibold tracking-tight">About</h2>
            <p className="rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-700">
              I am a Ph.D. candidate in Computer Science at UCSB's Verification Laboratory. My
              research focuses on software security and verification—particularly symbolic
              execution, static analysis, and hybrid techniques for firmware and systems software.
              I build tools and workflows that help developers quickly triage, reproduce, and
              mitigate complex vulnerabilities.
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              Note: “Md” on my official documents is the abbreviation for “Muhammad”.
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
