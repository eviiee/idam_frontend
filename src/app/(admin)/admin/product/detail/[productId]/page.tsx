'use client'

import AdminPageHeader from "@/components/admin/ui/adminPageHeader/AdminPageHeader";
import styles from "./productDetailPage.module.scss";
import AdminPageSection from "@/components/admin/ui/adminPageSection/AdminPageSection";
import TextInput from "@/components/common/ui/input/textinput/TextInput";
import RadioInput from "@/components/common/ui/input/radio/RadioInput";
import { useEffect, useState } from "react";
import React from "react";
import BooleanSelect from "@/components/common/ui/input/booleanSelect/BooleanSelect";
import { motion } from "framer-motion";
import ImageInput from "@/components/common/ui/input/imageInput/ImageInput";
import Collapsable from "@/components/common/ui/wrapper/collapsable/Collapsable";
import Button from "@/components/common/ui/button/Button";
import SubmitButton from "@/components/common/ui/button/submitButton.tsx/SubmitButton";
import PhoneModelSearchConsole from "./components/phoneModelSearch/PhoneModelSearchConsole";
import { getPhoneModels } from "@/services/common/getPhoneModels";
import { PhoneModel } from "@/types/product";
import { SimplePhoneModel } from "@/types/api_responses/getPhoneModels";

interface PageProps {
    params: Promise<{ productId: string }>;
}

export default function ProductPage({ params }: PageProps) {
    
    const [productName, setProductName] = useState<string>("")
    const [useOptions, setUseOptions] = useState<boolean>(false)
    const [usePhoneModels, setUsePhoneModels] = useState<boolean>(false)
    const [allPhoneModels, setAllPhoneModels] = useState<SimplePhoneModel[]>([])

    const { productId } = React.use(params)
    const newProduct = productId === 'new'

    useEffect(()=>{
        updatePhoneModels()
    },[])

    const updatePhoneModels = async () => {
        const res = await getPhoneModels()
        setAllPhoneModels(res)
    }

    return (
        <div className={styles['product-detail-page-admin']}>
            {newProduct && <AdminPageHeader title="신규상품 등록" />}
            <AdminPageSection label="상품정보" collapsable>
                <TextInput label="상품명" maxLength={50} placeholder="예) 이담 푸딩 2way1 5000mAh 도킹형 보조배터리" />
                <TextInput label="상품명 (송장용)" maxLength={20} placeholder="예) 이담푸딩" />
                <TextInput icon="₩" label="기본 입고가" type="number" />
                <TextInput icon="₩" label="기본 판매가" type="number" error="에러 메시지입니다." />
            </AdminPageSection>
            <AdminPageSection label="옵션 정보" collapsable>
                <BooleanSelect label="상품옵션 사용" value={useOptions} trueLabel="사용" falseLabel="미사용" onChange={setUseOptions} />
                <Collapsable isOpen={useOptions} initiallyCollapsed={useOptions}>
                    <div className={styles['options-phone-model-wrap']}>
                        <BooleanSelect label="휴대폰 기종 사용" trueLabel="사용" falseLabel="미사용" value={usePhoneModels} onChange={setUsePhoneModels} />
                        <Collapsable isOpen={usePhoneModels} initiallyCollapsed={usePhoneModels}>
                        <PhoneModelSearchConsole phoneModels={allPhoneModels} initialSelected={[]} />
                        </Collapsable>
                    </div>
                    <div className={styles['options-option-info-wrap']}></div>
                    <div className={styles['options-option-list-wrap']}></div>
                </Collapsable>
            </AdminPageSection>
            <AdminPageSection label="이미지 정보" collapsable>
                <ImageInput />
            </AdminPageSection>
            <AdminPageSection label="판촉 정보" collapsable>

            </AdminPageSection>
            <div className={styles.buttons}>
                <Button color="blue" onClick={()=>{}} className={styles['submit-button']}>등록</Button>
            </div>
            <SubmitButton label={newProduct ? '등록' : '저장'} />
        </div>
    )
}

function ProductOptionForm() {
    return <motion.div>

    </motion.div>
}