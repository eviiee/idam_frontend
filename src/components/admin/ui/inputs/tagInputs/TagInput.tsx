'use client'

import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'
import styles from './tagInput.module.scss'
import { toast } from 'react-toastify'

interface TagInputProps {
    label: string
    value?: string[]
    onChange?: (v: string[]) => void
    placeHolder?: string
    name?: string
    deleteOnBackspace?: boolean
}

export default function TagInput({
    label,
    value: controlledValue,
    onChange: onControlledValueChange,
    placeHolder,
    name,
    deleteOnBackspace = false,
}: TagInputProps) {

    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(controlledValue ?? [])
    const [inputValue, setInputValue] = useState<string>("")

    const value = controlledValue ?? uncontrolledValue
    const setValue = onControlledValueChange ?? setUncontrolledValue

    const handleAddition = () => {

        if (!inputValue) return

        const vals = inputValue.split(',')

        const newTags = new Set<string>()
        for (let i = 0; i < vals.length; i++) {
            const val = vals[i].replace(/^\s*/, "").replace(/\s*$/, "")
            if (value.includes(val) || !val) continue
            newTags.add(val)
        }

        const duplicates = vals.length - newTags.size
        if (duplicates) toast(`${duplicates}개의 값이 중복입니다.`, { type: 'error' })
        if (!newTags.size) return

        setValue([...value, ...newTags])
        setInputValue("")
        return
    }

    const handleDeletion = (v: string) => {
        setValue(value.filter(cv => cv !== v))
    }

    const deleteLast = () => {
        if (value) setValue(value.slice(0, -1))
    }

    const handleInputValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const v = (e.target.value).replace(/[^\p{L}\p{N}\s,🫠-🫨😀-🙏🚀-🛸❤️-🖤]/gu, '')
        setInputValue(v)
    }

    const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            handleAddition()
        } else if (deleteOnBackspace && !inputValue && (e.key === 'Backspace' || e.key === 'Delete')) {
            deleteLast()
        }
    }

    const tags = value.map(v => <Tag tag={v} onDelete={handleDeletion} key={v} />)


    return (
        <div className={styles['tag-input-wrap']}>
            <span className={styles['tag-input__label']}>{label}</span>
            <div className={styles['tag-input__input-wrap']}>
                <input className={styles['tag-input__input']} type="text" onKeyDown={handleKeydown} value={inputValue} onChange={handleInputValueChange} placeholder={placeHolder} />
                <div className={styles['tag-input__tags-wrap']}>
                    {tags}
                </div>
            </div>
        </div>
    )
}

function Tag({
    tag,
    onDelete,
}: {
    tag: string,
    onDelete: (v: string) => void
}) {
    return (
        <div className={styles['tag-input__tag']}>
            <span>{tag}</span>
            <button onClick={() => onDelete(tag)}>❌</button>
        </div>
    )
}