import AdminPageSection from "@/components/admin/ui/adminPageSection/AdminPageSection"
import RadioInput from "@/components/common/ui/input/radio/RadioInput"
import SelectInput from "@/components/common/ui/input/selectInput/SelectInput"
import Collapsable from "@/components/common/ui/wrapper/collapsable/Collapsable"
import { Channel, Company } from "@/types/partner"
import { Control, Controller } from "react-hook-form"

type DefaultInfoProps = {
    control: Control<any>
    channels: Channel[]
    companies: Company[]
    isDeposit: boolean
}

export default function OrderDefaultInfoForm({
    control,
    channels,
    companies,
    isDeposit,
}: DefaultInfoProps) {
    return (
        <AdminPageSection>
            {/* 구매자명 */}

            {/* 인쇄 정보 */}
            {/* 포장 정보 */}
            {/*  */}
            <Controller
                name='seller'
                control={control}
                render={({ field }) => (
                    <RadioInput
                        label='판매자'
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
                        label='판매채널'
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
            <Controller
                name='purchaseType'
                control={control}
                render={({ field }) => (
                    <RadioInput
                        label='결제 수단'
                        options={[
                            { label: "신용거래", value: "신용거래" },
                            { label: "무통장 입금", value: "무통장 입금" },
                            { label: "카드결제", value: "카드결제" },
                            { label: "현금결제", value: "현금결제" },
                        ]} value={field.value} onChange={field.onChange} />
                )}
            />
            <Collapsable isOpen={isDeposit}>
                <Controller
                    name='purchaseState'
                    control={control}
                    render={({ field }) => (
                        <RadioInput
                            label='결제 상태'
                            options={[
                                { label: "결제대기", value: "결제대기" },
                                { label: "결제완료", value: "결제완료" },
                            ]} value={field.value} onChange={field.onChange} />
                    )}
                />
            </Collapsable>
        </AdminPageSection>
    )
}