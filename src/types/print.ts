import { ProductOption } from "./product"

export type PrintType = '레이저 각인' | '컬러 인쇄'
export type PrintState = '시안 확인중' | '인쇄 대기' | '인쇄 완료'

export interface PrintInfo {
    id: number
    printName: string
    printType: PrintType
    printState: PrintState
    
    printImage: string
    printDesign: string

    items?: PrintItem[]
}

export interface PrintItem {
    id: number
    printInfo: number
    productOption: ProductOption
    quantity: number
}

