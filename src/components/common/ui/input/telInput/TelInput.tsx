'use client'

import styles from './telInput.module.scss'
import clsx from "clsx";
import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import InputLabel from '../inputLabel/InputLabel';

type PhoneInputProps = {
    value: string;
    onChange: (v: string) => void;
    className?: string;
    label?: string;
};

const AREA_CODES_2 = ["02"];
const AREA_CODES_3 = [
    "031", "032", "033", "041", "042", "043", "044",
    "051", "052", "053", "054", "055",
    "061", "062", "063", "064",
];
const MOBILE_PREFIXES = ["010", "011", "016", "017", "018", "019"];
const SERVICE_PREFIXES = ["070", "080"];
const VIRTUAL_PREFIXES = ["0502", "0503", "0504", "0505"];

const sanitizeDigits = (s: string) => s.replace(/\D/g, "");

function isValidPrefix(prefix: string) {
    if (AREA_CODES_2.includes(prefix)) return true;
    if (AREA_CODES_3.includes(prefix)) return true;
    if (MOBILE_PREFIXES.includes(prefix)) return true;
    if (SERVICE_PREFIXES.includes(prefix)) return true;
    if (VIRTUAL_PREFIXES.some((p) => prefix.startsWith(p))) return true;
    return false;
}

function getPrefixLength(prefix: string) {
    if (AREA_CODES_2.includes(prefix)) return 2;
    if (VIRTUAL_PREFIXES.some((p) => prefix.startsWith(p))) return 4;
    return 3; // 기본은 3자리
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ value, onChange, className, label }, ref) => {
        const [part1, setPart1] = useState("");
        const [part2, setPart2] = useState("");
        const [part3, setPart3] = useState("");
        const [isFocused, setIsFocused] = useState(false);

        const input1Ref = useRef<HTMLInputElement>(null);
        const input2Ref = useRef<HTMLInputElement>(null);
        const input3Ref = useRef<HTMLInputElement>(null);
        const composing = useRef(false);

        // 📌 첫 렌더링 시에만 value → 분해해서 hydrate
        useEffect(() => {
            if (!value) return;
            const digits = sanitizeDigits(value);

            let p1 = "", p2 = "", p3 = "";
            if (digits.startsWith("0502") || digits.startsWith("0503") || digits.startsWith("0504") || digits.startsWith("0505")) {
                p1 = digits.slice(0, 4);
                p2 = digits.slice(4, 8);
                p3 = digits.slice(8, 12);
            } else if (digits.startsWith("02")) {
                p1 = digits.slice(0, 2);
                p2 = digits.slice(2, 6);
                p3 = digits.slice(6, 10);
            } else {
                p1 = digits.slice(0, 3);
                p2 = digits.slice(3, 7);
                p3 = digits.slice(7, 11);
            }

            setPart1(p1);
            setPart2(p2);
            setPart3(p3);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []); // ✅ 최초 마운트시에만 실행

        const emitChange = (p1: string, p2: string, p3: string) => {
            onChange([p1, p2, p3].filter(Boolean).join(""));
        };

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            const el = e.currentTarget;
            requestAnimationFrame(() => {
                el.setSelectionRange(0, el.value.length);
            });
        };
        const handleBlur = () => {
            // wrapper focus 효과를 위해, 모든 인풋 blur 시에만 해제
            setTimeout(() => {
                if (
                    !input1Ref.current?.matches(":focus") &&
                    !input2Ref.current?.matches(":focus") &&
                    !input3Ref.current?.matches(":focus")
                ) {
                    setIsFocused(false);
                }
            }, 0);
        };

        const handleCompositionStart = () => {
            composing.current = true;
        };
        const handleCompositionEnd = (
            e: React.CompositionEvent<HTMLInputElement>,
            setter: (s: string) => void,
            part: 1 | 2 | 3
        ) => {
            composing.current = false;
            const clean = sanitizeDigits(e.currentTarget.value);
            setter(clean);
            if (part === 1) emitChange(clean, part2, part3);
            if (part === 2) emitChange(part1, clean, part3);
            if (part === 3) emitChange(part1, part2, clean);
        };

        const handleChange =
            (setter: (s: string) => void, part: 1 | 2 | 3) =>
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (composing.current) {
                        setter(e.target.value);
                        return;
                    }
                    const clean = sanitizeDigits(e.target.value);
                    setter(clean);

                    if (part === 1) {
                        emitChange(clean, part2, part3);
                        const maxLen = getPrefixLength(clean);
                        if (clean.length === maxLen && isValidPrefix(clean)) {
                            input2Ref.current?.focus();
                        }
                    } else if (part === 2) {
                        emitChange(part1, clean, part3);
                        if (clean.length === 4) {
                            input3Ref.current?.focus();
                        }
                    } else {
                        emitChange(part1, part2, clean);
                    }
                };

        const handleKeyDown =
            (part: 1 | 2 | 3) => (e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Backspace") {
                    if (part === 2 && part2 === "") {
                        e.preventDefault();
                        if (part1) {
                            const updated = part1.slice(0, -1);
                            setPart1(updated);
                            emitChange(updated, part2, part3);
                        }
                        input1Ref.current?.focus();
                    } else if (part === 3 && part3 === "") {
                        e.preventDefault();
                        if (part2) {
                            const updated = part2.slice(0, -1);
                            setPart2(updated);
                            emitChange(part1, updated, part3);
                        }
                        input2Ref.current?.focus();
                    }
                }
            };

        const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
            if (e.currentTarget !== input1Ref.current) return;
            e.preventDefault();
            const pasted = e.clipboardData.getData("text");
            const digits = sanitizeDigits(pasted);
            if (!digits) return;
            // 붙여넣기는 full hydrate & emit
            let p1 = "", p2 = "", p3 = "";
            if (digits.startsWith("0502") || digits.startsWith("0503") || digits.startsWith("0504") || digits.startsWith("0505")) {
                p1 = digits.slice(0, 4);
                p2 = digits.slice(4, 8);
                p3 = digits.slice(8, 12);
            } else if (digits.startsWith("02")) {
                p1 = digits.slice(0, 2);
                p2 = digits.slice(2, 6);
                p3 = digits.slice(6, 10);
            } else {
                p1 = digits.slice(0, 3);
                p2 = digits.slice(3, 7);
                p3 = digits.slice(7, 11);
            }
            setPart1(p1);
            setPart2(p2);
            setPart3(p3);
            emitChange(p1, p2, p3);
            input3Ref.current?.focus();
        };

        useImperativeHandle(ref, () => input1Ref.current!);

        return (
            <div className={clsx(styles['phone-input-wrap'], className)}>
                {label && <InputLabel label={label} />}
                <div
                    className={clsx(
                        styles['phone-input__input'],
                        isFocused && styles['is-focused']
                    )}
                    style={{ display: "flex", gap: 8 }}
                >
                    <input
                        ref={input1Ref}
                        value={part1}
                        onChange={handleChange(setPart1, 1)}
                        onKeyDown={handleKeyDown(1)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={(e) => handleCompositionEnd(e, setPart1, 1)}
                        onPaste={handlePaste}
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    <span>-</span>
                    <input
                        ref={input2Ref}
                        value={part2}
                        onChange={handleChange(setPart2, 2)}
                        onKeyDown={handleKeyDown(2)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={(e) => handleCompositionEnd(e, setPart2, 2)}
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    <span>-</span>
                    <input
                        ref={input3Ref}
                        value={part3}
                        onChange={handleChange(setPart3, 3)}
                        onKeyDown={handleKeyDown(3)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onCompositionStart={handleCompositionStart}
                        onCompositionEnd={(e) => handleCompositionEnd(e, setPart3, 3)}
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                </div>
            </div>
        );
    }
);
