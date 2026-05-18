import { Brain, Users, FileText } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Architecture Generation",
    description:
      "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description:
      "Export a complete Markdown technical spec directly from the canvas graph.",
  },
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

          <div className="mt-10 space-y-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-primary-dim)] text-[var(--accent-primary)]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full md:w-1/2 flex-col items-center justify-center bg-[var(--bg-base)] px-4 py-12">
        {children}
      </div>
    </div>
  );
}
