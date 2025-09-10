'use client'

import styles from './adminProductConsole.module.scss'
import { useEffect, useState } from 'react';
import { OrderedItem } from '@/types/order';
import { ProductOption } from '@/types/product';
import { toast } from 'react-toastify';
import AdminPageSection from '../adminPageSection/AdminPageSection';
import getProductOptionsAdmin from '@/services/admin/getProductOptions';
import SearchInput from '@/components/common/ui/input/search/SearchInput';
import SpinnerLoader from '@/components/common/ui/loader/Loader';
import ProductOptionListItem from './productOptionList/ProductOptionListItem';
import Checkbox from '@/components/common/ui/button/checkbox/CheckBox';
import Button from '@/components/common/ui/button/Button';
import { toCommaSeparated } from '@/services/common/common';
import Paginator from '@/components/common/ui/paginator/Paginator';
import OrderedOptionListItem from './productOptionList/OrderedOptionListItem';
import { Pen, PenBox, PenTool } from 'lucide-react';

interface AdminProductConsoleProps {
    products: OrderedItem[];
    onChange: (v: OrderedItem[]) => void;
}

export interface SearchedProductOption {
    option: ProductOption;
    quantity: number;
}

export default function AdminProductConsole({
    products,
    onChange,
}: AdminProductConsoleProps) {

    const [loading, setLoading] = useState<boolean>(false)
    const [query, setQuery] = useState<string>("")
    const [currentQuery, setCurrentQuery] = useState<string>("")
    const [filtered, setFiltered] = useState<SearchedProductOption[] | null>(null)
    const [maxPage, setMaxPage] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedOptions, setSelectedOptions] = useState<Set<number>>(new Set())

    const [selected, setSelected] = useState<OrderedItem[]>([])
    const [counter, setCounter] = useState<number>(0)

    useEffect(() => {
        loadOptions()
    }, [currentPage])

    const searchOptions = async () => {
        setCurrentQuery(query)
        setCurrentPage(1)
        loadOptions()
    }
    const loadOptions = async () => {
        if (currentQuery.trim() === "") {
            setFiltered(null)
            return
        }
        setLoading(true)
        const promise = getProductOptionsAdmin(currentQuery, currentPage);
        try {
            const options = await promise
            setFiltered(options.map(o => ({ option: o, quantity: 0 })))
        } catch {
            toast("오류 발생. 관리자에게 문의하세요", { type: "error" })
            setFiltered([])
        }
        setLoading(false)
    }
    const selectProductOption = (p: SearchedProductOption) => {
        setSelectedOptions(prev => new Set([...prev, p.option.id!]))
    }
    const deselectProductOption = (p: SearchedProductOption) => {
        setSelectedOptions(prev => {
            const next = new Set([...prev])
            next.delete(p.option.id!);
            return next
        })
    }
    const handlePOQChange = (p: SearchedProductOption, q: number) => {
        setFiltered(prev => {
            const selected = selectedOptions.has(p.option.id!)
            if (!selected) {
                selectProductOption(p)
            }
            return prev!.map(s =>
                s.option.id === p.option.id
                    ? { ...s, quantity: q }
                    : s
            )
        })
    }
    const selectProduct = (p: OrderedItem) => {
        setSelected(prev => [...prev, p])
    }
    const deselectProduct = (i: number | string) => {
        setSelected(prev => prev.filter(p => p.id !== i))
    }

    const selectAllSearched = () => {
        if (filtered) setSelectedOptions(new Set(filtered.map(o => o.option.id!)))
    }
    const deselectAllSearched = () => { if (filtered) setSelectedOptions(new Set()) }

    const selectAll = () => setSelected([...products])
    const deselectAll = () => setSelected([])

    const handleOrderedItemChange = (p: OrderedItem, price: number, quantity: number) => {
        const newList = products.map((o) => {
            if (p.id !== o.id) return o
            return { ...p, price, quantity }
        })
        onChange(newList)
    }
    const handlePriceChange = (i: number | string, v: number) => {
        const newList = products.map((p) => {
            if (p.id !== i) return p
            p.price = v
            return p
        })
        onChange(newList)
    }

    const addProducts = () => {
        if (selectedOptions.size === 0) {
            toast("추가할 옵션이 없습니다", { type: "error" })
            return
        }
        const newProducts: OrderedItem[] = []
        filtered?.forEach((o, i) => {
            if (!selectedOptions.has(o.option.id!)) return
            newProducts.push({
                id: `new${counter + i}`,
                productOption: o.option.id!,
                price: o.option.price!,
                quantity: o.quantity,
                optionName: o.option.displayName!,
            })
        })
        toast(`${selectedOptions.size}개 옵션 추가됨`, { type: "success" })
        setCounter(prev => prev + selectedOptions.size)
        setSelectedOptions(new Set())
        setFiltered(prev => prev!.map(o => ({ ...o, quantity: 0 })))
        onChange([...products, ...newProducts])
    }
    const removeProducts = () => {
        if (selected.length === 0) toast("삭제할 옵션이 없습니다", { type: "error" })
        const set = new Set(selected.map(p => p.id))
        setSelectedOptions(new Set())
        onChange(products.filter(p => !set.has(p.id)))
    }

    const totalSelectedOptionQuantity = () => {
        let total = 0
        filtered?.forEach(o => {
            if (selectedOptions.has(o.option.id!)) total += o.quantity
        })
        return toCommaSeparated(total)
    }

    return (<>
        <AdminPageSection>
            <SearchInput query={query} onQueryChange={setQuery} onSearch={searchOptions} />
            <table className={styles['search-result']}>
                <thead>
                    <tr className={styles['search-result__column-names']}>
                        <th><Checkbox onSelect={selectAllSearched} onDeselect={deselectAllSearched} selected={filtered !== null && selectedOptions.size === filtered.length} /></th>
                        <th className={styles['option-name']}><span>상품명</span></th>
                        <th className={styles['price']}><span>판매가</span></th>
                        <th className={styles['stock']}><span>재고수량</span></th>
                        <th className={styles['quantity']}><span>주문수량</span></th>
                        <th className={styles['revenue']}><span>판매액</span></th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr className={styles['loader']}><td><SpinnerLoader /></td></tr> : filtered === null ? <tr className={styles.empty}><td>상품을 검색해주세요</td></tr> : !filtered ? <div className={styles.empty}>검색 결과가 없습니다</div> : filtered.map(o => <ProductOptionListItem
                        key={o.option.id}
                        selected={selectedOptions.has(o.option.id!)}
                        onSelect={() => selectProductOption(o)}
                        onDeselect={() => deselectProductOption(o)}
                        productOption={o}
                        onQuantityChange={handlePOQChange}
                    />)}
                </tbody>
            </table>
            <div className={styles['search-result-buttons']}>
                <Paginator maxPage={10} currentPage={currentPage} onPageChange={setCurrentPage} />
                <div className={styles.spacer}></div>
                <span>{selectedOptions.size}개 상품 ({totalSelectedOptionQuantity()})</span>
                <Button onClick={addProducts}>추가</Button>
            </div>
        </AdminPageSection>
        <AdminPageSection>
            <div className={styles['selected-products-header']}>
                <h3>주문 목록</h3>
                <div className={styles['buttons']}>
                    <Button className={styles['remove-products-button']} onClick={removeProducts} color='blue'>인쇄 추가</Button>
                    <Button className={styles['remove-products-button']} onClick={removeProducts}>포장 추가</Button>
                    <Button className={styles['remove-products-button']} onClick={removeProducts}>선택 삭제</Button>
                </div>
            </div>
            <table className={styles['selected-products']}>
                <thead>
                    <tr className={styles['selected-products__column-names']}>
                        <th className={styles['check']}><Checkbox onSelect={selectAll} onDeselect={deselectAll} selected={products.length > 0 && selected.length === products.length} /></th>
                        <th className={styles['option-name']}><span>상품명</span></th>
                        <th className={styles['price']}><span>판매가</span></th>
                        <th className={styles['quantity']}><span>주문수량</span></th>
                        <th className={styles['revenue']}><span>판매액</span></th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? <tr className={styles.empty}><td>선택된 상품이 없습니다</td></tr> : products.map(p => <OrderedOptionListItem
                        key={p.id}
                        item={p}
                        selected={selected.some(s => s.id === p.id)}
                        onSelect={() => selectProduct(p)}
                        onDeselect={() => deselectProduct(p.id!)}
                        onChange={handleOrderedItemChange}
                    />)}
                </tbody>
            </table>
        </AdminPageSection>
    </>)
}