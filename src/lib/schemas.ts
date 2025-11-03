import { z } from "zod";

export const createStartupFieldValidators = {
  startupName: z.string().min(1, "Startup name is required"),
  startupLink: z.url("Invalid URL format"),
  founderName: z.string().min(1, "Founder name is required"),
  founderXUsername: z.string().min(1, "Founder X username is required"),
  tags: z.string(),
};

export const createStartupClientSchema = z.object({
  startupName: createStartupFieldValidators.startupName,
  startupLink: createStartupFieldValidators.startupLink,
  founderName: createStartupFieldValidators.founderName,
  founderXUsername: createStartupFieldValidators.founderXUsername,
  tags: createStartupFieldValidators.tags,
});

export const getStartupsInputSchema = z.object({
  limit: z.number().int().positive(),
  offset: z.number().int().nonnegative(),
  userId: z.string().optional(),
});

export const createStartupInputSchema = z.object({
  startupName: z.string().min(1, "Startup name is required"),
  startupLink: z.string().url("Invalid URL format"),
  founderName: z.string().min(1, "Founder name is required"),
  founderXUsername: z.string().min(1, "Founder X username is required"),
  tags: z.string().optional().transform((val) => {
    if (!val) return [];
    return val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }),
});

export const updateStartupInputSchema = z.object({
  id: z.string().min(1, "Startup ID is required"),
  startupName: z.string().min(1, "Startup name is required"),
  startupLink: z.url("Invalid URL format"),
  founderName: z.string().min(1, "Founder name is required"),
  founderXUsername: z.string().min(1, "Founder X username is required"),
  tags: z.string().optional().transform((val) => {
    if (!val) return [];
    return val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }),
});

export const deleteStartupInputSchema = z.object({
  id: z.string().min(1, "Startup ID is required"),
});