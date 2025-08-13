
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         // TODO: DB 조회 로직
//         if (
//           credentials?.username === "admin" &&
//           credentials?.password === "1234"
//         ) {
//           return { id: "1", name: "Admin", role: "admin" };
//         }
//         return null;
//       }
//     })
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.role = token.role as string;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = (user as any).role;
//       }
//       return token;
//     }
//   }
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
