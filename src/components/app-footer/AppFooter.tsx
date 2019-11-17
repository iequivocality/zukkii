import React, { useContext } from 'react';
import styles from './AppFooter.module.scss';
import DarkModeToggle from '../dark-mode-toggle/DarkModeToggle';
import ThemeContext from '../../contexts/themeContext';
import { IoLogoGithub, IoLogoTwitter } from 'react-icons/io';

export default function AppFooter() {
    let { theme } = useContext(ThemeContext);
    
    return (
        <footer className={styles.appFooter} style={{ backgroundColor : theme.footerBackground, color : theme.footerForeground }}>
            <div className={styles.footerTitle}>zukkii - japanese idol fan info portal</div>
            <div className={styles.footerLinks}>
                <a target="_blank" className={styles.footerIcon} href="https://github.com/iequivocality/zukkii"><IoLogoGithub color={theme.footerIconColor} size={25}></IoLogoGithub></a>
                <a target="_blank" className={styles.footerIcon} href="https://twitter.com/ambidere"><IoLogoTwitter color={theme.footerIconColor} size={25}></IoLogoTwitter></a>
            </div>
            <div className={styles.settings}>
                <DarkModeToggle></DarkModeToggle>
            </div>
        </footer>
    );
}