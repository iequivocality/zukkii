import React, { MutableRefObject } from 'react';
import styles from './BalloonGroup.module.scss';

export interface BalloonGroupProps {
    parentElement : MutableRefObject<HTMLDivElement>
}

const BalloonGroup : React.FC<BalloonGroupProps> = (props : BalloonGroupProps) => {
    let { parentElement } = props;

    return (
        <div className={styles.balloonGroup} style={{
            width: parentElement.current ? parentElement.current.clientWidth : 0,
            height: parentElement.current ? parentElement.current.clientHeight : 0
        }}>

        </div>
    );
}
export default BalloonGroup;