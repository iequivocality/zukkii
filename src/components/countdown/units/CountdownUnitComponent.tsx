import React from "react";
import CountdownUnit from "../../../models/CountdownUnit";
import styles from "./CountdownUnitComponent.module.scss";
import Util from "../../../Util";

export default function CountdownUnitComponent(props : CountdownUnit) {
    let { unit, value, maxValue } = props;
    let topValue = 45 - ((value / maxValue) * 45);
    let style : React.CSSProperties = {
        top : `${topValue}px`,
        backgroundColor : Util.computeShade(props.color, -0.2)
    };
    return (
        <div className={styles.unitContainer}>
            <div className={styles.value}>{value}</div>
            <div className={styles.unit}>{unit}</div>
            <div className={styles.progressBar} style={style}></div>
        </div>
    );
}