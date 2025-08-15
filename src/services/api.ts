import Product from "@/types/product";

export async function getProductInfo(productKey: number | string): Promise<Product> {

    if (typeof productKey === "number") {
        productKey = productKey.toString()
    }

    return {
        id: 1,
        productName: "이담 맥세이프 투명 케이스 ",
        productAlias: "테스트 상품",
        useOptions: true,
        usePhoneModels: true,
        option1:  "옵션1",
        option2:  "옵션2",
        thumbnail: "https://cdn1.domeggook.com/upload/item/2025/07/16/1752642048877E3BA1F3C362A9C5551A/1752642048877E3BA1F3C362A9C5551A_img_760?hash=638a04b1d8f11cb54f35b579e7c200ab",
        thumbnailHover: "https://canobox.co.kr/data/upload/csj3646_20250313104415_1.jpg",
        additionalImages: [],
        detailImage: "",
        tags: [],
        purchaseLink:  'https://naver.com',
        options: [],
        createdAt: "2025-08-12",
        updatedAt: "2025-08-12",
    }
}