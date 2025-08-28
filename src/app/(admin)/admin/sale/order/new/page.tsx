'use client'

import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader'
import styles from './newOrderPage.module.scss'
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection'
import BooleanSelect from '@/components/common/ui/input/booleanSelect/BooleanSelect'
import { useState } from 'react'

export default function NewOrderAdminPage() {

    const [seller, setSeller] = useState<"이담" | "상플">("이담")

    return (
        <div className={styles['new-order-page']}>
            <AdminPageHeader title='주문서 작성' />
            <AdminPageSection>
                <BooleanSelect value={seller == "이담"} label='판매자' trueLabel='이담' falseLabel='상플' onChange={(v: boolean) => setSeller(v ? "이담" : "상플")} />
                    {/* 채널 선택 */}
                    {/* 구매자 선택 */}
                    {/* 구매자명 */}
                    {/* 결제 수단 선택 */}
                    {/* 인쇄 정보 */}
                    {/* 포장 정보 */}
                    {/*  */}
            </AdminPageSection>
        </div>
    )
}