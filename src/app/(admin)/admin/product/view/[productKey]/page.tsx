import { getProductInfo } from "@/services/api";
import styles from "./page.module.scss";

interface PageProps {
    params: {
        productKey: string;
    };
}

export default async function ProductAdminPage({ params }: PageProps) {
    const productData = await getProductInfo(params.productKey);

    const thumbnails = [productData.thumbnail]
    if (productData.thumbnailHover) thumbnails.push(productData.thumbnailHover)
    for (const image of productData.additionalImages) thumbnails.push(image.image)

    return (
        <div className={styles.productPage}>
            <section className={styles.header}>
                <div className={styles.images}>
                    <div className={styles.thumbnails}>
                        {thumbnails.map((thumbnail, i)=> {
                            return <div key={i}><img src={thumbnail} alt={productData.productName} /></div>
                        })}
                    </div>
                    <div className={styles.productImage}><img src={productData.thumbnail} alt={productData.productAlias} /></div>
                </div>
                <div className={styles.productInfo}>
                    <h1>{productData.productName}</h1>
                    <h5>12,900원</h5>
                    <a href={productData.purchaseLink ?? undefined}>구매하러 가기</a>
                </div>
            </section>
        </div>
    )
}
