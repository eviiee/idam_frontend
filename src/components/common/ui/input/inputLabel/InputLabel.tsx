import clsx from 'clsx'
import styles from './inputLabel.module.scss'

export default function InputLabel({
    label,
    padding,
    padTop = false,
} : {
    label: string,
    padding?: string,
    padTop?: boolean,
}){
    return <span style={{padding:padding}} className={clsx(styles['input-label'],padTop && styles['pad-top'])}>{label}</span>
}