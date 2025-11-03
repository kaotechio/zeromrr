import { betterAuth } from "better-auth";
import { db } from "./db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "./db/schema";
import { magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  appName: "TrustMRR",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token }) => {
        //TODO:
      },
      storeToken: "hashed",
    })
  ]
});