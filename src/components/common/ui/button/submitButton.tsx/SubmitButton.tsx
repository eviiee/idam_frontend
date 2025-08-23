import styles from './submitButton.module.scss'

export default function SubmitButton({
    label = "저장",
    onClick,
} : {
    label?: string
    onClick?: ()=>void
}) {
    return (
        <div className={styles['submit-button-wrap']}>
            <button onClick={onClick}>{label}</button>
        </div>
    )
}