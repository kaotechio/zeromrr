import { z } from "zod";

function hasValidTld(hostname: string): boolean {
  const hn = hostname.toLowerCase();
  const parts = hn.split(".");
  if (parts.length < 2) return false;
  const tld = parts[parts.length - 1];
  return /^[a-z]{2,24}$/.test(tld);
}

export const createStartupFieldValidators = {
  startupName: z.string().min(1, "Startup name is required"),
  startupLink: z
    .string()
    .min(1, "Startup link is required")
    .refine((val) => {
      const trimmed = val.trim();
      const withoutProtocol = trimmed.replace(/^https?:\/\//i, "");
      const candidate = `https://${withoutProtocol}`;
      try {
        const u = new URL(candidate);
        return u.protocol === "https:" && hasValidTld(u.hostname);
      } catch {
        return false;
      }
    }, "Must be a valid https:// URL (e.g. example.com)")
    .refine((val) => !/^\s*https?:\/\//i.test(val), "Do not include the protocol, it's added automatically"),
  founderName: z.string().min(1, "Founder name is required"),
  founderXUsername: z.string(),
  tags: z.string(),
};

export const createStartupClientSchema = z.object({
  startupName: createStartupFieldValidators.startupName,
  startupLink: z
    .string()
    .min(1, "Startup link is required")
    .transform((val) => {
      const trimmed = val.trim();
      const withoutProtocol = trimmed.replace(/^https?:\/\//i, "");
      return `https://${withoutProtocol}`;
    })
    .refine((v) => {
      try {
        const u = new URL(v);
        return u.protocol === "https:" && hasValidTld(u.hostname);
      } catch {
        return false;
      }
    }, "Must be a valid https:// URL"),
  founderName: createStartupFieldValidators.founderName,
  founderXUsername: createStartupFieldValidators.founderXUsername,
  tags: createStartupFieldValidators.tags,
});

export const getStartupsInputSchema = z.object({
  limit: z.number().int().positive(),
  offset: z.number().int().nonnegative(),
  filterByUserId: z.string().optional(),
  shuffleSeed: z.string(),
});

export const createStartupInputSchema = z.object({
  startupName: z.string().min(1, "Startup name is required"),
  startupLink: z
    .string()
    .transform((val) => {
      const trimmed = val.trim();
      const withoutProtocol = trimmed.replace(/^https?:\/\//i, "");
      return `https://${withoutProtocol}`;
    })
    .refine((v) => {
      try {
        const u = new URL(v);
        return u.protocol === "https:" && hasValidTld(u.hostname);
      } catch {
        return false;
      }
    }, "Only https:// URLs are allowed"),
  founderName: z.string().min(1, "Founder name is required"),
  founderXUsername: z.string().default(""),
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
  startupLink: z
    .string()
    .transform((val) => {
      const trimmed = val.trim();
      const withoutProtocol = trimmed.replace(/^https?:\/\//i, "");
      return `https://${withoutProtocol}`;
    })
    .refine((v) => {
      try {
        const u = new URL(v);
        return u.protocol === "https:" && hasValidTld(u.hostname);
      } catch {
        return false;
      }
    }, "Only https:// URLs are allowed"),
  founderName: z.string().min(1, "Founder name is required"),
  founderXUsername: z.string().default(""),
  tags: z.string().optional().transform((val) => {
    if (!val) return [];
    return val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }),
});

export const deleteStartupInputSchema = z.object({
  startupId: z.string().min(1, "Startup ID is required"),
});

export const toggleStartupLikeInputSchema = z.object({
  startupId: z.string().min(1, "Startup ID is required"),
});