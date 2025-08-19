import React, { ReactNode } from "react";
import styles from "./radioInput.module.scss";

interface RadioOption {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

interface RadioInputProps {
  name: string;
  options: RadioOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({
  name,
  options,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.options}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`${styles.option} ${
              value === option.value ? styles.selected : ""
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className={styles.input}
            />
            {option.icon && <span className={styles.icon}>{option.icon}</span>}
            <span className={styles.label}>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default RadioInput;
