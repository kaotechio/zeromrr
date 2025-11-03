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
      sendMagicLink: async ({ email, token, url }) => {
        //TODO:
        console.log(`Sending magic link to ${email} with token ${token} and url ${url}`);
      },
      storeToken: "hashed",
    })
  ],
  trustedOrigins: ["http://localhost:3000"]
});