import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export async function AuthComponent({
    children,
    loginUser = false,
    adminOnly = false,
    roles,
}: {
    children: React.ReactNode
    loginUser?: boolean
    adminOnly?: boolean
    roles?: ('admin' | 'user' | 'guest')[] // 허용할 권한
}) {

    const session = await getServerSession(authOptions)
    const role = session?.user.role ?? 'guest'

    // 관리자 전용
    if (adminOnly && role === 'admin') return children

    // 로그인 상태 전용
    if (session && loginUser) return children

    // 커스텀 스코프
    if (roles?.includes(role)) return children

    return <></>
}
