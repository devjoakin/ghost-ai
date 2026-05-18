"use client"

import { useState } from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { ProjectDialogProvider, useProjectDialogContext } from "@/components/editor/project-dialog-context"
import { type ProjectListItem } from "@/lib/project-data"

function EditorShell({
  children,
  ownedProjects,
  sharedProjects,
}: {
  children: React.ReactNode
  ownedProjects: ProjectListItem[]
  sharedProjects: ProjectListItem[]
}) {
  return (
    <ProjectDialogProvider>
      <EditorShellInner ownedProjects={ownedProjects} sharedProjects={sharedProjects}>
        {children}
      </EditorShellInner>
    </ProjectDialogProvider>
  )
}

function EditorShellInner({
  children,
  ownedProjects,
  sharedProjects,
}: {
  children: React.ReactNode
  ownedProjects: ProjectListItem[]
  sharedProjects: ProjectListItem[]
}) {
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
          ownedProjects={ownedProjects}
          sharedProjects={sharedProjects}
        />
        <main className="h-full">{children}</main>
      </div>
    </div>
  )
}

export { EditorShell }
