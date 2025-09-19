'use client';

import { PrintInfo, PrintItem } from '@/types/print';
import styles from '../newOrderPage.module.scss'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import RadioInput from '@/components/common/ui/input/radio/RadioInput';
import TextInput from '@/components/common/ui/input/textinput/TextInput';
import ImageInput from '@/components/common/ui/input/imageInput/ImageInput';
import TabSelect from '@/components/common/ui/tabs/TabSelect';
import FileInput from '@/components/common/ui/input/fileInput/FileInput';
import CollapsableTooltip from '@/components/common/ui/input/collapsableTooltip/CollapsableTooltip';

interface PrintModalContentProps {
    items: (number | string)[];
    prints: PrintInfo[];
    printItems: { [keys: string | number]: string | number };
    onPrintChange: (v: PrintInfo[]) => void;
    onPrintItemChange: (v: { [keys: string | number]: string | number }) => void;
    onCloseModal: () => void;
}

export default function PrintModalContent({ items, prints, printItems, onPrintChange, onPrintItemChange, onCloseModal }: PrintModalContentProps) {
    const [selectedPrintId, setSelectedPrintId] = useState<number | string | null>(null);
    const [printsFromServer, setPrintsFromServer] = useState<PrintInfo[]>(prints);
    const [query, setQuery] = useState('');

    const [currentTab, setCurrentTab] = useState<'new' | 'local' | 'server'>('new');

    const [printName, setPrintName] = useState('');
    const [printType, setPrintType] = useState<'레이저 각인' | '컬러 인쇄'>('레이저 각인');
    const [printState, setPrintState] = useState<'시안 확인중' | '인쇄 대기' | '인쇄 완료'>('시안 확인중');
    const [printImage, setPrintImage] = useState<File | null>(null);
    const [printDesign, setPrintDesign] = useState<File | null>(null);

    useEffect(() => {
        if (currentTab === 'new') setSelectedPrintId(`new${Date.now()}`);
        else setSelectedPrintId(null);
    }, [currentTab])

    const handleConfirm = () => {
        if (selectedPrintId === null) return;
        if (currentTab === 'new') {
            if (!printName) {
                toast.error("인쇄 이름을 입력해주세요.");
                return;
            }
            if (!printImage || !printDesign) {
                setPrintState('시안 확인중');
            } else if (printImage && printDesign && printState === '시안 확인중') {
                setPrintState('인쇄 대기');
            }
            const newPrint: PrintInfo = {
                id: selectedPrintId,
                printName,
                printType,
                printState,
                printImage: printImage ? URL.createObjectURL(printImage) : '',
                printDesign: printDesign ? URL.createObjectURL(printDesign) : '',
            }
            onPrintChange([...prints, newPrint]);
        }
        let newPrintItems = { ...printItems };
        items.forEach(itemId => {
            newPrintItems[itemId] = selectedPrintId;
        })
        onPrintItemChange(newPrintItems);
        onCloseModal();
    }

    return (
        <div className={styles.printModalContent}>
            <TabSelect
                tabs={[
                    { label: '신규 등록', value: 'new' },
                    { label: '현재 주문', value: 'local' },
                    { label: '서버 검색', value: 'server' },
                ]}
                value={currentTab}
                onChange={(v) => setCurrentTab(v as 'new' | 'local' | 'server')}
            />
            <div className={styles.form}>
                {currentTab === 'new' && (
                    <>
                        <CollapsableTooltip
                            icon="🏷"
                            title="인쇄 신규 등록"
                            content={[
                                "- 신규 인쇄를 등록합니다.",
                                "- 검색어 등록시 추후 인쇄 검색에 용이합니다.",
                            ]}
                            initialOpen={false}
                        />
                        <TextInput
                            label="인쇄 이름"
                            value={printName}
                            onChange={(e) => setPrintName(e.target.value)}
                            maxLength={50}
                            placeholder="인쇄 이름을 입력하세요"
                        />
                        <RadioInput
                            label="인쇄 타입"
                            options={[
                                { label: '레이저 각인', value: '레이저 각인' },
                                { label: '컬러 인쇄', value: '컬러 인쇄' }
                            ]}
                            value={printType}
                            onChange={(v) => setPrintType(v as '레이저 각인' | '컬러 인쇄')}
                        />
                        <ImageInput
                            file={printImage}
                            setFile={setPrintImage}
                            square={false}
                            width={'100%'}
                            height={300}
                        />
                        <FileInput
                            label='AI 파일 업로드 / 드롭'
                            file={printDesign}
                            setFile={setPrintDesign}
                            accept=".ai"
                            maxSize={10}
                            description='AI 파일만 업로드 가능 (최대 10MB)'
                        />
                        <RadioInput
                            label="인쇄 상태"
                            options={[
                                { label: '시안 확인중', value: '시안 확인중' },
                                { label: '인쇄 대기', value: '인쇄 대기' },
                                { label: '인쇄 완료', value: '인쇄 완료' }
                            ]}
                            value={printState}
                            onChange={(v) => setPrintState(v as '시안 확인중' | '인쇄 대기' | '인쇄 완료')}
                        />
                    </>
                )}
                {currentTab === 'local' && (
                    <>
                        <CollapsableTooltip
                            icon="🏷"
                            title="현재 주문 인쇄 목록"
                            content={[
                                "- 작성중인 주문서의 다른 품목에 적용된 인쇄 정보 목록입니다.",
                            ]}
                            initialOpen={false}
                        />
                    </>
                )}
                {currentTab === 'server' && (
                    <>
                        <CollapsableTooltip
                            icon="🏷"
                            title="서버에서 검색"
                            content={[
                                "- 과거 인쇄 정보를 검색할 수 있습니다.",
                                "- 인쇄 이름, 주문자/수취인명 및 검색어로 검색해주세요.",
                            ]}
                            initialOpen={false}
                        />
                        <input type="text" placeholder="인쇄 이름으로 검색" value={query} onChange={(e) => setQuery(e.target.value)} className={styles.searchInput} />
                        <div className={styles.printItems}>
                            {printsFromServer.filter(p => p.printName.includes(query)).map(print => (
                                <div
                                    key={print.id}
                                    className={`${styles.printItem} ${selectedPrintId === print.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedPrintId(print.id)}
                                >
                                    <span>{print.printName} ({print.printType}) - {print.printState}</span>
                                </div>
                            ))}
                            {printsFromServer.filter(p => p.printName.includes(query)).length === 0 && (
                                <p>검색된 인쇄가 없습니다.</p>
                            )}
                        </div>
                    </>
                )}

            </div>
            <div className={styles.modalActions}>
                <button onClick={onCloseModal}>취소</button>
                <button className={styles.confirm} onClick={handleConfirm} disabled={selectedPrintId === null}>확인</button>
            </div>
        </div>
    )
}