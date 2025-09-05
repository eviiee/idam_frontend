'use client'

import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader'
import styles from './newOrderPage.module.scss'
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection'
import { useEffect, useState } from 'react'
import RadioInput from '@/components/common/ui/input/radio/RadioInput'
import SelectInput from '@/components/common/ui/input/selectInput/SelectInput'
import { Channel, Company } from '@/types/partner'
import TextInput from '@/components/common/ui/input/textinput/TextInput'
import { Order, PurchaseType } from '@/types/order'
import { Controller, useForm, useWatch } from 'react-hook-form'
import Collapsable from '@/components/common/ui/wrapper/collapsable/Collapsable'
import OrderDefaultInfoForm from './components/DefaultInfoForm'
import AddressInput from '@/components/common/ui/input/addressInput/AddressInput'
import { PhoneInput } from '@/components/common/ui/input/telInput/TelInput'

export default function NewOrderAdminPage() {

    const [channels, setChannels] = useState<Channel[]>(Array.from({ length: 500 }, (_, i) => ({
        id: i,
        name: `채널${i}`,
        fee: 0
    })))
    const [companies, setCompanies] = useState<Company[]>(Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `회사${i}`,
    })))
    const [buyerName, setBuyerName] = useState<string>("")

    const [sellerName, setSellerName] = useState<string>("")
    const [sellerContact, setSellerContact] = useState<string>("")
    const [sellerContactAlt, setSellerContactAlt] = useState<string>("")
    const [sellerAddress, setSellerAddress] = useState<string>("")

    const [receiverName, setReceiverName] = useState<string>("")
    const [receiverContact, setReceiverContact] = useState<string>("")
    const [receiverContactAlt, setReceiverContactAlt] = useState<string>("")
    const [receiverAddress, setReceiverAddress] = useState<string>("")
    const [receiverMessage, setReceiverMessage] = useState<string>("")

    const [useDefaultBuyerInfo, setUseDefaultBuyerInfo] = useState<boolean>(true)
    const [useDefaultSellerInfo, setUseDefaultSellerInfo] = useState<boolean>(true)
    const [purchaseType, setPurchaseType] = useState<PurchaseType>("신용거래")

    const { setValue, register, handleSubmit, control, watch, formState: { errors } } = useForm<Order>({
        defaultValues: {
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
                shipperContact: "",
                shipperContactAlt: "",
                shipperAddress: "",
                shipperAddressDetail: "",
                receiverName: "",
                receiverContact: "",
                receiverContactAlt: "",
                receiverAddress: "",
                receiverAddressDetail: "",
                receiverMessage: "",
                shipmentFee: 3000,
            }
        }
    })

    const buyer = watch("buyer")
    const seller = watch("seller")
    const isDeposit = watch("purchaseType") === '무통장 입금'
    const shipmentType = watch("shipment.shipmentType")
    const isPaidShipment = shipmentType === "택배" || shipmentType === "퀵/화물"

    // 기본정보 사용 선택시 정보 초기화
    useEffect(() => {
        // if (!useDefaultBuyerInfo || !buyer) 
    }, [useDefaultBuyerInfo])
    useEffect(() => { }, [useDefaultSellerInfo])

    // 결제 수단 변경시 결제상태 초기화
    useEffect(() => {
        if (isDeposit) setValue("purchaseState", "결제대기")
        else setValue("purchaseState", "결제완료")
    }, [isDeposit])

    return (
        <div className={styles['new-order-page']}>
            <AdminPageHeader title='주문서 작성' />
            <OrderDefaultInfoForm control={control} companies={companies} channels={channels} isDeposit={isDeposit} />
            <AdminPageSection grid columns={2} columnGap={30}>
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
    )
}

function Separator() {
    return <div className={styles.separator}></div>
}