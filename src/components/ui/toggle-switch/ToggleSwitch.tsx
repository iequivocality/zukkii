import React, { useState } from 'react';
import styles from './ToggleSwitch.module.scss'

interface ToggleSwitchProps {
    width? : number
}

export default function ToggleSwitch(props : ToggleSwitchProps) {
    let [ isOn, setIsOn ] = useState(false);
    
    let width : number = props.width ? props.width : 100;
    let transform : number = isOn ? width - 34 : 4;

    return (
        <label className={styles.toggleSwitch} style={{ width : `${width}px` }} onClick={() => { setIsOn(!isOn) }}>
            <span className={styles.switch} style={{ transform : `translateX(${transform}px)` }}></span>
            <span className={styles.slider} style={{ backgroundColor : isOn ? '#2196F3' : '#CCCCCC' }}>
                <span className={styles.switchLabel}>{isOn ? 'ON' : 'OFF'}</span>
            </span>
        </label>
    );
}