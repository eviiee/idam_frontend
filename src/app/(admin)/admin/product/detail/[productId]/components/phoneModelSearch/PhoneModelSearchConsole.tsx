'use client'

import styles from './phoneModelSearchConsole.module.scss'
import { KeyboardEventHandler, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { SimplePhoneModel } from '@/types/api_responses/getPhoneModels'

interface PhoneModelSearchConsoleProps {
    phoneModels: SimplePhoneModel[]
    initialSelected: SimplePhoneModel[]
    onChange?: (selected: SimplePhoneModel[]) => void
}

export default function PhoneModelSearchConsole({
    phoneModels,
    initialSelected = [],
    onChange,
}: PhoneModelSearchConsoleProps) {
    const [query, setQuery] = useState<string>('')
    const [selected, setSelected] = useState<SimplePhoneModel[]>(initialSelected)

    useEffect(() => {
        onChange?.(selected)
    }, [selected, onChange])

    const q = query.trim().toLowerCase()
    const filtered = useMemo(() => {
        if (!q) return phoneModels
        return phoneModels.filter(m => m.displayName.toLowerCase().includes(q))
    }, [phoneModels, q])

    const isUsed = (id: number) => selected.some(s => s.id == id)

    const handleSelect = (m: SimplePhoneModel) => {
        if (isUsed(m.id)) return
        setSelected(prev => [...prev, m])
    }

    const handleRemove = (id: number) => {
        setSelected(prev => prev.filter(i => i.id !== id))
    }

    const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== 'enter') return
        e.preventDefault()
        handleSearch()
    }

    const handleSearch = () => { }

    return (
        <div className={styles['phone-model-search-wrap']}>
            <div className={styles['phone-model-search-query']}>
                <input value={query} onKeyDown={handleKeydown} onChange={(e) => setQuery(e.target.value)} placeholder='휴대폰 기종 검색' />
                <button onClick={handleSearch}>🔎</button>
            </div>
            <div className={styles['phone-model-search-result']}>
                {filtered.map(m => {
                    const used = isUsed(m.id)
                    return (
                        <motion.button
                            key={m.id}
                            type='button'
                            whileTap={{ scale: used ? 1 : 0.94 }}
                            onClick={() => !used ? handleSelect(m) : handleRemove(m.id)}
                            className={clsx(used && styles['is-used'], styles[m.modelType === '아이폰' ? 'iphone' : 'galaxy'])}
                        >
                            <div className={styles['model-type']}>{m.modelType}</div>
                            <span className={styles['model-name']}>{m.displayName}</span>
                        </motion.button>
                    )
                })}
            </div>
            <div className={styles['product-phone-model-wrap']}>
                <AnimatePresence>
                    {!selected.length ? <p>선택된 기종이 없습니다.</p> :
                        <motion.ul className={styles['product-phone-model-list']}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}>
                            <AnimatePresence initial={false}>
                                {selected.map(m => <motion.li
                                    key={m.id}
                                    layout
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={styles['product-phone-model-row']}
                                >{m.displayName}</motion.li>)}
                            </AnimatePresence>
                        </motion.ul>
                    }
                </AnimatePresence>
            </div>
        </div>
    )

}