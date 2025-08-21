'use client'

import React, { ChangeEventHandler, InputHTMLAttributes, MouseEventHandler, ReactNode, useRef, useState } from "react";
import styles from "./textInput.module.scss";
import clsx from "clsx";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;       // 입력창 왼쪽 아이콘
  initialValue?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  icon,
  type = "text",
  maxLength,
  initialValue,
  ...props
}) => {

  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<string>((initialValue ?? "").toString())

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value
    if ((type == "number" || type == "tel") && !Number(v)) return
    if (maxLength && v.length > maxLength) return
    setValue(v)
  }

  const handleClearButtonClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    setValue("")
  }

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={clsx(styles.inputWrapper, isFocused && styles.focused, error && styles.errorWrapper)}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          className={styles.input}
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChange={onChange}
          {...props}
        />
        <div className={clsx(styles['close-button'], (!value.length || !isFocused) && styles['is-hidden'])} onMouseDown={handleClearButtonClick}>❌</div>
        {
          maxLength &&
          <div className={clsx(styles['max-length'])}>
            <span className={clsx(!value.length && styles['is-zero'])}>{value.length}</span>/
            {maxLength}</div>}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default TextInput;
