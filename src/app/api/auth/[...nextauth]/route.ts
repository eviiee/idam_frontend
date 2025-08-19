// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

// 1️⃣ 옵션 객체로 분리
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + process.env.NEXT_PUBLIC_API_AUTH!, {
                        username: credentials?.username,
                        password: credentials?.password,
                    })

                    const user = res.data
                    if (!user) return null

                    return user;
                    
                } catch (err) {
                    console.error("Login error:", err)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.userId
                token.accessToken = user.access
                token.refreshToken = user.refresh
                token.name = user.name
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.accessToken = token.accessToken
                session.user.refreshToken = token.refreshToken
                session.user.name = token.name
                session.user.role = token.role
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
    },
}

// 2️⃣ handler 생성
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
