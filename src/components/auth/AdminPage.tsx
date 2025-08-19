import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

// import ForbiddenPage from "@/app/(errors)/403/page"

export default async function AdminPage({ children }: { children: ReactNode }) {

  const session = await getServerSession(authOptions)
  console.debug(session?.user)

  if (!session) {
    // 비로그인 → 로그인 페이지로
    redirect("/login")
  }

  if (session.user.role !== "admin") {
    // 로그인 했지만 일반 회원 → 403 페이지 렌더링
    return <div>권한 없음</div>
  }

  // 관리자일 경우 정상 렌더링
  return children
}
