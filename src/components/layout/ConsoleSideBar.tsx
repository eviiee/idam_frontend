'use client'

import React, { useState } from "react"

export default function ConsoleSideBar() {
    
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleCollapse = (index: number) => {
        setOpenIndex(prev => prev === index ? null : index);
    };

    const navItems: {
        name: string;
        href: string;
        list?: [string, string][];
    }[] = [
            { name: "홈", href: "" },
            { name: "판매 관리", href: "sale", list: [["주문서 작성", "order/new"], ["주문 조회", "order"]] },
            { name: "인쇄 관리", href: "print", list: [["인쇄 목록", "list"], ["인쇄 시안 업로드", "upload"], ["인쇄 시안 조회", "history"]] },
            { name: "상품 관리", href: "product", list: [["상품 목록", "list"], ["신규상품 생성", "detail/new"], ["휴대폰 모델 관리", "model"]] },
            { name: "재고 관리", href: "inventory", list: [["재고 현황", "current"], ["입고 생성", "inbound"]] },
            { name: "판매채널", href: "channel" },
            { name: "거래처", href: "company" },
            { name: "계정", href: "account", list: [["계정 관리", "list"], ["신규 계정 생성", "new"]] },
        ];

    return (
        <aside className="admin-console__sidebar">
            <div className="admin-console__logo-wrap">
                <a href="/">
                    <img src="/images/brand/idam_white.svg" alt="이담리테일" />
                </a>
            </div>
            <ul className="admin-console__nav">
                {navItems.map((item, index) => (
                    <NavTab
                        key={item.href}
                        name={item.name}
                        href={item.href}
                        list={item.list}
                        isOpen={openIndex === index}
                        onToggle={() => toggleCollapse(index)}
                    />
                ))}
            </ul>
        </aside>
    )
}

function NavTab({
    name,
    href,
    list = [],
    isOpen,
    onToggle,
}: {
    name: string;
    href: string;
    list?: [string, string][];
    isOpen: boolean;
    onToggle: () => void;
}) {
    const title = <h3 onClick={list.length > 0 ? onToggle : undefined}>{name}</h3>;

    if (list.length > 0) {
        return (
            <li>
                <div className={`admin-console__nav-item ${isOpen ? 'admin-console__nav-item--open' : ''}`}>
                    {title}
                    <ul className="admin-console__nav-sub-list">
                        {list.map(([label, path]) => (
                            <li key={path}>
                                <a href={`/admin/${href}/${path}`}>{label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }

    return (
        <li>
            <a href={`/admin/${href}`}>{title}</a>
        </li>
    );
}
