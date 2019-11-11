import React from 'react';

export interface Theme {
    backgroundColor : string,
    foregroundColor : string
}

export interface Themes {
    light : Theme,
    dark : Theme
}

export const themes : Themes = {
    light : {
        foregroundColor : '#34495e',
        backgroundColor : '#ecf0f1'
    },
    dark : {
        foregroundColor : '#ecf0f1',
        backgroundColor : '#2c3e50'
    },
}

export interface ThemeContextContainer {
    theme : Theme,
    toggleTheme : (theme : Theme) => void
}

const ThemeContext = React.createContext<ThemeContextContainer>({
    theme : themes.dark,
    toggleTheme : (theme : Theme) => {}
});
export default ThemeContext;