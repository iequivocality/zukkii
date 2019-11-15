export type ThemeColorFunction = (customColor : string) => string | string;

export default interface Theme {
    backgroundColor : string,
    foregroundColor : string,
    
    /** Countdown */
    countdownContainerBackground : ThemeColorFunction,
    countdownContainerForeground : ThemeColorFunction,
    countdownContainerHoverBackground : ThemeColorFunction,
    countdownContainerHoverForeground : ThemeColorFunction,
    // countdownContainerHoverBorderColor : ThemeColorFunction,
    // countdownContainerHoverBoxShadow : ThemeColorFunction,
    countdownDetailsForeground : ThemeColorFunction,
    countdownUnitBackground : ThemeColorFunction,
    countdownValueAndUnitForeground : string,
}