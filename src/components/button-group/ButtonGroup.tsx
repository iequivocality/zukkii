import React, { MouseEvent, ReactNode, useState, useEffect, CSSProperties, useCallback }  from 'react';
import styles from './ButtonGroup.module.scss';

export interface ButtonProps<T> {
    key : number,
    iconComponent? : ReactNode,
    onClick : (value : T, e? : MouseEvent) => void,
    selected : boolean,
    label : string,
    value : T
}

export interface ButtonGroupProps<T> {
    backgroundColor : string,
    contents : Array<T>,
    all? : boolean,
    icon? : boolean,
    mapToButton : (o : T) => ButtonProps<T>,
    selectedItemStyle : CSSProperties
}

export default function ButtonGroup<T>(props : ButtonGroupProps<T>) {
    let { backgroundColor, contents, all, mapToButton, selectedItemStyle } = props;
    let [ buttonGroupContents, setButtonGroupContents ] = useState<ButtonProps<T>[]>([]);
    let [ selectedItem, setSelectedItem ] = useState<ButtonProps<T>>(null);

    useEffect(() => {
        let newContents = contents.map(mapToButton);
        // if (all) {
        //     newContents.unshift(Constants.ALL_DROPDOWN_CONTENT);
        // }
        setSelectedItem(newContents.find(nc => nc.selected));
        setButtonGroupContents(newContents)
    }, [contents]);

    let onClickButton = (event : MouseEvent, bgp : ButtonProps<T>) => {
        bgp.onClick(bgp.value, event);
        setSelectedItem(bgp);
    };

    return (
        <div className={styles.buttonGroup} style={{ backgroundColor }}>
            {buttonGroupContents.map((bgp : ButtonProps<T>) => {
                return (
                    <div className={styles.buttonGroupItem}
                        key={bgp.key}
                        style={selectedItem.key === bgp.key ? selectedItemStyle : null}
                        onClick={(event : MouseEvent) => { onClickButton(event, bgp) }}>
                        {bgp.label}
                    </div>
                )
            })}
        </div>
    );
}