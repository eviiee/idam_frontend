
export type PhoneModelType = "갤럭시" | "아이폰"

export interface SimplePhoneModel {
    id?: number | string,
    modelType?: '갤럭시' | '아이폰',
    displayName?: string,
}

export interface PhoneModel extends SimplePhoneModel {
    modelName: string;
    modelNumber?: string | null;
    order?: number
}

export interface ProductOption {
    id?: number;
    phoneModel?: ProductPhoneModelOption | null;
    option1?: string;
    option2?: string;
    option3?: string;
    stock?: number;
    inboundPrice?: number;
    price?: number;
}

export interface ProductTag {
    id: number;
    name: string;
}

export interface ProductImage {
    id: number;
    order: number;
    image: string;
}

export interface ProductPhoneModelOption {
    id?: number | string;  // ProductPhoneModelOption 모델의 PK
    compatiblePhoneModels: SimplePhoneModel[];
}

export default interface Product {
    id?: number;
    productName?: string;
    productAlias?: string;
    useOptions?: boolean;
    usePhoneModels?: boolean;
    option1?: string | null;
    option2?: string | null;
    option3?: string | null;
    thumbnail?: string;
    thumbnailHover?: string | null;
    detailImage?: string;
    createdAt?: string;
    updatedAt?: string;
    purchaseLink?: string;
    engravable?: boolean;
    printable?: boolean;
    tags?: number[];

    phoneModelOptions?: ProductPhoneModelOption[];
    availablePhoneModels?: SimplePhoneModel[];
    minPurchasePrice?: number;
    minPrice?: number;
}

export interface NewProductJSONData {
    productName: string;
    productAlias: string;
    useOptions: boolean;
    usePhoneModels: boolean;
    option1?: string | null;
    option2?: string | null;
    option3?: string | null;
    detailImage: string
    purchaseLink: string
    engravable: boolean
    printable: boolean

    options: NewProductOptionJSONData[]
    phoneModelOptions: NewProductPhoneModelOptionJSONData[]
}

export interface NewProductOptionJSONData {
    phoneModelTemp?: string;
    option1?: string;
    option2?: string;
    option3?: string;
    stock: number;
    inboundPrice: number;
    price: number;
}

export interface NewProductPhoneModelOptionJSONData {
    tempId: string;
    compatiblePhoneModels: {phoneModel:number}[];
}