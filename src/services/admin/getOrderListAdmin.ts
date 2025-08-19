import { OrderState, ShipmentType } from "@/types/order";
import { createClientApi } from "../settings";

export interface OrderListItemAdmin {
    id: number
    orderState: OrderState
    seller: '이담리테일' | '상상플러스' 
    channel: string
    buyer: string
    receiverName: string
    revenue: number
    shipmentType: ShipmentType
    invoice_numbers: string[]
}

export default async function getOrderListAdmin(){
    const api = createClientApi()
    const res = await api.get(process.env.NEXT_PUBLIC_API_ORDER_LIST_ADMIN!)

    return res.data as OrderListItemAdmin[]
}