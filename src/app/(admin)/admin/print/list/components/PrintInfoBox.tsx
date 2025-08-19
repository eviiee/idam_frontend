import { PrintInfo, PrintState, PrintType } from '@/types/print';
import styles from './printInfoBox.module.scss'
import { toCommaSeparated } from '@/services/common/common';
import Button from '@/components/common/ui/button/Button';
import clsx from 'clsx';



export default function PrintInfoBox({ printInfo }: { printInfo: PrintInfo }) {

    const actionButton1 = printInfo.printState === '시안 확인중' ? <div></div> : <a href='' className={styles['print-info-box__download-button1']}>시안이미지</a>
    const actionButton2 = printInfo.printState === '시안 확인중' ? <a href={`./upload?id=${printInfo.id}`} className={styles['print-info-box__upload-button']}>시안 업로드</a> : <a href='' className={styles['print-info-box__download-button2']}>인쇄파일</a>

    return (
        <div className={styles['print-list-admin-page__print-info-box']}>
            <img src={printInfo.printImage} alt={printInfo.printName} />
            <div className={styles['print-info-box__name']}>{printInfo.printName}</div>
            <div className={styles['print-info-box__tag-wrap']}>
                <PrintStateTag state={printInfo.printState} />
                <PrintTypeTag type={printInfo.printType} />
            </div>
            <ul className={styles['print-info-box__item-list']}>
                {printInfo.items?.map((item, i) => <li key={i}>{item.productOption.id} {toCommaSeparated(item.quantity)}개</li>)}
            </ul>
            <div className={styles['print-info-box__action-button-wrap']}>{actionButton1}{actionButton2}</div>
        </div>
    )
}

function PrintStateTag({ state }: { state: PrintState }) {
    const color: { [key in PrintState]: string } = {
        '시안 확인중': 'red',
        '인쇄 대기': 'blue',
        '인쇄 완료': 'green',
    }
    return (
        <div className={clsx(styles[color[state]], styles['print-info-box__state'])}>{state}</div>
    )
}

function PrintTypeTag({ type }: { type: PrintType }) {
    const color: { [key in PrintType]: string } = {
        '레이저 각인': 'black',
        '컬러 인쇄': 'orange',
    }
    return (
        <div className={clsx(styles[color[type]], styles['print-info-box__type'])}>{type}</div>
    )
}