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
import Product, { NewProductJSONData, NewProductOptionJSONData, ProductOption, ProductPhoneModelOption, SimplePhoneModel } from '@/types/product'
import ProductPhoneModelOptionList from './productPhoneModelOption/ProductPhoneModelOptionList'
import { createProductAdmin } from '@/services/admin/products'
import ParsePPMO from '../utils/newProductPhoneModelOptionsParser'

interface Validation {
    productName?: string
    // productOptions
}

export default function ProductDetailAdminPageClientWrapper({
    defaultValue,
}: {
    defaultValue?: Product | null
}) {

    const [productName, setProductName] = useState<string>(defaultValue?.productName ?? "")
    const [productNameError, setProductNameError] = useState<string>("")
    const [productAlias, setProductAlias] = useState<string>(defaultValue?.productAlias ?? "")
    const [useOptions, setUseOptions] = useState<boolean>(defaultValue?.useOptions ?? false)
    const [purchaseLink, setPurchaseLink] = useState("")

    const [usePhoneModels, setUsePhoneModels] = useState<boolean>(defaultValue?.usePhoneModels ?? false)
    const [allPhoneModels, setAllPhoneModels] = useState<SimplePhoneModel[]>([])

    const [productPhoneModelOption, setProductPhoneModelOption] = useState<ProductPhoneModelOption[]>(defaultValue?.phoneModelOptions ?? [])
    const [selectedPhoneModelOption, setSelectedPhoneModelOption] = useState<number | string | null>(null)
    const [creationCount, setCreationCount] = useState<number>(0)
    const [availablePhoneModels, setAvailablePhoneModels] = useState<SimplePhoneModel[]>(defaultValue?.availablePhoneModels ?? [])

    const [option1, setOption1] = useState("") // 옵션1 명칭
    const [option1Values, setOption1Values] = useState<string[]>([]) // 옵션1 값
    const [option2, setOption2] = useState("") // 옵션2 명칭
    const [option2Values, setOption2Values] = useState<string[]>([]) // 옵션2 값
    const [option3, setOption3] = useState("") // 옵션3 명칭
    const [option3Values, setOption3Values] = useState<string[]>([]) // 옵션3 값

    const [productOptions, setProductOptions] = useState<ProductOption[]>([])

    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [thumbnailHover, setThumbnailHover] = useState<File | null>(null)
    const [additionalImages, setAdditionalImages] = useState<File[]>([])
    const [detailImage, setDetailImage] = useState("d")

    const [engravable, setEngravable] = useState<boolean>(defaultValue?.engravable ?? false)
    const [printable, setPrintable] = useState<boolean>(defaultValue?.printable ?? false)
    const [packaging, setPackaging] = useState<boolean>(false)

    useEffect(() => { updatePhoneModels() }, [])

    // 휴대폰 기종 목록 불러오기
    const updatePhoneModels = async () => {
        const res = await getPhoneModels()
        setAllPhoneModels(res)
    }

    // 상품정보 검수
    const validateProductInfo = () => {

    }

    // 상품명 검수
    const validateProductName = () => { !productName && setProductNameError("상품명을 입력해주세요"); return !productName }

    // 옵션 검수
    const validateOptions = () => { }

    // 이미지 검수
    const validateImages = () => {
        // thumbnail && 
    }


    // 상품 등록
    const saveProduct = () => {

        const formData = new FormData()

        formData.append("thumbnail", thumbnail!)
        thumbnailHover && formData.append("thumbnail_hover", thumbnailHover)

        const data: NewProductJSONData = {
            productName,
            productAlias,
            useOptions,
            usePhoneModels,
            phoneModelOptions: ParsePPMO(productPhoneModelOption),
            purchaseLink,
            detailImage,
            engravable,
            printable,

            options: productPhoneModelOption.map((ppmo, i) => {
                const option: NewProductOptionJSONData = {
                    inboundPrice: 2000,
                    price: 5000,
                    stock: 50,
                    phoneModelTemp: String(ppmo.id),
                }
                return option
            })
        }

        formData.append("data", JSON.stringify(data))

        createProductAdmin(formData).then(([success, data]) => {
            success ? alert("등록 성공") : alert(data.error)
        })
    }

    return (
        <div className={styles['product-detail-page-admin']}>
            {!defaultValue && <AdminPageHeader title="신규상품 등록" />}
            <AdminPageSection label="상품정보" collapsable>
                <TextInput label="상품명" value={productName} onChange={(e) => setProductName(e.target.value)} maxLength={50} placeholder="예) 이담 푸딩 2way1 5000mAh 도킹형 보조배터리" />
                <TextInput label="상품명 (송장용)" value={productAlias} onChange={(e) => setProductAlias(e.target.value)} maxLength={20} placeholder="예) 이담푸딩" />
                <TextInput icon="₩" label="기본 입고가" type="number" readOnly={Boolean(defaultValue)} />
                <TextInput icon="₩" label="기본 판매가" type="number" readOnly={Boolean(defaultValue)} />
                <TextInput icon="🔗" label="판매 페이지" value={purchaseLink} onChange={(e) => setPurchaseLink(e.target.value)} type="url" />
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
                <ImageInput file={thumbnail} setFile={setThumbnail} accept='.jpg, .png, .gif' maxSize={5} />
                <ImageInput file={thumbnailHover} setFile={setThumbnailHover} accept='.jpg, .png, .gif' maxSize={5} />
            </AdminPageSection>
            <AdminPageSection label="판촉 정보" collapsable>
                <BooleanSelect label='레이저 각인' value={engravable} onChange={setEngravable} trueLabel='각인 가능' falseLabel='불가능' />
                <BooleanSelect label='컬러 인쇄' value={printable} onChange={setPrintable} trueLabel='인쇄 가능' falseLabel='불가능' />
                <BooleanSelect label='선물 포장' value={printable} onChange={setPrintable} trueLabel='포장 가능' falseLabel='불가능' />
            </AdminPageSection>
            <SubmitButton onClick={saveProduct} label={!defaultValue ? '등록' : '저장'} />
        </div>
    )
}