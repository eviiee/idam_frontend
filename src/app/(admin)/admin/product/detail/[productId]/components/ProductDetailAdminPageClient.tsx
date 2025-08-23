'use client'

import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader'
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection'
import Button from '@/components/common/ui/button/Button'
import SubmitButton from '@/components/common/ui/button/submitButton.tsx/SubmitButton'
import BooleanSelect from '@/components/common/ui/input/booleanSelect/BooleanSelect'
import ImageInput from '@/components/common/ui/input/imageInput/ImageInput'
import TextInput from '@/components/common/ui/input/textinput/TextInput'
import Collapsable from '@/components/common/ui/wrapper/collapsable/Collapsable'
import PhoneModelSearchConsole from './phoneModelSearch/PhoneModelSearchConsole'
import styles from './productDetailPage.module.scss'
import { getPhoneModels } from '@/services/common/getPhoneModels'
import React, { useState, useEffect } from 'react'
import Product, { ProductPhoneModelOption, SimplePhoneModel } from '@/types/product'
import ProductPhoneModelOptionList from './productPhoneModelOption/ProductPhoneModelOptionList'
import { createProductAdmin } from '@/services/admin/products'

export default function ProductDetailAdminPageClientWrapper({
    defaultValue,
}: {
    defaultValue?: Product | null
}) {

    const [productName, setProductName] = useState<string>(defaultValue?.productName ?? "")
    const [productAlias, setProductAlias] = useState<string>(defaultValue?.productAlias ?? "")
    const [useOptions, setUseOptions] = useState<boolean>(defaultValue?.useOptions ?? false)
    const [usePhoneModels, setUsePhoneModels] = useState<boolean>(defaultValue?.usePhoneModels ?? false)
    const [allPhoneModels, setAllPhoneModels] = useState<SimplePhoneModel[]>([])

    const [productPhoneModelOption, setProductPhoneModelOption] = useState<ProductPhoneModelOption[]>(defaultValue?.productPhoneModelOptions ?? [])
    const [selectedPhoneModelOption, setSelectedPhoneModelOption] = useState<number | string | null>(null)
    const [creationCount, setCreationCount] = useState<number>(0)
    const [availablePhoneModels, setAvailablePhoneModels] = useState<SimplePhoneModel[]>(defaultValue?.availablePhoneModels ?? [])

    const [thumbnail, setThumbnail] = useState<File|null>(null)

    useEffect(() => {
        updatePhoneModels()
    }, [])

    const updatePhoneModels = async () => {
        const res = await getPhoneModels()
        setAllPhoneModels(res)
    }


    // 상품 저장
    const saveProduct = () => {

        const data = new FormData()
        const isNew = !defaultValue

        data.append("product_name",productName)

        if (isNew) {
            // 신규 상품이라면 id 제외 모든 필드 포함
        } else {
            // 기존 상품 수정이라면 수정 가능한 필드와 id만 포함
        }
    }

    const updateProductInfo = (data: Product) => {

    }

    return (
        <div className={styles['product-detail-page-admin']}>
            {!defaultValue && <AdminPageHeader title="신규상품 등록" />}
            <AdminPageSection label="상품정보" collapsable>
                <TextInput label="상품명" name='product_name' maxLength={50} placeholder="예) 이담 푸딩 2way1 5000mAh 도킹형 보조배터리" defaultValue={defaultValue?.productName} />
                <TextInput label="상품명 (송장용)" name='product_alias' maxLength={20} placeholder="예) 이담푸딩" defaultValue={defaultValue?.productAlias} />
                <TextInput icon="₩" label="기본 입고가" type="number" defaultValue={defaultValue?.minPurchasePrice} readOnly={Boolean(defaultValue)} />
                <TextInput icon="₩" label="기본 판매가" type="number" defaultValue={defaultValue?.minPrice} readOnly={Boolean(defaultValue)} />
                <TextInput icon="🔗" label="판매 페이지" name='purchase_link' type="url" defaultValue={defaultValue?.purchaseLink} />
            </AdminPageSection>
            <AdminPageSection label="옵션 정보" collapsable>
                <BooleanSelect label="상품옵션 사용" value={useOptions} trueLabel="사용" falseLabel="미사용" onChange={setUseOptions} />
                <Collapsable isOpen={useOptions} initiallyCollapsed={useOptions}>
                    <div className={styles['options-phone-model-wrap']}>
                        <BooleanSelect label="휴대폰 기종 사용" trueLabel="사용" falseLabel="미사용" value={usePhoneModels} onChange={setUsePhoneModels} />
                        <Collapsable isOpen={usePhoneModels} initiallyCollapsed={usePhoneModels}>
                            <PhoneModelSearchConsole phoneModels={allPhoneModels} selected={availablePhoneModels} setSelected={setAvailablePhoneModels} setPPMO={setProductPhoneModelOption} ppmo={productPhoneModelOption} newCount={creationCount} setNewCount={setCreationCount} selectedPPMO={selectedPhoneModelOption} />
                            <ProductPhoneModelOptionList selected={selectedPhoneModelOption} setSelected={setSelectedPhoneModelOption} ppmo={productPhoneModelOption} setPPMO={setProductPhoneModelOption} />
                        </Collapsable>
                    </div>
                    <div className={styles['options-option-info-wrap']}></div>
                    <div className={styles['options-option-list-wrap']}></div>
                </Collapsable>
            </AdminPageSection>
            <AdminPageSection label="이미지 정보" collapsable>
                <ImageInput file={thumbnail} setFile={setThumbnail} />
            </AdminPageSection>
            <AdminPageSection label="판촉 정보" collapsable>

            </AdminPageSection>
            <SubmitButton onClick={saveProduct} label={!defaultValue ? '등록' : '저장'} />
        </div>
    )
}