export type ProjectVisual = "cook" | "atsift" | "supply" | "beone";

/** A titled block used for both the "how it works" steps and the "why it's better" points. */
export type CaseStudyPoint = {
  title: string;
  body: string;
};

export type StackChoice = {
  layer: string;
  choice: string;
  why: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  /** Large statement that opens the case study page. */
  headline: string;
  problem: {
    lead: string;
    points: string[];
  };
  approach: CaseStudyPoint[];
  stack: StackChoice[];
  edge: CaseStudyPoint[];
  metrics: Metric[];
  /** Anything a visitor should know before opening the live link. */
  note?: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  kicker: string;
  year: string;
  summary: string;
  outcome: string;
  stack: string[];
  visual: ProjectVisual;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy: CaseStudy;
};

export const profile = {
  name: "Rutik Narute",
  role: "AI Software Engineer",
  location: "Los Angeles, CA",
  email: "rutiknarute25@gmail.com",
  phone: "626-493-1810",
  phoneHref: "tel:+16264931810",
  github: "https://github.com/rutiknarute",
  linkedin: "https://www.linkedin.com/in/rutiknarute",
};

export const projects: Project[] = [
  {
    slug: "cook",
    index: "01",
    name: "Cook",
    kicker: "AI meal-planning agent",
    year: "2026",
    summary:
      "A full-stack meal-planning platform that turns personal goals, dietary preferences, and recipe data into a clear seven-day food plan.",
    outcome:
      "Milo uses Llama 3.3 70B to generate schema-validated drafts that users can review, revise, select, and approve before meals reach the active plan.",
    stack: ["React 19", "Express", "MongoDB", "Llama 3.3 70B"],
    visual: "cook",
    githubUrl: "https://github.com/rutiknarute/cook",
    liveUrl: "https://cook-meal-planner.vercel.app",
    caseStudy: {
      headline:
        "Feeding yourself for a week is a scheduling problem wearing a cooking problem's clothes.",
      problem: {
        lead:
          "Recipe sites are built to answer one question — what's for dinner tonight. That leaves the actual hard part, filling twenty-one slots across a week without repeating yourself or breaking your own dietary rules, entirely to you.",
        points: [
          "Twenty-one meal slots a week, and every search result is a single dish considered in isolation.",
          "Dietary preferences live in your head, so every search starts from scratch and you screen the results yourself.",
          "Nutrition numbers for a realistic home-cooked serving are missing, paywalled, or quietly wrong.",
          "A plan written on paper is abandoned by Wednesday, because nothing keeps it in front of you or lets you revise it in place.",
        ],
      },
      approach: [
        {
          title: "Make the week the object, not the recipe",
          body:
            "The primary structure is seven days with separate breakfast, lunch, and dinner slots. Recipes are saved into a specific slot rather than a general favourites pile, and on mobile the week collapses into day accordions so a single thumb can move through it.",
        },
        {
          title: "Apply preferences once, not per search",
          body:
            "Recipe discovery runs on Spoonacular, filtered through the dietary profile stored on the account. You state a restriction once and every subsequent search respects it, instead of re-typing constraints into a search box.",
        },
        {
          title: "Ask for nutrition, don't compute it everywhere",
          body:
            "Llama 3.3 70B, called through OpenRouter, estimates a typical serving only when a user requests it. Results are cached and requests are limited per user, so an expensive model doesn't quietly become an expensive habit.",
        },
        {
          title: "Keep the cost of trying it near zero",
          body:
            "Accounts are username and password with bcrypt hashing and signed JWT sessions. There is no email verification wall between someone and a working planner — the account exists to hold a plan, not to build a mailing list.",
        },
        {
          title: "Ship the whole backend as one function",
          body:
            "Vite builds the React client to static assets and the entire Express application runs as a single Vercel Node.js Function behind /api/*. The same app.js runs locally and in production, so there is no serverless-only code path that can drift.",
        },
      ],
      stack: [
        {
          layer: "Frontend",
          choice: "React 19, TypeScript, Vite, Tailwind CSS, Radix UI",
          why: "Radix supplies the accessible primitives the accordions and dialogs need, so keyboard and screen-reader behaviour isn't hand-rolled.",
        },
        {
          layer: "Backend",
          choice: "Node.js and Express",
          why: "One reusable Express app that runs as a local server and as a serverless function without a second entry point.",
        },
        {
          layer: "Database",
          choice: "MongoDB with Mongoose",
          why: "A week of meal slots is naturally one nested document, not seven joins.",
        },
        {
          layer: "Auth",
          choice: "bcrypt password hashing, JSON Web Tokens",
          why: "Protected routes verify a signed session and account ownership before touching a plan.",
        },
        {
          layer: "Recipes",
          choice: "Spoonacular API",
          why: "Structured recipe and ingredient data, queried server-side so the key never reaches the client.",
        },
        {
          layer: "Intelligence",
          choice: "OpenRouter, Meta Llama 3.3 70B",
          why: "A hosted model is the right trade here: one call, a human waiting on it, quality is the whole point.",
        },
        {
          layer: "Hosting",
          choice: "Vercel static frontend plus one Node.js Function",
          why: "Static assets on the edge, all secrets on the server side of a single function boundary.",
        },
      ],
      edge: [
        {
          title: "The plan is the product",
          body:
            "Recipe sites hand you a dish and leave the week to you. Cook treats the week as the unit of work, which is the thing people actually fail at.",
        },
        {
          title: "Estimates are cached, not re-billed",
          body:
            "Nutrition results are cached and rate-limited per user, so the second person to ask about the same recipe costs nothing and one enthusiastic user can't run up the bill.",
        },
        {
          title: "No third-party key ever reaches the browser",
          body:
            "Spoonacular, OpenRouter, and Stripe credentials stay on the Express server and are never exposed through Vite client variables — the usual leak in a client-heavy stack.",
        },
        {
          title: "Honest about what an estimate is",
          body:
            "Nutrition values are labelled as estimates for a typical serving rather than medical advice, with an explicit note for anyone managing allergies or a medical dietary requirement.",
        },
      ],
      metrics: [
        { value: "21", label: "meal slots planned per week" },
        { value: "0", label: "API keys in the client bundle" },
        { value: "1", label: "serverless function behind the whole API" },
      ],
      note:
        "Planner Plus — custom meals, AI-generated weekly plans, and Stripe billing — is built but held behind PLANNER_PLUS_AVAILABLE=false until launch.",
    },
  },
  {
    slug: "atsift",
    index: "02",
    name: "ATSift",
    kicker: "AI job-search agent",
    year: "2026",
    summary:
      "A multi-source job intelligence platform that scans Greenhouse, Ashby, Lever, SmartRecruiters, Workable, and Workday listings.",
    outcome:
      "Pairs a Python scanner with a Next.js interface and local or hosted Llama agents for fresh, timeframe-aware job discovery.",
    stack: ["Next.js", "Python", "Ollama", "OpenRouter"],
    visual: "atsift",
    githubUrl: "https://github.com/rutiknarute/atsift",
    liveUrl: "https://atsift.vercel.app",
    caseStudy: {
      headline:
        "The big job boards are a search engine over an index. ATSift is a crawler over the ATS APIs themselves.",
      problem: {
        lead:
          "Job hunting on an F-1 visa has two ways to waste an evening: being late to a posting, and being ineligible for it. Existing boards solve neither, so the screening work falls on the applicant — after the click, when it's already cost them the time.",
        points: [
          "A posting that is three days old already has hundreds of applicants ahead of you. Recruiters work the pile top-down and stop.",
          "\"Remote\" on a big board routinely turns out to mean Remote–Poland, and the card gives you no way to know.",
          "Sponsorship policy is buried in the final paragraph, or behind twenty minutes of filling in your work history.",
          "\"Entry level\" reliably returns roles asking for eight years of experience.",
          "Checking career pages by hand worked — at roughly 45 minutes a day, and still only across the twenty or so companies one person can track.",
        ],
      },
      approach: [
        {
          title: "Read the source, not an aggregator's index",
          body:
            "One adapter per ATS — six of them — hitting the same public JSON endpoints the companies' own career pages use. The catalog of 18,264 boards is deduplicated by ATS and slug, then live-checked so every entry resolves to a real posting. Because there is no index in between, freshness can actually be promised.",
        },
        {
          title: "Order the pipeline by what each step costs",
          body:
            "Fetch board, match title, apply the time window, screen the location, fetch the description, then call the model. Each step only sees what survived the one before it, so by the time a posting reaches a language model, thousands of others have already been eliminated for free by string matching.",
        },
        {
          title: "Publish results as they clear, not at the end",
          body:
            "Every posting runs the whole pipeline on its own. The first version worked in phases — sweep everything, screen everything, read everything — which meant staring at a progress bar and getting one dump at the end. Now the sweep and the screening overlap and the list grows while the scan is still running. Same total work, completely different to use.",
        },
        {
          title: "Split the models by who is waiting",
          body:
            "Bulk screening runs on a local llama3.2:3b through Ollama, because a scan puts thousands of descriptions through a model and hosted per-token pricing would make a daily habit a real monthly bill. The conversational Scout runs on hosted Llama 3.3 70B — one call, a human watching the cursor, quality is the entire point.",
        },
        {
          title: "Never give the model the final say",
          body:
            "Anything decidable deterministically is decided that way. The years-of-experience label and the eligibility blockers come from regex and rules over the posting's own words, layered on top of the model output rather than taken from it. The model fills gaps; it doesn't get a vote.",
        },
        {
          title: "Let people ask instead of driving dropdowns",
          body:
            "A chat agent answers only from the roles the current scan actually found, so it cannot invent a job. Filter dropdowns are fine when you know exactly what you want and useless when what you want is \"like the last one, but less senior\".",
        },
      ],
      stack: [
        {
          layer: "Scanner",
          choice: "Python 3.13, Flask, ThreadPoolExecutor",
          why: "Sweeping thousands of board endpoints is IO-bound, so the sweep is wide and concurrent.",
        },
        {
          layer: "Screening",
          choice: "Ollama with llama3.2:3b behind a single-consumer queue",
          why: "The local model is one physical resource, so screening is serialised behind the parallel sweep rather than fighting it.",
        },
        {
          layer: "Dashboard",
          choice: "Next.js 16 App Router with Turbopack, React 19, Tailwind CSS v4",
          why: "Server components for the initial payload, route handlers for the scanner bridge.",
        },
        {
          layer: "Scout",
          choice: "Vercel AI SDK, Llama 3.3 70B via OpenRouter",
          why: "Streaming answers grounded strictly in the current scan's results.",
        },
        {
          layer: "Auth",
          choice: "scrypt hash, signed HTTP-only cookie, gated in proxy.ts",
          why: "Next 16's replacement for middleware.ts; anyone else who lands on the login page can request access by email through Resend.",
        },
        {
          layer: "Caching",
          choice: "Fingerprint of prompt version, model, and job fields",
          why: "Re-scans never re-pay for analysis that has already been done.",
        },
        {
          layer: "Tests",
          choice: "51 backend tests",
          why: "Covering boolean search, the date window, each ATS adapter, location screening, experience extraction, and incremental publishing.",
        },
      ],
      edge: [
        {
          title: "Freshness is the scan, not a filter",
          body:
            "\"Past 24 hours\" on a big board is a filter over a stale index, which is why reposts and ghost jobs sit at the top of it. Here the window is the scan — boards are read live and only postings first published inside 6 to 72 hours are kept.",
        },
        {
          title: "Location is screened, never taken on trust",
          body:
            "Every posting goes through a location screen, and the genuinely ambiguous ones go to a model that reads the description rather than the location field a recruiter typed.",
        },
        {
          title: "Eligibility is a field, not fine print",
          body:
            "Citizenship, clearance, green-card, and no-sponsorship clauses are extracted from the text and shown as a single red line on the card. On LinkedIn and Indeed this isn't a filter that exists — you find out at the end of the form.",
        },
        {
          title: "Coverage isn't limited to what got syndicated",
          body:
            "Aggregators only carry what companies chose to publish to them, and plenty don't. Going straight to 18,264 Greenhouse, Ashby, Lever, SmartRecruiters, Workable, and Workday boards removes that gap.",
        },
        {
          title: "Seniority noise is dropped before anything is read",
          body:
            "Senior, staff, principal, lead, manager, and director titles are excluded by a boolean title filter before the expensive steps run, and the years-of-experience line is extracted so the remainder can still be filtered.",
        },
      ],
      metrics: [
        { value: "18,264", label: "ATS boards in the live catalog" },
        { value: "42 min", label: "full Workday sweep, 12-hour window" },
        { value: "124 / 160", label: "postings clearing US and eligibility screening" },
        { value: "$0", label: "inference cost per scan, screening locally" },
      ],
      note:
        "Only the dashboard is deployed. The scanner is long-running and stateful and needs Ollama resident, which a 60-second serverless function cannot host — so the live link runs in snapshot mode over 491 real postings from an earlier scan, letting you use the entire interface without a Python process behind it.",
    },
  },
  {
    slug: "orin",
    index: "03",
    name: "Orin",
    kicker: "Supply chain intelligence",
    year: "2026",
    summary:
      "A product-intelligence workspace that brings fashion products, suppliers, materials, certifications, and document evidence into one traceable record.",
    outcome:
      "Combines traceability dashboards, evidence details, a document extraction lab, and public Digital Product Passport previews.",
    stack: ["Next.js", "TypeScript", "AI adapters", "Digital Product Passport"],
    visual: "supply",
    githubUrl: "https://github.com/rutiknarute/orin",
    liveUrl: "https://orin-five.vercel.app",
    caseStudy: {
      headline:
        "Digital Product Passport rules turn \"where did this come from\" into a question you have to answer with evidence.",
      problem: {
        lead:
          "A fashion brand already holds the answer somewhere — in a supplier spreadsheet, a certification PDF, a material spec, an inbox. What it doesn't have is one record where a claim and the document proving that claim sit next to each other, which is exactly what a passport requires.",
        points: [
          "Product data, supplier records, material composition, certifications, and the documents that prove them each live in a different system.",
          "Nobody can see which claim is missing its evidence until an auditor asks for it.",
          "The proof is almost always a PDF, so a person reads it and retypes the fields into another system.",
          "The same record has to satisfy a compliance reviewer and be readable by a shopper on a public passport page.",
        ],
      },
      approach: [
        {
          title: "Put the claim and its evidence in one record",
          body:
            "Product, supplier, material, certification, and document evidence are modelled as one traceable record rather than five linked systems. A missing certificate becomes visible in the record itself instead of something you infer by cross-referencing exports.",
        },
        {
          title: "Lead with what's missing",
          body:
            "The traceability dashboard is the first surface, and it answers \"where are the gaps\" before it answers \"what do we have\". Evidence detail pages sit behind it for the moment someone needs to see the underlying document.",
        },
        {
          title: "Give document extraction its own lab",
          body:
            "Certificates and specs go through a document extraction lab that pulls structured fields out of the PDF. The analyzer sits behind an interface in lib/ai/document-analyzer.ts, so the demo analyzer can be replaced with a Llama-backed provider without the UI knowing anything changed.",
        },
        {
          title: "Render the passport publicly from the same record",
          body:
            "The public Digital Product Passport preview is generated from the record the compliance team maintains, not a separate marketing copy of it, so the two cannot drift apart.",
        },
        {
          title: "Build seams instead of commitments",
          body:
            "The product repository, the document analyzer, and the auth boundary each sit behind their own interface. MongoDB, a production model provider, and real identity each drop into one named file rather than requiring a rebuild.",
        },
        {
          title: "Make the deploy survive its own database",
          body:
            "Supabase reads are row-level-security select-only and time-bounded. If the catalog read fails or exceeds its timeout, the app falls back to a local snapshot, so a database hiccup degrades the data rather than taking the site down.",
        },
      ],
      stack: [
        {
          layer: "Framework",
          choice: "Next.js App Router, TypeScript, Node 22.13+",
          why: "Server components for the record views, route handlers for the protected JSON APIs.",
        },
        {
          layer: "Data",
          choice: "Supabase Postgres with a local snapshot fallback",
          why: "Every table has RLS with select-only policies, so the publishable key is safe to commit and the deploy never hard-depends on the database being reachable.",
        },
        {
          layer: "Document AI",
          choice: "Replaceable analyzer interface with a demo adapter",
          why: "The extraction contract is fixed and the provider isn't, so a Llama implementation is a single-file addition.",
        },
        {
          layer: "Auth",
          choice: "HTTP-only session cookie, demo boundary in lib/auth.ts",
          why: "One clearly-marked seam to swap for production identity, rather than session logic scattered across routes.",
        },
        {
          layer: "Design system",
          choice: "Tokens in design-tokens.json and design-tokens.css",
          why: "Brand guidance and visual tokens are versioned with the code so the passport page and the workspace stay visually consistent.",
        },
        {
          layer: "Hosting",
          choice: "Vercel via next build, Cloudflare Workers via vinext",
          why: "One source builds for two targets; the Workers path emits dist/ and serves assets through worker/index.ts, which is why vercel.json overrides the package build command.",
        },
      ],
      edge: [
        {
          title: "Gaps are the default view",
          body:
            "Most compliance tooling shows you a catalog and lets you discover the hole during an audit. Here the absence of evidence is a first-class thing the dashboard reports.",
        },
        {
          title: "Extraction removes the retyping step",
          body:
            "The evidence arrives as a PDF and leaves as structured fields on the record, which is where the manual hours actually go in this workflow.",
        },
        {
          title: "One record, two audiences",
          body:
            "The compliance view and the public passport preview read from the same source, so a shopper-facing claim can't quietly diverge from the evidence behind it.",
        },
        {
          title: "Swappable by design, not by promise",
          body:
            "Persistence, document intelligence, and identity are each one named interface. The demo runs on deterministic in-memory data specifically so those seams stay honest.",
        },
      ],
      metrics: [
        { value: "2", label: "deploy targets from one source" },
        { value: "3", label: "swappable seams: data, AI, identity" },
        { value: "0", label: "hard database dependencies at request time" },
      ],
      note:
        "The live demo signs in with maya@orin.demo / orin-demo, and there is a sample passport at /passport/OR-24017.",
    },
  },
  {
    slug: "beone",
    index: "04",
    name: "BeOne",
    kicker: "Early-applicant job radar",
    year: "2026",
    summary:
      "Watches roughly 18,000 company job boards across six ATS platforms and returns only the roles first published inside the window you pick — two hours through seventy-two.",
    outcome:
      "Deterministic rules decide US location, OPT eligibility, and experience level, while Claude Haiku only paraphrases prose — so the verdict sits on the card before you click anything.",
    stack: ["Next.js 16", "Supabase", "Drizzle ORM", "Claude Haiku 4.5"],
    visual: "beone",
    githubUrl: "https://github.com/rutiknarute/BeOne-be-first-job-applicant",
    liveUrl: "https://beone-theta.vercel.app",
    caseStudy: {
      headline:
        "Deterministic code decides what is true. The language model only explains what prose means.",
      problem: {
        lead:
          "Most job boards are optimised for the employer's convenience, not yours. You search \"software engineer\", get four thousand results, and spend the evening opening tabs to find out which ones were never open to you in the first place.",
        points: [
          "Half of the results want eight years of experience the title never mentioned.",
          "A third of them are in Bengaluru, listed as though they weren't.",
          "A good number quietly say \"must be authorised to work without sponsorship now or in the future\" somewhere in paragraph nine.",
          "All of that reading happens after you click — when the click has already cost you the time it was meant to save.",
        ],
      },
      approach: [
        {
          title: "Talk to the ATS, not the aggregator",
          body:
            "Greenhouse, Ashby, Lever, Workday, SmartRecruiters, and Workable all expose public JSON endpoints for their customers' boards. BeOne reads those directly rather than LinkedIn or Indeed, so the data is first-party and there is nothing in the middle to get blocked by or go stale.",
        },
        {
          title: "Let rules decide the facts",
          body:
            "Whether a job is new, whether it is in the US, how many years it asks for, and whether it contains a sponsorship blocker are all decided by regex, dictionaries, and date comparisons. Code you can read, test, and argue with. It is free, it is instant, and it returns the same answer every time.",
        },
        {
          title: "Let the model only paraphrase",
          body:
            "Claude Haiku is called exactly once per job, and only to turn three fields — degree, qualifications, eligibility — into readable one-liners, because that genuinely is a language problem. The call is wrapped so a flaky response degrades the summary text rather than failing the scan, and the model can never decide a job is OPT-eligible when it isn't.",
        },
        {
          title: "Run two scan paths for two different constraints",
          body:
            "The browser scan is a state machine over a single scan_status row: each step claims the next fifty companies with a SELECT ... FOR UPDATE lock, which is what stops two open tabs from processing the same company twice. The daily cron scan has no browser to poll it, so it sweeps the whole roster in one invocation, guarded by CRON_SECRET and a lastRunDate check against double-delivered ticks.",
        },
        {
          title: "Cache on content, not on identity",
          body:
            "Every analysis is keyed to a fingerprint of title, description, location, team, and compensation. A job that reappears unchanged in tomorrow's scan costs zero API calls; a job whose description was edited gets a new fingerprint and is re-analysed.",
        },
        {
          title: "Treat opening the link as applying",
          body:
            "Apply Now records the application and becomes Already Applied with a tick, and an Undo appears for mis-clicks. There is no separate \"mark applied\" button, because it would set a flag the primary button already sets.",
        },
      ],
      stack: [
        {
          layer: "Framework",
          choice: "Next.js 16 App Router, TypeScript",
          why: "Server components for the initial payload, route handlers for the scan and analysis API.",
        },
        {
          layer: "Database",
          choice: "Supabase Postgres via Drizzle ORM",
          why: "Typed queries, real migrations, and a transaction pooler that survives serverless connection limits.",
        },
        {
          layer: "Analysis",
          choice: "Regex and dictionaries, plus Claude Haiku 4.5",
          why: "Rules own every verdict; the model owns only the prose. A ~70-term tech dictionary handles skills.",
        },
        {
          layer: "Styling",
          choice: "Tailwind CSS 4 with Framer Motion",
          why: "Theme lives in CSS custom properties; motion is restrained to button presses and expanding panels.",
        },
        {
          layer: "Logos",
          choice: "logo.dev with Brandfetch as fallback",
          why: "Proxied server-side so the keys never reach the browser.",
        },
        {
          layer: "Delivery",
          choice: "Vercel cron and Resend",
          why: "One scheduled scan a day, with an optional email digest once it finishes.",
        },
      ],
      edge: [
        {
          title: "The US filter is an allowlist, and that was a rewrite",
          body:
            "The first version was a blocklist of foreign cities, with anything unlisted treated as US. The flaw is structural rather than a missing entry — a blocklist has to enumerate every city on Earth — so Bengaluru, London, São Paulo, and Seoul HQ all sailed through. Now a location is US-based only if it positively says so, and anything else is excluded.",
        },
        {
          title: "The ordering of the checks is the actual work",
          body:
            "An explicit United States marker outranks everything, so \"United States (Remote) — India team\" correctly stays. Foreign-country markers are checked before state codes on purpose, so \"Hyderabad, IN, India\" never reads IN as Indiana. Real board formats like US-WA-Bellevue and VA - Reston, 11951 Freedom Dr all tokenise correctly.",
        },
        {
          title: "Ambiguity is dropped rather than guessed",
          body:
            "Athens and Cambridge are as likely to be Greece and England as Georgia and Massachusetts, so neither is on the bare-city list. Measured against a real 418-row database: 149 kept, 269 dropped, and no US location wrongly excluded.",
        },
        {
          title: "Screening happens at ingest, not at query time",
          body:
            "A foreign posting never costs a Claude call and never occupies a row, so the filter saves money and storage rather than just hiding results after the fact.",
        },
        {
          title: "Going stale is a real signal",
          body:
            "Every scan refreshes lastSeenAt for jobs still on the board, so a posting not re-seen in 48 hours carries a genuine \"may no longer be open\" note instead of sitting there indefinitely like a ghost job.",
        },
        {
          title: "Applied jobs survive retention",
          body:
            "Postings older than 72 hours are swept on scan completion, except the ones you marked applied — those are a record of something you actually did, so they stay.",
        },
      ],
      metrics: [
        { value: "18,267", label: "company boards in the seeded roster" },
        { value: "6", label: "ATS platforms scraped directly" },
        { value: "149 / 418", label: "rows kept by the allowlist, none wrongly excluded" },
        { value: "72 h", label: "retention window, applied roles exempt" },
      ],
    },
  },
];

