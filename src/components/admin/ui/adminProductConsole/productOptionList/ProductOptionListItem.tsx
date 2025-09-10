'use client'

import Checkbox from '@/components/common/ui/button/checkbox/CheckBox';
import { SearchedProductOption } from '../AdminProductConsole'
import styles from '../adminProductConsole.module.scss'
import { formatKRW, toCommaSeparated } from '@/services/common/common';

interface ProductOptionListItemProps {
    productOption: SearchedProductOption;
    selected: boolean;
    onSelect: () => void;
    onDeselect: () => void;
    onQuantityChange: (p: SearchedProductOption, q: number) => void;
}

export default function ProductOptionListItem({
    productOption,
    selected,
    onSelect,
    onDeselect,
    onQuantityChange,
}: ProductOptionListItemProps) {
    return <tr className={styles['searched-product-option']}>
        <td className={styles['searched-product-option__check']}><Checkbox selected={selected} onSelect={onSelect} onDeselect={onDeselect} /></td>
        <td className={styles['searched-product-option__name']}><span>{productOption.option.displayName}</span></td>
        <td className={styles['searched-product-option__price']}><span>{toCommaSeparated(productOption.option.price)}</span></td>
        <td className={styles['searched-product-option__stock']}><span>{toCommaSeparated(productOption.option.stock)}</span></td>
        <td className={styles['searched-product-option__quantity']}><input onChange={(e) => onQuantityChange(productOption, Number(e.target.value))} value={productOption.quantity} /></td>
        <td className={styles['searched-product-option__total']}>{formatKRW(productOption.option.price! * productOption.quantity)}</td>
    </tr>
}