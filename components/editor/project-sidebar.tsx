"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Plus, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockProjects, type MockProject } from "@/components/editor/mock-projects"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  onCreateProject: () => void
  onRenameProject: (project: MockProject) => void
  onDeleteProject: (project: MockProject) => void
}

function ProjectSidebar({
  isOpen,
  onClose,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  const ownedProjects = mockProjects.filter((p) => p.role === "owner")
  const sharedProjects = mockProjects.filter((p) => p.role === "collaborator")

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={onClose}
          aria-hidden
        />
      )}
      {isOpen && (
        <aside
          id="project-sidebar"
          className={cn(
            "fixed top-0 left-0 z-40 flex h-full w-80 flex-col border-r border-border bg-card shadow-lg transition-transform duration-200 ease-out",
            "translate-x-0"
          )}
        >
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-4">
            <h2 className="text-sm font-medium text-foreground">Projects</h2>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Tabs defaultValue="my-projects" className="flex flex-1 flex-col overflow-hidden px-4">
            <TabsList className="mt-3 w-full">
              <TabsTrigger value="my-projects" className="flex-1">
                My Projects
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex-1">
                Shared
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1">
              <TabsContent value="my-projects" className="py-2">
                {ownedProjects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                    <p className="text-sm text-muted-foreground">No projects yet</p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {ownedProjects.map((project) => (
                      <ProjectRow
                        key={project.id}
                        project={project}
                        showActions
                        onRename={onRenameProject}
                        onDelete={onDeleteProject}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="shared" className="py-2">
                {sharedProjects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                    <p className="text-sm text-muted-foreground">No shared projects</p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {sharedProjects.map((project) => (
                      <ProjectRow
                        key={project.id}
                        project={project}
                        showActions={false}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>

          <div className="shrink-0 border-t border-border p-4">
            <Button variant="default" className="w-full" onClick={onCreateProject}>
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </aside>
      )}
    </>
  )
}

function ProjectRow({
  project,
  showActions,
  onRename,
  onDelete,
}: {
  project: MockProject
  showActions: boolean
  onRename?: (project: MockProject) => void
  onDelete?: (project: MockProject) => void
}) {
  return (
    <div className="group flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted/50">
      <span className="text-sm text-foreground">{project.name}</span>
      {showActions && (
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            className="inline-flex items-center justify-center rounded p-1 text-muted-foreground hover:text-foreground"
            aria-label={`Rename ${project.name}`}
            onClick={() => onRename?.(project)}
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            className="inline-flex items-center justify-center rounded p-1 text-muted-foreground hover:text-foreground"
            aria-label={`Delete ${project.name}`}
            onClick={() => onDelete?.(project)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

export { ProjectSidebar }
export type { ProjectSidebarProps }
