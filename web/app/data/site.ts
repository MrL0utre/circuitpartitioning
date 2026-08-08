export const primaryNavigation = [
  { label: "Learn", href: "/learn" },
  { label: "Research", href: "/research" },
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "Circuits", href: "/circuits" },
  { label: "About", href: "/about" },
];

export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  section: string;
  terms: string[];
};

export const searchEntries: SearchEntry[] = [
  {
    title: "Definitions and objectives for circuit partitioning",
    description:
      "Partitioning instances, model profiles, feasibility, cut, communication, and timing objectives.",
    href: "/learn/foundations",
    section: "Learn",
    terms: [
      "course",
      "graph",
      "hypergraph",
      "netlist",
      "objective",
      "feasibility",
    ],
  },
  {
    title: "Course structure",
    description:
      "The progression from mathematical definitions to experimental methodology.",
    href: "/learn",
    section: "Learn",
    terms: ["tutorial", "lesson", "curriculum", "education"],
  },
  {
    title: "Research classification",
    description:
      "Representations, problem formulations, objectives, methods, and review methodology.",
    href: "/research",
    section: "Research",
    terms: [
      "state of the art",
      "sota",
      "literature",
      "survey",
      "fm",
      "multilevel",
    ],
  },
  {
    title: "Benchmark protocol",
    description:
      "Comparability conditions, reported metrics, provenance, and CSV ingestion.",
    href: "/benchmarks",
    section: "Benchmarks",
    terms: ["results", "algorithm", "pareto", "runtime", "quality", "csv"],
  },
  {
    title: "Circuit data and analyses",
    description:
      "Circuit representations, reference artifacts, derived analyses, and publication procedure.",
    href: "/circuits",
    section: "Circuits",
    terms: [
      "dataset",
      "netlist",
      "download",
      "critical path",
      "connectivity",
      "red vertex",
      "black vertex",
    ],
  },
  {
    title: "Project scope and governance",
    description:
      "Editorial method, traceability, accessibility, maintenance, and contribution procedure.",
    href: "/about",
    section: "About",
    terms: ["charter", "governance", "contribute", "community", "license"],
  },
];
