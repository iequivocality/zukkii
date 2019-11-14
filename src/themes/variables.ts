export type ThemeColorFunction = (customColor : string) => string

export default interface Theme {
    backgroundColor : string,
    foregroundColor : string,
    
    /** Countdown */
    countdownContainerBackground : ThemeColorFunction,
    countdownContainerForeground : ThemeColorFunction,
    countdownDetailsForeground : ThemeColorFunction,
    countdownUnitBackground : ThemeColorFunction,
    countdownValueAndUnitForeground : string
}