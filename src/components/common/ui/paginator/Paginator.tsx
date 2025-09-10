'use client'

import clsx from 'clsx';
import styles from './paginator.module.scss';
import { Ellipsis } from 'lucide-react';

interface PaginatorProps {
    maxPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Paginator({
    maxPage,
    currentPage,
    onPageChange,
}: PaginatorProps) {

    const pageNumbers = [];
    for (let i = 1; i <= maxPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.paginator}>
            <button
                className={styles.arrowButton}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {currentPage > 3 && <>
                <button
                    className={styles.pageButton}
                    onClick={() => onPageChange(1)}
                >1</button>
                {currentPage > 4 && <Ellipsis size={"1.2rem"} className={styles.ellipsis} />}
            </>}
            {Array.from({ length: Math.min(5, maxPage) }, (_, i) => {
                const num = i + Math.max(1, Math.min(currentPage - 2, maxPage - 4));
                return (
                    <button
                        key={num}
                        className={clsx(styles.pageButton, num === currentPage && styles.active)}
                        onClick={() => onPageChange(num)}
                        disabled={num === currentPage}
                    >
                        {num}
                    </button>
                )
            })}
            {currentPage < maxPage - 2 && <>
                {currentPage < maxPage - 3 && <Ellipsis size={"1.2rem"} className={styles.ellipsis} />}
                <button
                    className={styles.pageButton}
                    onClick={() => onPageChange(maxPage)}
                >{maxPage}</button>
            </>}
            <button
                className={styles.arrowButton}
                onClick={() => onPageChange(Math.min(maxPage, currentPage + 1))}
                disabled={currentPage === maxPage}
            >
                &gt;
            </button>
        </div>
    );
}