import Theme from "../themes/variables";
import { createContext } from "react";
import DarkTheme from "../themes/darkTheme";

export interface ThemeContextContainer {
    theme : Theme,
    toggleTheme : (theme : Theme) => void,
    isDarkTheme : boolean,
}

const ThemeContext = createContext<ThemeContextContainer>({
    theme : DarkTheme,
    toggleTheme : (theme : Theme) => {},
    isDarkTheme : true
});
export default ThemeContext;