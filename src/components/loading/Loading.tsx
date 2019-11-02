import React from 'react';
import styles from './Loading.module.scss';
import sakamichi from '../../assets/img/sakamichi.svg'
import Sakamichi from '../svg/Sakamichi';

export default function Loading() {
    return (
        <main className={styles.loadingContainer}>
            <div className={styles.loadingAnimation}>
                <Sakamichi className={styles.sakamichi}></Sakamichi>
                <span>LOADING</span>
            </div>
        </main>
    );
}