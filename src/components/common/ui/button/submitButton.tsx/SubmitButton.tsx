import styles from './submitButton.module.scss'

export default function SubmitButton({
    label = "저장",
} : {
    label?: string
}) {
    return (
        <div className={styles['submit-button-wrap']}>
            <button>{label}</button>
        </div>
    )
}