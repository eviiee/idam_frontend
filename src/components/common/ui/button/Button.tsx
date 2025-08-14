'use client'

import { MouseEvent, ReactNode } from 'react'
import styles from './button.module.scss'
import clsx from 'clsx'

export interface ButtonProps {
    color?: 'black' | 'blue' | 'red' | 'yellow' | 'grey'
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
    className?: string | undefined
    name?: string | undefined
    disabled?: boolean
    children?: ReactNode
}

export default function Button({
    color = 'grey',
    onClick,
    className,
    name,
    disabled = false,
    children,
}: ButtonProps) {
    return (
        <button
            className={clsx(styles.button,styles[color], className)}
            onClick={onClick}
            name={name}
            disabled={disabled}
        >
            {children}
        </button>
    )
}