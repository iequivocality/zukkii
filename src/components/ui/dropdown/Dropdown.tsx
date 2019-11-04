import React, { useState } from 'react';
import styles from './Dropdown.module.scss';

export default function Dropdown() {
    let [ isOpen, setIsOpen ] = useState();

    let toggleDropdown = () => {
        setIsOpen(!isOpen);
        console.log(!isOpen);
    }

    let contents = ['Link 1', 'Link 2', 'Link 3'];
    let totalWidth = contents.length * 30;

    return (
        <div className={isOpen ? styles.dropdownWrapperOpen : styles.dropdownWrapper}>
            <div className={styles.dropdownButton} onClick={toggleDropdown}>Dropdown<span className={styles.triangle}/></div>
            <div className={styles.dropdownContent} style={{ top : `0px`, transform: `translateY(${isOpen ? 30 : 0}px)`, height : `${isOpen ? totalWidth : 30}px` }}>
                <div>Link 1</div>
                <div>Link 2</div>
                <div>Link 3</div>
            </div>
        </div>
    );
}