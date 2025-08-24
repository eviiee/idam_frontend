'use client'

import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader'
import styles from './productListPage.module.scss'
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection'
import { useEffect, useState } from 'react'
import Product from '@/types/product'
import Button from '@/components/common/ui/button/Button'
import { toCommaSeparated, toYYMMDD } from '@/services/common/common'
import ProductListPageTable from './components/ProductListPageTable'
import { getProducts } from '@/services/admin/products'

type PageSize = 20 | 50 | 100 | 500

export default function ProductListAdminPage() {

    const [loading, setLoading] = useState<boolean>(true)
    const [productList, setProductList] = useState<Product[]>([])

    const [pageSize, setPageSize] = useState<PageSize>(20)

    useEffect(() => {
        updateProductList()
    }, [])

    const updateProductList = async () => {
        const newProductList = await getProducts()
        setProductList(newProductList)
    }

    const tableContent = productList.map(item => <tr key={item.id}>
        <td>{item.id}</td>
        <td>판매중</td>
        <td>{item.productName}</td>
        <td>256</td>
        {/* <td>{item.stock}</td>
        <td>{toCommaSeparated(item.purchasePrice)}</td>
        <td>{toCommaSeparated(item.price)}</td> */}
        <td>{toYYMMDD(item.createdAt!)}</td>
        <td><a href={`/product/${item.id}`} target='_blank' rel='noopener noreferrer'>상세 보기</a></td>
        <td><Button href='' simpleLink>ㄴㅇㄹ</Button></td>
    </tr>)

    return (
        <div>
            <AdminPageHeader title='상품 목록' buttonLabel='+ 신규상품' href='detail/new' useButton />
            <AdminPageSection />
            <AdminPageSection noPadding>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>상태</th>
                            <th>상품명</th>
                            <th>옵션 수</th>
                            <th>재고</th>
                            <th>입고가</th>
                            <th>판매가</th>
                            <th>등록일</th>
                            <th>상세보기</th>
                            <th>수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
                <div className='paginator-wrap'>

                </div>
            </AdminPageSection>
            <AdminPageSection>
                <ProductListPageTable data={productList} />
            </AdminPageSection>
        </div>
    )
}