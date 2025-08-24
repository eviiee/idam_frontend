import Product from "@/types/product";
import { createClientApi, serverApi } from "../settings";

export async function createProductAdmin(data: FormData) {

    try {
        const api = createClientApi()
        const res = await api.post(process.env.NEXT_PUBLIC_API_PRODUCT_ADMIN!, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return [true, res.data]
    } catch (e) {
        return [false, {error:"에러 발생. 관리자에게 문의하세요"}]
    }
}

export async function getProducts(page = 1, pageSize = 20) {
    const api = createClientApi()
    const res = await api.get(process.env.NEXT_PUBLIC_API_PRODUCT_ADMIN!)

    return res.data as Product[]
}