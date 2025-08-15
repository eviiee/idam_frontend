import { Channel, Company, Courier } from "./partner"

type OrderState = '결제대기' | '결제완료' | '배송준비중' | '처리완료'
type PurchaseType = '신용거래' | '무통장'
type PurchaseState = '입금 대기' | '미수금' | '결제완료'


export interface Order {
    id: number
    orderedAt: string
    orderState: OrderState
    channel: Channel
    buyer?: Company
    shipment: Shipment
    deadline?: string | null
    purchaseType: PurchaseType
    purchaseState: PurchaseState
}

export interface Shipment {
    id: number

    shipper: Company
    shipperContact: string
    shipperContactAlt: string
    shipperAddress: string

    receiverName: string
    receiverContact: string
    receiverContactAlt: string
    receiverAddress: string
    receiverMessage: string

    shipmentFee: number
}

export interface Invoice {
    id: number

    shipment: Shipment
    courier: Courier
    invoiceNumber: string
}