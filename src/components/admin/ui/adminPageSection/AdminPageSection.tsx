import clsx from 'clsx'
import styles from './adminPageSection.module.scss'

export interface AdminPageSectionProps {
    label?: string
    className?: string
    children?: React.ReactNode
    noPadding?: boolean
}

export default function AdminPageSection({
    label = "",
    className,
    children,
    noPadding = false,
} : AdminPageSectionProps) {
    return (
        <div className={styles['admin-page__section']}>
            {label && <h3 className={styles['admin--page__section__title']}>{label}</h3>}
            <div className={clsx(styles['admin--page__section__content-wrap'], noPadding ? styles['no-padding'] : '', className)}>
                {children}
            </div>
        </div>)
}