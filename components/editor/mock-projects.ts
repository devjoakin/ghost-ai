export interface MockProject {
  id: string
  name: string
  slug: string
  role: "owner" | "collaborator"
}

export const mockProjects: MockProject[] = [
  { id: "proj-1", name: "Ghost AI Core", slug: "ghost-ai-core", role: "owner" },
  { id: "proj-2", name: "Design System", slug: "design-system", role: "owner" },
  { id: "proj-3", name: "My Project", slug: "my-project", role: "owner" },
]
