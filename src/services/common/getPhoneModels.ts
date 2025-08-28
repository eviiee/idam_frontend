
import { createClientApi, serverApi } from "../settings"
import { PhoneModel, SimplePhoneModel } from "@/types/product"

export async function getPhoneModels(): Promise<SimplePhoneModel[]> {

    const api = createClientApi()

    try {
        // const res = await api.get(process.env.NEXT_PUBLIC_API_PHONE_MODELS!)
        const res : {data : SimplePhoneModel[]} = {data:[
            {id:1, displayName:'아이폰 17'},
            {id:2, displayName:'아이폰 17 Air'},
            {id:3, displayName:'아이폰 17 Pro'},
            {id:4, displayName:'아이폰 17 Pro Max'},
            {id:5, displayName:'갤럭시 Z Flip 7 (F799)'},
            {id:6, displayName:'갤럭시 Z Fold 7 (F977)'},
            {id:7, displayName:'갤럭시 S25 Ultra (S998)'},
        ]}
        return res.data
    } catch (e) {
        console.debug(e)
        throw e;
    }
}

export async function getDetailedPhoneModelsFromServer(): Promise<PhoneModel[]> {

    const api = serverApi

    try {
        // const res = await api.get(process.env.NEXT_PUBLIC_API_PHONE_MODELS_ADMIN!)
        const res : {data : PhoneModel[]} = {data:[
            {id:1,modelType:'아이폰',modelName:'17',modelNumber:null},
            {id:2,modelType:'아이폰',modelName:'17 Air',modelNumber:null},
            {id:3,modelType:'아이폰',modelName:'17 Pro',modelNumber:null},
            {id:4,modelType:'아이폰',modelName:'17 Pro Max',modelNumber:null},
            {id:5,modelType:'갤럭시',modelName:'Z Flip 7',modelNumber:'F977'},
            {id:5,modelType:'갤럭시',modelName:'Z Fold 7',modelNumber:'F997'},
        ]}
        return res.data
    } catch (e) {
        throw e;
    }
}