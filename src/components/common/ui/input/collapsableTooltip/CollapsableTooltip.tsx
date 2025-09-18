'use client'

import { useState } from 'react';
import styles from './collapsableTooltip.module.scss'
import Collapsable from '../../wrapper/collapsable/Collapsable';

interface CollapsableTooltipProps {
    icon?: string;
    title: string;
    content: string[];
    initialOpen?: boolean;
}

export default function CollapsableTooltip({ icon, title, content, initialOpen = true }: CollapsableTooltipProps) {
    const [isOpen, setIsOpen] = useState(initialOpen);

    return (
        <div className={styles.container} onClick={() => setIsOpen(prev => !prev)}>
            <div className={styles.title}>
                <span className={styles.icon}>{icon}</span>
                <span>{title}</span>
            </div>
            <Collapsable isOpen={isOpen}>
                <div className={styles.content}>
                    {content.map((line, index) => (
                        <p key={index} className={styles.line}>{line}</p>
                    ))}
                </div>
            </Collapsable>
        </div>
    )
}