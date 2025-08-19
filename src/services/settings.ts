import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { getCookie } from "./common/common"
import { getSession, signOut } from "next-auth/react";

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
                const response = await axios.post(`${BASE_URL}/auth/refresh`, { refresh: refreshToken });

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