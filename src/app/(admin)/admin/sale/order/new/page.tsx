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
import { Controller, useForm } from 'react-hook-form'
import Collapsable from '@/components/common/ui/wrapper/collapsable/Collapsable'
import OrderDefaultInfoForm from './components/DefaultInfoForm'
import AddressInput from '@/components/common/ui/input/addressInput/AddressInput'

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
                shipmentType:"택배",
                shipper:null,
                shipperContact:"",
                shipperContactAlt:"",
                shipperAddress:"",
                shipperAddressDetail:"",
                receiverName:"",
                receiverContact:"",
                receiverContactAlt:"",
                receiverAddress:"",
                receiverAddressDetail:"",
                receiverMessage:"",
                shipmentFee:3000,
            }
        }
    })

    const buyer = watch("buyer")
    const seller = watch("seller")
    const isDeposit = watch("purchaseType") === '무통장 입금'

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
            <AdminPageSection>
                <Controller
                    name='shipment'
                    control={control}
                    render={({ field }) => (
                        <AddressInput
                            label='수취인 주소'
                            address={field.value.receiverAddress}
                            detailAddress={field.value.receiverAddressDetail}
                            onAddressChange={(v) => {
                                setValue("shipment.receiverAddressDetail", "")
                                setValue("shipment.receiverAddress", v)
                            }}
                            onAddressDetailChange={(v) => setValue("shipment.receiverAddressDetail", v)}
                        />
                    )}
                />
            </AdminPageSection>
        </div>
    )
}

function Separator() {
    return <div className={styles.separator}></div>
}