export const experience = [
  {
    period: "Aug 2026 — Present",
    role: "Software Engineer (AI & Development)",
    company: "Zyter",
    location: "Los Angeles, CA",
    summary:
      "Orchestrated production AI agents and executable clinical workflows across UM, Care Management, and Prior Authorization in Zyter Symphony Studio.",
    bullets: [
      "Orchestrated 70+ production AI agents in Zyter Symphony Studio across UM, Care Management, and Prior Authorization, chaining agent outputs, mapping healthcare data, and automating multi-step clinical workflows.",
      "Implemented Python and Voice AI workflows that connected conversational agents, backend tools, APIs, and healthcare systems into executable end-to-end processes.",
      "Configured, tuned, tested, and debugged agents in Symphony Studio, including tool calls, model behavior, and multi-agent execution paths.",
      "Engineered across AWS, Kubernetes, GitLab CI/CD, Python services, APIs, and frontend layers, resolving integration, deployment, and runtime issues in the Symphony platform.",
    ],
    tags: ["AI agents", "Voice AI", "Healthcare workflows"],
  },
  {
    period: "Dec 2025 — Mar 2026",
    role: "AI Software Engineer Intern",
    company: "Latina Hustle · LA-Tech.org",
    location: "Los Angeles, CA",
    summary:
      "Built domain AI systems, analyzed Shopify journeys, led AI-native brand production, and shaped reusable frontend architecture for product and go-to-market teams.",
    tags: ["Applied AI", "Product UI", "LLM systems"],
  },
  {
    period: "Jun 2024 — Aug 2024",
    role: "Software Engineer Intern",
    company: "DoorPeServices",
    location: "Pune, India",
    summary:
      "Delivered full-stack features for a US client, improved root-cause analysis in legacy Node.js services, and helped reduce critical bug resolution time by 30%.",
    tags: ["Node.js", "Full stack", "Debugging"],
  },
  {
    period: "Jul 2023 — May 2024",
    role: "Programmer Analyst",
    company: "Cognizant",
    location: "Chennai, India",
    summary:
      "Built enterprise ETL pipelines, migrated workloads to Azure Data Factory, and designed Snowflake warehouse logic for late-arriving data and SCD dimensions.",
    tags: ["Python", "Snowflake", "Data engineering"],
  },
];

export const education = [
  {
    period: "2024 — 2026",
    degree: "MS, Computer Science",
    school: "California State University, Los Angeles",
  },
  {
    period: "2019 — 2023",
    degree: "BE, Information Technology",
    school: "Savitribai Phule Pune University · Honors in AI & ML",
  },
];

export const skillGroups = [
  {
    title: "Build",
    items: ["TypeScript", "JavaScript", "React", "React Native", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Systems",
    items: ["Node.js", "Express", "REST", "GraphQL", "MySQL", "MongoDB", "Snowflake", "dbt"],
  },
  {
    title: "Intelligence",
    items: ["Python", "PyTorch", "RAG", "CrewAI", "MCP", "LLM APIs", "Agent SDKs"],
  },
  {
    title: "Ship",
    items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "GitHub"],
  },
];
