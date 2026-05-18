import { EditorShell } from "@/components/editor/editor-shell"
import { getProjectsForUser } from "@/lib/project-data"

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { ownedProjects, sharedProjects } = await getProjectsForUser()

  return (
    <EditorShell ownedProjects={ownedProjects} sharedProjects={sharedProjects}>
      {children}
    </EditorShell>
  )
}
