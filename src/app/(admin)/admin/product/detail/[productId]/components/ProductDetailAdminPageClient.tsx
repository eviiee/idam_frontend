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
import React, { useState, useEffect, ReactNode } from 'react'
import Product, { NewProductJSONData, NewProductOptionJSONData, ProductOption, ProductPhoneModelOption, SimplePhoneModel } from '@/types/product'
import ProductPhoneModelOptionList from './productPhoneModelOption/ProductPhoneModelOptionList'
import { createProductAdmin } from '@/services/admin/products'
import ParsePPMO from '../utils/newProductPhoneModelOptionsParser'
import { toast } from 'react-toastify'

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
    const [defaultPurchasePrice, setDefaultPurchasePrice] = useState<string>(defaultValue ? String(defaultValue.minPurchasePrice) : "")
    const [defaultPrice, setDefaultPrice] = useState<string>(defaultValue ? String(defaultValue.minPrice) : "")
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
    const [detailImage, setDetailImage] = useState(defaultValue?.detailImage ?? "d")

    const [engravable, setEngravable] = useState<boolean>(defaultValue?.engravable ?? false)
    const [printable, setPrintable] = useState<boolean>(defaultValue?.printable ?? false)
    const [packaging, setPackaging] = useState<boolean>(false)

    useEffect(() => { updatePhoneModels() }, [])

    // 휴대폰 기종 목록 불러오기
    const updatePhoneModels = async () => {
        const promise = getPhoneModels()
        toast.promise(promise, {
            pending: "휴대폰 기종 로딩중",
            success: "기종 로딩 성공",
            error: "기종 로딩 실패",
        })
        try {
            const res = await promise
            setAllPhoneModels(res)
        } catch {
        }
    }

    // 상품정보 검수
    const validateProductInfo = (): [boolean, ReactNode] => {
        const nameIsValid = validateDefaultInfo()
        if (!nameIsValid[0]) return nameIsValid
        const optionIsValid = validateOptions()
        if (!optionIsValid[0]) return optionIsValid
        const thumbnailIsValid = validateImages()
        if (!thumbnailIsValid[0]) return thumbnailIsValid

        return [true, ""]
    }

    // 상품명 검수
    const validateDefaultInfo = (): [boolean, ReactNode] => {
        if (!productName) {
            setProductNameError("상품명을 입력해주세요")
            return [false, "상품명을 입력해주세요"]
        } else if (!productAlias) {
            return [false, "송장용 상품명을 입력해주세요"]
        } else if (!defaultPurchasePrice) {
            return [false, "입고가를 입력해주세요"]
        } else if (!defaultPrice) {
            return [false, "판매가를 입력해주세요"]
        }
        return [true, ""]
    }

    // 옵션 검수
    const validateOptions = (): [boolean, ReactNode] => {
        if (useOptions && productOptions.length < 1) return [false, "옵션을 생성해주세요."]
        const uniqueOptions: { [key: string]: boolean } = {}
        for (let i = 0; i < productOptions.length; i++) {
            const option = productOptions[i]
            const combKey = `${option.phoneModel?.id} ${option.option1} ${option.option2} ${option.option3}`
            if (uniqueOptions[combKey]) {
                return [false, <div>옵션에 중복된 값이 있습니다.<br />{combKey}</div>]
            } else {
                uniqueOptions[combKey] = true
            }
            if (usePhoneModels && (!option.phoneModel)) return [false, "호환 기종은 필수입니다."]
            if (option1 && (!option.option1)) return [false, "옵션 1의 값은 필수입니다."]
            if (option2 && (!option.option2)) return [false, "옵션 2의 값은 필수입니다."]
            if (option3 && (!option.option3)) return [false, "옵션 3의 값은 필수입니다."]
            if (!option.inboundPrice) return [false, "입고가는 필수 입력 항목입니다."]
            if (!option.price) return [false, "판매가는 필수 입력 항목입니다."]
        }
        return [true, ""]
    }

    // 이미지 검수
    const validateImages = (): [boolean, ReactNode] => {
        if (!thumbnail) return [false, "대표 이미지는 필수 항목입니다."]
        return [true, ""]
    }


    // 상품 등록
    const saveProduct = async () => {

        const [isValid, message] = validateProductInfo()
        if (!isValid) {
            toast(
                message, {
                type: "error",
            }
            )
            return
        }

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

        const promise = createProductAdmin(formData)
        toast.promise(promise, {
            pending: "상품 등록중",
            success: "상품 등록 완료",
            error: "에러 발생. 관리자에게 문의하세요"
        })
        try {
            await promise
        } catch {}
    }

    return (
        <div className={styles['product-detail-page-admin']}>
            {!defaultValue && <AdminPageHeader title="신규상품 등록" />}
            <AdminPageSection label="상품정보" collapsable>
                <TextInput label="상품명" value={productName} onChange={(e) => setProductName(e.target.value)} maxLength={50} placeholder="예) 이담 푸딩 2way1 5000mAh 도킹형 보조배터리" />
                <TextInput label="상품명 (송장용)" value={productAlias} onChange={(e) => setProductAlias(e.target.value)} maxLength={20} placeholder="예) 이담푸딩" />
                <TextInput icon="₩" label="기본 입고가" value={defaultPurchasePrice} onChange={(e)=>setDefaultPurchasePrice(e.target.value)} type="number" readOnly={Boolean(defaultValue)} />
                <TextInput icon="₩" label="기본 판매가" value={defaultPrice} onChange={(e)=>setDefaultPrice(e.target.value)} type="number" readOnly={Boolean(defaultValue)} />
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