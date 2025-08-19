// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken: string
    refreshToken: string
  }

  interface Session {
    user: {
      id: number
      accessToken: string
      refreshToken: string
      role: 'admin' | 'user'
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    userId: number;
    name: string;
    role: 'admin' | 'user';
    access: string;
    refresh: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number
    accessToken: string
    refreshToken: string
    role: 'admin' | 'user'
  }
}
