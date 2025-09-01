import styles from './inputLabel.module.scss'

export default function InputLabel({
    label,
    padding,
} : {
    label: string,
    padding?: string,
}){
    return <span style={{padding:padding}} className={styles['input-label']}>{label}</span>
}