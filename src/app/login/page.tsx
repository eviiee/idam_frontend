'use client'

import styles from './loginPage.module.scss'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        const res = await signIn("credentials", {
            redirect: false,        // 로그인 실패 시 리다이렉트 막고 에러 처리
            username,
            password,
            callbackUrl: "/",       // 로그인 성공 후 이동할 URL
        })

        if (res?.error) {
            setError("아이디나 비밀번호가 올바르지 않습니다.")
        } else {
            window.location.href = res?.url || "/"
        }
    }

    return (
        <div className={styles['login-page']}>
            <div className={styles['login-console']}>
                <div className={styles['login-console__logo-wrap']}>
                    <a href="/"><img src="/images/brand/idam.svg" alt="이담리테일" /></a>
                </div>
                <h1>이담리테일 로그인</h1>
                <p>
                    boost<br />
                    your business<br />
                    with idam
                </p>

                <form className={styles.form} onSubmit={handleLogin}>
                    <label htmlFor="username">아이디</label>
                    <input
                        name='username'
                        type="text"
                        placeholder='아이디'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">비밀번호</label>
                    <input
                        name='password'
                        type="password"
                        placeholder='비밀번호'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>로그인</button>
                </form>

                <div className={styles['login-console__helps']}>
                    <a href="">아이디 찾기</a>
                    <div></div>
                    <a href="">비밀번호 찾기</a>
                    <div></div>
                    <a href="">회원가입</a>
                </div>
            </div>
        </div>
    )
}