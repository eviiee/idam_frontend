'use client'

import { CSSProperties, MouseEvent, ReactNode } from 'react'
import styles from './button.module.scss'
import clsx from 'clsx'

type BaseProps = {
    color?: 'black' | 'blue' | 'red' | 'yellow' | 'grey'
    className?: string | undefined
    name?: string | undefined
    disabled?: boolean
    children?: ReactNode
    small?: boolean
    textColor?: string;
    backgroundColor?: string;
    hoverColor?: string;
    style?: CSSProperties;
}

type LinkProps = BaseProps & {
    simpleLink: true
    href: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void | (() => {})
}

type ClickableButtonProps = BaseProps & {
    simpleLink?: false
    href?: string
    onClick: (e: MouseEvent<HTMLButtonElement>) => void | (() => {})
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
    small = false,
    backgroundColor,
    hoverColor,
    textColor,
    style = {},
}: ButtonProps) {
    const buttonStyle: { [key: string]: string } = {}
    if (backgroundColor) buttonStyle["--background-color"] = backgroundColor
    if (hoverColor) buttonStyle["--hover-color"] = hoverColor
    if (textColor) buttonStyle["--color"] = textColor

    const buttonClass = clsx(styles.button, styles[color], className, small && styles.small)
    const component = simpleLink ?
        <a href={href} className={buttonClass}>{children}</a>
        :
        <button
            style={{ ...style, ...buttonStyle } as CSSProperties}
            className={buttonClass}
            onClick={onClick}
            name={name}
            disabled={disabled}
        >
            {children}
        </button>

    return component
}