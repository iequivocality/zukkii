import { useContext, useState, useEffect } from "react";
import ThemeContext, { ThemeContextContainer } from "../contexts/themeContext";
import useLocalStorage from "./useLocalStorage";
import Theme from "../themes/variables";
import DarkTheme from "../themes/darkTheme";
import LightTheme from "../themes/lightTheme";

export default function useTheme() {
    let themeContainer = useContext(ThemeContext);
    const [ enabledState, setEnabledState ] = useLocalStorage<boolean>('dark-mode-enabled');
    let [ currentTheme, setCurrentTheme ] = useState<ThemeContextContainer>(themeContainer);

    let toggleTheme = (newTheme : Theme) => {
        setCurrentTheme({toggleTheme, theme : newTheme, isDarkTheme : newTheme === DarkTheme});
        setEnabledState(newTheme === DarkTheme);
    };

    useEffect(() => {
        setCurrentTheme({
          theme : enabledState ? DarkTheme : LightTheme,
          toggleTheme,
          isDarkTheme : enabledState
        });
    }, []);

    return currentTheme;
}