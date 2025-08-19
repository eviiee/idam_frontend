import { SimplePhoneModel } from "@/types/api_responses/getPhoneModels"
import { createClientApi } from "../settings"

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