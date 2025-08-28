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
        return res.data
    } catch (e) {
        return Promise.reject()
    }
}

export async function getProducts(page = 1, pageSize = 20) {
    const api = createClientApi()
    const res = await api.get(process.env.NEXT_PUBLIC_API_PRODUCT_ADMIN!)

    return res.data as Product[]
}