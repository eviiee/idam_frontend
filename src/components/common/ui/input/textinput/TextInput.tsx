'use client'

import React, { ChangeEventHandler, FormEventHandler, InputEventHandler, InputHTMLAttributes, MouseEventHandler, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import styles from "./textInput.module.scss";
import clsx from "clsx";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement | null>
  label?: string
  error?: string
  icon?: ReactNode
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  icon,
  type = "text",
  maxLength,
  onChange,
  value: controlledValue,
  width,
  ref,
  ...props
}) => {

  const [isFocused, setIsFocused] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(props.defaultValue ?? "")

  const isControlled = controlledValue != null
  const value = (isControlled ? controlledValue : uncontrolledValue).toString()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    let v = e.target.value
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
      {label && <span className={styles.label}>{label}</span>}
      <div className={clsx(styles.errorAligner, !width && styles['full-width'])}
        style={width ? { width: width } : undefined}>
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
          {!props.readOnly && <div className={clsx(styles['close-button'], (!value.length || !isFocused) && styles['is-hidden'])} onMouseDown={handleClearButtonClick}>❌</div>}
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
