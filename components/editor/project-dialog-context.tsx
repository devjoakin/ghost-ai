"use client"

import * as React from "react"
import {
  useProjectActions,
  type UseProjectActionsReturn,
} from "@/hooks/use-project-actions"
import { ProjectDialogs } from "@/components/editor/project-dialogs"

const ProjectDialogContext = React.createContext<UseProjectActionsReturn | null>(
  null
)

function ProjectDialogProvider({ children }: { children: React.ReactNode }) {
  const dialogs = useProjectActions()

  return (
    <ProjectDialogContext.Provider value={dialogs}>
      {children}
      <ProjectDialogs
        activeDialog={dialogs.activeDialog}
        selectedProject={dialogs.selectedProject}
        projectName={dialogs.projectName}
        roomIdPreview={dialogs.roomIdPreview}
        isLoading={dialogs.isLoading}
        closeDialog={dialogs.closeDialog}
        onProjectNameChange={dialogs.setProjectName}
        handleSubmitCreate={dialogs.handleSubmitCreate}
        handleSubmitRename={dialogs.handleSubmitRename}
        handleSubmitDelete={dialogs.handleSubmitDelete}
      />
    </ProjectDialogContext.Provider>
  )
}

function useProjectDialogContext(): UseProjectActionsReturn {
  const context = React.useContext(ProjectDialogContext)
  if (!context) {
    throw new Error(
      "useProjectDialogContext must be used within a ProjectDialogProvider"
    )
  }
  return context
}

export { ProjectDialogProvider, useProjectDialogContext }
