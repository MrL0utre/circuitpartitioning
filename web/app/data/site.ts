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
    title: "Circuit partitioning foundations",
    description: "Models, objectives, feasibility, cut, timing, and placement.",
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
    title: "Learning path",
    description:
      "The planned progression from prerequisites to reproducible analysis.",
    href: "/learn",
    section: "Learn",
    terms: ["tutorial", "lesson", "curriculum", "education"],
  },
  {
    title: "Research map",
    description: "Model families, algorithm families, and evidence policy.",
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
    title: "Benchmark design",
    description: "Comparable runs, metrics, provenance, and CSV ingestion.",
    href: "/benchmarks",
    section: "Benchmarks",
    terms: ["results", "algorithm", "pareto", "runtime", "quality", "csv"],
  },
  {
    title: "Circuit catalog foundation",
    description:
      "Circuit contracts, analysis dimensions, and publication states.",
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
    title: "Project principles",
    description:
      "Neutrality, reproducibility, provenance, accessibility, and contribution.",
    href: "/about",
    section: "About",
    terms: ["charter", "governance", "contribute", "community", "license"],
  },
];
