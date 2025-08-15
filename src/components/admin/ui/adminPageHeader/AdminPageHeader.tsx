import Button, { ButtonProps } from '@/components/common/ui/button/Button'
import styles from './adminPageHeader.module.scss'

type AdminPageHeaderProps = {
    title: string
    useButton?: false
}

type AdminPageHeaderWithButtonProps = {
    title: string
    useButton?: true
    buttonLabel: string
    href: string
}

export default function AdminPageHeader(props: AdminPageHeaderProps | AdminPageHeaderWithButtonProps) {
    return (
        <div className={styles['header-wrap']}>
            <h1 className={styles['page-title']}>{props.title}</h1>
            {props.useButton && <Button href={props.href} color='blue' simpleLink>{props.buttonLabel}</Button>}
        </div>)
}