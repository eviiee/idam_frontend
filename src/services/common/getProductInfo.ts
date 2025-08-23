import Product from "@/types/product";
import { serverApi } from "../settings";

export async function getProductInfo(productKey: number | string): Promise<Product> {

    if (typeof productKey === "number") {
        productKey = productKey.toString()
    }
    const api = serverApi

    const res = await api.get(`${process.env.NEXT_PUBLIC_API_PRODUCT_ADMIN}${productKey}`)
    return res.data
}