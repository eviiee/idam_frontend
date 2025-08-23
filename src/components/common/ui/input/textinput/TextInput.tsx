'use client'

import React, { ChangeEventHandler, InputHTMLAttributes, MouseEventHandler, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import styles from "./textInput.module.scss";
import clsx from "clsx";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement | null>
  label?: string;
  error?: string;
  icon?: ReactNode;       // 입력창 왼쪽 아이콘
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  icon,
  type = "text",
  maxLength,
  onChange,
  value: controlledValue,
  ref,
  ...props
}) => {

  const [isFocused, setIsFocused] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(props.defaultValue ?? "")

  const isControlled = controlledValue != null
  const value = (isControlled ? controlledValue : uncontrolledValue).toString()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const v = e.target.value
    if ((type == "number" || type == "tel") && !Number(v)) return
    if (maxLength && v.length > maxLength) return
    isControlled ? onChange?.(e) : setUncontrolledValue(v)
  }

  const handleClearButtonClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    if (isControlled) {
      onChange?.({
        target: { value: "" } as any
      } as React.ChangeEvent<HTMLInputElement>)
    } else {
      setUncontrolledValue("")
    }
  }

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.errorAligner}>
        <div
          className={clsx(styles.inputWrapper, isFocused && styles.focused, error && styles.errorWrapper)}
        >
          {icon && <div className={styles.icon}>{icon}</div>}
          <input
            ref={ref}
            className={styles.input}
            type={type}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChange={handleChange}
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
    </div>
  );
};

export default TextInput;
