import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export interface ProjectListItem {
  id: string
  name: string
  role: "owner" | "collaborator"
}

export async function getProjectsForUser(): Promise<{
  ownedProjects: ProjectListItem[]
  sharedProjects: ProjectListItem[]
}> {
  const { userId } = await auth()

  if (!userId) {
    return { ownedProjects: [], sharedProjects: [] }
  }

  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress ?? undefined

  const ownedProjects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  })

  let sharedProjects: { id: string; name: string }[] = []

  if (email) {
    sharedProjects = await prisma.project.findMany({
      where: {
        collaborators: {
          some: { email },
        },
        ownerId: { not: userId },
      },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
    })
  }

  return {
    ownedProjects: ownedProjects.map((p) => ({ ...p, role: "owner" as const })),
    sharedProjects: sharedProjects.map((p) => ({
      ...p,
      role: "collaborator" as const,
    })),
  }
}
