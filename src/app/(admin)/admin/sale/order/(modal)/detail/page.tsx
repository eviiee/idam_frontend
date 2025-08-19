import { notFound, useSearchParams } from "next/navigation"

export default function OrderAdminPage() {

    const params = useSearchParams();
    if (!params.has('id')) notFound();
    const orderId = params.get('id');

    return <div>주문 ID : {orderId}</div>
}