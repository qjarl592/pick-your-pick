import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: getEnvVariable("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvVariable("GOOGLE_CLIENT_SECRET"),
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user && typeof token.userId === "string") {
        session.user.id = token.userId;
      }
      return session;
    },
  },
};
