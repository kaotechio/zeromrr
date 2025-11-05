import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "../index";
import { startup } from "../schema";
import { getStartupsInputSchema } from "@/lib/schemas";
import z from "zod";

export async function getStartups({ limit, offset, userId, shuffleSeed }: z.infer<typeof getStartupsInputSchema>) {
  const baseQuery = db.select().from(startup);
  
  const query = userId 
    ? baseQuery.where(eq(startup.userId, userId))
    : baseQuery;
  
  const rows = await query
    .orderBy(sql`md5(${startup.id} || ${shuffleSeed})`)
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

