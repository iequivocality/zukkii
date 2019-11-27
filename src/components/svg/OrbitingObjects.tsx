import React, { CSSProperties } from 'react';
import Vector from '../../models/Vector';

export interface OrbitingObjectsProps {
    numberOfCircles : number
    className? : string
    color : string
    distance : number,
    radius : number,
    style? : CSSProperties
}

export default function OrbitingObjects(props : OrbitingObjectsProps) {
    let { numberOfCircles, className, color, distance, radius, style } = props;
    let degreeDiff = 360 / numberOfCircles;
    let size = (distance + radius) * 2;
    let centerVector : Vector = new Vector(distance + radius, distance + radius);
    let firstVector = new Vector(distance, 0);
    let vectors : Vector[] = [];
    let currentVector = firstVector;
    for (let index = 0; index < numberOfCircles; index++) {
        vectors.push(currentVector);
        currentVector = currentVector.rotate(degreeDiff);
    }

    return (
    <svg width={size} height={size} className={className} style={style}>
        {vectors.map((v, i) => {
        let newVector = v.translate(centerVector.x, centerVector.y);
        return <circle
            key={`x(${v.x}y${v.y}`}
            cx={newVector.x}
            cy={newVector.y}
            r={radius}
            fill={color}
        />
        })}
    </svg>
      );
}