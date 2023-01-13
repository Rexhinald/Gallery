import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import styles from './Pagination.module.css';

const Pagination = ({ page, onPageChange }: any) => {
    const [maxPages, setMaxPages] = useState(1);

    const pages = () => {
        const numbers = Array.from(Array(maxPages).keys());
        return numbers.map((number) => {
            if (
                (number + 1 > 1 && number + 1 === page - 1 && number + 1 !== page) ||
                (number + 1 > page && number + 1 === maxPages - 1)
            ) {
                return '...';
            }
            if (number > 0 && number + 1 !== page && number + 1 < maxPages) {
                return;
            }
            return (
                <div
                    className={styles[number + 1 === page ? 'currentPage' : 'page']}
                    key={number}
                    onClick={() => onPageChange(number + 1)}>
                    {number + 1}
                </div>
            );
        });
    };

    useEffect(() => {
        if (page > maxPages) {
            setMaxPages(page);
        }
    }, [page, maxPages]);

    return (
        <div className={styles.container}>
            {page !== 1 && (
                <AiOutlineArrowLeft
                    style={{ cursor: 'pointer' }}
                    size={15}
                    onClick={() => onPageChange(page - 1)}
                />
            )}
            {pages()}
            <AiOutlineArrowRight
                style={{ cursor: 'pointer' }}
                size={15}
                onClick={() => onPageChange(page + 1)}
            />
        </div>
    );
};

export default Pagination;
