import { useRouter } from 'next/router'
import styles from './loginPage.module.scss'
import { login } from '@/services/settings'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
    const router = useRouter()
    const { next } = router.query

    const handleLogin = async (username: string, password: string) => {
        try {
            await login(username, password)
            router.replace((next as string) || "/")
        } catch (e) {
            alert("로그인 실패")
        }
    }

    return (
        <div className={styles['login-page']}>
            <div className={styles['login-console']}>
                <LoginForm onSubmit={handleLogin} />
            </div>
        </div>
    )
}