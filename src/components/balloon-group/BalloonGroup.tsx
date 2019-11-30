import React, { MutableRefObject } from 'react';
import styles from './BalloonGroup.module.scss';
import Balloon from '../balloon/Balloon';

export interface BalloonGroupProps {
    parentElement : MutableRefObject<HTMLDivElement>
}

const BalloonGroup : React.FC<BalloonGroupProps> = (props : BalloonGroupProps) => {
    let { parentElement } = props;
    let current = parentElement.current

    return (
        <div className={styles.balloonGroup} style={{
            width: current ? current.clientWidth : 0,
            height: current ? current.clientHeight : 0
        }}>
            <Balloon width={75} className={styles.balloon1} fill={"#e74c3c"}></Balloon>
            <Balloon width={75} className={styles.balloon2} fill={"#f1c40f"}></Balloon>
            <Balloon width={75} className={styles.balloon3} fill={"#3498db"}></Balloon>
            <Balloon width={75} className={styles.balloon4} fill={"#8e44ad"}></Balloon>
            <Balloon width={75} className={styles.balloon5} fill={"#2ecc71"}></Balloon>
            <Balloon width={75} className={styles.balloon6} fill={"#e67e22"}></Balloon>
            <Balloon width={75} className={styles.balloon7} fill={"#2ecc71"}></Balloon>
        </div>
    );
}
export default BalloonGroup;