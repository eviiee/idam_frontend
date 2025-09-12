import styles from './tabSelect.module.scss';

type Tab = {
    label: string;
    value: string;
}

type Props = {
    tabs: Tab[];
    value: string;
    onChange: (value: string) => void;
}

export default function TabSelect({ tabs, value, onChange }: Props) {
    return (
        <div className={styles.tabSelect}>
            {tabs.map(tab => (
                <button
                    key={tab.value}
                    className={`${styles.tab} ${tab.value === value ? styles.active : ''}`}
                    onClick={() => onChange(tab.value)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}