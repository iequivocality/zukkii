import React, { useContext } from "react";
import CountdownUnit from "../../../models/CountdownUnit";
import styles from "./CountdownUnitComponent.module.scss";
import ThemeContext from "../../../contexts/themeContext";

export default function CountdownUnitComponent(props : CountdownUnit) {
    let { theme } = useContext(ThemeContext);
    let { unit, value, maxValue, color } = props;
    let topValue = 45 - ((value / maxValue) * 45);
    let style : React.CSSProperties = {
        top : `${topValue}px`,
        backgroundColor : theme.countdownUnitBackground(color)
    };

    let valueAndUnitStyle : React.CSSProperties = {
        color : theme.countdownValueAndUnitForeground
    }

    return (
        <div className={styles.unitContainer} style={{ color : color }}>
            <div className={styles.value} style={valueAndUnitStyle}>{value}</div>
            <div className={styles.unit} style={valueAndUnitStyle}>{unit}</div>
            <div className={styles.progressBar} style={style}></div>
        </div>
    );
}