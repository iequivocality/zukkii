export type ThemeColorFunction = (customColor : string) => string | string;

export default interface Theme {
    backgroundColor : string,
    foregroundColor : string,

    /** Header */
    headerForeground : string,
    
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

    /** Birthday Selection */
    birthdaySelectionDropShadow : string,

    /** No Member Text */
    noMemberTextColor : ThemeColorFunction,

    /** Countdown Badge */
    countdownBadgeForeground : ThemeColorFunction,
    countdownBadgeBackground : ThemeColorFunction
}