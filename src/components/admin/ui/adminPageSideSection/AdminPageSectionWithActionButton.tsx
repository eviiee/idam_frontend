import { ReactNode } from 'react';
import styles from './adminPageSectionWithActionButton.module.scss'
import DropdownMenu, { DropdownAction } from '@/components/common/ui/button/actionButton/DropdownMenu';

interface AdminPageSectionWithActionButtonProps {
    title?: string;
    subTitle?: string;
    actions: DropdownAction[];
    children: ReactNode;
}

export default function AdminPageSectionWithActionButton({
    title,
    subTitle,
    actions,
    children,
}: AdminPageSectionWithActionButtonProps) {
    return (
        <section className={styles['section-with-action-button']}>
            <div className={styles['section-header']}>
                {title && <h3>{title}</h3>}
                {!title && subTitle && <h4>{subTitle}</h4>}
                <DropdownMenu actions={actions} />
            </div>
            <div className={styles['section-content']}>{children}</div>
        </section>
    )
}