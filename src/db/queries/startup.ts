import { and, desc, eq } from "drizzle-orm";
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
    items: [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items],
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

export async function updateStartup(params: typeof startup.$inferInsert) {
  const rows = await db
    .update(startup)
    .set({
      startupName: params.startupName,
      startupLink: params.startupLink,
      founderName: params.founderName,
      founderXUsername: params.founderXUsername,
      tags: params.tags,
    })
    .where(and(eq(startup.id, params.id), eq(startup.userId, params.userId)))
    .returning();

  return rows.length > 0 ? rows[0] : null;
}

export async function deleteStartup(startupId: string, userId: string) {
  const rows = await db
    .delete(startup)
    .where(and(eq(startup.id, startupId), eq(startup.userId, userId)))
    .returning();

  return rows.length > 0 ? rows[0] : null;
}

