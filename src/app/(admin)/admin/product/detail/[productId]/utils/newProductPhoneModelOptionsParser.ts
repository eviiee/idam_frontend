import { NewProductPhoneModelOptionJSONData, ProductPhoneModelOption } from "@/types/product";

export default function ParsePPMO(data:ProductPhoneModelOption[]) {
    const res = data.map(ppmo => {
        const opt : NewProductPhoneModelOptionJSONData = {
            tempId: ppmo.id as string,
            compatiblePhoneModels: ppmo.compatiblePhoneModels.map(pm => {return {phoneModel:pm.id as number}}),
        }
        return opt
    })
    return res
}