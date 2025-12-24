import { decode } from "jsonwebtoken";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { apiClient } from "./apis/vno";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        name: {},
        mode: {},
      },
      type: "credentials",
      name: "password",
      id: "password",
      async authorize(credentials) {
        const res =
          credentials.mode === "signup"
            ? await apiClient.auth.signUp({
                body: {
                  email: credentials.email as string,
                  password: credentials.password as string,
                  name: credentials.name as string,
                },
              })
            : await apiClient.auth.signIn({
                body: {
                  email: credentials.email as string,
                  password: credentials.password as string,
                },
              });

        return {
          email: credentials.email as string,
          name: credentials.name as string,
          token: res.data.accessToken,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      console.log("🚀 ~ session:", session)
      // Initial sign-in
      if (account && user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const accessToken: string = user.token;
        token.accessToken = accessToken;
      }

      if (trigger === "update" && session?.accessToken) {
        token.accessToken = session.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      try {
        const { accessToken } = token;

        if (!accessToken) {
          throw new Error("Invalid session");
        }

        const { exp } = decode(accessToken as string) as { exp: number };

        if (exp * 1000 < Date.now()) {
          throw new Error("Session expired");
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        session.accessToken = accessToken;

        return session;
      } catch (error) {
        await signOut();
        throw error;
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
});
