import React from 'react';

export interface ObjectCircleProps {
    bigRadius : number,
    smallRadius : number,
    strokeWidth : number,
    numberOfCircles : number
}

export interface Vector {
    x : number,
    y : number
}

export default function ObjectCircle(props : ObjectCircleProps) {
    let { bigRadius, smallRadius, strokeWidth, numberOfCircles } = props;
    let centerVec : Vector = { x : 250, y : 250 };

    let startingVec : Vector = { x : centerVec.x, y : centerVec.y - bigRadius}
    let vectors : Vector[] = numberOfCircles > 0 ? [startingVec] : []
    let degreeDiff : number =  360 / numberOfCircles;
    let currentVec : Vector = startingVec;
    for (let index = 1; index < numberOfCircles; index++) {
        vectors.push({x : ((currentVec.x + 0) * Math.cos(degreeDiff)) - ((currentVec.y + bigRadius) * Math.sin(degreeDiff)) - bigRadius, y : ((currentVec.x) * Math.sin(degreeDiff)) + ((currentVec.y + bigRadius) * Math.cos(degreeDiff)) - bigRadius});
        // currentVec = {x : ((currentVec.x - bigRadius) * Math.cos(degreeDiff)) - ((currentVec.y - bigRadius) * Math.sin(degreeDiff)), y : ((currentVec.x - bigRadius) * Math.sin(degreeDiff)) + ((currentVec.y - bigRadius) * Math.cos(degreeDiff))};
    }

    return (
        <svg height={500} width={500}>
            <circle key={`(${centerVec.x},${centerVec.y})`} cx={centerVec.x} cy={centerVec.y} r={smallRadius} fill="#0F0"></circle>
            {vectors.map( vec => (
                <circle key={`(${vec.x},${vec.y})`} cx={vec.x} cy={vec.y} r={smallRadius} fill="#F00"></circle>
            ))}
            {/* <circle cx={radius + (strokeWidth / 2)} cy={radius + (strokeWidth / 2)} r={radius} stroke="#FFF" stroke-width={strokeWidth}/> */}
        </svg>
    );
}