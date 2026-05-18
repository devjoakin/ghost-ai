"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { type ProjectListItem } from "@/lib/project-data"

type DialogType = "create" | "rename" | "delete" | null

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
}

function generateSuffix(): string {
  return Math.random().toString(36).substring(2, 6)
}

interface UseProjectActionsReturn {
  activeDialog: DialogType
  selectedProject: ProjectListItem | null
  projectName: string
  roomIdPreview: string
  isLoading: boolean
  openCreateDialog: () => void
  openRenameDialog: (project: ProjectListItem) => void
  openDeleteDialog: (project: ProjectListItem) => void
  closeDialog: () => void
  setProjectName: (name: string) => void
  handleSubmitCreate: () => Promise<void>
  handleSubmitRename: () => Promise<void>
  handleSubmitDelete: () => Promise<void>
}

function useProjectActions(): UseProjectActionsReturn {
  const router = useRouter()
  const pathname = usePathname()

  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<ProjectListItem | null>(null)
  const [projectName, setProjectNameState] = useState("")
  const [createSuffix, setCreateSuffix] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const roomIdPreview = useMemo(() => {
    const base = slugify(projectName)
    if (!base && !createSuffix) return ""
    return createSuffix ? `${base}-${createSuffix}` : base
  }, [projectName, createSuffix])

  const openCreateDialog = useCallback(() => {
    setSelectedProject(null)
    setProjectNameState("")
    setCreateSuffix(generateSuffix())
    setActiveDialog("create")
  }, [])

  const openRenameDialog = useCallback((project: ProjectListItem) => {
    setSelectedProject(project)
    setProjectNameState(project.name)
    setActiveDialog("rename")
  }, [])

  const openDeleteDialog = useCallback((project: ProjectListItem) => {
    setSelectedProject(project)
    setProjectNameState("")
    setActiveDialog("delete")
  }, [])

  const closeDialog = useCallback(() => {
    setActiveDialog(null)
    setSelectedProject(null)
    setProjectNameState("")
    setCreateSuffix("")
    setIsLoading(false)
  }, [])

  const setProjectName = useCallback((name: string) => {
    setProjectNameState(name)
  }, [])

  const handleSubmitCreate = useCallback(async () => {
    if (!projectName.trim() || !roomIdPreview) return
    setIsLoading(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: roomIdPreview, name: projectName.trim() }),
      })
      if (!res.ok) {
        throw new Error("Failed to create project")
      }
      const data = await res.json()
      const createdId = data.project?.id as string | undefined
      if (createdId) {
        router.push(`/editor/${createdId}`)
      }
      closeDialog()
    } finally {
      setIsLoading(false)
    }
  }, [projectName, roomIdPreview, router, closeDialog])

  const handleSubmitRename = useCallback(async () => {
    if (!projectName.trim() || !selectedProject) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName.trim() }),
      })
      if (!res.ok) {
        throw new Error("Failed to rename project")
      }
      closeDialog()
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }, [projectName, selectedProject, router, closeDialog])

  const handleSubmitDelete = useCallback(async () => {
    if (!selectedProject) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        throw new Error("Failed to delete project")
      }
      const isActiveWorkspace = pathname === `/editor/${selectedProject.id}`
      closeDialog()
      if (isActiveWorkspace) {
        router.push("/editor")
      } else {
        router.refresh()
      }
    } finally {
      setIsLoading(false)
    }
  }, [selectedProject, pathname, router, closeDialog])

  return {
    activeDialog,
    selectedProject,
    projectName,
    roomIdPreview,
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

export { useProjectActions, slugify }
export type { UseProjectActionsReturn }
