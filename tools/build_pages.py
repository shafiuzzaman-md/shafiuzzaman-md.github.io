#!/usr/bin/env python3
"""Generate the static pages of the site (home, project pages, findings, publications, about).

Run from the repo root with  python3 tools/build_pages.py [path/to/original_index.html]
Pages are plain HTML served by GitHub Pages straight from the repo root; shared styles live in site.css.
The optional argument is a single-page index.html that supplies the long-form sections reused on
/findings/ and /about/ (it is only needed the first time, afterwards pages/_source.html is used).
"""
import os, re, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://shafiuzzaman-md.github.io"
SRC = os.path.join(ROOT, "tools", "_source.html")
if len(sys.argv) > 1:
    open(SRC, "w").write(open(sys.argv[1]).read())
orig = open(SRC).read()


def section(sid):
    m = re.search(r'<section class="section" id="%s">.*?</section>' % sid, orig, re.S)
    return m.group(0)


def strip_header(html):
    return re.sub(r'<div class="section-header">.*?</div>\s*</div>', '', html, count=1, flags=re.S)


HEADER_ORIG = re.search(r"<header>.*?</header>", orig, re.S).group(0)
ASIDE = re.search(r'<aside class="hero-side-card".*?</aside>', orig, re.S).group(0)
NEWS = re.findall(r'<li class="news-item">.*?</li>', section("news"), re.S)
CONTACT = section("contact")

NAV = [("Projects", "/#projects"), ("Findings", "/findings/"), ("Publications", "/publications/"),
       ("News", "/#news"), ("About", "/about/"), ("Contact", "/#contact")]


def header(active=""):
    items = "\n".join('          <li><a href="%s"%s>%s</a></li>' % (h, ' class="active"' if n == active else "", n) for n, h in NAV)
    nav = '<nav aria-label="Main navigation">\n        <ul>\n%s\n        </ul>\n      </nav>' % items
    h = re.sub(r"<nav .*?</nav>", nav, HEADER_ORIG, flags=re.S)
    h = h.replace('<div class="brand">', '<a class="brand" href="/" style="color:inherit">', 1)
    h = re.sub(r'(<span class="brand-role">.*?</span>)\s*</div>', r"\1</a>", h, count=1, flags=re.S)
    h = h.replace('src="icons/', 'src="/icons/')
    return h


FOOTER = """  <footer>
    &copy; <span id="year"></span> Md (Muhammad) Shafiuzzaman.
    This page is intentionally minimalist and static for longevity.
    Last updated: October 2026.
  </footer>
  </div>
<script>
document.getElementById('year').textContent = new Date().getFullYear();
</script>"""

DEFAULT_IMG = SITE + "/images/profile.png"


