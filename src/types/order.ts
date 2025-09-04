import { Channel, Company, Courier } from "./partner"
import { PrintInfo } from "./print"

export type OrderState = '결제대기' | '결제완료' | '배송준비중' | '처리완료'
export type PurchaseType = '신용거래' | '무통장 입금' | '현금결제' | '카드결제'
export type PurchaseState = "결제대기"|"결제완료"|"결제취소"
export type ShipmentType = '택배' | '퀵/화물' | '직배송' | '방문수령' | '배송없음'

export interface OrderedItem {
    id?: number;
    productOption:number;
    quantity:number;
    printInfo:PrintInfo

    optionName: string;
}


export interface Order {
    id: number
    channel: Channel
    channelOrderId?: string
    orderState: OrderState
    seller?: "이담" | "상플"
    buyer?: Company | null
    buyerName?: string
    purchaseType: PurchaseType
    purchaseState: PurchaseState
    orderedAt: string
    shipment: Shipment
    deadline?: string | null

    orderedItems: OrderedItem[]
    needPrinting: boolean
    printState: "시안 작업중"|"인쇄 대기"|"인쇄 완료"|null
    needPackaging: boolean
    packagingState: "포장 대기"|"포장 완료"|null
    memo:string
}

export interface Shipment {
    id: number

    shipmentType: ShipmentType
    shipper: Company | null
    shipperName: string
    shipperContact: string
    shipperContactAlt: string
    shipperAddress: string
    shipperAddressDetail: string

    receiverName: string
    receiverContact: string
    receiverContactAlt: string
    receiverAddress: string
    receiverAddressDetail: string
    receiverMessage: string

    shipmentFee: number
}

export interface Invoice {
    id: number

    shipment: Shipment
    courier: Courier
    invoiceNumber: string
}