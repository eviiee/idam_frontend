
import styles from './companyDetailPage.module.scss'
import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader';
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection';
import { notFound } from 'next/navigation';
import { Company } from '@/types/partner';
import getCompanyInfoAdmin from '@/services/admin/getCompanyInfoAdmin';
import { serverApi } from '@/services/settings';
import TextInput from '@/components/common/ui/input/textinput/TextInput';
import Button from '@/components/common/ui/button/Button';
import SubmitButton from '@/components/common/ui/button/submitButton.tsx/SubmitButton';

interface PageProps {
    params: { id: string }
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + process.env.NEXT_PUBLIC_API_COMPANY!

async function saveCompany(formData: FormData) {

    'use server'

    const id = formData.get('id')
    const payload = {
        id: Number(id) || undefined,
        name: formData.get('name'),
        address: formData.get("address"),
        contact: formData.get("contact"),
        email: formData.get("email"),
        bizRegNum: formData.get("bizRegNum"),
    }

    const api = serverApi
    try {
        const res = await (id === 'new' ? api.post(API_URL, payload) :  api.put(API_URL, payload))
        if (res.status === 200) {
            alert("저장 성공")
        } else {
            console.log(res.data.error)
        }
    } catch (e) {
        console.debug(e)
        return
    }


}

export default async function CompanyDetailPage({ params }: PageProps) {


    const id = (await params).id
    const company = await getCompanyInfoAdmin(id)
    const isNew = !(company)

    return (
        <div className={styles['company-detail-page']}>
            <AdminPageHeader title={isNew ? '신규 거래처' : '거래처 정보 수정'} />
            <form action={saveCompany}>
                <AdminPageSection label='거래처 정보' collapsable>
                    <input defaultValue={id} readOnly name='id' style={{display:'none'}} />
                    <TextInput label='거래처명' name='name' maxLength={50} defaultValue={company?.name || ""} required />
                    <TextInput label='주소' name='address' maxLength={300} defaultValue={company?.address || ""} />
                    <TextInput label='연락처' name='contact' maxLength={12} defaultValue={company?.contact || ""} type='tel' />
                    <TextInput label='이메일' name='email' defaultValue={company?.email || ""} />
                    <TextInput label='사업자 등록번호' name='bizRegNum' maxLength={10} defaultValue={company?.bizRegNum || ""} type='number' />
                </AdminPageSection>
                <SubmitButton />
            </form>
        </div>
    )
}