def head(title, desc, path, extra=""):
    url = SITE + path
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>{title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="{desc}" />
  <meta name="author" content="Md (Muhammad) Shafiuzzaman" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="{url}" />
  <link rel="icon" type="image/png" href="/images/profile.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Md (Muhammad) Shafiuzzaman" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{desc}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:image" content="{DEFAULT_IMG}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{desc}" />
  <meta name="twitter:image" content="{DEFAULT_IMG}" />
{extra}  <link rel="stylesheet" href="/site.css" />
</head>
<body>
  <div class="page">
"""


def write(path, html):
    d = os.path.join(ROOT, path.strip("/"))
    if path != "/":
        os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w").write(html)
    print("wrote", path)


def img(name, alt, caption, narrow=False):
    f = os.path.join(ROOT, "images", "fig", name + ".webp")
    w, h = Image.open(f).size
    cls = "figure fig-narrow" if narrow else "figure"
    return (f'<figure class="{cls}"><a href="/images/fig/{name}.webp" target="_blank" rel="noopener">'
            f'<img src="/images/fig/{name}.webp" width="{w}" height="{h}" alt="{alt}" loading="lazy" /></a>'
            f"<figcaption>{caption}</figcaption></figure>")


def btn(label, href, primary=False):
    ext = ' target="_blank" rel="noopener"' if href.startswith("http") else ""
    return f'<a class="btn{" btn-primary" if primary else ""}" href="{href}"{ext}>{label}</a>'


def stats(items):
    return '<div class="stat-strip">' + "".join(
        f'<div class="stat"><div class="stat-num">{n}</div><div class="stat-label">{l}</div></div>' for n, l in items) + "</div>"


def block(title, body):
    return f'<section class="page-block prose"><h2>{title}</h2>\n{body}\n</section>'


def project_page(slug, name, subtitle, desc, chips, links, lede, stat_items, blocks, cite):
    chips_html = "".join(f'<span class="chip{" chip-warn" if c.startswith("!") else ""}">{c.lstrip("!")}</span>' for c in chips)
    links_html = "".join(btn(l, h, i == 0) for i, (l, h) in enumerate(links))
    body = f"""  {header("Projects")}
  <main>
    <section class="section">
      <div class="crumbs"><a href="/">Home</a> / <a href="/#projects">Projects</a> / {name}</div>
      <h1 class="page-title">{name}</h1>
      <p class="page-sub">{subtitle}</p>
      <div class="chips">{chips_html}</div>
      <p class="lede">{lede}</p>
      <div class="link-row">{links_html}</div>
      {stats(stat_items) if stat_items else ""}
      {"".join(blocks)}
      <section class="page-block"><h2>Cite</h2><div class="cite">{cite}</div></section>
      <p class="subtle" style="margin-top:2rem;"><a href="/">&larr; Back to home</a></p>
    </section>
  </main>
{FOOTER}
</body>
</html>
"""
    write("/" + slug + "/", head(f"{name} | Md (Muhammad) Shafiuzzaman", desc, "/" + slug + "/") + body)


# ------------------------------------------------------------------ projects
EX = "https://github.com/"

project_page(
    "sailor", "SAILOR", "Static Analysis Informed and LLM-Orchestrated Symbolic Execution",
    "SAILOR automates symbolic execution harness construction with static analysis and LLM synthesis, finding 67 confirmed zero-days in 28 C/C++ projects.",
    ["Under review, USENIX Security 2027", "Accepted presentation, KLEE Workshop 2026", "Preprint on arXiv"],
    [("Preprint (arXiv)", "https://arxiv.org/abs/2604.06506"), ("KLEE Workshop 2026", "https://srg.doc.ic.ac.uk/klee26/"), ("Disclosed findings", "/findings/")],
    "SAILOR automates the hardest manual step in symbolic execution, writing the harness. Static analysis decides where to look, an LLM synthesizes the harness against compiler and KLEE feedback, and every result is replayed against the unmodified project under a sanitizer.",
    [("379", "previously unknown memory-safety vulnerabilities in 10 projects (6.8M lines), found from internal entry points"),
     ("12", "found by the strongest of five baselines on the same projects (Claude Code, full codebase access)"),
     ("67", "zero-days in 28 projects (12.3M lines), each with an API-level proof of concept"),
     ("36", "found by Claude Code on the same 28 projects, against 5 for libFuzzer")],
    [
        block("The problem",
              "<p>Symbolic execution is precise, but it needs a harness that sets up symbolic state, models dependencies, and states what to assert. Writing that harness by hand takes expert knowledge, which limits the technique on large codebases. LLM-only detectors scale, but they rarely produce evidence. In the 10-project study they flagged hundreds of issues each, and almost none replayed on the real binary (Claude Code confirmed 12 of 430 flagged).</p>"),
        block("How it works",
              "<p>SAILOR runs three phases, and every phase hands the next one something checkable.</p>"
              "<ul class='bullets-tight'><li><b>Static analysis informed target generation.</b> An extensible query system built on CodeQL finds candidate vulnerable locations and writes a specification for each one.</li>"
              "<li><b>LLM-orchestrated symbolic execution.</b> An LLM iteratively refines drivers, stubs, and assertions against compiler and KLEE feedback. Symbolic execution then looks for a violating input.</li>"
              "<li><b>Concrete validation.</b> The witness is replayed against the unmodified project under AddressSanitizer, so the LLM never decides whether a bug is real.</li></ul>"
              + img("sailor-pipeline", "SAILOR three-phase pipeline with a running example", "Figure 1 of the SAILOR paper. Phase 2 (shaded) is the core contribution, where the LLM synthesizes and iteratively refines the harness against compiler and KLEE feedback.")),
        block("A worked example in SELinux",
              "<p>libsepol's <code>discard_tunables</code> copies tunable terms into a fixed 10-slot array. Phase 1 flags the sink and a checker (<code>tunables &lt; 10</code>). Phase 2 has KLEE produce a witness, a policy with 11 tunable terms, through a synthesized harness. Phase 3 replays it against the unmodified source, and AddressSanitizer reports a stack-buffer overflow write at <code>expand.c:3058</code>. OSS-Fuzz had fuzzed this library for five years without reaching the overflow.</p>"
              + img("sailor-slide17", "Candidate, witness, and confirmation for an out-of-bounds write in SELinux", "From a candidate pattern to a confirmed zero-day, one phase at a time.", narrow=True)),
        block("Results",
              "<p>Run through public APIs on 28 real projects, SAILOR confirmed 67 zero-days with no false positives. Claude Code found 36 and libFuzzer found 5, and 55 of SAILOR's findings were missed by both baselines. Of the findings sent to maintainers, 14 are acknowledged (10 patched, 4 in progress) and 16 more were independently fixed upstream. SAILOR synthesized its harnesses with the less capable Sonnet 5.</p>"
              + '<div class="fig-row">'
              + img("sailor-slide22", "Summary of 67 zero-days in 28 projects", "Headline results for the 28-project study.")
              + img("sailor-slide23", "Bar chart and Venn diagram comparing SAILOR with Claude Code and libFuzzer", "SAILOR finds 67 vulnerabilities, 55 of them missed by both baselines.")
              + "</div>"),
        block("Every phase matters",
              "<p>Removing a phase shows what each one contributes. Without static-analysis targeting, confirmed vulnerabilities drop by 12.2 times. Without iterative LLM synthesis, none are confirmed. Without symbolic execution, no approach detects more than 12.</p>"
              + img("sailor-slide24", "Ablation results by pipeline phase", "Ablation by pipeline phase, showing recall, false positives, time, and cost.", narrow=True)),
        block("Evidence",
              "<p>Every finding comes with a path constraint, a concrete input, and a sanitizer trace. Disclosed examples with advisories and merged fixes are listed on the <a href='/findings/'>Findings page</a>. Reports still under coordinated disclosure are not shown.</p>"),
    ],
    "Md Shafiuzzaman, Achintya Desai, Wenbo Guo, Tevfik Bultan. <i>Guiding Symbolic Execution with Static Analysis and LLMs for Vulnerability Discovery.</i> arXiv:2604.06506, 2026. A version titled <i>SAILOR: Guiding Symbolic Execution for Memory Safety Vulnerability Detection</i> is under review at USENIX Security 2027.",
)

project_page(
    "stase", "STASE", "Static Analysis Guided Symbolic Execution for UEFI Vulnerability Signature Generation",
    "STASE guides symbolic execution with rule-based static analysis to find UEFI firmware vulnerabilities and generate machine-checkable signatures. ASE 2024, DARPA HARDEN.",
    ["ASE 2024", "DARPA HARDEN", "Open-source tool"],
    [("Paper (DOI)", "https://doi.org/10.1145/3691620.3695543"), ("Code", "https://github.com/shafiuzzaman-md/stase"),
     ("ASE 2024 slides", "/images/STASE_ASE_FINAL.pdf"), ("Demo video", "https://drive.google.com/file/d/1fW8Z9DvadEnX9chVtbEYN_W0YR1Ez5kI/view")],
    "STASE pairs a rule-based static detector with guided symbolic execution. The static stage finds candidate vulnerabilities and describes them, a generated harness sets up the firmware environment, and symbolic execution turns each candidate into a precise vulnerability signature.",
    [("0%", "false positives after symbolic confirmation, against 88% for rule-based static analysis alone"),
     ("5 of 9", "PixieFail vulnerabilities captured by precise signatures"),
     ("13", "previously unknown defects found in UEFI code"),
     ("Highest", "usability among DARPA HARDEN tools at Evaluation 3")],
    [
        block("Why UEFI",
              "<p>UEFI firmware runs with higher privilege than the operating system, and exploits there can persist through system reboots, OS reinstallation, and even partial hardware replacement. Static analysis flags many candidates but is prone to false positives. Fuzzing and plain symbolic execution need harnesses and guidance that firmware rarely provides.</p>"),
        block("Technique",
              "<p>Vulnerability rules drive a static detector that produces vulnerability descriptions. From each description STASE generates a harness, covering the entry point, symbolic variables, stubs, and assertions. Guided symbolic execution then explores only the paths that matter and emits a vulnerability signature.</p>"
              + img("stase-slide9", "STASE technique overview", "STASE technique. Rule-based static analysis feeds harness generation and guided symbolic execution.", narrow=True)
              + "<p>A signature is a precondition and a postcondition over symbolic state, so the vulnerability is characterized by evidence instead of a warning.</p>"
              + img("stase-slide16", "Example vulnerability signature", "A vulnerability signature, with its precondition and the assertion failure it implies.", narrow=True)),
        block("Evaluation",
              "<p>The benchmarks were EDK II SMM drivers, the EDK II network module, and DARPA HARDEN challenge sets. STASE removes the false positives of rule-based analysis and stays tractable where plain symbolic execution does not.</p>"
              '<div class="fig-row">'
              + img("stase-slide18", "False positive reduction chart", "False positives drop to zero.")
              + img("stase-slide19", "Paths explored and constraint queries per entrypoint", "Far fewer paths and constraint-solving queries per entrypoint.")
              + img("stase-slide20", "Detection time per technique", "Detection time per technique, log scale.")
              + "</div>"),
        block("Impact in DARPA HARDEN",
              "<ul class='bullets-tight'><li><b>July 2025.</b> After Evaluation 3 at the end of Phase 2, STASE was recognized as having the highest usability, with the greatest range of outputs and a high degree of automation among participating tools.</li>"
              "<li><b>September 2025.</b> The lab received a Phase 3 contract with about three times the funding, under which STASE is being transitioned into U.S. Army adversarial-testing workflows.</li>"
              "<li><b>October 2025.</b> Live demo at the HARDEN PI meeting (<a href='https://drive.google.com/file/d/1fW8Z9DvadEnX9chVtbEYN_W0YR1Ez5kI/view' target='_blank' rel='noopener'>video</a>).</li></ul>"),
    ],
    "Md Shafiuzzaman, Achintya Desai, Laboni Sarker, Tevfik Bultan. <i>STASE: Static Analysis Guided Symbolic Execution for UEFI Vulnerability Signature Generation.</i> 39th IEEE/ACM International Conference on Automated Software Engineering (ASE), 2024.",
)

project_page(
    "patchanalyzer", "PatchAnalyzer", "Symbolic Min-Max Analysis for Assessing Patch Correctness",
    "PatchAnalyzer quantifies how much of the input space a security patch still leaves vulnerable and how much safe behavior it changes, then ranks candidate patches.",
    ["!In preparation, targeting ACM TOSEM", "Dissertation work"],
    [("Contact me about this work", "mailto:mdshafiuzzaman@ucsb.edu"), ("All projects", "/#projects")],
    "Generating a plausible patch is no longer the hard part. Deciding whether it is correct is. PatchAnalyzer answers two questions with evidence. Does any input still trigger the vulnerability, and does behavior change on inputs that were safe before?",
    [("280", "developer and LLM-generated patches assessed, for 70 vulnerabilities in 30 projects"),
     ("5", "developer patches flagged unsafe, each fixed again upstream later"),
     ("3 / 73", "of 195 valid-looking LLM patches are unsafe / safe but change behavior"),
     ("55", "small input domains where exhaustive enumeration matched every count")],
    [
        block("The idea",
              "<p>A correct security patch must remove the reported vulnerability across the whole input domain and preserve intended behavior. Replaying the crash, running tests, or fuzzing the patched program cannot show either. PatchAnalyzer splits the input domain into a <b>vulnerability space</b>, the inputs where the vulnerable program violates the safety property, and a <b>functionality space</b>, all the other inputs. It then counts, using symbolic execution and model counting, how many inputs in each space a patch gets wrong.</p>"
              "<p>The assessment is <b>min-max</b>. Minimize the inputs that still violate the property, and among patches that violate nothing, maximize the inputs whose behavior stays the same.</p>"
              + img("patch-spaces", "Two spaces of the input domain and six illustrative patches ranked by min-max assessment", "The two spaces of the input domain and six illustrative patches, ranked by the min-max assessment.")),
        block("How it works",
              "<p>Three phases. <b>Contract synthesis</b> defines both spaces. An LLM agent builds the execution harness, and PatchAnalyzer requires the reported violation to reproduce concretely before accepting it. <b>Differential analysis</b> symbolically executes the vulnerable and patched functions from the same state, and classifies every path by whether the patch removes, keeps, or introduces a violation and whether the output changes. <b>Patch impact analysis</b> uses model counting to quantify the inputs in each set, and returns a verdict with a witness input for every violation and behavior change.</p>"
              + img("patch-overview", "Overview of PatchAnalyzer with its three phases", "The three phases of PatchAnalyzer, from contract synthesis to patch impact analysis.")),
        block("An example from the evaluation",
              "<p>Four patches for a heap out-of-bounds read in Ghostscript (<code>arvo:42327</code>). All four block the proof-of-concept input, and the three LLM patches pass CyberGym's validity checks. Their semantics still diverge. The developer patch compares with <code>&gt;</code>, so it misses the case where the index equals the size, and 256 violating inputs remain. The patches from Claude and Gemini remove all 256 and keep every safe input equivalent. GPT's patch removes them as well, but changes the output on 1,632 safe inputs. PatchAnalyzer ranks Claude and Gemini first, GPT second, and the developer patch last.</p>"
              + img("patch-listing", "Four candidate patches for arvo:42327", "Four patches for the out-of-bounds read in arvo:42327.")),
        block("What it found",
              "<p>On 280 patches for 70 vulnerabilities in 30 CyberGym projects, PatchAnalyzer flags five developer patches as unsafe, and each was fixed again upstream in the same function. One of them introduced an overflow that OSS-Fuzz detected ten weeks later. Among the 195 LLM patches that meet CyberGym's valid-patch criteria, it flags 3 as unsafe and 73 as safe but functionally different. Exhaustive enumeration of the 55 domains of at most three bytes agrees with every count.</p>"
              "<p class='subtle'>This work is not yet published. The numbers above are from the current draft and may change before submission.</p>"),
    ],
    "Md Shafiuzzaman, Tevfik Bultan. <i>PatchAnalyzer: Symbolic Min-Max Analysis for Assessing Patch Correctness.</i> In preparation, targeting ACM Transactions on Software Engineering and Methodology (TOSEM), 2026.",
)

project_page(
    "pagent", "PAGENT", "Program Analysis Guided LLM Agent for Proof-of-Concept Generation",
    "PAGENT combines rule-based static analysis and sanitizer-based dynamic guidance with an LLM agent to generate proof-of-concept inputs, 132% better than the prior best agentic approach. ISSTA 2026.",
    ["ISSTA 2026 (PACMSE vol. 3)", "Artifacts Available and Functional", "Open access preprint"],
    [("Paper (DOI)", "https://doi.org/10.1145/3832199"), ("Preprint (arXiv)", "https://arxiv.org/abs/2604.07624")],
    "Maintainers who receive a vulnerability report need a proof-of-concept input that triggers the bug reliably. LLM agents alone succeed rarely. PAGENT gives the agent what it lacks, static guidance about the entry point, taint path, and vulnerable operation, and dynamic guidance from sanitizer profiling and coverage.",
    [("+132%", "PoC generation success over the prior top-performing agentic approach"),
     ("2", "guidance channels, one static and one dynamic"),
     ("203", "real OSS-Fuzz vulnerabilities from ten C/C++ projects (ARVO dataset, via CyberGym)"),
     ("A&F", "ACM artifact badges, Available and Functional")],
    [
        block("Approach",
              "<p>PAGENT takes the source code and a vulnerability location. Lightweight, rule-based static analysis produces a vulnerability report. An instrumented binary yields sanitizer-based profiling and coverage. Both feed a PoC generation agent that writes, runs, and refines candidate inputs until the sanitizer confirms the vulnerability or the budget is exhausted.</p>"
              + img("pagent-overview", "Overview of the PAGENT technique", "Overview of PAGENT. Static analysis guidance and dynamic analysis guidance drive the PoC generation agent.", narrow=True)),
        block("What the guidance looks like",
              "<p>For a stack-buffer overflow in GNU Binutils (<code>ARVO:18615</code>), static guidance names the vulnerable function, entry point, taint path, and the violated assertion. Dynamic guidance reports which regions and lines the current input already reaches. The agent no longer has to guess where the bug is or whether its input gets there.</p>"
              + img("pagent-guidance", "Static and dynamic analysis guidance for ARVO:18615", "Static and dynamic analysis guidance generated for ARVO:18615.")),
        block("The agent loop",
              "<p>The PoC agent follows the CodeAct pattern. It prepares a workspace, proposes an input, executes it in the test environment, and receives the dynamic feedback. It loops until a PoC succeeds or the iteration budget is spent.</p>"
              + img("pagent-agent", "Overview of the PoC generation agent", "The PoC generation agent and its feedback loop with the test environment.", narrow=True)),
        block("Role in the larger pipeline",
              "<p>PAGENT is one stage of the vulnerability discovery and analysis toolchain our lab deployed in DARPA HARDEN, alongside STASE, SAILOR, and CHAINER.</p>"),
    ],
    "Achintya Desai, Md Shafiuzzaman, Wenbo Guo, Tevfik Bultan. <i>PAGENT: Program Analysis Guided LLM Agent for Proof-of-Concept Generation.</i> Proceedings of the ACM on Software Engineering, vol. 3, ISSTA, 2026. doi:10.1145/3832199.",
)

project_page(
    "bug-composition", "Bug Composition", "Triggering Multiple Bugs with Agentic Driver Generation",
    "An agentic pipeline that decides whether a single shared input can trigger multiple bugs, or proves that none exists. AgenticDev 2026.",
    ["AgenticDev 2026", "Mentored undergraduate co-authors"],
    [("Paper (DOI)", "https://doi.org/10.1145/3843282.3844434")],
    "Attackers chain bugs. Most tools find them one at a time. Bug composition asks whether one input can trigger several distinct vulnerabilities in the same execution, which is a first test for a possible exploit chain.",
    [("3", "libraries evaluated, tcpdump, libxml2, and nDPI"),
     ("3", "stages, two LLM stages followed by symbolic execution"),
     ("SAT / UNSAT", "concrete shared input, or proof that none exists"),
     ("3", "mentored undergraduates among the authors")],
    [
        block("Workflow",
              "<p>Given harnesses for two known bugs, an LLM agent first writes a predicate for each bug. A second LLM stage writes a driver that applies both predicates to one shared input. KLEE and an SMT solver then explore every combination. A satisfiable result yields a concrete input that triggers both bugs. An unsatisfiable result proves that the bugs need mutually exclusive inputs.</p>"
              + img("bugcomp-workflow", "Bug Composition analysis workflow", "The Bug Composition analysis workflow.")),
        block("A concrete driver",
              "<p>The driver for a libxml2 bug pair shares one buffer and one length, couples the length to the bounds so that KLEE has to find a value satisfying both bugs, and ends with an assertion that makes KLEE produce a concrete witness.</p>"
              + img("bugcomp-harness", "Part of the bug harness for bug 18 in libxml2", "Part of the bug harness (driver) for one libxml2 bug.", narrow=True)),
        block("Results",
              "<p>The pipeline produced concrete shared inputs for bug pairs including heap buffer overflows in tcpdump, stack and heap memory corruptions in libxml2, and out-of-bounds reads across independent protocol dissectors in nDPI. It also proved the absence of shared inputs when bugs require mutually exclusive constraints.</p>"),
        block("Mentorship",
              "<p>The work grew out of a mentored research cohort at UC Santa Barbara. Three undergraduate students are co-authors, and the paper is their first peer-reviewed publication.</p>"),
    ],
    "Vishva Arasan, Mahima Chaudhary, Wendy Contreras Martinez, Md Shafiuzzaman, Achintya Desai, Tevfik Bultan. <i>Bug Composition: Triggering Multiple Bugs with Agentic Driver Generation.</i> 1st International Workshop on Agentic AI for Next-Generation Software Development (AgenticDev), 2026. doi:10.1145/3843282.3844434.",
)

project_page(
    "chainer", "CHAINER", "Discovering Vulnerability Chains with Memory-Aware Symbolic Analysis",
    "CHAINER discovers and validates chains of vulnerabilities that reach an attacker goal, using memory-aware symbolic analysis across UEFI firmware, the Linux kernel, and user-space code.",
    ["In preparation, IEEE S&amp;P", "Built in DARPA HARDEN", "Benchmark on GitHub"],
    [("Benchmark (GitHub)", "https://github.com/shafiuzzaman-md/chainbench"), ("All projects", "/#projects")],
    "Bugs that look harmless alone can become a critical exploit when chained. A chain only works if the memory effects of each step line up, for example a stack that one bug makes executable, another bug fills with code, and a third bug jumps into. CHAINER reasons about that alignment, so it can tell which combinations of vulnerabilities are real.",
    [("121", "candidate chains distilled by the pipeline"),
     ("13", "symbolically validated, high-impact chains, none found by baseline fuzzing or symbolic execution"),
     ("7", "DARPA HARDEN challenge sets, 3 UEFI, 3 Linux kernel, 1 Linux user-space"),
     ("0%", "false positives after the final validation stage, down from 89%")],
    [
        block("The problem",
              "<p>Fuzzers, static analyzers, and symbolic executors look at vulnerabilities one at a time. Only a small share of reported bugs are critical on their own, yet chaining low and medium severity bugs can give arbitrary code execution or privilege escalation. The hard part is memory alignment. Two bugs only compose if they act on overlapping address regions, so a chain needs a precise model of where each bug reads, writes, and executes.</p>"
              + img("chainer-example", "A chain of three kernel-module vulnerabilities leading to arbitrary code execution", "A chain of three vulnerabilities for arbitrary code execution. Each step has a post-condition, and the post-conditions must line up in memory.")),
        block("How it works",
              "<p>CHAINER starts from a high-level attack goal such as arbitrary code execution, and splits it into sub-goals that can be checked against memory effects. <b>Vulnerability characterization</b> builds on STASE and records, for each bug, the symbolic conditions that trigger it and its memory effects by segment, such as stack, heap, or SMRAM. <b>Chain synthesis</b> instantiates those specifications with concrete memory information and uses SMT queries to prune combinations that cannot satisfy the goal. <b>Chain validation</b> then replays the surviving chains in a goal-directed symbolic execution, and emits a chaining signature that captures the memory layout and linking constraints needed for exploitability.</p>"
              + img("chainer-overview", "Overview of CHAINER", "Overview of CHAINER, from vulnerability characterization to chain synthesis and validation.", narrow=True)),
        block("Results",
              "<p>On seven challenge sets from DARPA HARDEN, CHAINER narrowed 121 candidate chains to 13 validated ones, 7 in the Linux kernel and 5 in UEFI firmware, plus one user-space chain in OpenSSH. The false positive rate falls stage by stage, from 89% for naive candidates to 0% after symbolic validation. Neither baseline fuzzing nor plain symbolic execution found any of the 13 chains. Memory-aware reasoning costs time, about 65 seconds per entry point against 56 for STASE, and the expensive validation runs only on the small set of chains that survive the earlier filters.</p>"
              "<p class='subtle'>This work is not yet published. The numbers above are from the current draft and may change before submission.</p>"),
    ],
    "Achintya Desai, Md Shafiuzzaman, Tevfik Bultan. <i>CHAINER: Discovering Vulnerability Chains with Memory-Aware Symbolic Analysis.</i> In preparation, 2026.",
)

# ------------------------------------------------------------------ findings
fs = strip_header(section("findings"))
fs = re.sub(r'<p class="findings-lead">.*?</p>\s*', '', fs, count=1, flags=re.S)
fs = fs.replace('<section class="section" id="findings">', '<section class="section" id="findings-body">')
fs = fs.replace('<div class="fstat-value">9</div>', '<div class="fstat-value">10</div>')
findings_html = head("Security Findings | Md (Muhammad) Shafiuzzaman",
                     "Previously unknown memory-safety vulnerabilities found and responsibly disclosed by Md Shafiuzzaman, with advisory and pull-request links.",
                     "/findings/") + f"""  {header("Findings")}
  <main>
    <section class="section">
      <div class="crumbs"><a href="/">Home</a> / Findings</div>
      <h1 class="page-title">Security Findings</h1>
      <p class="page-sub">Responsible disclosure, with the evidence behind every item.</p>
      <p class="lede">Each entry links to the maintainers' own record, a published advisory, an issue, or a merged fix. Bugs still under coordinated disclosure are listed by project name only.</p>
      <div class="link-row">{btn("How SAILOR finds them", "/sailor/", True)}{btn("PAGENT, proof-of-concept generation", "/pagent/")}</div>
    </section>
    {fs}
  </main>
{FOOTER}
</body>
</html>
"""
write("/findings/", findings_html)

# ------------------------------------------------------------------ publications
ME = "<b>Md Shafiuzzaman</b>"


def pub(title, authors, venue, links=(), note=""):
    l = "".join(f'<a href="{h}"{" target=_blank rel=noopener" if h.startswith("http") else ""}>{t}</a>' for t, h in links)
    n = f'<div class="pub-note">{note}</div>' if note else ""
    return (f'<li class="pub-item"><div class="pub-title">{title}</div><div class="pub-authors">{authors}</div>'
            f'<div class="pub-venue">{venue}</div>{n}<div class="pub-links">{l}</div></li>')


M = lambda s: f'<span class="mentee">{s}</span>'
under = [
    pub("SAILOR: Guiding Symbolic Execution for Memory Safety Vulnerability Detection",
        f"{ME}, Achintya Desai, Wenbo Guo, Tevfik Bultan", "Under review, USENIX Security Symposium 2027",
        [("Project page", "/sailor/"), ("Preprint", "https://arxiv.org/abs/2604.06506")],
        "Also accepted for presentation at the 5th International KLEE Workshop on Symbolic Execution, 2026."),
    pub("CHAINER: Discovering Vulnerability Chains with Memory-Aware Symbolic Analysis",
        f"Achintya Desai, {ME}, Tevfik Bultan", "In preparation, targeting IEEE Symposium on Security and Privacy",
        [("Project page", "/chainer/"), ("Benchmark", "https://github.com/shafiuzzaman-md/chainbench")]),
    pub("PatchAnalyzer: Symbolic Min-Max Analysis for Assessing Patch Correctness",
        f"{ME}, Tevfik Bultan", "In preparation, targeting ACM Transactions on Software Engineering and Methodology",
        [("Project page", "/patchanalyzer/")]),
]
peer = [
    pub("PAGENT: Program Analysis Guided LLM Agent for Proof-of-Concept Generation",
        f"Achintya Desai, {ME}, Wenbo Guo, Tevfik Bultan",
        "Proceedings of the ACM on Software Engineering, vol. 3, ISSTA, 2026",
        [("Project page", "/pagent/"), ("DOI", "https://doi.org/10.1145/3832199"), ("arXiv", "https://arxiv.org/abs/2604.07624")],
        "ACM artifacts evaluated, Available and Functional."),
    pub("Bug Composition: Triggering Multiple Bugs with Agentic Driver Generation",
        f"{M('Vishva Arasan')}, {M('Mahima Chaudhary')}, {M('Wendy Contreras Martinez')}, {ME}, Achintya Desai, Tevfik Bultan",
        "1st International Workshop on Agentic AI for Next-Generation Software Development (AgenticDev), 2026",
        [("Project page", "/bug-composition/"), ("DOI", "https://doi.org/10.1145/3843282.3844434")],
        "Underlined authors are undergraduates I mentored."),
    pub("Stateful Behavior Inference and Runtime Enforcement for Vehicle Network Security",
        f"Achintya Desai, Ruochen Dai, Yanju Chen, Ky Ho, Austin Kee, Sophie Bulatovic, {ME}, Tevfik Bultan, et al.",
        "3rd USENIX Symposium on Vehicle Security and Privacy (VehicleSec), 2025",
        [("PDF", "https://www.usenix.org/system/files/vehiclesec25-desai.pdf"), ("Talk", "https://www.usenix.org/conference/vehiclesec25/presentation/desai")]),
    pub("STASE: Static Analysis Guided Symbolic Execution for UEFI Vulnerability Signature Generation",
        f"{ME}, Achintya Desai, Laboni Sarker, Tevfik Bultan",
        "39th IEEE/ACM International Conference on Automated Software Engineering (ASE), 2024",
        [("Project page", "/stase/"), ("DOI", "https://doi.org/10.1145/3691620.3695543"), ("Code", "https://github.com/shafiuzzaman-md/stase")]),
    pub("Rare Path Guided Fuzzing",
        f"Seemanta Saha, Laboni Sarker, {ME}, Chaofan Shou, Albert Li, Ganesh Sankaran, Tevfik Bultan",
        "32nd ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA), 2023",
        [("DOI", "https://doi.org/10.1145/3597926.3598136"), ("Code", "https://github.com/shafiuzzaman-md/Rare-Path-Guided-Fuzzing")]),
]
early = [
    pub("Performance Improvement of Network Coding for Heterogeneous Data Items", f"R. R. Ema, {ME}, et al.",
        "International Journal of Advanced Computer Science and Applications (IJACSA), 2021"),
    pub("Nitrogen fertilizer recommendation for paddies through automating the leaf color chart (LCC)", f"T. Islam, {ME}, et al.",
        "International Journal of Advanced Computer Science and Applications (IJACSA), 2020"),
    pub("SRCS: A New Proposed Counting Sort Algorithm based on Square Root Method", f"H. Roy, {ME}, M. Samsuddoha",
        "22nd International Conference on Computer and Information Technology (ICCIT), 2019", [("DOI", "https://doi.org/10.1109/ICCIT48885.2019.9038601")]),
    pub("A Proactive Self-Adaptive Framework for Context-Aware Mobile Applications", f"{ME}, A. S. Ami, R. Rahman",
        "International Journal of Computer Applications (IJCA), 2018"),
    pub("Characterization and Localization of Performance-bugs using Naive Bayes Approach", f"M. Sujon, {ME}, M. M. Rahman, M. R. Rahman",
        "5th International Conference on Informatics, Electronics and Vision (ICIEV), 2016", [("DOI", "https://doi.org/10.1109/ICIEV.2016.7760110")]),
]
pubs_html = head("Publications | Md (Muhammad) Shafiuzzaman",
                 "Publications by Md Shafiuzzaman, including ISSTA 2026, AgenticDev 2026, ASE 2024, ISSTA 2023, and work under review.",
                 "/publications/") + f"""  {header("Publications")}
  <main>
    <section class="section">
      <div class="crumbs"><a href="/">Home</a> / Publications</div>
      <h1 class="page-title">Publications</h1>
      <p class="page-sub">Papers, preprints, and work in progress, with links to code and project pages.</p>
      <div class="link-row">{btn("Google Scholar", "https://scholar.google.com/citations?user=1mue4woAAAAJ&hl=en", True)}{btn("DBLP", "https://dblp.org/pid/336/3040.html")}</div>
      <section class="page-block"><h2>Under review and in preparation</h2><ul class="pub-list">{"".join(under)}</ul></section>
      <section class="page-block"><h2>Peer-reviewed</h2><ul class="pub-list">{"".join(peer)}</ul>
        <details class="more"><summary>Earlier work, 2016 to 2021</summary><ul class="pub-list" style="margin-top:0.6rem">{"".join(early)}</ul></details>
      </section>
    </section>
  </main>
{FOOTER}
</body>
</html>
"""
write("/publications/", pubs_html)

# ------------------------------------------------------------------ about
research = re.search(r'<h3 class="item-title">Research Interests</h3>.*?</ul>', section("research"), re.S).group(0)
about_html = head("About | Md (Muhammad) Shafiuzzaman",
                  "Research interests, experience, teaching, mentoring, service, and honors of Md Shafiuzzaman, Ph.D. candidate at UC Santa Barbara.",
                  "/about/") + f"""  {header("About")}
  <main>
    <section class="section">
      <div class="crumbs"><a href="/">Home</a> / About</div>
      <h1 class="page-title">About</h1>
      <p class="page-sub">Research interests, experience, teaching and mentoring, service, and recognition.</p>
      <div class="card" style="max-width:820px">{research}</div>
    </section>
    {section("industry")}
    {section("teaching")}
    {section("service")}
    {section("honors")}
  </main>
{FOOTER}
</body>
</html>
"""
write("/about/", about_html)

# ------------------------------------------------------------------ home
CARDS = [
    ("sailor", "SAILOR", "Under review, USENIX Security 2027 and KLEE Workshop 2026", "LLM-orchestrated symbolic execution with sanitizer-confirmed evidence. 67 zero-days in 28 projects.", "sailor-slide23"),
    ("patchanalyzer", "PatchAnalyzer", "In preparation, ACM TOSEM", "Symbolic min-max analysis that quantifies whether a security patch is correct, and ranks candidates.", "patch-spaces"),
    ("pagent", "PAGENT", "ISSTA 2026", "Program-analysis-guided LLM agent for proof-of-concept generation, 132% better than the prior best.", "pagent-overview"),
    ("stase", "STASE", "ASE 2024, DARPA HARDEN", "Static-analysis-guided symbolic execution for UEFI firmware, with zero false positives.", "stase-slide9"),
    ("bug-composition", "Bug Composition", "AgenticDev 2026", "Can one input trigger several bugs? An agentic pipeline answers with an input or a proof.", "bugcomp-workflow"),
]
cards = ""
for slug, name, venue, text, im in CARDS:
    cards += (f'<a class="project-card" href="/{slug}/"><div class="project-thumb"><img src="/images/fig/{im}.webp" alt="{name} figure" loading="lazy" /></div>'
              f'<div class="project-body"><div class="project-name">{name}</div><div class="project-venue">{venue}</div><p class="project-text">{text}</p></div></a>')
cards += ('<a class="project-card" href="/chainer/"><div class="project-thumb"><img src="/images/fig/chainer-overview.webp" alt="CHAINER figure" loading="lazy"></div>'
          '<div class="project-body"><div class="project-name">CHAINER</div><div class="project-venue">In preparation, IEEE S&amp;P</div>'
          '<p class="project-text">Memory-aware symbolic analysis that discovers chains of vulnerabilities across firmware, kernel, and user space.</p></div></a>')

news_items = "\n".join(NEWS[:4])
news_more = "\n".join(NEWS[4:])
homepage_hero = f"""<section class="section" id="about">
      <div class="hero">
        <div class="hero-card">
          <p class="hero-bio">
            <b>Bio.</b> I am a Ph.D. candidate in Computer Science at the University of California, Santa Barbara (UCSB),
            expected to graduate in Spring 2027, advised by
            <a href="https://sites.cs.ucsb.edu/~bultan/" target="_blank" rel="noopener">Prof. Tevfik Bultan</a>.
            I work as a Graduate Student Researcher in the <b>Verification Lab (VLab)</b>, supported by DARPA&rsquo;s
            <a href="https://www.darpa.mil/research/programs/hardening-development-toolchains-against-emergent-execution-engines" target="_blank" rel="noopener">HARDEN</a>
            and
            <a href="https://www.darpa.mil/research/programs/intelligent-generation-tools-security" target="_blank" rel="noopener">INGOTS</a>
            programs. Before my Ph.D., I built large-scale software systems in industry.
          </p>
          <p class="hero-bio">
            <b>Research.</b> I work at the intersection of <b>AI-assisted software engineering</b>,
            <b>software security</b>, <b>program analysis</b>, and <b>formal methods</b>. My dissertation builds toward one
            pipeline that can <b>find, confirm, and repair</b> memory-safety bugs in real code. Its centerpiece,
            <a href="/sailor/"><b>SAILOR</b></a>, pairs static analysis with LLM-orchestrated symbolic execution and sanitizer-backed
            validation, and has uncovered <b>67 previously unknown vulnerabilities</b>. <a href="/patchanalyzer/"><b>PatchAnalyzer</b></a>
            then assesses whether a patch really fixes them. This builds on <a href="/stase/"><b>STASE</b></a>, which is being
            transitioned into U.S. Army adversarial-testing workflows.
          </p>
          <div class="link-row">{btn("Explore the projects", "#projects", True)}{btn("Disclosed findings", "/findings/")}{btn("Publications", "/publications/")}</div>
          <div class="hero-now">
            <div class="hero-now-title">Currently</div>
            <ul>
              <li>Presenting <a href="/sailor/">SAILOR</a> at the KLEE Workshop in Munich, Oct 15&ndash;16, 2026.</li>
              <li>Preparing <a href="/patchanalyzer/">PatchAnalyzer</a> for ACM TOSEM.</li>
              <li>On the job market for faculty and industry research positions, graduating Spring 2027.</li>
            </ul>
          </div>
          <div class="hero-tags">
            <span class="tag">Program analysis &amp; formal methods</span>
            <span class="tag">Symbolic execution</span>
            <span class="tag">Software &amp; firmware security</span>
            <span class="tag">CodeQL / Static Analysis</span>
            <span class="tag">LLM-Driven Program Reasoning</span>
          </div>
        </div>
        {ASIDE}
      </div>
    </section>"""
ld = re.search(r'  <script type="application/ld\+json">.*?</script>\n', orig, re.S).group(0)
home = head("Md (Muhammad) Shafiuzzaman | Ph.D. Candidate, UCSB | Symbolic Execution, LLM Security",
            "Md (Muhammad) Shafiuzzaman, Ph.D. candidate at UC Santa Barbara. LLM-orchestrated symbolic execution, program analysis, and memory-safety vulnerability discovery. Creator of SAILOR and STASE; 67 zero-days found, 30+ disclosed.",
            "/", ld) + f"""  {header("")}
  <main>
    {homepage_hero}

    <section class="section" id="at-a-glance">
      {stats([("67", "zero-days confirmed in 28 real-world C/C++ projects"), ("10", "disclosed findings with public advisories, fixes, or pull requests"), ("Final phase", "DARPA HARDEN, the only bug-discovery team to reach it"), ("2026", "ISSTA and AgenticDev papers in the ACM Digital Library, KLEE Workshop talk")])}
    </section>

    <section class="section" id="projects">
      <div class="section-header"><h2 class="section-title">Projects</h2><div class="section-subtitle">Diagrams, results, and evidence</div></div>
      <div class="project-grid">{cards}</div>
    </section>

    <section class="section" id="news">
      <div class="section-header"><h2 class="section-title">News</h2><div class="section-subtitle">Updates</div></div>
      <div class="card news-card">
        <ul class="news-list">
{news_items}
        </ul>
        <details class="more"><summary>Earlier news</summary>
        <ul class="news-list">
{news_more}
        </ul></details>
      </div>
    </section>

    <section class="section" id="findings">
      <div class="section-header"><h2 class="section-title">Security Findings</h2><div class="section-subtitle">Responsible disclosure</div></div>
      <div class="card">
        <p class="item-body">More than 30 previously unknown memory-safety vulnerabilities disclosed across 18 widely used C and C++ codebases, including post-quantum cryptography, speech and audio models, and security-policy tooling. Each one is confirmed by a sanitizer crash, and each entry on the findings page links to the maintainers' own advisory, issue, or fix.</p>
        <div class="link-row">{btn("See the findings", "/findings/", True)}</div>
      </div>
    </section>

    <section class="section" id="publications">
      <div class="section-header"><h2 class="section-title">Publications</h2><div class="section-subtitle">Selected</div></div>
      <div class="card">
        <ul class="list-compact">
          <li><b>PAGENT</b>, ISSTA 2026 (PACMSE vol. 3). <a href="/pagent/">Project</a> &middot; <a href="https://doi.org/10.1145/3832199" target="_blank" rel="noopener">DOI</a></li>
          <li><b>Bug Composition</b>, AgenticDev 2026. <a href="/bug-composition/">Project</a> &middot; <a href="https://doi.org/10.1145/3843282.3844434" target="_blank" rel="noopener">DOI</a></li>
          <li><b>STASE</b>, ASE 2024. <a href="/stase/">Project</a> &middot; <a href="https://doi.org/10.1145/3691620.3695543" target="_blank" rel="noopener">DOI</a></li>
          <li><b>SAILOR</b>, under review at USENIX Security 2027. <a href="/sailor/">Project</a> &middot; <a href="https://arxiv.org/abs/2604.06506" target="_blank" rel="noopener">Preprint</a></li>
        </ul>
        <div class="link-row">{btn("All publications", "/publications/", True)}{btn("Research interests, teaching, and service", "/about/")}</div>
      </div>
    </section>

    {CONTACT}
  </main>
{FOOTER}
</body>
</html>
"""
write("/", home)

# ------------------------------------------------------------------ sitemap
pages = ["/", "/sailor/", "/stase/", "/patchanalyzer/", "/pagent/", "/bug-composition/", "/chainer/", "/findings/", "/publications/", "/about/"]
sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
for p in pages:
    sm += f"  <url><loc>{SITE}{p}</loc><lastmod>2026-10-09</lastmod></url>\n"
sm += "</urlset>\n"
open(os.path.join(ROOT, "sitemap.xml"), "w").write(sm)
print("wrote sitemap")
