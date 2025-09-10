import Button from '@/components/common/ui/button/Button';
import { ReceiptText, Printer } from 'lucide-react';
import styles from '../newOrderPage.module.scss'
import { Order } from '@/types/order';
import Tag from '@/components/common/ui/tag/Tag';

interface OrderDetailPageHeaderProps {
    id: string | number | null;
    orderedAt: string | null;
    onCancel: () => void;
    onReturn: () => void;
    isNew: boolean;
}

export default function OrderDetailPageHeader({
    id,
    orderedAt,
    onCancel,
    onReturn,
    isNew
}: OrderDetailPageHeaderProps) {
    return (
        <section className={styles['order-detail-page__header']}>
            <button className={styles['order-detail-page__header__back-button']}>⬅</button>
            <div className={styles['order-detail-page__header__title-section']}>
                <div className={styles['order-detail-page__header__title']}>
                    <h1 className={styles['order-detail-page__header__title']}>{id}</h1>
                    <div className={styles['order-detail-page__header__title__tags']}>
                        <Tag>결제대기</Tag>
                        <Tag type='blue'>결제완료</Tag>
                        <Tag type="green">배송중</Tag>
                        <Tag type='yellow'>반품됨</Tag>
                        <Tag type='red'>취소됨</Tag>
                    </div>
                </div>
                <div className={styles['order-detail-page__header__title__datetime']}>{orderedAt}</div>
            </div>
            <div className={styles['order-detail-page__header__buttons']}>
                {
                    isNew ?
                        <Button color='blue' onClick={() => { }}>주문 확정</Button> :
                        <>
                            <Button onClick={() => { }} hoverColor='#f8f9fb'><ReceiptText size={"1rem"} /></Button>
                            <Button onClick={() => { }} hoverColor='#f8f9fb'><Printer size={"1rem"} /></Button>
                            <Button onClick={() => { }} backgroundColor='#e0e4e8' hoverColor='#d1d7de'>출고수량 변경</Button>
                            <Button onClick={onCancel} backgroundColor='#e0e4e8' hoverColor='#d1d7de'>취소</Button>
                            <Button onClick={onReturn} backgroundColor='#e0e4e8' hoverColor='#d1d7de'>반품</Button>
                        </>
                }
            </div>
        </section>
    )
}