import Theme from "./variables";
import Util from "../Util";

const LightTheme : Theme = {
    backgroundColor : '#E9EBEE',
    foregroundColor : '#2c3e50',
    headerForeground : '#2c3e50',
    countdownContainerBackground : (customColor : string) => customColor,
    countdownContainerForeground : (customColor : string) => '#E1E1E1',
    countdownContainerHoverBackground : (customColor : string) => Util.computeShade(customColor, -0.1),
    countdownContainerHoverForeground : (customColor : string) => customColor,
    countdownContainerDropShadow : Util.createShadowProperties(3),
    countdownDetailsForeground : (customColor : string) => '#FFFFFF',
    countdownUnitBackground : (customColor : string) => Util.desaturateColor(customColor, 0.3),
    countdownValueAndUnitForeground : '#FFFFFF',
    footerBackground : '#D9DBDD',
    footerForeground : '#2c3e50',
    footerIconColor : '#2c3e50',
    birthdaySelectionDropShadow : Util.createShadowProperties(4),
    countdownBadgeForeground : (customColor : string) => customColor,
    countdownBadgeBackground : (customColor : string) => '#FFFFFF',
    
    noMemberTextColor : (customColor : string) => customColor
}
export default LightTheme;