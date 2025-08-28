'use client'

import styles from './phoneModelSearchConsole.module.scss'
import { KeyboardEventHandler, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, Reorder, scale } from 'framer-motion'
import clsx from 'clsx'
import { ProductPhoneModelOption, SimplePhoneModel } from '@/types/product'

interface PhoneModelSearchConsoleProps {
    phoneModels: SimplePhoneModel[]
    selected: SimplePhoneModel[]
    setSelected: (selected: SimplePhoneModel[]) => void
    ppmo: ProductPhoneModelOption[]
    setPPMO: (v: ProductPhoneModelOption[]) => void
    selectedPPMO: number | string | null
    newCount: number
    setNewCount: (v: number) => void
}

export default function PhoneModelSearchConsole({
    phoneModels,
    selected = [],
    setSelected,
    setPPMO,
    ppmo = [],
    selectedPPMO,
    newCount,
    setNewCount,
}: PhoneModelSearchConsoleProps) {

    const [query, setQuery] = useState<string>('')

    const q = query.trim().toLowerCase()
    const filtered = useMemo(() => {
        if (!q) return phoneModels
        return phoneModels.filter(m => m.displayName?.toLowerCase().includes(q))
    }, [phoneModels, q])

    const isUsed = (m: SimplePhoneModel) => selected.some(s => s.id == m.id)

    // 기종 클릭
    const handleClick = (m: SimplePhoneModel) => {

        // 선택되지 않은 기종이라면 선택
        if (isUsed(m)) handleDeselect(m)

        // 이미 선택된 기종이라면 선택 해제
        else handleSelect(m)
    }

    // 기종 선택
    const handleSelect = (m: SimplePhoneModel) => {

        // 특정 PhoneProductModelOption이 선택되어 있다면 해당 옵션에 호환기종 추가
        // 선택된 PhoneProductModelOption이 없다면 신규 생성
        if (selectedPPMO) {
            const newPPMOs = ppmo.map(o => {
                if (o.id !== selectedPPMO) return o
                return { ...o, compatiblePhoneModels: [...o.compatiblePhoneModels, m] }
            })
            setPPMO(newPPMOs)
        } else {


            setNewCount(newCount + 1)
            const newPPMO: ProductPhoneModelOption = {
                id: `new${newCount}`,
                compatiblePhoneModels: [m]
            }
            setPPMO([...ppmo, newPPMO])
        }
        setSelected([...selected, m])
    }

    // 기종 선택 해제
    const handleDeselect = (m: SimplePhoneModel) => {

        for (let i = ppmo.length - 1; i >= 0; i--) {
            let found = false
            ppmo[i].compatiblePhoneModels = ppmo[i].compatiblePhoneModels.filter(mo => {
                const match = mo.id === m.id
                if (match) found = true
                return !match
            })
            if (found) break
        }
        setSelected(selected.filter(s => m.id !== s.id))
        setPPMO(ppmo.filter(r => r.compatiblePhoneModels.length))

    }

    const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key != 'Enter') return
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
                {filtered.length ? filtered.map(m => {
                    const used = isUsed(m)
                    return (
                        <motion.button
                            key={m.id}
                            type='button'
                            whileTap={{ scale: used ? 1 : 0.94 }}
                            onClick={() => handleClick(m)}
                            className={clsx(used && styles['is-used'], styles[m.modelType === '아이폰' ? 'iphone' : 'galaxy'])}
                        >
                            {/* <div className={styles['model-type']}>{m.modelType}</div> */}
                            <span className={styles['model-name']}>{m.displayName}</span>
                        </motion.button>
                    )
                }) : <div style={{textAlign:'center',width:"100%",color:"#999"}}>검색된 기종이 없습니다</div>}
            </div>
        </div>
    )

}