'use client'

import AdminProductConsole from "@/components/admin/ui/adminProductConsole/AdminProductConsole";
import Button from "@/components/common/ui/button/Button";
import { OrderedItem } from "@/types/order";

export default function AdminHome() {
    return <div>
        <Button simpleLink href="" color="blue">저장</Button>
        <Button simpleLink href="" color="grey">취소</Button>
        <Button simpleLink href="" color="black">검색</Button>
        <Button simpleLink href="" color="red">조금은 길어져버린 버어어어어튼</Button>
        <AdminProductConsole products={[]} onChange={function (v: OrderedItem[]): void {
            throw new Error("Function not implemented.");
        } } />
    </div>
}