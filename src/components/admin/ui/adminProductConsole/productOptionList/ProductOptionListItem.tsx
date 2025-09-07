'use client'

import Checkbox from '@/components/common/ui/button/checkbox/CheckBox';
import { SearchedProductOption } from '../AdminProductConsole'
import styles from '../adminProductConsole.module.scss'
import TextInput from '@/components/common/ui/input/textinput/TextInput';

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
    return <li className={styles['searched-product-option']}>
        <Checkbox selected={selected} onSelect={onSelect} onDeselect={onDeselect} />
        <span>{productOption.option.displayName}</span>
        <input onChange={(e) => onQuantityChange(productOption, Number(e.target.value))} value={productOption.quantity} />
        {/* <TextInput /> */}
    </li>
}