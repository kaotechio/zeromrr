"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { createStartupInputSchema, getStartupsInputSchema, updateStartupInputSchema, deleteStartupInputSchema } from "@/lib/schemas";
import { getStartups } from "../db/queries/startup";
import { createStartup, updateStartup, deleteStartup } from "../db/queries/startup";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export const getStartupsAction = actionClient
  .inputSchema(getStartupsInputSchema)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof getStartupsInputSchema> }) => {
    return await getStartups(parsedInput);
  });

export const createStartupAction = actionClient
  .inputSchema(createStartupInputSchema)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof createStartupInputSchema> }) => {
    const hdrs = await headers();
    const session = await auth.api.getSession({ headers: hdrs });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    try {
      await createStartup({
        id: randomUUID(),
        userId: session.user.id,
        startupName: parsedInput.startupName,
        startupLink: parsedInput.startupLink,
        founderName: parsedInput.founderName,
        founderXUsername: parsedInput.founderXUsername.replace("@", ""),
        tags: parsedInput.tags,
      });
      revalidatePath("/profile");
      return { success: true };
    } catch (e) {
      throw new Error("Failed to create startup.");
    }
  });

export const updateStartupAction = actionClient
  .inputSchema(updateStartupInputSchema)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof updateStartupInputSchema> }) => {
    const hdrs = await headers();
    const session = await auth.api.getSession({ headers: hdrs });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    try {
      const result = await updateStartup({
        id: parsedInput.id,
        userId: session.user.id,
        startupName: parsedInput.startupName,
        startupLink: parsedInput.startupLink,
        founderName: parsedInput.founderName,
        founderXUsername: parsedInput.founderXUsername.replace("@", ""),
        tags: parsedInput.tags,
      });
      revalidatePath("/profile");
      return { success: result !== null };
    } catch (e) {
      throw new Error("Failed to update startup.");
    }
  });

export const deleteStartupAction = actionClient
  .inputSchema(deleteStartupInputSchema)
  .action(async ({ parsedInput }: { parsedInput: z.infer<typeof deleteStartupInputSchema> }) => {
    const hdrs = await headers();
    const session = await auth.api.getSession({ headers: hdrs });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    try {
      const result = await deleteStartup(parsedInput.id, session.user.id);
      revalidatePath("/profile");
      return { success: result !== null };
    } catch (e) {
      throw new Error("Failed to delete startup.");
    }
  });
