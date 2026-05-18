export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-lg font-medium text-foreground">Project Workspace</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Project ID: <span className="font-mono">{projectId}</span>
      </p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Canvas and collaboration features will be wired here in the next phase.
      </p>
    </div>
  )
}
