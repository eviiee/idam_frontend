import Product, { NewProduct } from "@/types/product";
import { createClientApi, serverApi } from "../settings";

export async function createProductAdmin(thumbnail: File){

    const payload : NewProduct = {
        productName: "테스트 상품",
        productAlias: "송장용 이름",
        useOptions: false,
        option1: "옵션1 이름",
        thumbnail: thumbnail,
    }

    const data = new FormData()
    data.append("product_name", "테스트 상품")
    data.append("product_alias", "송장용 이름")
    data.append("use_options", "false")
    data.append("option1", "옵션1 이름")
    data.append("thumbnail", thumbnail)
    data.append("detail_image", "sgdgs")

    const api = createClientApi()
    const res = await api.post(process.env.NEXT_PUBLIC_API_PRODUCT_ADMIN!,data,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    
}

export async function getProducts(page=1,pageSize=20){
    const api = createClientApi()
    const res = await api.get(process.env.NEXT_PUBLIC_API_PRODUCT_ADMIN!)

    return res.data as Product[]
}