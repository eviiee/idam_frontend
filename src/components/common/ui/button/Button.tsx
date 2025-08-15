'use client'

import { MouseEvent, ReactNode } from 'react'
import styles from './button.module.scss'
import clsx from 'clsx'

type BaseProps = {
    color?: 'black' | 'blue' | 'red' | 'yellow' | 'grey'
    className?: string | undefined
    name?: string | undefined
    disabled?: boolean
    children?: ReactNode
}

type LinkProps = BaseProps & {
    simpleLink: true
    href: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

type ClickableButtonProps = BaseProps & {
    simpleLink: false
    href?: string
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export type ButtonProps = LinkProps | ClickableButtonProps;

export default function Button({
    color = 'grey',
    onClick,
    className,
    name,
    disabled = false,
    children,
    simpleLink = false,
    href = "",
}: ButtonProps) {

    const buttonClass = clsx(styles.button,styles[color], className)
    const component = simpleLink ?
    <a href={href} className={buttonClass}>{children}</a>
     :
        <button
            className={buttonClass}
            onClick={onClick}
            name={name}
            disabled={disabled}
        >
            {children}
        </button>

    return component
}