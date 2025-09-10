import { OrderedItem } from '@/types/order';
import styles from '../adminProductConsole.module.scss'
import Checkbox from '@/components/common/ui/button/checkbox/CheckBox';
import { formatKRW } from '@/services/common/common';

interface ProductOptionListItemProps {
    item: OrderedItem;
    selected: boolean;
    onSelect: () => void;
    onDeselect: () => void;
    onChange: (p: OrderedItem, price: number, quantity: number) => void;
}

export default function OrderedOptionListItem({
    item,
    selected,
    onSelect,
    onDeselect,
    onChange,
}: ProductOptionListItemProps) {
    return <tr className={styles['ordered-product-option']}>
        <td className={styles['ordered-product-option__check']}><Checkbox selected={selected} onSelect={onSelect} onDeselect={onDeselect} /></td>
        <td className={styles['ordered-product-option__name']}><span>{item.optionName}</span></td>
        <td className={styles['ordered-product-option__price']}><input type='text' value={item.price} onChange={(e) => onChange(item, Number(e.target.value), item.quantity)} /></td>
        <td className={styles['ordered-product-option__quantity']}><input type='text' value={item.quantity} onChange={(e) => onChange(item, item.price, Number(e.target.value))} /></td>
        <td className={styles['ordered-product-option__total']}><span>{formatKRW(item.price! * item.quantity)}</span></td>
    </tr>
}