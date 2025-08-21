'use client'

import AdminPageHeader from "@/components/admin/ui/adminPageHeader/AdminPageHeader";
import styles from "./productDetailPage.module.scss";
import AdminPageSection from "@/components/admin/ui/adminPageSection/AdminPageSection";
import TextInput from "@/components/common/ui/input/textinput/TextInput";
import RadioInput from "@/components/common/ui/input/radio/RadioInput";
import { useState } from "react";
import React from "react";
import BooleanSelect from "@/components/common/ui/input/booleanSelect/BooleanSelect";
import { motion } from "framer-motion";
import ImageInput from "@/components/common/ui/input/imageInput/ImageInput";
import Collapsable from "@/components/common/ui/wrapper/collapsable/Collapsable";

interface PageProps {
    params: Promise<{ productId: string }>;
}

export default function ProductPage({ params }: PageProps) {

    const [productName, setProductName] = useState<string>("")
    const [useOptions, setUseOptions] = useState<boolean>(false)

    const { productId } = React.use(params)
    const newProduct = productId === 'new'

    return (
        <div className={styles['product-detail-page-admin']}>
            {newProduct && <AdminPageHeader title="신규상품 등록" />}
            <AdminPageSection label="상품정보" collapsable>
                <TextInput label="상품명" maxLength={50} placeholder="예) 이담 푸딩 2way1 5000mAh 도킹형 보조배터리" />
                <TextInput label="상품명 (송장용)" maxLength={20} placeholder="예) 이담푸딩" />
                <div className={styles['product-prices']}>
                    <TextInput icon="₩" label="기본 입고가" type="number" />
                    <TextInput icon="₩" label="기본 판매가" type="number" error="에러 메시지입니다." />
                </div>
            </AdminPageSection>
            <AdminPageSection label="옵션 정보" collapsable>
                    <BooleanSelect label="상품옵션 사용" value={useOptions} trueLabel="사용" falseLabel="미사용" onChange={(v)=>setUseOptions(v)} />
                        <Collapsable isOpen={useOptions}>
                        <div>asldfj;slkdfjl</div>
                        <div>a;sdkfj;lsdkfj;lsdk</div>
                        <div>a;sdklfj;alsdkfj;lskdjf;lsjf;lskd</div>
                        <div>sldkjfslkdjflksd</div>
                        </Collapsable>
            </AdminPageSection>
            <AdminPageSection label="이미지 정보" collapsable>
                <ImageInput />
            </AdminPageSection>
            <AdminPageSection label="판촉 정보" collapsable>

            </AdminPageSection>
        </div>
    )
}

function ProductOptionForm() {
    return <motion.div>
        
    </motion.div>
}