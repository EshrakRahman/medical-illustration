import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const adminEmail = process.env.ADMIN_EMAIL?.trim();
                const adminPassword = process.env.ADMIN_PASSWORD?.trim();

                if (
                    credentials?.email !== adminEmail ||
                    credentials?.password !== adminPassword
                ) {
                    return null;
                }

                const user = await prisma.user.upsert({
                    where: { email: adminEmail! },
                    update: {},
                    create: {
                        email: adminEmail!,
                        name: "Admin",
                    },
                });

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (session.user) session.user.id = token.id as string;
            return session;
        },
    },
});
