import React from "react";
import Rectangle from "../svg/Rectangle";
import OrbitingObjects from "../svg/OrbitingObjects";

export default function Background() {
    return (
        <>
            <Rectangle width={3} height={"100%"} color={"#51B14A"} className={'keyakiRect'}></Rectangle>
            <Rectangle width={4} height={"100%"} color={"#5BBEE4"} className={'hinataRect'}></Rectangle>
            <Rectangle width={2} height={"100%"} color={"#7C32A2"} className={'nogiRect'}></Rectangle>
            <OrbitingObjects distance={100} numberOfCircles={60} radius={2} className={'keyakizakaCircle'} color={"#51B14A"}/>
            <OrbitingObjects distance={120} numberOfCircles={75} radius={2} className={'hinatazakaCircle'} color={"#5BBEE4"}/>
            <OrbitingObjects distance={200} numberOfCircles={100} radius={2} className={'nogizakaCircle'} color={"#7C32A2"}/>
        </>
    );
}