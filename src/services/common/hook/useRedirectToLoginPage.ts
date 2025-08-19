import { useRouter } from "next/router"
import { useEffect } from "react"

export function useRedirectToLoginPage(isAuthenticated: boolean | null) {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace(`/login?next=${encodeURIComponent(router.asPath)}`)
    }
  }, [isAuthenticated, router])
  
}
