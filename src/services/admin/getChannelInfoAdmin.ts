import { Channel } from "@/types/partner";
import { serverApi } from "../settings";

export default async function getChannelInfoAdmin(id:string) {
    if (id === 'new') return null
    const api = serverApi
    const res = await api.get(`${process.env.NEXT_PUBLIC_API_CHANNEL}?id=${id}`)
    return res.data as Channel
}