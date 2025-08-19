'use client'

import AdminPageHeader from "@/components/admin/ui/adminPageHeader/AdminPageHeader";
import AdminPageSection from "@/components/admin/ui/adminPageSection/AdminPageSection";
import styles from './printlist.module.scss'
import { toCommaSeparated } from "@/services/common/common";
import Button from "@/components/common/ui/button/Button";
import { useEffect, useState } from "react";
import { PrintInfo, PrintState } from "@/types/print";
import { getPrintListAdmin } from "@/services/admin/getPrintListAdmin";
import PrintInfoBox from "./components/PrintInfoBox";

export default function PrintListPage() {

    const [filter, setFilter] = useState<PrintState>('인쇄 대기')
    const [loading, setLoading] = useState<boolean>(true)
    const [printList, setPrintList] = useState<PrintInfo[]>([])

    useEffect(() => {
        loadPrintList()
    }, [filter])

    const loadPrintList = async () => {
        setLoading(true)
        const printList = await getPrintListAdmin()
        setLoading(false)
        setPrintList(printList)
    }

    return (
        <div>
            <AdminPageHeader title="인쇄 시안" />
            <AdminPageSection className={styles['admin-print-list-page__filter-wrap']}>
                <div>현재 인쇄 필요한 수량 : {toCommaSeparated(154865)}</div>
                <Button className={styles['admin-print-list-page__filter']} onClick={() => setFilter('시안 확인중')} color={filter === '시안 확인중' ? 'blue' : 'grey'}>✒️ 시안 확인중</Button>
                <Button className={styles['admin-print-list-page__filter']} onClick={() => setFilter('인쇄 대기')} color={filter === '인쇄 대기' ? 'blue' : 'grey'}>⏳ 인쇄 대기</Button>
                <Button className={styles['admin-print-list-page__filter']} onClick={() => setFilter('인쇄 완료')} color={filter === '인쇄 완료' ? 'blue' : 'grey'}>✔️ 인쇄 완료</Button>
            </AdminPageSection>
            <AdminPageSection label="시안 목록" className={styles['admin-print-list__wrap']} transparent>
                {
                    printList.map((printItem, i) => <PrintInfoBox printInfo={printItem} key={i} />)
                }
            </AdminPageSection>
        </div>
    )
}