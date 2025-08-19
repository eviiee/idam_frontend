'use client'

import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import styles from "./textInput.module.scss";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;       // 입력창 왼쪽 아이콘
  button?: ReactNode;     // 입력창 오른쪽 버튼
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  icon,
  button,
  type = "text",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={`${styles.inputWrapper} ${
          isFocused ? styles.focused : ""
        } ${error ? styles.errorWrapper : ""}`}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          className={styles.input}
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {button && <div className={styles.button}>{button}</div>}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default TextInput;
