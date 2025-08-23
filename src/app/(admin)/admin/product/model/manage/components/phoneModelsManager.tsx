'use client'

import { PhoneModel } from '@/types/product'
import styles from '../managePhoneModelPage.module.scss'
import { AnimatePresence, DragControls, Reorder, useDragControls } from 'framer-motion'
import AdminPageSection from '@/components/admin/ui/adminPageSection/AdminPageSection'

export default function PhoneModelsManager({
    phoneModels,
    onChange,
    onReorder,
    onRemove
}: {
    phoneModels: PhoneModel[]
    onReorder: (v: PhoneModel[]) => void
    onChange: (i: number, v: PhoneModel) => void
    onRemove: (id: number | string) => void
}) {
    const phoneModelRows = phoneModels.map((m, i) => <PhoneModelRow data={m} onChange={onChange} onRemove={onRemove} index={i} key={m.id} />)

    return (
        <AdminPageSection label='노출순서' collapsable noPadding>
            <Reorder.Group
                className={styles['phone-model-wrap']}
                values={phoneModels}
                onReorder={onReorder}
                as='ul'
                axis='y'
            >
                <AnimatePresence>
                    {phoneModelRows}
                </AnimatePresence>
            </Reorder.Group>
        </AdminPageSection>
    )
}

function PhoneModelRow({
    data,
    onChange,
    onRemove,
    index,
}: {
    data: PhoneModel,
    onChange: (i: number, v: PhoneModel) => void
    onRemove: (id: number | string) => void
    index: number
}) {

    const dragControl = useDragControls()

    return (
        <Reorder.Item
            layout='position'
            dragListener={false}
            dragControls={dragControl}
            className={styles['phone-model-row']}
            value={data}
            as='li'
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 30 }}
            whileDrag={{
                boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
                zIndex: 10,
            }}
        >
            <div
                onPointerDown={(e) => { e.preventDefault(); dragControl.start(e) }}
                className={styles['phone-model-row__handle']}>⠿</div>
            <div className={styles['phone-model-row__info-wrap']}>
                <span className={styles['phone-model-row__info__modeltype']}>{data.modelType}</span>
                <input placeholder='모델명' className={styles['phone-model-row__info__modelname']} value={data.modelName} type="text" onChange={(e) => onChange(index, { ...data, modelName: e.target.value })} />
                <input placeholder='모델번호' className={styles['phone-model-row__info__modelnumber']} value={data.modelNumber ?? ""} style={data.modelType === "아이폰" ? { display: "none" } : undefined} type="text" onChange={(e) => onChange(index, { ...data, modelNumber: e.target.value })} />
            </div>
            <div className={styles['phone-model-row__spacer']}></div>
            <div className={styles['phone-model-row__edit-button']} onClick={() => onRemove(data.id!)}>✏️</div>
            <div className={styles['phone-model-row__delete-button']} onClick={() => onRemove(data.id!)}>🗑️</div>
        </Reorder.Item>
    )
}