import React, { useMemo } from 'react';
import styles from './Loading.module.scss';
import Sakamichi from '../svg/Sakamichi';

export default function Loading() {
    return (
        useMemo(() => {
            return (
                <main className={styles.loadingContainer}>
                    <div className={styles.loadingAnimation}>
                        <Sakamichi className={styles.sakamichi}></Sakamichi>
                        <span>LOADING</span>
                    </div>
                </main>
            );
        }, [])
    );
}