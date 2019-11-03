import React, { useState, TouchEvent } from 'react';
import { TransitionMotion, spring, TransitionStyle } from 'react-motion';
import styles from './MouseRipple.module.scss';

const leavingSpringConfig = {stiffness: 60, damping: 15};

export default function MouseRipple (props : any) {
    let [mouse, setMouse] = useState([]);
    let [now, setNow] = useState('t' + 0);
    let [mouseX, mouseY] = mouse;
    const rippleStyles = mouseX == null ? [] : [{
        key: now,
        style: {
          opacity: spring(1),
          scale: spring(0),
          x: spring(mouseX),
          y: spring(mouseY),
        }
    }];

    let handleMouseMove = ({ pageX, pageY }) => {
        setMouse([pageX - 25, pageY - 25]);
        setNow('t' + Date.now());
        console.log([pageX - 25, pageY - 25]);
    }

    let handleTouchMove = (event : TouchEvent<HTMLDivElement>) => {
        event.preventDefault();
        handleMouseMove(event.touches[0]);
    }

    let willLeave = (styleCell : TransitionStyle) => {
        return {
            ...styleCell.style,
            opacity: spring(0, leavingSpringConfig),
            scale: spring(2, leavingSpringConfig),
        };
    }

    return (
        <TransitionMotion willLeave={(style) => willLeave(style)} styles={rippleStyles}>
            {circles =>
            <div
                onMouseMove={(event) => handleMouseMove(event)}
                onTouchMove={(event) => handleTouchMove(event)}
                className={styles.mouseRipple}>
                {circles.map(({key, style: {opacity, scale, x, y}}) =>
                <div
                    key={key}
                    className={styles.mouseRippleBall}
                    style={{
                        opacity: opacity,
                        scale: scale,
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                        WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    }} />
                )}
            </div>
            }
        </TransitionMotion>
    );
}