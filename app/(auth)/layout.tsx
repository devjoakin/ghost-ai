const features = [
  "AI Architecture Generation — Describe your system, AI maps it to nodes and edges on a live canvas.",
  "Real-time Collaboration — Live cursors, presence indicators, and shared node editing across your team.",
  "Instant Spec Generation — Export a complete Markdown technical spec directly from the canvas graph.",
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden md:flex w-full md:w-1/2 flex-col bg-[var(--bg-surface)] px-12 py-10">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-[var(--accent-primary)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            Ghost AI
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md">
          <h1 className="text-3xl font-semibold text-[var(--text-primary)] tracking-tight leading-tight">
            Design systems at the speed of thought.
          </h1>
          <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
            Describe your architecture in plain English. Ghost AI maps it to a
            shared canvas your whole team can refine in real time.
          </p>

          <ul className="mt-10 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="text-sm text-[var(--text-muted)] leading-relaxed">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full md:w-1/2 flex-col items-center justify-center bg-[var(--bg-base)] px-4 py-12">
        {children}
      </div>
    </div>
  );
}
