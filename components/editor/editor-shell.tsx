"use client"

import { useState } from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { ProjectDialogProvider, useProjectDialogContext } from "@/components/editor/project-dialog-context"

function EditorShell({ children }: { children: React.ReactNode }) {
  return (
    <ProjectDialogProvider>
      <EditorShellInner>{children}</EditorShellInner>
    </ProjectDialogProvider>
  )
}

function EditorShellInner({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
  } = useProjectDialogContext()

  return (
    <div className="flex h-full flex-col">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((prev) => !prev)}
      />
      <div className="relative flex-1 overflow-hidden">
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onCreateProject={openCreateDialog}
          onRenameProject={openRenameDialog}
          onDeleteProject={openDeleteDialog}
        />
        <main className="h-full">{children}</main>
      </div>
    </div>
  )
}

export { EditorShell }
