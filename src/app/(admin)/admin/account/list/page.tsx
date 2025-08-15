
'use client'

import styles from './accountlist.module.scss'
import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader'
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection'


export default function AccountListPage() {
    return <div>
        <AdminPageHeader title='계정' buttonLabel='+ 신규 등록' href='./new' useButton />
        <AdminPageSection label='관리자 계정'></AdminPageSection>
        <AdminPageSection label='일반 계정'></AdminPageSection>
    </div>
}