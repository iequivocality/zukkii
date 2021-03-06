import React, { useContext } from 'react';
import styles from './AppFooter.module.scss';
import DarkModeToggle from '../dark-mode-toggle/DarkModeToggle';
import ThemeContext from '../../contexts/themeContext';
import { IoLogoGithub, IoLogoTwitter } from 'react-icons/io';

export default function AppFooter() {
    let { theme } = useContext(ThemeContext);
    
    return (
        <footer className={styles.appFooter} style={{ backgroundColor : theme.footerBackground, color : theme.footerForeground }}>
            <div className={styles.footerDetails}>
                <div className={styles.footerTitle}>zukkii - japanese idol fan info portal (2019)</div>
                <div className={styles.footerLinks}>
                    <a target="_blank" className={styles.footerIcon} rel="noopener noreferrer" href="https://github.com/iequivocality/zukkii"><IoLogoGithub color={theme.footerIconColor} size={20}></IoLogoGithub></a>
                    <a target="_blank" className={styles.footerIcon} rel="noopener noreferrer" href="https://twitter.com/ambidere"><IoLogoTwitter color={theme.footerIconColor} size={20}></IoLogoTwitter></a>
                </div>
            </div>
            <div className={styles.settings}>
                <DarkModeToggle></DarkModeToggle>
            </div>
        </footer>
    );
}