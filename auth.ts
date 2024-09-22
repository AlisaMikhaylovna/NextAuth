import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/login",
        error: "/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: {
                    emailVerified: new Date()
                }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                return true;
            }
            const exsitingUser = await getUserById(user.id!);
            if (!exsitingUser?.emailVerified) return false;
            return true;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const exsitingUser = await getUserById(token.sub);
            if (!exsitingUser) return token;
            return token;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})