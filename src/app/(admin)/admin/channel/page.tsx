import AdminPageHeader from '@/components/admin/ui/adminPageHeader/AdminPageHeader'
import styles from './channelListPage.module.scss'
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection'



export default function ChannelListPage() {
    return (
        <div className={styles['channel-list-page']}>
            <AdminPageHeader title='판매 채널' useButton href='channel/new' buttonLabel='+ 신규 등록' />
            <AdminPageSection label='채널 목록'></AdminPageSection>
        </div>
    )
}