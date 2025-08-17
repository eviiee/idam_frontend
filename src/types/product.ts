export interface PhoneModel {
    id: number;
    modelType: '갤럭시' | '아이폰';
    modelName: string;
    modelNumber?: string | null;
}

export interface ProductOption {
    id: number;
    phoneModel?: PhoneModel | null;
    option1?: string | null;
    option2?: string | null;
    option3?: string | null;
    stock: number;
    inboundPrice: number;
    price: number;
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

export default interface Product {
    id: number;
    productName: string;
    productAlias: string;
    useOptions: boolean;
    usePhoneModels: boolean;
    option1?: string;
    option2?: string;
    option3?: string;
    thumbnail: string;
    thumbnailHover?: string | null;
    additionalImages: ProductImage[];
    detailImage: string;
    tags: ProductTag[];
    purchaseLink?: string | null;
    options: ProductOption[];
    createdAt: string;
    updatedAt: string;

    stock?: number | null;
    purchasePrice?: number;
    price?: number;
    peakPrice?: number;    
}