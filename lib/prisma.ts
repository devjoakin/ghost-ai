import pg from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { withAccelerate } from "@prisma/extension-accelerate"
import { PrismaClient } from "@/app/generated/prisma/client"

const DATABASE_URL = process.env.DATABASE_URL

function createPrismaClient(): PrismaClient {
  if (DATABASE_URL?.startsWith("prisma+postgres://")) {
    return new PrismaClient({
      accelerateUrl: DATABASE_URL,
    }).$extends(withAccelerate()) as unknown as PrismaClient
  }

  const pool = new pg.Pool({ connectionString: DATABASE_URL })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
