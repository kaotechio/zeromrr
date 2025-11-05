import { and, desc, eq, sql, asc } from "drizzle-orm";
import { db } from "../index";
import { startup, startupLike } from "../schema";
import { getStartupsInputSchema } from "@/lib/schemas";
import z from "zod";

export async function getStartups({ limit, offset, filterByUserId, shuffleSeed, sortByLikes, userId }: z.infer<typeof getStartupsInputSchema> & { userId?: string }) {
  let baseQuery = db
    .select({
      id: startup.id,
      startupName: startup.startupName,
      startupLink: startup.startupLink,
      founderXUsername: startup.founderXUsername,
      founderName: startup.founderName,
      tags: startup.tags,
      userId: startup.userId,
      createdAt: startup.createdAt,
      updatedAt: startup.updatedAt,
      likesCount: sql<number>`COUNT(DISTINCT ${startupLike.userId})`,
      userLiked: userId
        ? sql<boolean>`CASE WHEN COUNT(CASE WHEN ${startupLike.userId} = ${userId} THEN 1 END) > 0 THEN true ELSE false END`
        : sql<boolean>`false`,
    })
    .from(startup)
    .leftJoin(startupLike, eq(startup.id, startupLike.startupId))
    .groupBy(startup.id);
  
  const query = filterByUserId 
    ? baseQuery.where(eq(startup.userId, filterByUserId))
    : baseQuery;
  
  let orderedQuery;
  if (sortByLikes === "asc") {
    orderedQuery = query.orderBy(asc(sql`COUNT(DISTINCT ${startupLike.userId})`));
  } else if (sortByLikes === "desc") {
    orderedQuery = query.orderBy(desc(sql`COUNT(DISTINCT ${startupLike.userId})`));
  } else {
    orderedQuery = query.orderBy(sql`md5(${startup.id} || ${shuffleSeed})`);
  }
  
  const rows = await orderedQuery
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

export async function toggleStartupLike(startupId: string, userId: string) {
  const existingLike = await db
    .select()
    .from(startupLike)
    .where(and(eq(startupLike.startupId, startupId), eq(startupLike.userId, userId)))
    .limit(1);

  if (existingLike.length > 0) {
    await db
      .delete(startupLike)
      .where(and(eq(startupLike.startupId, startupId), eq(startupLike.userId, userId)));
    return { liked: false };
  } else {
    await db.insert(startupLike).values({
      startupId,
      userId,
    });
    return { liked: true };
  }
}

