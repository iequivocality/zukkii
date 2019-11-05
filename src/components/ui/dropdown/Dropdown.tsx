import React, { useState, CSSProperties } from 'react';
import styles from './Dropdown.module.scss';

export interface DropdownContent<T> {
    label : string,
    value : T
}

export interface DropdownProps<T = string> {
    contents : Array<T>,
    mapContentToDropdown : (content : T) => DropdownContent<T>,
    onSelect : (value : T, event? : any) => void 
    width? : number,
    placeholder? : string,
    style? : CSSProperties
}

export default function Dropdown<T = string>(props : DropdownProps<T>) {
    let [ isOpen, setIsOpen ] = useState();
    let [ currentValue, setCurrentValue ] = useState<string>(null);

    let toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    let { width, contents, mapContentToDropdown, onSelect, placeholder, style } = props;
    let newWidth = width ? width : 0;
    let newPlaceholder = currentValue !== null ? currentValue : (placeholder ? placeholder : 'Select value');
    let contentsForDropdown = contents.map(mapContentToDropdown);

    let onDropdownSelect = (content : DropdownContent<T>) => {
        onSelect(content.value);
        setCurrentValue(content.label)
        setIsOpen(false);
    }

    return (
        <div className={isOpen ? styles.dropdownWrapperOpen : styles.dropdownWrapper} style={style}>
            <div className={styles.dropdownButton} style={{ width : `${newWidth}px` }} onClick={toggleDropdown}>{newPlaceholder}<span className={styles.triangle}/></div>
            <div className={styles.dropdownContent} style={{ width : `${newWidth}px`, opacity : isOpen ? 1 : 0, pointerEvents : isOpen ? 'inherit' : 'none' }}>
                {contentsForDropdown.map((content : DropdownContent<T>) => {
                    return (
                        <div onClick={() => onDropdownSelect(content)}>{content.label}</div>
                    )
                })}
            </div>
        </div>
    );
}