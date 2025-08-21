
import styles from './channelDetailPage.module.scss'
import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader';
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection';
import getCompanyInfoAdmin from '@/services/admin/getCompanyInfoAdmin';
import { serverApi } from '@/services/settings';
import TextInput from '@/components/common/ui/input/textinput/TextInput';
import getChannelInfoAdmin from '@/services/admin/getChannelInfoAdmin';
import SubmitButton from '@/components/common/ui/button/submitButton.tsx/SubmitButton';

interface PageProps {
    params: { id: string }
}

export default async function CompanyDetailPage({ params }: PageProps) {


    const id = (await params).id
    const channel = await getChannelInfoAdmin(id)
    const isNew = !(channel)

    return (
        <div className={styles['channel-detail-page']}>
            <AdminPageHeader title={isNew ? '신규 채널' : '채널 정보 수정'} />
            <form>
                <AdminPageSection label='기본 정보' collapsable>
                    <input defaultValue={id} readOnly name='id' style={{ display: 'none' }} />
                    <TextInput label='채널 이름' name='name' maxLength={20} initialValue={channel?.name || ""} required />
                    <TextInput label='수수료율' name='fee' min={0} max={100} initialValue={(channel?.fee || "").toString()} type='number' step={0.01} required />
                </AdminPageSection>
                <AdminPageSection label='엑셀 정보' collapsable>
                    <TextInput label='엑셀 파일명' name='excelFileName' maxLength={100} initialValue={channel?.excelFileName || ""} />
                    <TextInput label='시트 번호' name='excelSheetNum' type='number' min={0} initialValue={(channel?.excelSheetNum ?? "").toString()} />
                    <TextInput label='시작 행' name='excelStartRow' type='number' min={0} initialValue={(channel?.excelStartRow ?? "").toString()} />

                    <TextInput label='주문 ID 컬럼' name='orderIdColumn' type='number' min={0} initialValue={(channel?.orderIdColumn ?? "").toString()} />
                    <TextInput label='상품명 컬럼' name='productNameColumn' type='number' min={0} initialValue={(channel?.productNameColumn ?? "").toString()} />
                    <TextInput label='상품 옵션 컬럼' name='productOptionColumn' type='number' min={0} initialValue={(channel?.productOptionColumn ?? "").toString()} />
                    <TextInput label='상품 코드 컬럼' name='productCodeColumn' type='number' min={0} initialValue={(channel?.productCodeColumn ?? "").toString()} />
                    <TextInput label='가격 컬럼' name='priceColumn' type='number' min={0} initialValue={(channel?.priceColumn ?? "").toString()} />
                    <TextInput label='수량 컬럼' name='quantityColumn' type='number' min={0} initialValue={(channel?.quantityColumn ?? "").toString()} />
                    <TextInput label='총액 컬럼' name='totalPriceColumn' type='number' min={0} initialValue={(channel?.totalPriceColumn ?? "").toString()} />
                    <TextInput label='주문일시 컬럼' name='orderedAtColumn' type='number' min={0} initialValue={(channel?.orderedAtColumn ?? "").toString()} />
                    <TextInput label='구매자 이름 컬럼' name='buyerNameColumn' type='number' min={0} initialValue={(channel?.buyerNameColumn ?? "").toString()} />
                    <TextInput label='구매자 연락처 컬럼' name='buyerContactColumn' type='number' min={0} initialValue={(channel?.buyerContactColumn ?? "").toString()} />
                    <TextInput label='구매자 메시지 컬럼' name='buyerMessageColumn' type='number' min={0} initialValue={(channel?.buyerMessageColumn ?? "").toString()} />
                    <TextInput label='수령자 이름 컬럼' name='receiverNameColumn' type='number' min={0} initialValue={(channel?.receiverNameColumn ?? "").toString()} />
                    <TextInput label='수령자 연락처 컬럼' name='receiverContactColumn' type='number' min={0} initialValue={(channel?.receiverContactColumn ?? "").toString()} />
                    <TextInput label='수령자 연락처(보조) 컬럼' name='receiverContactAltColumn' type='number' min={0} initialValue={(channel?.receiverContactAltColumn ?? "").toString()} />
                    <TextInput label='수령자 우편번호 컬럼' name='receiverZipColumn' type='number' min={0} initialValue={(channel?.receiverZipColumn ?? "").toString()} />
                    <TextInput label='수령자 주소 컬럼' name='receiverAddressColumn' type='number' min={0} initialValue={(channel?.receiverAddressColumn ?? "").toString()} />
                    <TextInput label='수령자 메시지 컬럼' name='receiverMessageColumn' type='number' min={0} initialValue={(channel?.receiverMessageColumn ?? "").toString()} />
                    <TextInput label='송장 번호 컬럼' name='invoiceColumn' type='number' min={0} initialValue={(channel?.invoiceColumn ?? "").toString()} />
                    <TextInput label='수수료 컬럼' name='feeColumn' type='number' min={0} initialValue={(channel?.feeColumn ?? "").toString()} />

                    <TextInput label='발송 주문 ID 컬럼' name='sOrderIdColumn' type='number' min={0} initialValue={(channel?.sOrderIdColumn ?? "").toString()} />
                    <TextInput label='발송 송장 번호 컬럼' name='sInvoiceColumn' type='number' min={0} initialValue={(channel?.sInvoiceColumn ?? "").toString()} />
                    <TextInput label='발송 택배사 컬럼' name='sCourierColumn' type='number' min={0} initialValue={(channel?.sCourierColumn ?? "").toString()} />
                </AdminPageSection>
                <SubmitButton />
            </form>
        </div>
    )
}