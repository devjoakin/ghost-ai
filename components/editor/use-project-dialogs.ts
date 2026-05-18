"use client"

import { useCallback, useMemo, useState } from "react"
import { type MockProject } from "@/components/editor/mock-projects"

type DialogType = "create" | "rename" | "delete" | null

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
}

interface UseProjectDialogsReturn {
  activeDialog: DialogType
  selectedProject: MockProject | null
  projectName: string
  slugPreview: string
  isLoading: boolean
  openCreateDialog: () => void
  openRenameDialog: (project: MockProject) => void
  openDeleteDialog: (project: MockProject) => void
  closeDialog: () => void
  setProjectName: (name: string) => void
  handleSubmitCreate: () => void
  handleSubmitRename: () => void
  handleSubmitDelete: () => void
}

function useProjectDialogs(): UseProjectDialogsReturn {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null)
  const [projectName, setProjectNameState] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const slugPreview = useMemo(() => slugify(projectName), [projectName])

  const openCreateDialog = useCallback(() => {
    setSelectedProject(null)
    setProjectNameState("")
    setActiveDialog("create")
  }, [])

  const openRenameDialog = useCallback((project: MockProject) => {
    setSelectedProject(project)
    setProjectNameState(project.name)
    setActiveDialog("rename")
  }, [])

  const openDeleteDialog = useCallback((project: MockProject) => {
    setSelectedProject(project)
    setProjectNameState("")
    setActiveDialog("delete")
  }, [])

  const closeDialog = useCallback(() => {
    setActiveDialog(null)
    setSelectedProject(null)
    setProjectNameState("")
    setIsLoading(false)
  }, [])

  const setProjectName = useCallback((name: string) => {
    setProjectNameState(name)
  }, [])

  const handleSubmitCreate = useCallback(() => {
    if (!projectName.trim()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      closeDialog()
    }, 600)
  }, [projectName, closeDialog])

  const handleSubmitRename = useCallback(() => {
    if (!projectName.trim() || !selectedProject) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      closeDialog()
    }, 600)
  }, [projectName, selectedProject, closeDialog])

  const handleSubmitDelete = useCallback(() => {
    if (!selectedProject) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      closeDialog()
    }, 600)
  }, [selectedProject, closeDialog])

  return {
    activeDialog,
    selectedProject,
    projectName,
    slugPreview,
    isLoading,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    setProjectName,
    handleSubmitCreate,
    handleSubmitRename,
    handleSubmitDelete,
  }
}

export { useProjectDialogs, slugify }
export type { UseProjectDialogsReturn }
