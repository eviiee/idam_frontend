'use client'

import { motion } from "framer-motion";
import React from "react"

export default function ConsoleSideBar() {

    const toggleCollapse = (e: React.MouseEvent<HTMLHeadingElement>) => {
        const clickedDiv = e.currentTarget.parentElement; // h3 감싸는 div
        if (!clickedDiv) return;

        const allDivs = document.querySelectorAll<HTMLDivElement>('.admin-console__nav li > div');

        // 모든 div에서 'open' 제거
        allDivs.forEach(div => {
            if (div !== clickedDiv) {
                div.classList.remove('admin-console__nav-item--open');
            }
        });

        // 클릭한 div만 toggle
        clickedDiv.classList.toggle('admin-console__nav-item--open');
    };

    return (
        <aside className="admin-console__sidebar">
            <div className="admin-console__logo-wrap">
                <a href="/">
                    <img src="/images/brand/idam_white.svg" alt="이담리테일" />
                </a>
            </div>
            <ul className="admin-console__nav">
                <li><div><h3>홈</h3></div></li>
                <li>
                    <div>
                        <h3 onClick={toggleCollapse}>판매 관리</h3>
                        <motion.ul className="admin-console__nav-sub-list">
                            <li><a>주문서 작성</a></li>
                            <li><a>주문 조회</a></li>
                        </motion.ul>
                    </div>
                </li>
                <li>
                    <div>
                        <h3 onClick={toggleCollapse}>인쇄 관리</h3>
                        <ul className="admin-console__nav-sub-list">
                            <li><a>인쇄 목록</a></li>
                            <li><a>인쇄 시안 업로드</a></li>
                            <li><a>인쇄 시안 조회</a></li>
                        </ul>
                    </div>
                </li>
                <li><div><h3 onClick={toggleCollapse}>재고 관리</h3></div></li>
                <li><div><h3 onClick={toggleCollapse}>상품 관리</h3></div></li>
                <li><div><h3 onClick={toggleCollapse}>판매채널</h3></div></li>
                <li><div><h3 onClick={toggleCollapse}>거래처</h3></div></li>
                <li><div><h3 onClick={toggleCollapse}>계정</h3></div></li>
            </ul>
        </aside>
    )
}