export type ThemeColorFunction = (customColor : string) => string | string;

export default interface Theme {
    backgroundColor : string,
    foregroundColor : string,
    
    /** Countdown */
    countdownContainerBackground : ThemeColorFunction,
    countdownContainerForeground : ThemeColorFunction,
    countdownContainerHoverBackground : ThemeColorFunction,
    countdownContainerHoverForeground : ThemeColorFunction,
    countdownContainerDropShadow : string,
    countdownDetailsForeground : ThemeColorFunction,
    countdownUnitBackground : ThemeColorFunction,
    countdownValueAndUnitForeground : string,

    /** Footer */
    footerBackground : string,
    footerForeground : string,
    footerIconColor : string,
}