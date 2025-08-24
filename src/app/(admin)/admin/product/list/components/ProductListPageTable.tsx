import Button from "@/components/common/ui/button/Button"
import { toCommaSeparated, toYYMMDD } from "@/services/common/common"
import Product from "@/types/product"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import styles from '../productListPage.module.scss'

const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'id',
        header: () => '번호',
        cell: info => info.getValue(),
    },
    {
        id: 'state',
        header: () => '상태',
        cell: info => "판매중",
    },
    {
        accessorKey: 'productName',
        header: () => '상품명',
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'options',
        header: () => '옵션 수',
        cell: info => info.getValue.length,
    },
    {
        accessorKey: 'stock',
        header: () => '재고',
        cell: info => toCommaSeparated(info.getValue() as number),
    },
    {
        accessorKey: 'purchasePrice',
        header: () => '입고가',
        cell: info => toCommaSeparated(info.getValue() as number),
    },
    {
        accessorKey: 'price',
        header: () => '판매가',
        cell: info => toCommaSeparated(info.getValue() as number),
    },
    {
        accessorKey: 'createdAt',
        header: () => '등록일',
        cell: info => toYYMMDD(info.getValue() as string),
    },
    {
        id: 'view',
        header: () => '상세보기',
        cell: ({ row }) => <a href={`/product/${row.original.id}`} target='_blank' rel='noopener noreferrer'>상세 보기</a>,
    },
    {
        id: 'modify',
        header: () => '수정',
        cell: ({ row }) => <Button href={`detail/${row.original.id}`} small simpleLink>수정</Button>,
    },
]

export default function ProductListPageTable({ data }: { data: Product[] }) {

    const table = useReactTable({
        data,
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