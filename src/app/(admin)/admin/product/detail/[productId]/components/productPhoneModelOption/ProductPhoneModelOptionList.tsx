'use client'

import { AnimatePresence, DragControls, motion, Reorder, useDragControls } from 'framer-motion'
import styles from './productPhoneModelOptionList.module.scss'
import { ProductPhoneModelOption } from '@/types/product'
import clsx from 'clsx'

export default function ProductPhoneModelOptionList({
    selected,
    setSelected,
    ppmo,
    setPPMO,
}: {
    selected: number | string | null
    setSelected: (v: number | string | null) => void
    ppmo: ProductPhoneModelOption[],
    setPPMO: (selected: ProductPhoneModelOption[]) => void
}) {
    return (
        <div className={styles['product-phone-model-wrap']}>
            <AnimatePresence>
                {!ppmo.length ? <p>선택된 기종이 없습니다.</p> :
                    <motion.ul className={styles['product-phone-model-list']}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}>
                        <AnimatePresence initial={false}>
                            {ppmo.map(m => <ProductPhoneModelOptionItem ppmo={m} key={m.id} isSelected={m.id === selected} setSelected={setSelected} />)}
                        </AnimatePresence>
                    </motion.ul>
                }
            </AnimatePresence>
        </div>
    )
}


function ProductPhoneModelOptionItem({
    ppmo,
    isSelected,
    setSelected,
}: {
    ppmo: ProductPhoneModelOption
    isSelected: boolean
    setSelected: (v: number | string | null) => void
}) {

    const handleCheck = () => {
        if (isSelected) setSelected(null)
        else setSelected(ppmo.id)
    }

    return <motion.li
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0 }}
        className={clsx(isSelected && styles['is-selected'],styles['product-phone-model-row'])} >
        <div className={clsx(styles['product-phone-model-row__checkbox'], isSelected && styles['is-selected'])} onClick={handleCheck}></div>
        <div className={styles['product-phone-model-row__model-wrap']}>
            <AnimatePresence initial={false}>
                {ppmo.compatiblePhoneModels.map((m) =>
                    <motion.div className={styles['product-phone-model-row__model']} key={m.id} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>{m.displayName}</motion.div>
                )}
            </AnimatePresence>
        </div>
    </motion.li>
}