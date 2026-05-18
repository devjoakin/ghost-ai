import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await params

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 })
  }

  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  let body: { name?: string } = {}
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 })
  }

  const name = typeof body.name === "string" ? body.name.trim() : ""
  if (name.length === 0) {
    return Response.json({ error: "Invalid request" }, { status: 400 })
  }

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: { name },
  })

  return Response.json({ project: updatedProject })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await params

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  })

  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 })
  }

  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  await prisma.project.delete({
    where: { id: projectId },
  })

  return Response.json({ success: true })
}
