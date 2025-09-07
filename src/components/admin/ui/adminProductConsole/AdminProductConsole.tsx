'use client'

import styles from './adminProductConsole.module.scss'
import { useState } from 'react';
import { OrderedItem } from '@/types/order';
import { ProductOption } from '@/types/product';
import { toast } from 'react-toastify';
import AdminPageSection from '../adminPageSection/AdminPageSection';
import getProductOptionsAdmin from '@/services/admin/getProductOptions';
import SearchInput from '@/components/common/ui/input/search/SearchInput';
import SpinnerLoader from '@/components/common/ui/loader/Loader';
import ProductOptionListItem from './productOptionList/ProductOptionListItem';

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
    const [filtered, setFiltered] = useState<SearchedProductOption[]>([])
    const [selectedOptions, setSelectedOptions] = useState<SearchedProductOption[]>([])

    const [selected, setSelected] = useState<OrderedItem[]>([])
    const [counter, setCounter] = useState<number>(0)

    const selectedOptionSet = new Set(selectedOptions.map(o => o.option.id))

    const searchOptions = async () => {
        setLoading(true)
        const promise = getProductOptionsAdmin(query);
        try {
            const options = await promise
            setFiltered(options.map(o => ({ option: o, quantity: 0 })))
        } catch {
            toast("오류 발생. 관리자에게 문의하세요", { type: "error" })
        }
        setLoading(false)
    }
    const productOptionIsSelected = (p: SearchedProductOption) => {
        return selectedOptionSet.has(p.option.id)
    }
    const selectProductOption = (p: SearchedProductOption) => {
        setSelectedOptions(prev => [...prev, p])
    }
    const deselectProductOption = (p: SearchedProductOption) => {
        setSelectedOptions(prev => prev.filter(o => o.option.id !== p.option.id))
    }
    const handlePOQChange = (p: SearchedProductOption, q: number) => {
        if (!productOptionIsSelected(p)) {
            setSelectedOptions(prev => [...prev, p])
        } else {
            setSelectedOptions(prev => prev.map(s => {
                if (s.option.id === p.option.id) return { option: p.option, quantity: q }
                else return s
            }))
        }
    }
    const selectProduct = (p: OrderedItem) => {
        setSelected(prev => [...prev, p])
    }
    const deselectProduct = (i: number) => {
        setSelected(prev => prev.filter(p => p.id !== i))
    }
    const selectAll = () => setSelected([...products])
    const deselectAll = () => setSelected([])

    const handleQuantityChange = (i: number | string, v: number) => {
        const newList = products.map((p) => {
            if (p.id !== i) return p
            p.quantity = v
            return p
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
        if (selectedOptions.length === 0) {
            toast("추가할 옵션이 없습니다", { type: "error" })
        }
        const newProducts: OrderedItem[] = selectedOptions.map((p, i) => ({
            id: `new${counter + i}`,
            productOption: p.option.id!,
            price: p.option.price!,
            quantity: p.quantity,
            optionName: p.option.displayName!,
        }))
        toast(`${selectedOptions.length}개 옵션 추가됨`, { type: "success" })
        setCounter(prev => prev + selectedOptions.length)
        setSelectedOptions([])
        onChange([...products, ...newProducts])
    }
    const removeProducts = () => {
        if (selected.length === 0) toast("삭제할 옵션이 없습니다", { type: "error" })
        const set = new Set(selected.map(p => p.id))
        setSelectedOptions([])
        onChange(products.filter(p => !set.has(p.id)))
    }

    return (
        <AdminPageSection>
            <SearchInput query={query} onQueryChange={setQuery} onSearch={searchOptions} />
            <ul className={styles['search-result']}>
                {loading ? <SpinnerLoader /> : filtered.map(o => <ProductOptionListItem
                    key={o.option.id}
                    selected={productOptionIsSelected(o)}
                    onSelect={() => selectProductOption(o)}
                    onDeselect={() => deselectProductOption(o)}
                    productOption={o}
                    onQuantityChange={handlePOQChange}
                />)}
            </ul>
        </AdminPageSection>
    )
}