import React, { useEffect, useRef, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { SelectProps } from '../../interfaces/SelectProps';
import styles from './Select.module.css';

const Select = ({ options = [], value, onSelect }: SelectProps) => {
    const wrapperRef = useRef<any>();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown((prevState) => !prevState);

    const optionClassName = (val: string) => (value === val ? 'selectedOption' : 'option');

    useEffect(() => {
        function handleClickOutside(event: { target: any }) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <span className={styles.wrapper} ref={wrapperRef}>
            <span className={styles.title} onClick={toggleDropdown}>
                <span>{value.toUpperCase()}</span>
                <AiFillCaretDown style={{ marginLeft: 10 }} />
            </span>
            {showDropdown && (
                <div className={styles.dropdown}>
                    {options.map((option) => (
                        <div
                            key={option}
                            className={styles[optionClassName(option)]}
                            onClick={() => {
                                onSelect(option);
                                setShowDropdown(false);
                            }}>
                            {option.toUpperCase()}
                        </div>
                    ))}
                </div>
            )}
        </span>
    );
};

export default Select;
