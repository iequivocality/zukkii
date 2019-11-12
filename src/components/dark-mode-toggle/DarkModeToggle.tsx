import React, { useContext } from 'react';
import ToggleSwitch from '../ui/toggle-switch/ToggleSwitch';
import ThemeContext from '../../contexts/themeContext';
import { IoIosSunny, IoIosMoon } from 'react-icons/io';
import styles from './DarkModeToggle.module.scss';
import LightTheme from '../../themes/lightTheme';
import DarkTheme from '../../themes/darkTheme';

export default function DarkModeToggle() {
    let themeContainer = useContext(ThemeContext);

    return (
        <div className={styles.darkModeToggle}>
            <ToggleSwitch
                width={75}
                icon value={themeContainer.theme === LightTheme}
                onState={{ key : 'light', color : '#f1c40f', switchStyle : { backgroundColor : "#ecf0f1" }, iconComponent : <IoIosSunny color="#ecf0f1"/> }}
                offState={{ key : 'dark', color : '#ffffff', switchStyle : { backgroundColor : "#34495e" }, iconComponent : <IoIosMoon color="#34495e"/> }}
                onToggle={(toggleStatus) => { themeContainer.toggleTheme(toggleStatus ? LightTheme : DarkTheme) }}/>
        </div>
    );
}