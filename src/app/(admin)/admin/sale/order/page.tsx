'use client'

import ActionButton from "@/components/admin/common/actionButton/ActionButton";
import AdminPageHeader from "@/components/admin/ui/adminPageHeader/AdminPageHeader";
import AdminPageSection from "@/components/admin/ui/adminPageSection/AdminPageSection";

export default function OrderListAdminPage() {
    return (
        <div>
            <AdminPageHeader title="주문 목록" buttonLabel="+ 주문서 생성" href="new" useButton />
            <AdminPageSection noPadding>
                <div>
                    <ActionButton onClick={()=>{}}>📥 엑셀 다운로드</ActionButton>
                </div>
            </AdminPageSection>
        </div>
    )
}