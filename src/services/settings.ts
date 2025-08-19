import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { getCookie } from "./common/common"

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

function getCsrfToken(): string | undefined {
    const match = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='));
    return match ? match.split('=')[1] : undefined;
}

const responseInterceptor = [
    (response: AxiosResponse<any, any>) => response,
    async (error: any) => {

        // 기존 request 저장
        const originalRequest = error.config

        if (error.response?.status == 401 && !originalRequest._retry) {
            // 무한 재시도 방지
            originalRequest._retry = true;

            try {
                // access 재발급 시도
                const refreshToken = getCookie('refreshToken')
                const res = await axios.post(
                    BASE_URL + '/auth/refresh',
                    { refresh: refreshToken },
                    { withCredentials: true },
                )
                const newAccess = res.data.access
                localStorage.setItem('access', newAccess)

                // 새 토큰으로 원래 요청 재시도
                originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
                return axios(originalRequest);

            } catch (e) {
                // 재발급 실패시 로그인 페이지로 리디렉션
                const currentPath = window.location.pathname + window.location.search;
                window.location.href = `/login?next=${encodeURIComponent(currentPath)}`;
                return Promise.reject(e);
            }
        }

        return Promise.reject(error)

    }
]

export const createClientApi = () => {

    const clientApi = axios.create({
        baseURL: BASE_URL,
        withCredentials: true,
    });

    clientApi.interceptors.request.use(
        (config) => {

            const csrfToken = getCsrfToken();
            if (csrfToken && config.headers) {
                config.headers['X-CSRFToken'] = csrfToken;
            }

            const accessToken = sessionStorage.getItem('accessToken')
            if (accessToken && config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }

            return config
        }
    )
    clientApi.interceptors.response.use(...responseInterceptor)

    return clientApi
}

// export default api

export async function login(username: string, password: string) {

    const res = await fetch(BASE_URL + '/auth/token', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",  // 쿠키 교환 필요시 필수
    })

    if (!res.ok) throw new Error("로그인 실패")
    const data = await res.json()

    localStorage.setItem('accessToken', data.access)
    document.cookie = `refreshToken=${data.refresh}; path=/; secure; samesite=None`
    
    return data
}