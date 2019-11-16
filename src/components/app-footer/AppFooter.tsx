import React, { useContext } from 'react';
import styles from './AppFooter.module.scss';
import DarkModeToggle from '../dark-mode-toggle/DarkModeToggle';
import ThemeContext from '../../contexts/themeContext';
import { IoLogoGithub, IoLogoTwitter } from 'react-icons/io';

export default function AppFooter() {
    let { theme } = useContext(ThemeContext);
    
    return (
        <footer className={styles.appFooter} style={{ backgroundColor : theme.footerBackground, color : theme.footerForeground }}>
            <DarkModeToggle></DarkModeToggle>
            <a target="_blank" href="https://github.com/iequivocality"><IoLogoGithub color={theme.footerIconColor}></IoLogoGithub></a>
            <a target="_blank" href="https://twitter.com/ambidere"><IoLogoTwitter color={theme.footerIconColor}></IoLogoTwitter></a>
            2019 MIT License
        </footer>
    );
}