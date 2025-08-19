import clsx from 'clsx'
import styles from './adminPageSection.module.scss'

export interface AdminPageSectionProps {
    label?: string
    className?: string
    children?: React.ReactNode
    noPadding?: boolean
    transparent?: boolean
}

export default function AdminPageSection({
    label = "",
    className,
    children,
    noPadding = false,
    transparent = false,
} : AdminPageSectionProps) {
    return (
        <div className={styles['admin-page__section']}>
            {label && <h3 className={styles['admin--page__section__title']}>{label}</h3>}
            <div className={clsx(styles['admin--page__section__content-wrap'], noPadding && styles['no-padding'], transparent && styles['is-transparent'], className)}>
                {children}
            </div>
        </div>)
}