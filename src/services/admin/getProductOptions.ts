import { ProductOption } from "@/types/product";

function delay(ms = 1000) {
    return new Promise((r) => setTimeout(r, ms))
}

export default async function getProductOptionsAdmin(q: string, p: number): Promise<ProductOption[]> {

    const res: ProductOption[] = Array.from({ length: 20 }, (_, i) => ({
        id: p + i,
        displayName: `상품${p + i} ${q}`,
        option1: Math.random() <= 0.5 ? `옵션1${i}` : undefined,
        price: Math.trunc(Math.random() * 19900),
        stock: Math.trunc(Math.random() * 1558),
    }))
    await delay()
    return res
}