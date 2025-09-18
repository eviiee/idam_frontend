'use client'

import clsx from 'clsx';
import { CSSProperties, JSX, KeyboardEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './selectInput.module.scss'
import { List, RowComponentProps } from 'react-window';
import { AnimatePresence, motion } from 'framer-motion';
import InputLabel from '../inputLabel/InputLabel';

interface SelectInputOption<T extends string | number> {
    icon?: ReactNode
    label: string;
    value: T;
}

type SelectInputProps<T extends string | number> = {
    label?: string;
    options: SelectInputOption<T>[];
    placeholder?: string;
    height?: number;
    itemSize?: number | string;
}

type SingleSelectInputProps<T extends string | number> = SelectInputProps<T> & {
    multiSelect?: false;
    value: T | null;
    onChange: (v: T | null) => void
}

type MultiSelectInputProps<T extends string | number> = SelectInputProps<T> & {
    multiSelect: true;
    value: T[]
    onChange: (v: T[]) => void
}


export default function SelectInput<T extends string | number>(
    props: SingleSelectInputProps<T>
): JSX.Element
export default function SelectInput<T extends string | number>(
    props: MultiSelectInputProps<T>
): JSX.Element
export default function SelectInput<T extends string | number>(
    props: SingleSelectInputProps<T> | MultiSelectInputProps<T>
) {

    const {
        label,
        options,
        placeholder = "선택",
        height = 300,
        itemSize = 45,
    } = props

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [query, setQuery] = useState<string>("")
    const toggleOpen = () => setIsOpen(prev => !prev)

    useEffect(() => {
        inputRef.current?.focus()
        setQuery("")
    }, [isOpen])

    const inputRef = useRef<HTMLInputElement>(null)

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(query.toLowerCase())
    )

    const handleClick = (v: T, selected: boolean) => {
        selected ? deselectOption(v) : selectOption(v)
    }

    const selectOption = (v: T) => {
        if (props.multiSelect) {
            props.onChange([...props.value, v]);
        }
        else {
            props.onChange(v)
            setIsOpen(false)
        }
    }

    const deselectOption = (v: T) => {
        if (props.multiSelect) {
            props.onChange(props.value.filter(option => option != v))
        } else {
            props.onChange(null)
        }
    }

    const handleEnterInput: KeyboardEventHandler = (e) => {
        if (e.key == "Enter" && !props.multiSelect && filteredOptions.length > 0) {
            props.onChange(filteredOptions[0].value)
            setIsOpen(false)
        }
    }

    const isSelected = (v: T) => {
        return props.multiSelect ?
            props.value.includes(v) :
            props.value === v
    }

    const getPlaceHolder = () => {
        if (props.multiSelect) {
            return props.value.length > 0
                ? props.value.length > 1
                    ? `${options.find(o => props.value[0] === o.value)?.label} 외 ${props.value.length - 1}개`
                    : options.find(o => props.value[0] === o.value)?.label
                : placeholder
        } else {
            return props.value === null
                ? placeholder : options.find(o => props.value === o.value)?.label
        }
    }

    return (
        <div
            className={styles['select-wrap']}
        >
            {label && <InputLabel label={label} />}
            <div className={styles['select__input-wrap']}>
                <div
                    className={styles['select__input-toggle']}
                    onClick={toggleOpen}

                >
                    <span>{getPlaceHolder()}</span>
                    <span>▾</span>
                </div>
                <AnimatePresence>
                    {isOpen &&
                        <motion.div
                            className={styles['select__dropdown']}
                            initial={{ y: -5, opacity: 0, scale: 0.8 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 5, opacity: 0 }}
                        // transition={{ duration: 0.15,  }}
                        >
                            <input
                                type="text"
                                className={styles['select__dropdown__search']}
                                placeholder='검색...'
                                value={query}
                                onKeyDown={handleEnterInput}
                                onChange={(e) => setQuery(e.target.value)}
                                ref={inputRef}
                            />
                            <div
                                className={styles['select__dropdown__list']}
                                role='group'
                                style={{ maxHeight: height }}
                            >
                                {
                                    filteredOptions.length ? <List
                                        rowComponent={SelectOption}
                                        rowCount={filteredOptions.length}
                                        rowHeight={itemSize}
                                        rowProps={{ options: filteredOptions, onClick: handleClick, isSelected, }}
                                    />
                                        : <p>선택 가능한 값이 없습니다</p>
                                }
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

function SelectOption<T extends string | number>({
    index,
    options,
    onClick: handleClick,
    isSelected: getIsSelected,
    style,
}: RowComponentProps<{
    options: SelectInputOption<T>[],
    onClick: (v: T, s: boolean) => void,
    isSelected: (v: T) => boolean,
}>) {

    const { value, icon, label } = options[index]
    const isSelected = getIsSelected(value)
    const onClick = () => handleClick(value, isSelected)

    return (
        <div
            className={clsx(styles['select__option'], isSelected && styles['is-selected'])}
            onClick={onClick}
            role='listitem'
            style={style}
        >
            <div className={styles['select__option__highlighter']}>

                {icon && <div className={styles['select__option__icon']}>{icon}</div>}
                <span className={styles['select__option__label']}>{label}</span>
            </div>
        </div>
    )
}