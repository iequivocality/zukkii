import React, { useState, CSSProperties, useCallback, useMemo } from 'react';
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
    all? : boolean,
    color? : string
}

export default function Dropdown<T = string>(props : DropdownProps<T>) {
    let { width, contents, mapContentToDropdown, onSelect, style, all, color } = props;
    let [ isOpen, setIsOpen ] = useState();
    let allContent = { key : 'all', label : '全部', value : null };
    let [ currentValue, setCurrentValue ] = useState<DropdownContent<T>>(all ? allContent : mapContentToDropdown(contents[0]));

    let toggleDropdown = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);
    let newWidth = width ? width : 0;
    let contentsForDropdown = contents.map(mapContentToDropdown);
    if (all) {
        contentsForDropdown.unshift({ key : 'all', label : '全部', value : null });
    }

    let onDropdownSelect = useCallback((content : DropdownContent<T>) => {
        onSelect(content.value);
        setCurrentValue(content)
        setIsOpen(false);
    }, [currentValue]);

    return (
        <div className={isOpen ? styles.dropdownWrapperOpen : styles.dropdownWrapper} style={style}>
            <div className={styles.dropdownButton} style={{ width : `${newWidth}px`, backgroundColor : color }} onClick={toggleDropdown}>{currentValue.label}<span className={styles.triangle}/></div>
            <div className={styles.dropdownContent} style={{ width : `${newWidth}px`, backgroundColor : color, opacity : isOpen ? 1 : 0, pointerEvents : isOpen ? 'inherit' : 'none' }}>
                {contentsForDropdown.map((content : DropdownContent<T>) => {
                    return (
                        content.key !== currentValue.key ? <div key={content.key} className={styles.dropdownContentItem} onClick={() => onDropdownSelect(content)}>{content.label}</div> : null
                    )
                })}
            </div>
        </div>
    );
}