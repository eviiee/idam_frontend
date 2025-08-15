import { ProductOption } from "./product"

type InboundType = '입고' | '반품'

export interface Inbound {
    id: number
    inboundType: InboundType
    productOption: ProductOption
    quantity: number
    purchasePrice: number
    receivedAt: string
}

export interface Outbound {
    id: number
    productOption: ProductOption
    price: number
}