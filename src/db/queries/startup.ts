import { desc, eq } from "drizzle-orm";
import { db } from "../index";
import { startup } from "../schema";

export type GetStartupsParams = {
  limit: number;
  offset: number;
};

export async function getStartups({ limit, offset }: GetStartupsParams) {
  const rows = await db
    .select()
    .from(startup)
    .orderBy(desc(startup.createdAt), desc(startup.id))
    .limit(limit + 1)
    .offset(offset);

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;

  return {
    items,
    nextOffset: offset + items.length,
    hasMore,
  } as const;
}

export async function getStartupsByUserId(userId: string) {
  const rows = await db
    .select()
    .from(startup)
    .where(eq(startup.userId, userId))
    .orderBy(desc(startup.createdAt), desc(startup.id));

  return rows;
}

export async function createStartup(params: typeof startup.$inferInsert) {
  const [row] = await db
    .insert(startup)
    .values({
      id: params.id,
      userId: params.userId,
      startupName: params.startupName,
      startupLink: params.startupLink,
      founderName: params.founderName,
      founderXUsername: params.founderXUsername,
      tags: params.tags,
    })
    .returning();

  return row;
}

