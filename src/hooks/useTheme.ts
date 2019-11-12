import { useContext, useState, useEffect } from "react";
import ThemeContext, { ThemeContextContainer, Theme, themes } from "../contexts/themeContext";
import useLocalStorage from "./useLocalStorage";

export default function useTheme() {
    let themeContainer = useContext(ThemeContext);
    const [ enabledState, setEnabledState ] = useLocalStorage<boolean>('dark-mode-enabled');
    let [ currentTheme, setCurrentTheme ] = useState<ThemeContextContainer>(themeContainer);

    let toggleTheme = (newTheme : Theme) => {
        setCurrentTheme({toggleTheme, theme : newTheme});
        if (newTheme === themes.dark) {
            console.log("DARK");
            setEnabledState(true);
        }
        else {
            console.log("LIGHT");
            setEnabledState(false);
        }
    };

    useEffect(() => {
        setCurrentTheme({
          theme : enabledState ? themes.dark : themes.light,
          toggleTheme
        });
    }, []);

    return currentTheme;
}