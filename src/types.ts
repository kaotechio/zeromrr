import { startup } from "./db/schema";

export type StartupWithLikes = typeof startup.$inferSelect & {
  userLiked: boolean;
  likesCount: number;
};

