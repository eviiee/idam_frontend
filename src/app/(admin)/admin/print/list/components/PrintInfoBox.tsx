import { PrintInfo } from '@/types/print';
import styles from './printInfoBox.module.scss'
import { toCommaSeparated } from '@/services/common/common';
import Button from '@/components/common/ui/button/Button';



export default function PrintInfoBox({ printInfo }: { printInfo: PrintInfo }) {
    return (
        <div className={styles['print-list-admin-page__print-info-box']}>
            <div className={styles['print-info-box__state']}>{printInfo.printState}</div>
            <img src={printInfo.printImage} alt={printInfo.printName} />
            <div className={styles['print-info-box__name']}>{printInfo.printName}</div>
            <ul className={styles['print-info-box__item-list']}>
                {printInfo.items?.map((item, i) => <li key={i}>{item.productOption.id} {toCommaSeparated(item.quantity)}개</li>)}
            </ul>
            {printInfo.printState === '시안 확인중' ? <Button href={`./upload?id=${printInfo.id}`} simpleLink>업로드</Button> : <div className={styles['print-info-box__download-button']}>다운로드</div>}
        </div>
    )
}