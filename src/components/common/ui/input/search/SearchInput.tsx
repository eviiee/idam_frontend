'use client'

import { Search } from 'lucide-react';
import styles from './searchInput.module.scss'
import { KeyboardEventHandler, useState } from 'react';
import clsx from 'clsx';

interface SearchInputProps {
    query: string;
    onQueryChange: (v: string) => void;
    onSearch: () => void;
    placeholder?: string;
}

export default function SearchInput({
    query,
    onQueryChange,
    onSearch,
    placeholder = "검색어 입력",
}: SearchInputProps) {

    const [hasFocus, setHasFocus] = useState<boolean>(false)

    const detectEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter" && query) onSearch()
    }

    return (
        <div className={clsx(styles['search-wrap'], hasFocus && styles['focused'])}>
            <input onKeyDown={detectEnter} onFocus={() => setHasFocus(true)} onBlur={() => setHasFocus(false)} value={query} onChange={(e) => onQueryChange(e.target.value)} className={styles['search-input']} placeholder={placeholder} />
            <button onClick={onSearch} className={styles['search-button']}><Search size={"1rem"} /></button>
        </div>
    )
}