import clsx from 'clsx'
import styles from './actionButton.module.scss'
import { ReactNode } from 'react'

export default function ActionButton({
    onClick,
    className,
    children
}: {
    onClick: () => void,
    className?: string,
    children: ReactNode
}) {
    return <button onClick={onClick} className={clsx(styles['action-button'], className)}>{children}</button>
}