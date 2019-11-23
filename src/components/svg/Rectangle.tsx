import React from 'react';

export interface RectangleProps {
    width : number | string,
    height : number | string,
    color : string,
    className? : string
}

export default function Rectangle(props : RectangleProps) {
    let { width, height, color, className } = props;

    return (
        <svg width={width} height={height} className={className}>
            <rect width={width} height={height} style={{
                fill : color
            }}/>
        </svg>
    );
}