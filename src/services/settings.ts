import axios from "axios"
import { getCookie } from "./common/common"
import Router from "next/router"

const BASE_URL = process.env.PUBLIC_API_BASE_URL

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

// 요청에 jwt 토큰 정보 포함
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access')
        if (accessToken && config.headers) {
            config.headers["Authorization"] = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// 401 에러 처리용
api.interceptors.response.use(
    (response) => response,
    async (error) => {

        // 기존 request 저장
        const originalRequest = error.config

        if (error.response?.status == 401 && !originalRequest._retry) {
            // 무한 재시도 방지
            originalRequest._retry = true;

            try {
                // access 재발급 시도
                const refreshToken = getCookie('refresh')
                const res = await axios.post(
                    BASE_URL + 'auth/refresh',
                    { refresh: refreshToken },
                    { withCredentials: true },
                )
                const newAccess = res.data.access
                localStorage.setItem('access', newAccess)
            } catch (e) {
                // 재발급 실패시 로그인 페이지로 리디렉션
                const currentPath = window.location.pathname + window.location.search;
                Router.replace(`/login?next=${encodeURIComponent(currentPath)}`);
                return Promise.reject(e);
            }
        }

    }
)

export default api

export async function login(username: string, password: string) {
    const res = await fetch(BASE_URL + 'auth/token', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })

    if (!res.ok) throw new Error("로그인 실패")
    const data = await res.json()

    localStorage.setItem('access', data.access)
    document.cookie = `refresh=${data.refresh}; path=/; secure; samesite=strict`

    return data
}