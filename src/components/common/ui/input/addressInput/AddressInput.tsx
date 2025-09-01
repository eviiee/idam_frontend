'use client'

import DaumPostcodeEmbed from 'react-daum-postcode'
import styles from './addressInput.module.scss'
import InputLabel from '../inputLabel/InputLabel'
import Button from '../../button/Button'
import TextInput from '../textinput/TextInput'

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
} : AddressInputProps){

    const openAddressSearchModal = () => {}

    return (
        <div className={styles['address-form-wrap']}>
            {label && <InputLabel label={label} />}
            <div className={styles['address-input-wrap']}>
                <div className={styles['address-input-first-row']}>
                    <Button onClick={openAddressSearchModal} color='grey'>주소 찾기</Button>
                    <TextInput value={address} readOnly />
                </div>
                <div className={styles['address-input-second-row']}>
                    <TextInput value={detailAddress} onChange={(e)=>onAddressDetailChange(e.target.value)} />
                </div>
            </div>
        </div>
    )
}