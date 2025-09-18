'use client'

import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader'
import styles from './newOrderPage.module.scss'
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection'
import { useEffect, useState } from 'react'
import RadioInput from '@/components/common/ui/input/radio/RadioInput'
import SelectInput from '@/components/common/ui/input/selectInput/SelectInput'
import { Channel, Company } from '@/types/partner'
import TextInput from '@/components/common/ui/input/textinput/TextInput'
import { Order, OrderState, PurchaseType } from '@/types/order'
import { Controller, useForm, useWatch } from 'react-hook-form'
import Collapsable from '@/components/common/ui/wrapper/collapsable/Collapsable'
import OrderDefaultInfoForm from './components/DefaultInfoForm'
import AddressInput from '@/components/common/ui/input/addressInput/AddressInput'
import { PhoneInput } from '@/components/common/ui/input/telInput/TelInput'
import Tag from '@/components/common/ui/tag/Tag'
import Button from '@/components/common/ui/button/Button'
import { useModal } from '@/components/layout/modal/context'
import AdminPageSectionWithActionButton from '@/components/admin/ui/adminPageSideSection/AdminPageSectionWithActionButton'
import { Printer, ReceiptText } from 'lucide-react'
import AdminProductConsole from '@/components/admin/ui/adminProductConsole/AdminProductConsole'
import OrderDetailPageHeader from './components/OrderDetailPageHeader'
import { PrintInfo } from '@/types/print'
import CollapsableTooltip from '@/components/common/ui/input/collapsableTooltip/CollapsableTooltip'

