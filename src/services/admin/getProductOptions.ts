import { ProductOption } from "@/types/product";

function delay(ms = 1000) {
    return new Promise((r) => setTimeout(r, ms))
}

export default async function getProductOptionsAdmin(q: string): Promise<ProductOption[]> {

    const res: ProductOption[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        displayName: `상품${i} ${q}`,
        option1: Math.random() <= 0.5 ? `옵션1${i}` : undefined,
        price: Math.random() * 19900,
        stock: Math.random() * 1558,
    }))
    await delay()
    return res
}