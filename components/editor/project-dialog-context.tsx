"use client"

import * as React from "react"
import {
  useProjectDialogs,
  type UseProjectDialogsReturn,
} from "@/components/editor/use-project-dialogs"
import { ProjectDialogs } from "@/components/editor/project-dialogs"

const ProjectDialogContext = React.createContext<UseProjectDialogsReturn | null>(
  null
)

function ProjectDialogProvider({ children }: { children: React.ReactNode }) {
  const dialogs = useProjectDialogs()

  return (
    <ProjectDialogContext.Provider value={dialogs}>
      {children}
      <ProjectDialogs
        activeDialog={dialogs.activeDialog}
        selectedProject={dialogs.selectedProject}
        projectName={dialogs.projectName}
        slugPreview={dialogs.slugPreview}
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

function useProjectDialogContext(): UseProjectDialogsReturn {
  const context = React.useContext(ProjectDialogContext)
  if (!context) {
    throw new Error(
      "useProjectDialogContext must be used within a ProjectDialogProvider"
    )
  }
  return context
}

export { ProjectDialogProvider, useProjectDialogContext }
