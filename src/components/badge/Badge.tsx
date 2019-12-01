import React from 'react';
import styles from './Badge.module.scss';

export interface BadgeProps {
    className? : string,
    style? : React.CSSProperties,
    children : React.ReactText[]
}

const Badge : React.FC<BadgeProps> = (props : BadgeProps) => {
    let { className, style, children } = props;

    return (
        <div className={`${styles.badgeContainer} ${className}`} style={{fontSize : '10px', ...style}}>
            {children}
        </div>
    );
}
export default Badge;