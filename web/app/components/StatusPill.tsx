export function StatusPill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "available" | "progress" | "planned";
}) {
  return <span className={`status-pill status-${tone}`}>{children}</span>;
}
