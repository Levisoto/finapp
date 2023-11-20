import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { decode, encode } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID || "",
      clientSecret: process.env.KEYCLOAK_SECRET || "",
      issuer: process.env.KEYCLOAK_ISSUER,
      // idToken: true,
      /* profile: (profile, tokens) => {
        console.log("profile", tokens);
        return {
          ...profile,
          id: profile.sub,
          idToken: tokens.id_token,
          refreshToken: tokens.refresh_token,
          accessToken: tokens.access_token,
        };
      }, */
    }),
    // ...add more providers here
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, ...rest }) {
      if (user && account?.id_token) {
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        // token.id = user.id;
      }

      /* console.log(
        "profile:",
        profile,
        "user:",
        user,
        "account",
        account,
        "rest:",
        rest
      ); */

      console.log(
        "Reaload token",
        !!token,
        "user",
        !!user,
        "account",
        !!account
      );
      return token;
    },
    async session({ session, user, token, ...rest }) {
      /* console.log(
        "session:",
        session,
        "user:",
        user,
        "token",
        token,
        "rest:",
        rest
      ); */
      session.user = {
        // idToken: token.idToken,
        name: session.user.name,
        email: session.user.email,
        refreshToken: token.refreshToken,
      };
      // console.log("session", token, "session:", session, "rest:", rest);
      console.log(
        "Reaload session",
        !!session,
        "user",
        !!user,
        "token",
        !!token
      );
      return session;
    },
  },
  /* jwt: {
    // secret: process.env.NEXTAUTH_SECRET,
    async encode({ secret, token }) {
      return encode({
        token,
        secret,
      });
    },
    async decode({ secret, token }) {
      return decode({
        token,
        secret,
      });
    },
  }, */
};

export default NextAuth(authOptions);
