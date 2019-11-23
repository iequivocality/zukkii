import React, { useMemo, useContext } from 'react';
import styles from './Loading.module.scss';
import Sakamichi from '../svg/Sakamichi';
import ThemeContext from '../../contexts/themeContext';
import Logo from '../svg/Logo';

export default function Loading() {
    const { theme } = useContext(ThemeContext)

    return (
        useMemo(() => {
            return (
                <main className={styles.loadingContainer} style={{ backgroundColor : theme.backgroundColor}}>
                    <div className={styles.loadingAnimation}>
                        {/* <Sakamichi className={styles.sakamichi}></Sakamichi>
                         */}
                         <Logo className={styles.logo} width={150} height={150}></Logo>
                        <span style={{ color : theme.foregroundColor }}>ダウンロード中</span>
                    </div>
                </main>
            );
        }, [theme])
    );
}