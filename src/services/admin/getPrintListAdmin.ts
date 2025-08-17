// export interface PrintInfo {
//     id: number
//     printName: string
//     printType: PrintType
//     printState: PrintState

import { PrintInfo } from "@/types/print";


//     printImage: string
//     printDesign: string

//     items?: PrintItem[]
// }

export async function getPrintListAdmin() {
    const printList: PrintInfo[] = []

    for (let i = 1; i < 30; i++) {
        printList.push(
            {
                id: i,
                printName: "프린트" + i,
                printType: "레이저 각인",
                printState: '인쇄 대기',
                printImage: "https://i.ibb.co/8D4hdgJy/Kakao-Talk-20250814-131605024.png",
                printDesign: "",
            })
    }

    return printList
}