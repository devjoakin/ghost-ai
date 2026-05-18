import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  })

  return Response.json({ projects })
}

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { id?: string; name?: string } = {}
  try {
    body = await request.json()
  } catch {
    // ignore invalid body
  }

  const name =
    typeof body.name === "string" && body.name.trim().length > 0
      ? body.name.trim()
      : "Untitled Project"

  const customId =
    typeof body.id === "string" && body.id.trim().length > 0
      ? body.id.trim()
      : undefined

  const project = await prisma.$transaction(async (tx) => {
    const p = await tx.project.create({
      data: {
        id: customId,
        ownerId: userId,
        name,
        canvasJsonPath: "",
      },
    })

    const canvasJsonPath = `canvas/${p.id}.json`

    await tx.project.update({
      where: { id: p.id },
      data: { canvasJsonPath },
    })

    return { ...p, canvasJsonPath }
  })

  return Response.json({ project }, { status: 201 })
}
