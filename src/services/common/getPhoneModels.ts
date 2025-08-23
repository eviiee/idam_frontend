
import { createClientApi, serverApi } from "../settings"
import { PhoneModel, SimplePhoneModel } from "@/types/product"

export async function getPhoneModels(): Promise<SimplePhoneModel[]> {

    const api = createClientApi()

    try {
        const res = await api.get(process.env.NEXT_PUBLIC_API_PHONE_MODELS!)
        return res.data
    } catch (e) {
        console.debug(e)
        throw e;
    }
}

export async function getDetailedPhoneModelsFromServer(): Promise<PhoneModel[]> {

    const api = serverApi

    try {
        const res = await api.get(process.env.NEXT_PUBLIC_API_PHONE_MODELS_ADMIN!)
        return res.data
    } catch (e) {
        throw e;
    }
}