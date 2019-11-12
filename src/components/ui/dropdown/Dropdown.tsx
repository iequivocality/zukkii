import React, { useState, CSSProperties, useCallback, useRef, useEffect, ReactNode } from 'react';
import styles from './Dropdown.module.scss';
import useClickOutside from '../../../hooks/useClickOutside';
import { Constants } from '../../../Constants';

export interface DropdownContent<T = any> {
    key : string,
    label : string,
    value : T,
    iconComponent? : ReactNode
}

export interface DropdownProps<T = string> {
    contents : Array<T>,
    mapContentToDropdown : (content : T) => DropdownContent<T>,
    onSelect : (value : T, event? : any) => void 
    width? : number,
    style? : CSSProperties,
    all? : boolean,
    icon? : boolean,
    color? : string
}

export default function Dropdown<T = string>(props : DropdownProps<T>) {
    let { width, contents, mapContentToDropdown, onSelect, style, all, color, icon } = props;
    let [ isOpen, setIsOpen ] = useState(false);
    let [ currentValue, setCurrentValue ] = useState<DropdownContent<T>>(null);
    let [ contentsForDropdown, setContentsForDropdown] = useState([]);
    let toggleDropdown = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);
    let newWidth = width ? width : 100;

    useEffect(() => {
        setCurrentValue(all ? Constants.ALL_DROPDOWN_CONTENT : mapContentToDropdown(contents[0]))
    }, [])

    useEffect(() => {
        let newContents = contents.map(mapContentToDropdown);
        if (all) {
            newContents.unshift(Constants.ALL_DROPDOWN_CONTENT);
        }
        setContentsForDropdown(newContents)
    }, [contents]);

    let onDropdownSelect = useCallback((content : DropdownContent<T>) => {
        onSelect(content.value);
        setCurrentValue(content)
        setIsOpen(false);
    }, [currentValue]);

    let dropdownElement = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownElement, () => {
        if (isOpen) {
            setIsOpen(false);
        }
    });

    return (
        <div ref={dropdownElement} className={isOpen ? styles.dropdownWrapperOpen : styles.dropdownWrapper} style={style}>
            <div className={styles.dropdownButton} style={{ width : `${newWidth}px`, backgroundColor : color }} onClick={toggleDropdown}>
                { icon && <span className={styles.dropdownContentIcon}>{currentValue && currentValue.iconComponent}</span> }
                {currentValue !== null ? currentValue.label : ''}
                <span className={styles.triangle}/>
            </div>
            <div className={styles.dropdownContent} style={{ width : `${newWidth}px`, backgroundColor : color, opacity : isOpen ? 1 : 0, pointerEvents : isOpen ? 'inherit' : 'none' }}>
                {contentsForDropdown.map((content : DropdownContent<T>) => {
                    return (
                        content.key !== currentValue.key ? 
                        <div key={content.key} className={styles.dropdownContentItem} onClick={() => onDropdownSelect(content)}>
                            { icon && <span className={styles.dropdownContentIcon}>{content.iconComponent}</span> }
                            <span>{content.label}</span>
                        </div> : null
                    )
                })}
            </div>
        </div>
    );
}