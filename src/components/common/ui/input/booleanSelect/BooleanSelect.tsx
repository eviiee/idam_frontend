import clsx from 'clsx'
import styles from './booleanSelect.module.scss'

interface BooleanSelectProps {
    trueLabel: string
    falseLabel: string
    value: boolean
    onChange: (v : boolean) => void
    className?: string
    label?: string
}

export default function BooleanSelect({
    trueLabel,
    falseLabel,
    value,
    onChange,
    className,
    label
} : BooleanSelectProps){
    return (
        <div className={clsx(styles['boolean-select-wrap'],className)}>
            {label && <span>{label}</span>}
            <div className={styles['boolean-select']}>
                <div className={clsx(styles.false, !value && styles['is-selected'])} onClick={()=>onChange(false)}>{falseLabel}</div>
                <div className={clsx(styles.true, value && styles['is-selected'])} onClick={()=>onChange(true)}>{trueLabel}</div>
            </div>
        </div>
    )
}