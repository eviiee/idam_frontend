import { Check } from 'lucide-react';
import styles from './checkbox.module.scss'
import clsx from 'clsx';

interface CheckboxProps {
    selected: boolean;
    onSelect: () => void;
    onDeselect: () => void;
}

export default function Checkbox({
    selected,
    onSelect,
    onDeselect,
}: CheckboxProps) {
    const handleClick = () => {
        if (selected) onDeselect()
        else onSelect()
    }

    return (
        <div className={clsx(styles.checkbox, selected && styles.checked)} onClick={handleClick}>
            {selected && <Check color='white' size={"1rem"} />}
        </div>
    )
}