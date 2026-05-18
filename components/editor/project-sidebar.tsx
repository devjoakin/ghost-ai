"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
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

        <Tabs defaultValue="my-projects" className="flex flex-1 flex-col overflow-hidden">
          <TabsList variant="line" className="mx-4 mt-2">
            <TabsTrigger value="my-projects" className="flex-1">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">
              Shared
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="my-projects" className="px-4 py-6">
              <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No projects yet
                </p>
              </div>
            </TabsContent>
            <TabsContent value="shared" className="px-4 py-6">
              <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No shared projects
                </p>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="shrink-0 border-t border-border p-4">
          <Button variant="default" className="w-full">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
      )}
    </>
  )
}

export { ProjectSidebar }
export type { ProjectSidebarProps }
