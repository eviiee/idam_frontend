import Product from "@/types/product"

export async function getProductList(): Promise<Product[]> {

    const response = [
        {
            id: 1,
            productName: "이담 맥세이프 투명 케이스 ",
            productAlias: "테스트 상품",
            useOptions: true,
            usePhoneModels: true,
            option1: "옵션1",
            option2: "옵션2",
            thumbnail: "https://cdn1.domeggook.com/upload/item/2025/07/16/1752642048877E3BA1F3C362A9C5551A/1752642048877E3BA1F3C362A9C5551A_img_760?hash=638a04b1d8f11cb54f35b579e7c200ab",
            thumbnailHover: "https://canobox.co.kr/data/upload/csj3646_20250313104415_1.jpg",
            additionalImages: [],
            detailImage: "",
            tags: [],
            purchaseLink: 'https://naver.com',
            options: [],
            createdAt: "2025-08-12",
            updatedAt: "2025-08-12",
            stock: 1594,
            purchasePrice: 1500,
            price: 15800,
        },
        {
            id: 2,
            productName: "테스트상품 2",
            productAlias: "테스트 상품",
            useOptions: true,
            usePhoneModels: true,
            option1: "옵션1",
            option2: "옵션2",
            thumbnail: "https://cdn1.domeggook.com/upload/item/2025/07/16/1752642048877E3BA1F3C362A9C5551A/1752642048877E3BA1F3C362A9C5551A_img_760?hash=638a04b1d8f11cb54f35b579e7c200ab",
            thumbnailHover: "https://canobox.co.kr/data/upload/csj3646_20250313104415_1.jpg",
            additionalImages: [],
            detailImage: "",
            tags: [],
            purchaseLink: 'https://naver.com',
            options: [],
            createdAt: "2025-08-12",
            updatedAt: "2025-08-12",
            stock: 195,
            purchasePrice: 800,
            price: 1300,
        },
    ]

    for (let i = 3; i < 21; i++) {
        response.push(
            {
                id: i,
                productName: `테스트상품 ${i}`,
                productAlias: "테스트 상품",
                useOptions: true,
                usePhoneModels: true,
                option1: "옵션1",
                option2: "옵션2",
                thumbnail: "https://cdn1.domeggook.com/upload/item/2025/07/16/1752642048877E3BA1F3C362A9C5551A/1752642048877E3BA1F3C362A9C5551A_img_760?hash=638a04b1d8f11cb54f35b579e7c200ab",
                thumbnailHover: "https://canobox.co.kr/data/upload/csj3646_20250313104415_1.jpg",
                additionalImages: [],
                detailImage: "",
                tags: [],
                purchaseLink: 'https://naver.com',
                options: [],
                createdAt: "2025-08-12",
                updatedAt: "2025-08-12",
                stock: 195,
                purchasePrice: 800,
                price: 1300,
            }
        )
    }

    return response
}