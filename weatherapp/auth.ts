// weatherapp/auth.ts — R-WA01
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const SERVICE_URL = process.env.RECOMMENDATION_SERVICE_URL!;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const res = await fetch(`${SERVICE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (!res.ok) return null;

        const data = await res.json();
        return { id: data.userId, email: data.email, backendToken: data.token };
      },
    }),
  ],
  callbacks: {
    // Carries the recommendation-service JWT through the session so
    // frontend calls to that service can attach it. [R-WA22]
    jwt({ token, user }) {
      if (user) token.backendToken = (user as { backendToken: string }).backendToken;
      return token;
    },
    session({ session, token }) {
      return { ...session, backendToken: token.backendToken as string };
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
});
