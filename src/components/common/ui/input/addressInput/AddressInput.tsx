'use client'

import DaumPostcodeEmbed, { Address, useDaumPostcodePopup } from 'react-daum-postcode'
import styles from './addressInput.module.scss'
import InputLabel from '../inputLabel/InputLabel'
import Button from '../../button/Button'
import TextInput from '../textinput/TextInput'
import { useModal } from '@/components/layout/modal/context'
import { ReactNode, useEffect, useRef, useState } from 'react'
import SpinnerLoader from '../../loader/Loader'

interface AddressInputProps {
    label?: string
    address: string
    detailAddress: string
    onAddressChange: (v: string) => void
    onAddressDetailChange: (v: string) => void
}

export default function AddressInput({
    label,
    address,
    detailAddress,
    onAddressChange,
    onAddressDetailChange,
}: AddressInputProps) {

    const { open } = useModal()

    const detailInputRef = useRef<HTMLInputElement>(null)

    const openModal = () => {
        detailInputRef.current!.focus()
        open({
            title: "주소",
            size: "md",
            content: ({ close }) => <DaumPostcodeEmbed onComplete={(v) => {
                close()
                handleAddressSelect(v)
            }} style={{ height: 600 }} />,
            onClose: () => detailInputRef.current?.focus(),
        })
    }

    const handleAddressSelect = (v: Address) => {
        onAddressChange(v.address)
    }

    return (
        <div className={styles['address-form-wrap']}>
            {label && <InputLabel label={label} padTop />}
            <div className={styles['address-input-wrap']}>
                <div className={styles['address-input-first-row']}>
                    <Button onClick={openModal} color='grey'>주소 찾기</Button>
                    <TextInput value={address} readOnly onClick={openModal} />
                </div>
                <div className={styles['address-input-second-row']}>
                    <TextInput ref={detailInputRef} value={detailAddress} onChange={(e) => onAddressDetailChange(e.target.value)} />
                </div>
            </div>
        </div>
    )
}