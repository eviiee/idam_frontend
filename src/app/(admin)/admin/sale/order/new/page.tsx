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
import { useForm } from 'react-hook-form'

export default function NewOrderAdminPage() {

    const [seller, setSeller] = useState<"이담" | "상플">("이담")
    const [channel, setChannel] = useState<number | null>(null)
    const [channels, setChannels] = useState<Channel[]>(Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `채널${i}`,
        fee: 0
    })))
    const [buyer, setBuyer] = useState<Company | null>(null)
    const [buyers, setBuyers] = useState<Company[]>(Array.from({ length: 100 }, (_, i) => ({
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

    const {register, handleSubmit, control, formState:{errors}} = useForm<Order>({
        defaultValues: {
            seller:"이담",
            buyer: buyers[0],
            buyerName: "",
            purchaseType: "신용거래",
            purchaseState: "결제완료",
            needPrinting: false,
            printState: null,
            needPackaging: false,
            packagingState: null,
            memo:"",
        }
    })

    // 기본정보 사용 선택시 정보 초기화
    useEffect(() => {
        // if (!useDefaultBuyerInfo || !buyer) 
    }, [useDefaultBuyerInfo])
    useEffect(() => { }, [useDefaultSellerInfo])

    const findAndSetBuyer = (v: number | null) => {
        const newBuyer = v !== null ? buyers.find(b => b.id === v)! : null
        setBuyer(newBuyer)
    }

    return (
        <div className={styles['new-order-page']}>
            <AdminPageHeader title='주문서 작성' />
            <AdminPageSection>
                <RadioInput label='판매자' options={[{ label: "이담", value: "이담" }, { label: "상플", value: "상플" }]} value={seller} onChange={setSeller} />
                <SelectInput
                    label='판매채널'
                    options={channels.map(c => ({ label: c.name, value: c.id }))}
                    value={channel}
                    onChange={setChannel}
                />
                <Separator />
                <SelectInput
                    label='구매자'
                    options={buyers.map(c => ({ label: c.name!, value: c.id! }))}
                    value={buyer}
                    onChange={setBuyer}
                />
                <TextInput />
                {/* 구매자명 */}
                <RadioInput label='결제 수단' options={[{ label: "신용거래", value: "신용거래" }, { label: "무통장", value: "무통장" }]} value={purchaseType} onChange={setPurchaseType} />

                {/* 인쇄 정보 */}
                {/* 포장 정보 */}
                {/*  */}
            </AdminPageSection>
        </div>
    )
}

function Separator() {
    return <div className={styles.separator}></div>
}