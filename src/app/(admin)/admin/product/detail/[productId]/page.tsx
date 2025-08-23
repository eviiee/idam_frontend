
import React from "react";
import getProductDetailAdmin from "@/services/admin/getProductInfoAdmin";
import ProductDetailAdminPageClientWrapper from "./components/ProductDetailAdminPageClient";

interface PageProps {
    params: { productId: string };
}

export default async function ProductPage({ params }: PageProps) {

    const productId = (await params).productId
    const productInfo = await getProductDetailAdmin(productId)

    return <ProductDetailAdminPageClientWrapper defaultValue={productInfo} />
}