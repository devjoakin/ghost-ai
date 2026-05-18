# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Prisma Schema And Data Layer

## Current Goal

- Add project data models, Prisma client singleton, and first migration

## Completed

- 01-design-system: shadcn/ui configured, 7 components installed, dark theme enforced
- 02-editor-chrome: EditorNavbar, ProjectSidebar, and dialog pattern ready
- 03-auth: Clerk wired into app with provider, auth pages, proxy.ts route protection, and user menu
- 04-project-dialogs: Editor home screen, create/rename/delete dialogs, sidebar project actions, mobile backdrop
- 05-prisma: Project and ProjectCollaborator models, Prisma client singleton, first migration generated and applied

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Dialog state managed via a dedicated hook (`useProjectDialogs`) and shared through a React context (`ProjectDialogProvider`) so both the sidebar and the editor home can trigger the same dialog instances without prop drilling.
- Mock project data lives in `components/editor/mock-projects.ts` with an explicit `role` field to drive action visibility (owner vs collaborator).
- Prisma schema split into multi-file setup: `prisma/schema.prisma` contains generator and datasource, `prisma/models/project.prisma` contains domain models.
- Prisma client singleton in `lib/prisma.ts` branches by `DATABASE_URL` prefix: uses Prisma Accelerate with `@prisma/extension-accelerate` for `prisma+postgres://` URLs, otherwise uses direct `@prisma/adapter-pg` with a `pg.Pool`.
- Client cached on `globalThis` in development to avoid hot-reload connection churn.

## Session Notes

- Editor chrome components created: `components/editor/editor-navbar.tsx` and `components/editor/project-sidebar.tsx`
- Dialog pattern ready: `components/ui/dialog.tsx` updated to use `rounded-3xl` per ui-context modal conventions
- Both components are client components with typed props interfaces, exported alongside their type exports
- Auth implementation: added `@clerk/nextjs` and `@clerk/ui`, created `proxy.ts` at project root, moved `EditorShell` into `app/(editor)/layout.tsx`, created `app/(auth)/` route group with two-panel sign-in/sign-up pages, added `ClerkProvider` to root layout with dark theme and CSS variable overrides, updated `/` to redirect based on auth state, and added `UserButton` to editor navbar
- `npm run build` passes
- Created `useProjectDialogs` hook managing dialog state, form state, loading state, and live slug preview
- Created `ProjectDialogs` component with Create, Rename, and Delete dialogs using existing shadcn/ui primitives
- Created `EditorHome` component with heading, description, and New Project button per spec
- Updated `ProjectSidebar` to render mock owned/shared projects with hover-revealed rename/delete actions for owned projects only
- Added mobile backdrop scrim (`bg-black/40`) to sidebar and wired outside click to close
- Wired sidebar New Project button and editor home New Project button to open the same Create dialog
- `npm run build` and `npm run lint` both pass after 04-project-dialogs implementation
- Created `prisma/models/project.prisma` with `ProjectStatus` enum, `Project` model (ownerId, name, description, status, canvasJsonPath, timestamps, indexes), and `ProjectCollaborator` model (project relation with cascade delete, email, unique constraint, indexes)
- Created `lib/prisma.ts` as cached singleton with adapter/Accelerate branching logic
- Installed `@prisma/extension-accelerate` for Accelerate support
- Ran `prisma migrate dev --name add-project-models` successfully; migration applied to PostgreSQL database
- Ran `prisma generate` successfully; client generated to `app/generated/prisma`
- `npm run build` and `npm run lint` both pass after 05-prisma implementation
