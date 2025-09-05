import { ReactNode } from 'react';
import styles from './adminPageSectionWithActionButton.module.scss'

interface Action {
    label: string;
    onClick: () => void;
}

interface AdminPageSectionWithActionButtonProps {
    title?: string;
    subTitle?: string;
    actions: Action[];
    children: ReactNode;
}

export default function AdminPageSectionWithActionButton({
    title,
    subTitle,
    actions,
    children,
}: AdminPageSectionWithActionButtonProps) {
    return (
        <section>
            <div>
                {title && <h3>{title}</h3>}
                {!title && subTitle && <h4>{subTitle}</h4>}
                <div>⋮</div>
            </div>
        </section>
    )
}