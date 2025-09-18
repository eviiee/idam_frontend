import { ReactNode } from 'react';
import styles from './radioInput.module.scss'
import clsx from 'clsx';
import InputLabel from '../inputLabel/InputLabel';

interface RadioOption<T extends string | number | null> {
  icon?: ReactNode;
  label: string;
  value: T;
}

interface RadioInputProps<T extends string | number | null> {
  label?: string;
  value: T;
  onChange: (v: T) => void;
  options: RadioOption<T>[];
  className?: string;
}

export default function RadioInput<T extends string | number | null>({
  label,
  value,
  onChange,
  options,
  className,
}: RadioInputProps<T>) {
  const radioButtons = options.map(v => <RadioButton option={v} onClick={onChange} selected={value === v.value} key={v.value} />)

  return (
    <div className={clsx(styles['radio-wrap'], className)}>
      {label && <InputLabel label={label} />}
      <div className={styles['radio-options-wrap']}>{radioButtons}</div>
    </div>
  )
}

function RadioButton<T extends string | number | null>({ option, onClick, selected }: { option: RadioOption<T>, onClick: (v: T) => void, selected: boolean }) {
  return (
    <div
      onClick={() => onClick(option.value)}
      className={clsx(styles['radio__option'], selected && styles['is-selected'])}
    >
      {option.icon && <div className={styles['radio__option--icon']}>{option.icon}</div>}
      <span className={styles['radio__option--label']}>{option.label}</span>
    </div>
  )
}