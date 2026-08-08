import { StatusPill } from "./StatusPill";

export function PageHeader({
  eyebrow,
  title,
  intro,
  status,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  status?: { label: string; tone: "available" | "progress" | "planned" };
}) {
  return (
    <header className="page-header shell">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
      </div>
      <div className="page-header-intro">
        {status ? (
          <StatusPill tone={status.tone}>{status.label}</StatusPill>
        ) : null}
        <p>{intro}</p>
      </div>
    </header>
  );
}
