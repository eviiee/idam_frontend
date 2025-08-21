import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { getCookie } from "./common/common"
import { getSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

            const session = await getSession()
            const refreshToken = session?.user.refreshToken

            try {

                // 토큰 재발급 요청
                const response = await axios.post(`${BASE_URL}${process.env.NEXT_PUBLIC_API_AUTH_REFRESH}`, { refresh: refreshToken });

                // 새 토큰으로 재시도
                originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;
                return axios(originalRequest);

            } catch (e) {
                // 재발급 실패시 로그인 페이지로 리디렉션
                const currentPath = window.location.pathname + window.location.search;
                signOut({ callbackUrl: `/login?next=${encodeURIComponent(currentPath)}` })
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
        async (config) => {

            const csrfToken = getCsrfToken();
            if (csrfToken && config.headers) {
                config.headers['X-CSRFToken'] = csrfToken;
            }

            const session = await getSession()
            const token = session?.user.accessToken

            if (token && config.headers) {
                config.headers['Authorization'] = `Bearer ${token}`
            }

            return config
        }
    )
    clientApi.interceptors.response.use(...responseInterceptor)

    return clientApi
}

export const serverApi = axios.create({
    baseURL: BASE_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
})

serverApi.interceptors.request.use(async (config) => {
    const session = await getServerSession(authOptions)
    const accessToken = session?.user?.accessToken

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

serverApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const session = await getServerSession(authOptions)
            const refreshToken = session?.user.refreshToken

            if (!refreshToken) {
                return Promise.reject(error)
            }

            try {
                const res = await axios.post(BASE_URL+process.env.NEXT_PUBLIC_API_AUTH_REFRESH!, {
                    refresh: refreshToken
                })

                originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
                return axios(originalRequest);
            } catch (e) {
                return Promise.reject(e)
            }
        }

        return Promise.reject(error)
    }
)