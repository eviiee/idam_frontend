import { PhoneModel } from "@/types/product";
import { createClientApi } from "../settings";

export default async function modifyPhoneModelsAdmin(data: PhoneModel[], del: number[]) {

    if (data.some(pm => !pm.modelName)) return Promise.reject("모델명은 필수 항목입니다")

    const modifiedData: PhoneModel[] = []
    const api = createClientApi()
    for (let i = 0; i < data.length; i++) {
        const newData: PhoneModel = {
            modelName: data[i].modelName,
            modelNumber: data[i].modelNumber,
            order: i + 1,
        }
        if (typeof (data[i].id) === 'number') {
            newData.id = data[i].id
        } else {
            newData.modelType = data[i].modelType
        }
        modifiedData.push(newData)
    }

    const payload = {
        data: modifiedData,
        dels: del,
    }

    const res = await api.post(process.env.NEXT_PUBLIC_API_PHONE_MODELS_ADMIN!, payload)
}