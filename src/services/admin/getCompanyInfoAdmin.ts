import { createClientApi, serverApi } from "../settings";
import { Company } from "@/types/partner";


export default async function getCompanyInfoAdmin(id:string){

    if (id === 'new') return null

    const api = serverApi
    const res = await api.get(process.env.NEXT_PUBLIC_API_COMPANY+"?id="+id)

    return res.data as Company
}

export async function getCompanies(limit: number){
    const api = createClientApi()
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_COMPANIES!}?limit=${limit}`)

    return res.data as Company[]
}