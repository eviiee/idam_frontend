import { PrintInfo, PrintState } from '@/types/print';
import styles from './printInfoBox.module.scss'
import { toCommaSeparated } from '@/services/common/common';
import Button from '@/components/common/ui/button/Button';
import clsx from 'clsx';



export default function PrintInfoBox({ printInfo }: { printInfo: PrintInfo }) {
    return (
        <div className={styles['print-list-admin-page__print-info-box']}>
            <PrintStateTag state={printInfo.printState} />
            <img src={printInfo.printImage} alt={printInfo.printName} />
            <div className={styles['print-info-box__name']}>{printInfo.printName}</div>
            <ul className={styles['print-info-box__item-list']}>
                {printInfo.items?.map((item, i) => <li key={i}>{item.productOption.id} {toCommaSeparated(item.quantity)}개</li>)}
            </ul>
            {printInfo.printState === '시안 확인중' ? <Button href={`./upload?id=${printInfo.id}`} simpleLink>업로드</Button> : <div className={styles['print-info-box__download-button']}>다운로드</div>}
        </div>
    )
}

function PrintStateTag({ state }: { state: PrintState }) {
    const color: { [key in PrintState]: string } = {
        '시안 확인중' : 'blue',
        '인쇄 대기' : 'yellow',
        '인쇄 완료' : 'green',
    }
    return (
        <div className={clsx(styles[color[state]], styles['print-info-box__state'])}>{state}</div>
    )
}