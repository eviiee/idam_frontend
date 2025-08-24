import Product from "@/types/product"
import { serverApi } from "../settings"

export default async function getProductDetailAdmin(id:string){

    'use server'

    if (id === 'new') return null
    const api = serverApi
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_PRODUCT_ADMIN}${id}/`)
    return res.data as Product
}