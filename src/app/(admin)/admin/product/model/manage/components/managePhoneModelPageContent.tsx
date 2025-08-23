'use client'

import AdminPageHeader from "@/components/admin/ui/adminPageHeader/AdminPageHeader";
import AdminPageSection from "@/components/admin/ui/adminPageSection/AdminPageSection";
import { PhoneModel } from "@/types/product";
import NewPhoneModel from "./newPhoneModel";
import { useState } from "react";
import PhoneModelsManager from "./phoneModelsManager";
import SubmitButton from "@/components/common/ui/button/submitButton.tsx/SubmitButton";
import modifyPhoneModelsAdmin from "@/services/admin/modifyPhoneModels";

export default function ManagePhoneModelPageContent({ initialPhoneModels }: { initialPhoneModels: PhoneModel[] }) {

    const [phoneModels, setPhoneModels] = useState<PhoneModel[]>(initialPhoneModels)
    const [deleteList, setDeleteList] = useState<number[]>([])

    const addNewPhoneModel = (v: PhoneModel) => { setPhoneModels([v, ...phoneModels]) }
    const removePhoneModel = (id: number | string) => {
        if (typeof (id) === 'number') setDeleteList([...deleteList, id])
        setPhoneModels(phoneModels.filter(m => m.id !== id))
    }
    const handleChange = (index: number, newData: PhoneModel) => setPhoneModels(phoneModels.map((m, i) => i === index ? newData : m))

    const saveData = () => modifyPhoneModelsAdmin(phoneModels, deleteList).then().catch(r => alert(r))

    return (
        <>
            <AdminPageHeader title='기종 관리' />
            <AdminPageSection label='신규 등록'><NewPhoneModel onAdd={addNewPhoneModel} /></AdminPageSection>
            <PhoneModelsManager onChange={handleChange} phoneModels={phoneModels} onRemove={removePhoneModel} onReorder={setPhoneModels} />
            <SubmitButton onClick={saveData} />
        </>
    )
}