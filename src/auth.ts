import { betterAuth } from "better-auth";
import { db } from "./db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "./db/schema";
import { magicLink } from "better-auth/plugins";
import { sendMagicLinkEmail } from "./lib/emails";

export const auth = betterAuth({
  appName: "TrustMRR",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema
  }),
  user: {
    deleteUser: { 
      enabled: true
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        sendMagicLinkEmail(email, url);
      },
      storeToken: "hashed",
    })
  ],
  trustedOrigins: ["http://localhost:3000"]
});