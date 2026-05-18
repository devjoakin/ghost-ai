# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Wire Editor Home

## Current Goal

- Connect editor sidebar, dialogs, and home screen to real project API

## Completed

- 01-design-system: shadcn/ui configured, 7 components installed, dark theme enforced
- 02-editor-chrome: EditorNavbar, ProjectSidebar, and dialog pattern ready
- 03-auth: Clerk wired into app with provider, auth pages, proxy.ts route protection, and user menu
- 04-project-dialogs: Editor home screen, create/rename/delete dialogs, sidebar project actions, mobile backdrop
- 05-prisma: Project and ProjectCollaborator models, Prisma client singleton, first migration generated and applied
- 06-project-apis: Backend-only REST routes for list, create, rename, and delete with Clerk auth and owner enforcement
- 07-wire-editor-home: Editor home and sidebar wired to real project API; create/rename/delete mutations via `useProjectActions`; project ID and room ID aligned

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Dialog state managed via a dedicated hook (`useProjectActions`) in `hooks/` and shared through a React context (`ProjectDialogProvider`) so both the sidebar and the editor home can trigger the same dialog instances without prop drilling.
- Mock project data removed; `lib/project-data.ts` provides server-side `getProjectsForUser()` that returns owned and shared project lists using Clerk auth and Prisma queries.
- Prisma schema split into multi-file setup: `prisma/schema.prisma` contains generator and datasource, `prisma/models/project.prisma` contains domain models.
- Prisma client singleton in `lib/prisma.ts` branches by `DATABASE_URL` prefix: uses Prisma Accelerate with `@prisma/extension-accelerate` for `prisma+postgres://` URLs, otherwise uses direct `@prisma/adapter-pg` with a `pg.Pool`.
- Client cached on `globalThis` in development to avoid hot-reload connection churn.
- POST `/api/projects` accepts an optional `id` so the client can align the project ID with the Liveblocks room ID.

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
- Created `app/api/projects/route.ts` with `GET` (list current user projects ordered by `createdAt desc`) and `POST` (create project with default name `Untitled Project`, using Prisma transaction to set `canvasJsonPath` after ID generation)
- Created `app/api/projects/[projectId]/route.ts` with `PATCH` (rename project, validates non-empty name) and `DELETE` (delete project, relying on cascade for collaborators)
- All routes use `auth()` from `@clerk/nextjs/server` to obtain `userId`; unauthenticated requests return `401`
- Rename and delete routes enforce owner checks via `project.ownerId !== userId`, returning `403` for non-owners
- `npm run build` passes after 06-project-apis implementation
- Created `lib/project-data.ts` with `getProjectsForUser()` that queries owned projects and shared projects (via `ProjectCollaborator.email`) server-side using Clerk `auth()` and `currentUser()`
- Updated `app/(editor)/layout.tsx` to async server component that fetches real project lists and passes them to `EditorShell`
- Updated `EditorShell` and `ProjectSidebar` to accept `ownedProjects` and `sharedProjects` props; removed `mock-projects.ts` dependency
- Created `hooks/use-project-actions.ts` replacing the mock `useProjectDialogs`; manages dialog state, project name input, short unique suffix generation, room ID preview, and real API mutations
- Create: generates a short suffix, builds room ID from slugified name + suffix, calls `POST /api/projects` with `{ id, name }`, navigates to `/editor/${id}`
- Rename: prefills current name, calls `PATCH /api/projects/[id]`, refreshes on success
- Delete: calls `DELETE /api/projects/[id]`, redirects to `/editor` if deleting the active workspace, otherwise refreshes
- Updated `components/editor/project-dialog-context.tsx` to consume `useProjectActions` from `hooks/`
- Updated `components/editor/project-dialogs.tsx` to use `roomIdPreview` instead of `slugPreview` and show "Room ID" label in create dialog
- Updated `POST /api/projects` to accept optional `id` from client for room ID alignment
- Created minimal `app/(editor)/editor/[projectId]/page.tsx` workspace placeholder so create navigation does not 404
- `npm run build` and `npm run lint` both pass after 07-wire-editor-home implementation
