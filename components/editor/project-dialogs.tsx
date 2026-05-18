"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type UseProjectActionsReturn } from "@/hooks/use-project-actions"

interface ProjectDialogsProps
  extends Omit<
    UseProjectActionsReturn,
    | "openCreateDialog"
    | "openRenameDialog"
    | "openDeleteDialog"
    | "setProjectName"
  > {
  onProjectNameChange: (name: string) => void
}

function ProjectDialogs({
  activeDialog,
  selectedProject,
  projectName,
  roomIdPreview,
  isLoading,
  closeDialog,
  onProjectNameChange,
  handleSubmitCreate,
  handleSubmitRename,
  handleSubmitDelete,
}: ProjectDialogsProps) {
  const isCreateOpen = activeDialog === "create"
  const isRenameOpen = activeDialog === "rename"
  const isDeleteOpen = activeDialog === "delete"

  return (
    <>
      <CreateProjectDialog
        open={isCreateOpen}
        onClose={closeDialog}
        projectName={projectName}
        roomIdPreview={roomIdPreview}
        isLoading={isLoading}
        onProjectNameChange={onProjectNameChange}
        onSubmit={handleSubmitCreate}
      />
      <RenameProjectDialog
        open={isRenameOpen}
        onClose={closeDialog}
        project={selectedProject}
        projectName={projectName}
        isLoading={isLoading}
        onProjectNameChange={onProjectNameChange}
        onSubmit={handleSubmitRename}
      />
      <DeleteProjectDialog
        open={isDeleteOpen}
        onClose={closeDialog}
        project={selectedProject}
        isLoading={isLoading}
        onSubmit={handleSubmitDelete}
      />
    </>
  )
}

function CreateProjectDialog({
  open,
  onClose,
  projectName,
  roomIdPreview,
  isLoading,
  onProjectNameChange,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  projectName: string
  roomIdPreview: string
  isLoading: boolean
  onProjectNameChange: (name: string) => void
  onSubmit: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="create-project-name" className="text-sm font-medium">
              Project name
            </label>
            <Input
              id="create-project-name"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              placeholder="My new project"
              disabled={isLoading}
              autoFocus={open}
            />
            {roomIdPreview && (
              <p className="text-xs text-muted-foreground">
                Room ID: <span className="font-mono">{roomIdPreview}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !projectName.trim()}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function RenameProjectDialog({
  open,
  onClose,
  project,
  projectName,
  isLoading,
  onProjectNameChange,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  project: { name: string } | null
  projectName: string
  isLoading: boolean
  onProjectNameChange: (name: string) => void
  onSubmit: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Current name: {project?.name}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          className="flex flex-col gap-3"
        >
          <Input
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            placeholder="Project name"
            disabled={isLoading}
            autoFocus={open}
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !projectName.trim()}>
              {isLoading ? "Saving..." : "Rename"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteProjectDialog({
  open,
  onClose,
  project,
  isLoading,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  project: { name: string } | null
  isLoading: boolean
  onSubmit: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{project?.name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ProjectDialogs }
