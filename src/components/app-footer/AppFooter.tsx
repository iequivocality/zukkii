import React, { useContext } from 'react';
import styles from './AppFooter.module.scss';
import DarkModeToggle from '../dark-mode-toggle/DarkModeToggle';
import ThemeContext from '../../contexts/themeContext';

export default function AppFooter() {
    let { theme } = useContext(ThemeContext);
    
    return (
        <footer className={styles.appFooter} style={{ backgroundColor : theme.footerBackground }}>
            <DarkModeToggle></DarkModeToggle>
        </footer>
    );
}