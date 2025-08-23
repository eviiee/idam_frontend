import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader'
import styles from './managePhoneModelPage.module.scss'
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection'
import SubmitButton from '@/components/common/ui/button/submitButton.tsx/SubmitButton'
import { getDetailedPhoneModelsFromServer } from '@/services/common/getPhoneModels'
import ManagePhoneModelPageContent from './components/managePhoneModelPageContent'

const getPhoneModels = async () => {
    'use server'
    const data = await getDetailedPhoneModelsFromServer()
    return data
}

export default async function NewPhoneModelPage() {

    const phoneModels = await getPhoneModels()

    return (
        <div className={styles['new-phone-model-page']}>
            <ManagePhoneModelPageContent initialPhoneModels={phoneModels} />
        </div>
    )
}