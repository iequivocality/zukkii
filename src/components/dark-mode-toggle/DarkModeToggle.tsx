import React from 'react';
import ToggleSwitch from '../ui/toggle-switch/ToggleSwitch';
import useTheme from '../../hooks/useTheme';
import { themes, Theme } from '../../contexts/themeContext';
import { IoIosSunny, IoIosMoon } from 'react-icons/io';
import styles from './DarkModeToggle.module.scss';

export default function DarkModeToggle() {
    let [themeContainer] = useTheme();

    return (
        <div className={styles.darkModeToggle}>
            <ToggleSwitch
                width={75}
                icon value={themeContainer.theme === themes.light}
                onState={{ key : 'light', color : '#ecf0f1', switchStyle : { backgroundColor : "#f1c40f" }, iconComponent : <IoIosSunny color="#f1c40f"/> }}
                offState={{ key : 'dark', color : '#34495e', switchStyle : { backgroundColor : "#ffffff" }, iconComponent : <IoIosMoon color="#ffffff"/> }}
                onToggle={(toggleStatus) => { themeContainer.toggleTheme(toggleStatus ? themes.light : themes.dark) }}/>
        </div>
    );
}