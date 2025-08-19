'use client'

import AdminPageHeader from "@/components/admin/ui/adminPageHeader/AdminPageHeader";
import styles from "./productDetailPage.module.scss";
import AdminPageSection from "@/components/admin/ui/adminPageSection/AdminPageSection";
import TextInput from "@/components/common/ui/input/textinput/TextInput";
import RadioInput from "@/components/common/ui/input/radio/RadioInput";
import { useState } from "react";

interface PageProps {
    params: {
        productId: string;
    };
}

export default function ProductPage({ params }: PageProps) {

    const [useOptions, setUseOptions] = useState<number>(0)

    const id = params.productId
    const newProduct = id === 'new'

    return (
        <div className={styles['product-detail-page-admin']}>
            {newProduct && <AdminPageHeader title="신규상품 등록" />}
            <AdminPageSection label="상품정보">
                <TextInput icon="상품명" label="상품명" maxLength={50} />
                <TextInput label="상품명 (송장용)" maxLength={20} />
            </AdminPageSection>
            <AdminPageSection label="옵션">
                <RadioInput
                    name='useOptions'
                    value={useOptions}
                    onChange={(v) => setUseOptions(v as number)}
                    options={[{
                        label: '미사용',
                        value: 0,
                        icon: '',
                    }, {
                        label: '사용',
                        value: 1,
                        icon: '',
                    },]} />
            </AdminPageSection>
            <AdminPageSection label="이미지"></AdminPageSection>
            <AdminPageSection label="인쇄여부"></AdminPageSection>
        </div>
    )
}
