import Theme from "../themes/variables";
import { createContext } from "react";
import DarkTheme from "../themes/darkTheme";

export interface ThemeContextContainer {
    theme : Theme,
    toggleTheme : (theme : Theme) => void
}

const ThemeContext = createContext<ThemeContextContainer>({
    theme : DarkTheme,
    toggleTheme : (theme : Theme) => {}
});
export default ThemeContext;