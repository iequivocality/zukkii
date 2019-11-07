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
    icon? : boolean
}

export default function ToggleSwitch(props : ToggleSwitchProps) {
    
    let width : number = props.width ? props.width : 100;
    let onState : ToggleSwitchState = props.onState;
    let offState : ToggleSwitchState = props.offState;
    let [ isOn, setIsOn ] = useState(onState.selected);
    
    let transform : number = isOn ? width - 34 : 4;
    let switchStyle : CSSProperties = props.labelStyle ? props.labelStyle : {};

    let onSwitchClick = () => {
        setIsOn(!isOn);
        props.onToggle(!isOn, !isOn ? onState : offState);
    }

    let iconComponent = null;
    if (props.icon) {
        iconComponent = isOn ? onState.iconComponent : offState.iconComponent
    }

    return (
        <label className={styles.toggleSwitch} style={{ width : `${width}px` }} onClick={onSwitchClick}>
            <span className={styles.switch} style={{ transform : `translateX(${transform}px)` }}></span>
            <span className={isOn ? styles.sliderOn : styles.slider} style={{ backgroundColor : isOn ? onState.color : offState.color }}>
                <span className={styles.switchLabel} style={switchStyle}>
                    {props.icon ? (<span className={styles.switchIcon}>{iconComponent}</span>) : null}
                    <span>{isOn ? onState.label : offState.label}</span>
                </span>
            </span>
        </label>
    );
}