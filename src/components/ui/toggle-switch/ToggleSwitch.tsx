import React, { useState, CSSProperties, ReactElement, useEffect } from 'react';
import styles from './ToggleSwitch.module.scss'
import { IconBaseProps } from 'react-icons/lib/cjs';

export interface ToggleSwitchState {
    key : string,
    iconComponent? : ReactElement<IconBaseProps>,
    color? : string,
    switchContainerStyle? : CSSProperties,
    switchStyle? : CSSProperties
}

export interface ToggleSwitchProps {
    width? : number,
    onToggle : (toggleStatus : boolean, state? : ToggleSwitchState) => void,
    onState? : ToggleSwitchState,
    offState? : ToggleSwitchState,
    switchContainerStyle? : CSSProperties,
    icon? : boolean,
    value : boolean,
}

export default function ToggleSwitch(props : ToggleSwitchProps) {
    let { width, onState, offState, switchContainerStyle, icon, value } = props;
    let newWidth : number = width ? width : 100;
    let [ isOn, setIsOn ] = useState(value);

    useEffect(() => {
        setIsOn(value);
    }, [value]);
    
    let transform : number = isOn ? width - 24 : 2;

    let onSwitchClick = () => {
        setIsOn(!isOn);
        props.onToggle(!isOn, !isOn ? onState : offState);
    }

    let iconComponent = null;
    if (props.icon) {
        iconComponent = isOn ? onState.iconComponent : offState.iconComponent
    }

    let stateSwitchContainerStyle = isOn ? onState.switchContainerStyle : offState.switchContainerStyle;
    let stateSwitchStyle = isOn ? onState.switchStyle : offState.switchStyle;

    return (
        <label className={styles.toggleSwitch} style={{ width : `${newWidth}px`, backgroundColor : isOn ? onState.color : offState.color, ...switchContainerStyle, ...stateSwitchContainerStyle }} onClick={onSwitchClick}>
            <span className={styles.switch} style={{ transform : `translateX(${transform}px)`, ...stateSwitchStyle }}></span>
            <span className={isOn ? styles.sliderOn : styles.slider} style={{ backgroundColor : isOn ? onState.color : offState.color }}>
                {(icon) ? (<span className={styles.switchIcon} style={!isOn ? { right : '5px' } : { right : `${width - 24}px` }}>{iconComponent}</span>) : null}
            </span>
        </label>
    );
}