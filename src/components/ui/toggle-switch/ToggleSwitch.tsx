import React, { useState, CSSProperties } from 'react';
import styles from './ToggleSwitch.module.scss'

interface ToggleSwitchState {
    label : string,
    color : string
}

interface ToggleSwitchProps {
    width? : number,
    onToggle : (toggleStatus : boolean) => void,
    onState? : ToggleSwitchState,
    offState? : ToggleSwitchState,
    labelStyle? : CSSProperties
}

export default function ToggleSwitch(props : ToggleSwitchProps) {
    let [ isOn, setIsOn ] = useState(false);
    
    let width : number = props.width ? props.width : 100;
    let onState : ToggleSwitchState = props.onState ? props.onState : { color : '#2196F3', label : 'ON' };
    let offState : ToggleSwitchState = props.offState ? props.offState : { color : '#CCCCCC', label : 'OFF' };
    let transform : number = isOn ? width - 34 : 4;
    let switchStyle : CSSProperties = props.labelStyle ? props.labelStyle : {};

    let onSwitchClick = () => {
        setIsOn(!isOn);
        props.onToggle(!isOn);
    }

    return (
        <label className={styles.toggleSwitch} style={{ width : `${width}px` }} onClick={onSwitchClick}>
            <span className={styles.switch} style={{ transform : `translateX(${transform}px)` }}></span>
            <span className={styles.slider} style={{ backgroundColor : isOn ? onState.color : offState.color }}>
                <span className={styles.switchLabel} style={switchStyle}>{isOn ? onState.label : offState.label}</span>
            </span>
        </label>
    );
}