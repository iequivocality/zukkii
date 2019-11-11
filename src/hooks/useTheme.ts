import { useContext, Dispatch, SetStateAction, useState, useEffect } from 'react';
import ThemeContext, { Theme, themes, ThemeContextContainer } from '../contexts/themeContext';
import useLocalStorage from './useLocalStorage';

export default function useTheme() : [ ThemeContextContainer ] {
    let theme = useContext(ThemeContext);
    let [currentTheme, setCurrentTheme] = useState<ThemeContextContainer>(theme);
    const [enabledState, setEnabledState] = useLocalStorage<boolean>('dark-mode-enabled');

    let toggleTheme = (newTheme : Theme) => {
        setEnabledState(newTheme === themes.dark)
        setCurrentTheme({ theme : themes.dark, ...currentTheme })
        if (newTheme === themes.dark) {
            console.log("DARK")
        }
        else {
            console.log("LIGHT")
        }
    }

    let newThemeContainer : ThemeContextContainer = enabledState ? { theme : currentTheme.theme, toggleTheme } : theme;

    useEffect(() => {
        setCurrentTheme(newThemeContainer);
    }, [theme]);

    // let setThemeContainer = (newTheme : Theme) => {
    //     setEnabledState(newTheme === themes.dark)
    //     setCurrentTheme({ theme : themes.dark, ...theme })
    //     if (newTheme === themes.dark) {
    //         console.log("DARK")
    //     }
    //     else {
    //         console.log("LIGHT")
    //     }
    // }

    return [ newThemeContainer ]
}