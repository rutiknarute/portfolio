export type ProjectVisual = "cook" | "atsift" | "supply";

export type Project = {
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
  },
  {
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
  },
  {
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
  },
];

export const experience = [
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
