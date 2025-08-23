'use client'

import AdminPageHeader from "@/components/admin/ui/adminPageHeader/AdminPageHeader";
import AdminPageSection from "@/components/admin/ui/adminPageSection/AdminPageSection";
import { getPhoneModels } from "@/services/common/getPhoneModels";
import { SimplePhoneModel } from "@/types/product";
import { useEffect, useState } from "react";


export default function PhoneModelAdminPage() {

    const [phoneModels, setPhoneModels] = useState<SimplePhoneModel[]>([])

    useEffect(()=>{
        updatePhoneModels()
    },[])

    const updatePhoneModels = async () => {
        const res = await getPhoneModels()
        console.debug(res)
        setPhoneModels(res)
    }

    return <div>
        <AdminPageHeader title="휴대폰 기종" buttonLabel="관리하기" href="model/manage" useButton />
        <AdminPageSection label="기종 목록">
            {phoneModels.map((v, i)=><div key={i}>{v.displayName}</div>)}
        </AdminPageSection>
    </div>
}