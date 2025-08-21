'use client'

import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader'
import styles from './companyListPage.module.scss'
import { useEffect, useState } from 'react'
import { Company } from '@/types/partner'
import { getCompanies } from '@/services/admin/getCompanyInfoAdmin'
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection'

export default function CompanyListPage() {

    const [loading, setLoading] = useState(true)
    const [companies, setCompanies] = useState<Company[]>([])

    const [limit, setLimit] = useState<number>(20)

    useEffect(()=>{
        updateCompanies()
    },[])

    const updateCompanies = async () => {
        const newCompanies = await getCompanies(limit)
        setCompanies(newCompanies)
    }

    return (
        <div className={styles['company-list-page']}>
            <AdminPageHeader title='거래처 목록' useButton buttonLabel='+ 신규 등록' href='company/new' />
            <AdminPageSection noPadding>
                {companies.map((c)=><div key={c.id}>{c.name}</div>)}
            </AdminPageSection>
        </div>
    )
}