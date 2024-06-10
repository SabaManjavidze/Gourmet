import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import type { FacebookProfile } from "next-auth/providers/facebook";
import type { GoogleProfile } from "next-auth/providers/google";
import axios from "axios";
import { env } from "@/env";
import { db } from "@/server/db";
import { createTable } from "@/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID?.toString() as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET?.toString() as string,
      allowDangerousEmailAccountLinking: true,
      async profile(prof: GoogleProfile, tokens) {
        let birthday: undefined | Date;
        try {
          const baseUrl = "https://people.googleapis.com/v1/people";
          const { data } = await axios.get(
            `${baseUrl}/${prof.sub}?personFields=birthdays&key=${
              process.env.GOOGLE_API_KEY as string
            }&access_token=${tokens.access_token}`,
          );
          const bd = data.birthdays[0].date;
          birthday = new Date(bd.year, bd.month - 1, bd.day);
        } catch (e) {
          console.log("birthday error", JSON.stringify(e));
        }
        return {
          firstName: prof.given_name,
          lastName: prof.family_name,
          email: prof.email,
          id: prof.sub,
          image: prof.picture,
          name: prof.name,
          birthday,
          emailVerified: new Date(),
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID?.toString() as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET?.toString() as string,
      allowDangerousEmailAccountLinking: true,
      authorization:
        "https://www.facebook.com/v11.0/dialog/oauth?scope=email,public_profile,user_birggthday",
      userinfo: {
        url: "https://graph.facebook.com/me",
        params: {
          fields: "first_name,last_name,id,name,email,picture,birthday",
        },
      },
      profile(profile: FacebookProfile) {
        return {
          id: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          email: profile.email,
          name: profile.name,
          image: profile.picture.data.url,
          birthday: new Date(profile.birthday),
          emailVerified: new Date(),
        };
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
