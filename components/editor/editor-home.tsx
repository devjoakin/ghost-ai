"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface EditorHomeProps {
  onNewProject: () => void
}

function EditorHome({ onNewProject }: EditorHomeProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-lg font-medium text-foreground">
        Create a project or open an existing one
      </h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Start a new architecture workspace, or choose a project from the sidebar.
      </p>
      <Button onClick={onNewProject}>
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </div>
  )
}

export { EditorHome }
export type { EditorHomeProps }
