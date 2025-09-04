'use client'

import clsx from 'clsx'
import styles from './adminPageSection.module.scss'
import { motion } from 'framer-motion'
import { useState } from 'react'

export interface AdminPageSectionProps {
    label?: string
    className?: string
    children?: React.ReactNode
    noPadding?: boolean
    transparent?: boolean
    collapsable?: boolean
    grid?: boolean
    columns?: number
    columnGap?: number
}

export default function AdminPageSection({
    label = "",
    className,
    children,
    noPadding = false,
    transparent = false,
    collapsable = false,
    grid = false,
    columns = 1,
    columnGap = 20,
}: AdminPageSectionProps) {

    const [isOpen, setIsOpen] = useState<boolean>(true)

    const onClick = () => { setIsOpen(!isOpen) }
    const animatedHeight = isOpen ? "auto" : 0


    return (
        <section className={clsx(styles['admin-page__section'], collapsable && styles['is-collapsable'], transparent && styles['is-transparent'])}>
            {label && <h3 onClick={collapsable ? onClick : undefined} className={clsx(styles['admin--page__section__title'], !isOpen && styles['is-collapsed'])}>{label}</h3>}
            <motion.div
                animate={{ height: animatedHeight }}
                className={clsx(styles['admin--page__section__content-wrap'])}
            >
                <div className={clsx(styles['children-wrap'], (noPadding || transparent) && styles['no-padding'], className, grid && styles['grid'])}
                    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, columnGap }}>
                    {children}
                </div>
            </motion.div>
        </section>)
}