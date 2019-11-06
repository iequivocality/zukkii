import React, { useState, CSSProperties } from 'react';
import styles from './Dropdown.module.scss';

export interface DropdownContent<T> {
    key : string,
    label : string,
    value : T
}

export interface DropdownProps<T = string> {
    contents : Array<T>,
    mapContentToDropdown : (content : T) => DropdownContent<T>,
    onSelect : (value : T, event? : any) => void 
    width? : number,
    style? : CSSProperties,
    all? : boolean
}

export default function Dropdown<T = string>(props : DropdownProps<T>) {
    let [ isOpen, setIsOpen ] = useState();
    let allContent = { key : 'all', label : '全部', value : null };
    let [ currentValue, setCurrentValue ] = useState<DropdownContent<T>>(allContent);

    let toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    let { width, contents, mapContentToDropdown, onSelect, style, all } = props;
    let newWidth = width ? width : 0;
    // let newPlaceholder = currentValue !== null ? currentValue : (placeholder ? placeholder : 'Select value');
    let contentsForDropdown = contents.map(mapContentToDropdown);
    if (all) {
        contentsForDropdown.unshift({ key : 'all', label : '全部', value : null });
    }
    else {

    }

    let onDropdownSelect = (content : DropdownContent<T>) => {
        onSelect(content.value);
        setCurrentValue(content)
        setIsOpen(false);
    }

    return (
        <div className={isOpen ? styles.dropdownWrapperOpen : styles.dropdownWrapper} style={style}>
            <div className={styles.dropdownButton} style={{ width : `${newWidth}px` }} onClick={toggleDropdown}>{currentValue.label}<span className={styles.triangle}/></div>
            <div className={styles.dropdownContent} style={{ width : `${newWidth}px`, opacity : isOpen ? 1 : 0, pointerEvents : isOpen ? 'inherit' : 'none' }}>
                {contentsForDropdown.map((content : DropdownContent<T>) => {
                    return (
                        content.key !== currentValue.key ? <div key={content.key} onClick={() => onDropdownSelect(content)}>{content.label}</div> : null
                    )
                })}
            </div>
        </div>
    );
}