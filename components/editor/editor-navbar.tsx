"use client"

import { Button } from "@/components/ui/button"
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onSidebarToggle: () => void
}

function EditorNavbar({ isSidebarOpen, onSidebarToggle }: EditorNavbarProps) {
  return (
    <header className="flex h-12 shrink-0 items-center border-b border-border bg-background px-3">
      <div className="flex flex-1 items-center">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onSidebarToggle}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-center" />
      <div className="flex flex-1 items-center justify-end" />
    </header>
  )
}

export { EditorNavbar }
export type { EditorNavbarProps }
