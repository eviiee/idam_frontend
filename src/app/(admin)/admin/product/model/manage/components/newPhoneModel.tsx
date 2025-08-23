'use client'

import Collapsable from "@/components/common/ui/wrapper/collapsable/Collapsable"
import { PhoneModel, PhoneModelType } from "@/types/product"
import { KeyboardEventHandler, useEffect, useRef, useState } from "react"

import styles from '../managePhoneModelPage.module.scss'
import clsx from "clsx"
import TextInput from "@/components/common/ui/input/textinput/TextInput"
import BooleanSelect from "@/components/common/ui/input/booleanSelect/BooleanSelect"
import Button from "@/components/common/ui/button/Button"

interface NewPhoneModelProps {
    onAdd: (v: PhoneModel) => void
}

export default function NewPhoneModel({ onAdd }: NewPhoneModelProps) {

    const [modelType, setModelType] = useState<PhoneModelType>("갤럭시")
    const [modelName, setModelName] = useState<string>("")
    const [modelNameError, setModelNameError] = useState<string>("")
    const [modelNumber, setModelNumber] = useState<string>("")

    const [creationCount, setCreationCount] = useState<number>(0)

    const modelNameRef = useRef<HTMLInputElement>(null)
    const modelNumberRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        isValidData(false)
    }, [modelName])

    const addNewPhoneModel = () => {
        if (!isValidData()) return
        setCreationCount(creationCount + 1)
        const newModel: PhoneModel = {
            id: `new${creationCount}`,
            modelType,
            modelName,
            modelNumber,
        }

        onAdd(newModel)
        setModelName("")
        setModelNumber("")

        setModelName("")
        setModelNumber("")

        modelNameRef.current?.focus()
    }

    const modelNameIncludesType = () => {
        let included: Boolean = false;
        ["갤럭시", "아이폰", "galaxy", "iphone"].forEach(mt => {
            if (modelName.toLowerCase().includes(mt)) included = true
        })
        return included
    }

    const isValidData = (checkEmpty: Boolean = true) => {
        if (checkEmpty && !modelName) {
            setModelNameError("모델명을 입력해주세요")
            modelNameRef.current?.focus()
            return false
        } else if (modelNameIncludesType()) {
            setModelNameError("갤럭시/아이폰을 제거해주세요")
            return false
        } else {
            setModelNameError("")
            return true
        }
    }

    const detectEnter : KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== 'Enter') return
        e.preventDefault()
        addNewPhoneModel()
    }

    return (
        <div>
            <BooleanSelect label="모델타입" value={modelType === '갤럭시'} trueLabel="갤럭시" falseLabel="아이폰" onChange={(v) => setModelType(v ? '갤럭시' : '아이폰')} />
            <TextInput ref={modelNameRef} label="모델명" value={modelName} onChange={(e) => setModelName(e.target.value)} error={modelNameError} maxLength={50} onKeyDown={detectEnter} placeholder="" />
            <Collapsable isOpen={modelType === "갤럭시"}>
                <TextInput disabled={modelType==="아이폰"} ref={modelNumberRef} label="모델번호" value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} maxLength={10} onKeyDown={detectEnter} placeholder="" />
            </Collapsable>
            <Button onClick={addNewPhoneModel}>추가</Button>
        </div>
    )
}