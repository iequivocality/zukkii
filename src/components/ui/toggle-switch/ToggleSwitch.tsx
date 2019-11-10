import React, { useState, CSSProperties, ReactNode } from 'react';
import styles from './ToggleSwitch.module.scss'

export interface ToggleSwitchState {
    key : string,
    color? : string,
    label? : string,
    selected : boolean
    iconComponent? : ReactNode
}

export interface ToggleSwitchProps {
    width? : number,
    onToggle : (toggleStatus : boolean, state? : ToggleSwitchState) => void,
    onState? : ToggleSwitchState,
    offState? : ToggleSwitchState,
    labelStyle? : CSSProperties,
    switchStyle? : CSSProperties,
    icon? : boolean,
    iconOnly? : boolean
}

export default function ToggleSwitch(props : ToggleSwitchProps) {
    let { width, onState, offState, labelStyle, switchStyle, icon, iconOnly } = props;
    let newWidth : number = width ? width : 100;
    let [ isOn, setIsOn ] = useState(onState.selected);
    
    let transform : number = isOn ? width - 34 : 2;
    let switchLabelStyle : CSSProperties = labelStyle ? labelStyle : {};

    let onSwitchClick = () => {
        setIsOn(!isOn);
        props.onToggle(!isOn, !isOn ? onState : offState);
    }

    let iconComponent = null;
    if (props.icon) {
        iconComponent = isOn ? onState.iconComponent : offState.iconComponent
    }

    return (
        <label className={styles.toggleSwitch} style={{ width : `${newWidth}px` }} onClick={onSwitchClick}>
            <span className={styles.switch} style={{ transform : `translateX(${transform}px)`, ...switchStyle }}></span>
            <span className={isOn ? styles.sliderOn : styles.slider} style={{ backgroundColor : isOn ? onState.color : offState.color }}>
                <span className={styles.switchLabel} style={switchLabelStyle}>
                    {(icon) ? (<span className={styles.switchIcon}>{iconComponent}</span>) : null}
                    {<span>{isOn ? onState.label : offState.label}</span>}
                </span>
            </span>
        </label>
    );
}