export default function NewOrderAdminPage() {

    const [currentTab, setCurrentTab] = useState<OrderState | null>(null)

    const [channels, setChannels] = useState<Channel[]>(Array.from({ length: 500 }, (_, i) => ({
        id: i,
        name: `채널${i}`,
        fee: 0
    })))
    const [companies, setCompanies] = useState<Company[]>(Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `회사${i}`,
    })))

    const [useDefaultBuyerInfo, setUseDefaultBuyerInfo] = useState<boolean>(true)
    const [useDefaultSellerInfo, setUseDefaultSellerInfo] = useState<boolean>(true)
    const [purchaseType, setPurchaseType] = useState<PurchaseType>("신용거래")

    const [printItems, setPrintItems] = useState<{ [keys: string | number]: string | number }>({})
    const [prints, setPrints] = useState<PrintInfo[]>([])
    const [packagings, setPackagings] = useState<{ [keys: string | number]: number }>({})

    const { setValue, register, handleSubmit, control, watch, formState: { errors } } = useForm<Order>({
        defaultValues: {
            id: null,
            seller: "이담",
            buyer: null,
            buyerName: "",
            purchaseType: "신용거래",
            purchaseState: "결제완료",
            needPrinting: false,
            printState: null,
            needPackaging: false,
            packagingState: null,
            memo: "",
            shipment: {
                shipmentType: "택배",
                shipper: null,
                shipperContact: "1644-6140",
                shipperContactAlt: "이담",
                shipperAddress: "인천 서구 봉수대로162번길 7 ",
                shipperAddressDetail: "5층",
                receiverName: "",
                receiverContact: "",
                receiverContactAlt: "",
                receiverAddress: "",
                receiverAddressDetail: "",
                receiverMessage: "",
                shipmentFee: 3000,
            },
            orderedItems: [],
        }
    })

    const isNew = watch("id") === null
    const id = !isNew ? watch("id") : "신규 주문"
    const orderedAt = isNew ? (new Date()).toDateString() : watch("orderedAt")
    const buyer = watch("buyer")
    const seller = watch("seller")
    const isDeposit = watch("purchaseType") === '무통장 입금'
    const shipmentType = watch("shipment.shipmentType")
    const isPaidShipment = shipmentType === "택배" || shipmentType === "퀵/화물"

    useEffect(() => {
        if (useDefaultSellerInfo) {
            if (seller === "이담") {
                setValue("shipment.shipperName", "(주)이담리테일")
                setValue("shipment.shipperContact", "1644-6140")
                setValue("shipment.shipperContactAlt", "010-2428-5408")
                setValue("shipment.shipperAddress", "인천 서구 봉수대로162번길 7")
                setValue("shipment.shipperAddressDetail", "5층")
            } else if (seller === "상플") {
                setValue("shipment.shipperName", "상상플러스")
                setValue("shipment.shipperContact", "1644-6140")
                setValue("shipment.shipperContactAlt", "010-2118-7215")
                setValue("shipment.shipperAddress", "인천 서구 봉수대로162번길 7")
                setValue("shipment.shipperAddressDetail", "6층")
            }
        }
    }, [seller])

    useEffect(() => {
        if (useDefaultBuyerInfo && buyer) {
            setValue("shipment.receiverName", buyer.name || "")
            setValue("shipment.receiverContact", buyer.contact || "")
            setValue("shipment.receiverContactAlt", buyer.contactAlt || "")
            setValue("shipment.receiverAddress", buyer.address || "")
            setValue("shipment.receiverAddressDetail", buyer.addressDetail || "")
        }
    }, [buyer, useDefaultBuyerInfo])

    // 결제 수단 변경시 결제상태 초기화
    useEffect(() => {
        if (isDeposit) setValue("purchaseState", "결제대기")
        else setValue("purchaseState", "결제완료")
    }, [isDeposit])

    const { open, close, confirm } = useModal()

    const openCancelModal = () => {
        open({
            title: "취소",
            size: "lg",
            content: <textarea id="return-memo" />,
        })
    }

    const openReturnModal = () => {
        open({
            title: "반품",
            size: "lg",
            content: <textarea id="return-memo" />,
        })
    }

    return (
        <div className={styles['order-detail-page']}>
            <OrderDetailPageHeader
                id={id}
                orderedAt={orderedAt}
                onCancel={openCancelModal}
                onReturn={openReturnModal}
                isNew={isNew}
            />
            {isNew && <Controller
                name='orderedItems'
                control={control}
                render={({ field }) => (
                    <AdminProductConsole
                        products={field.value}
                        onChange={field.onChange}
                    />
                )}
            />}
            <div className={styles['order-detail-page__content']}>
                <div className={styles['left']}>
                    {!isNew &&
                        <RadioInput
                            className={styles['order-state-radio']}
                            options={[
                                { label: "전체", value: null },
                                { label: "배송", value: "처리완료" },
                                { label: "취소", value: "취소" },
                                { label: "반품", value: "반품" },
                            ]}
                            value={currentTab}
                            onChange={setCurrentTab}
                        />}
                    <OrderDefaultInfoForm control={control} companies={companies} channels={channels} isDeposit={isDeposit} />
                    <AdminPageSection>
                        <CollapsableTooltip logo="📢" title="신규 주문 작성 방법" content={[
                            "1. 상단의 '신규 주문'을 클릭하여 새 주문서를 작성합니다.",
                            "2. '판매자'와 '구매자'를 선택합니다. 필요시 '구매자'는 새로 추가할 수 있습니다.",
                            "3. '결제 수단'과 '결제 상태'를 선택합니다. 무통장 입금의 경우, 결제 상태는 '결제대기'로 자동 설정됩니다.",
                            "4. '주문 상품' 섹션에서 상품을 추가하고 수량 및 가격을 입력합니다.",
                            "5. '배송 정보' 섹션에서 발송인과 수취인의 정보를 입력합니다. '기본 정보 사용'을 체크하면, 선택한 판매자와 구매자의 기본 정보가 자동으로 입력됩니다.",
                            "6. 모든 정보를 확인한 후, 페이지 하단의 '저장' 버튼을 클릭하여 주문서를 저장합니다.",
                            "7. 저장 후, 필요시 '인쇄' 버튼을 클릭하여 주문서 및 송장을 인쇄할 수 있습니다."
                        ]} />
                        <Controller
                            name='shipment.shipperName'
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    width={280}
                                    label='발송인 이름'
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name='shipment'
                            control={control}
                            render={({ field }) => (
                                <AddressInput
                                    label='발송인 주소*'
                                    address={field.value.shipperAddress}
                                    detailAddress={field.value.shipperAddressDetail}
                                    onAddressChange={(v) => field.onChange({ ...field.value, shipperAddress: v, shipperAddressDetail: "" })}
                                    onAddressDetailChange={(v) => field.onChange({ ...field.value, shipperAddressDetail: v })}
                                />
                            )}
                        />
                        <Controller
                            name='shipment.shipperContact'
                            control={control}
                            render={({ field }) => <PhoneInput label='발송인 연락처*' value={field.value} onChange={field.onChange} />}
                        />
                        <Controller
                            name='shipment.shipperContactAlt'
                            control={control}
                            render={({ field }) => <PhoneInput label='발송인 예비 연락처' value={field.value} onChange={field.onChange} />}
                        />

                    </AdminPageSection>
                    <AdminPageSection>
                        <Controller
                            name='shipment.receiverName'
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    width={280}
                                    label='수취인 이름'
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name='shipment'
                            control={control}
                            render={({ field }) => (
                                <AddressInput
                                    label='수취인 주소*'
                                    address={field.value.receiverAddress}
                                    detailAddress={field.value.receiverAddressDetail}
                                    onAddressChange={(v) => field.onChange({ ...field.value, receiverAddress: v, receiverAddressDetail: "" })}
                                    onAddressDetailChange={(v) => field.onChange({ ...field.value, receiverAddressDetail: v })}
                                />
                            )}
                        />
                        <Controller
                            name='shipment.receiverContact'
                            control={control}
                            render={({ field }) => <PhoneInput label='수취인 연락처*' value={field.value} onChange={field.onChange} />}
                        />
                        <Controller
                            name='shipment.receiverContactAlt'
                            control={control}
                            render={({ field }) => <PhoneInput label='수취인 예비 연락처' value={field.value} onChange={field.onChange} />}
                        />
                        <Controller
                            name='shipment.receiverMessage'
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label='배송메시지'
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                    </AdminPageSection>
                    <AdminPageSection>
                        <Controller
                            name='shipment.shipmentType'
                            control={control}
                            render={({ field }) => (
                                <RadioInput
                                    label='배송 타입'
                                    options={[{ label: "택배", value: "택배" }, { label: "퀵/화물", value: "퀵/화물" }, { label: "직배송", value: "직배송" }, { label: "방문수령", value: "방문수령" }, { label: "배송없음", value: "배송없음" }]}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Collapsable isOpen={isPaidShipment}>
                            <Controller
                                name='shipment.shipmentFee'
                                control={control}
                                render={({ field }) => <TextInput label='배송비' icon="₩" width={120} type='tel' value={field.value} onChange={field.onChange} />}
                            />
                        </Collapsable>
                    </AdminPageSection>
                </div>
                <div className={styles['right']}>
                    <AdminPageSectionWithActionButton
                        title='판매 정보'
                        actions={[]}
                    >
                        <Controller
                            name='seller'
                            control={control}
                            render={({ field }) => (
                                <RadioInput
                                    label='판매자*'
                                    options={[{ label: "이담", value: "이담" }, { label: "상플", value: "상플" }]}
                                    value={field.value!}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name='channel'
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    label='판매채널*'
                                    options={channels.map(c => ({ label: c.name, value: c.id }))}
                                    value={field.value?.id ?? null}
                                    onChange={(id) => {
                                        const selected = channels.find(c => c.id === id) || null
                                        field.onChange(selected)
                                    }}
                                />
                            )}
                        />
                    </AdminPageSectionWithActionButton>
                    <AdminPageSectionWithActionButton
                        title='결제 정보'
                        actions={[
                            { label: "상세정보", onClick: () => { } },
                            { label: "상세정보2", onClick: () => { } },
                            { label: "상세정보3", onClick: () => { } },
                            { label: "상세정보4", onClick: () => { } },
                        ]}
                    >
                        <Controller
                            name='purchaseType'
                            control={control}
                            render={({ field }) => (
                                <RadioInput
                                    label='결제 수단*'
                                    options={[
                                        { label: "신용거래", value: "신용거래" },
                                        { label: "무통장 입금", value: "무통장 입금" },
                                        { label: "카드결제", value: "카드결제" },
                                        { label: "현금결제", value: "현금결제" },
                                    ]} value={field.value} onChange={field.onChange} />
                            )}
                        />
                        <Controller
                            name='purchaseState'
                            control={control}
                            render={({ field }) => (
                                <RadioInput
                                    label='결제 상태*'
                                    options={[
                                        { label: "결제대기", value: "결제대기" },
                                        { label: "결제완료", value: "결제완료" },
                                    ]} value={field.value} onChange={field.onChange} />
                            )}
                        />
                    </AdminPageSectionWithActionButton>
                    <AdminPageSectionWithActionButton
                        title='구매 정보'
                        actions={[]}
                    >
                        <Controller
                            name='channel'
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    label='판매채널*'
                                    options={channels.map(c => ({ label: c.name, value: c.id }))}
                                    value={field.value?.id ?? null}
                                    onChange={(id) => {
                                        const selected = channels.find(c => c.id === id) || null
                                        field.onChange(selected)
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name='buyer'
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    label='구매자'
                                    options={companies.map(c => ({ label: c.name!, value: c.id! }))}
                                    value={field.value?.id ?? null}
                                    onChange={(id) => {
                                        const selected = companies.find(c => c.id === id) || null
                                        field.onChange(selected)
                                    }}
                                />
                            )}
                        />
                    </AdminPageSectionWithActionButton>
                </div>
            </div>
        </div>
    )
}