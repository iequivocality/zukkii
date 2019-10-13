import React from "react";
import CountdownUnit from "../../../models/CountdownUnit";
import "./CountdownUnitComponent.scss";
import Util from "../../../Util";

export default class CountdownUnitComponent extends React.Component<CountdownUnit> {
    render() {
        let { unit, value, maxValue } = this.props;
        let topValue = 45 - ((value / maxValue) * 45);
        let style : React.CSSProperties = {
            top : `${topValue}px`,
            backgroundColor : Util.computeShade(this.props.color, -0.2)
        }; 

        return (
            <div className="unit-container">
                <div className="value">{value}</div>
                <div className="unit">{unit}</div>
                <div className="progress-bar" style={style}></div>
            </div>
        );
    }
}