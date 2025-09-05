import { CSSProperties, ReactNode } from 'react'
import styles from './tag.module.scss'
import clsx from 'clsx';

type TagType = "black" | "red" | "blue" | "yellow" | "green"

interface TagProps {
    children: ReactNode;
    type?: TagType;
    color?: string;
    backgroundColor?: string;
    strong?: boolean;
}

export default function Tag({
    children,
    type = 'black',
    color,
    backgroundColor,
    strong = false,
}: TagProps) {
    const style = { "--background-color": backgroundColor, "--text-color": color } as CSSProperties
    return (
        <span style={style} className={clsx(styles[type], styles['tag'], strong && styles['strong'])}>{children}</span>
    )
}