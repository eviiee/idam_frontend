'use client'

import ActionButton from "@/components/admin/common/actionButton/ActionButton";
import AdminPageHeader from "@/components/admin/ui/adminPageHeader/AdminPageHeader";
import AdminPageSection from "@/components/admin/ui/adminPageSection/AdminPageSection";
import { Order } from "@/types/order";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { toCommaSeparated, toYYMMDD } from "@/services/common/common"
import Button from "@/components/common/ui/button/Button";
import styles from './orderlistpage.module.scss'
import { useEffect, useState } from "react";
import getOrderListAdmin, { OrderListItemAdmin } from "@/services/admin/getOrderListAdmin";

export default function OrderListAdminPage() {

    const [loading, setLoading] = useState<boolean>(true)
    const [orders, setOrders] = useState<OrderListItemAdmin[]>([])

    useEffect(()=>{
        updateOrders()
    }, [])

    const updateOrders = async () => {
        setLoading(true)
        const orderList = await getOrderListAdmin()
        setLoading(false)
        setOrders(orderList)
    }

    return (
        <div>
            <AdminPageHeader title="주문 목록" buttonLabel="+ 주문서 생성" href="new" useButton />
            <AdminPageSection noPadding>
                <div>
                    <ActionButton onClick={() => { }}>📦 송장 적용</ActionButton>
                    <ActionButton onClick={() => { }}>🚚 발송처리</ActionButton>
                    <ActionButton onClick={() => { }}>❌ 주문 취소</ActionButton>
                    <ActionButton onClick={() => { }}>📥 엑셀 다운로드</ActionButton>
                </div>
            </AdminPageSection>
        </div>
    )
}

const columns: ColumnDef<Order>[] = [
    {
        accessorKey: 'id',
        header: () => '주문번호',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'orderState',
        header: () => '주문상태',
        cell: info => info.getValue(),
    },
    {
        id: 'seller',
        header: () => '판매자',
        cell: info => '이담',
    },
    {
        accessorKey: 'channel',
        header: () => '판매처',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'buyer',
        header: () => '구매자',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'receiverName',
        header: () => '수령자',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'revenue',
        header: () => '주문금액',
        cell: info => toCommaSeparated(info.getValue() as number),
    },
    {
        accessorKey: 'shipmentType',
        header: () => '배송',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'invoiceNumber',
        header: () => '송장번호',
        cell: info => info.getValue(),
    },
    {
        id: 'modify',
        header: () => '수정',
        cell: ({ row }) => <a href={`/product/${row.original.id}`} target='_blank' rel='noopener noreferrer'>상세 보기</a>,
    },
]


function OrderList({ orders }: { orders: Order[] }) {

    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table className={styles['product-list-admin-page__table']}>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}