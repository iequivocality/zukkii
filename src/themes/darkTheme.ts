import Theme from "./variables";
import Util from "../Util";

const DarkTheme : Theme = {
    backgroundColor : '#111111',
    foregroundColor : '#ecf0f1',
    headerForeground : '#ecf0f1',
    countdownContainerBackground : (customColor : string) => '#333333',
    countdownContainerForeground : (customColor : string) => customColor,
    countdownContainerHoverBackground : (customColor : string) => Util.computeShade(customColor, 0.2),
    countdownContainerHoverForeground : (customColor : string) => customColor,
    countdownContainerDropShadow : Util.createShadowProperties(0),
    countdownDetailsForeground : (customColor : string) => Util.desaturateColor(customColor, 0.3),
    countdownUnitBackground : (customColor : string) => Util.desaturateColor(customColor, 0.3),
    countdownValueAndUnitForeground : '#E1E1E1',
    footerBackground : Util.computeShade('#111111', 2),
    footerForeground : '#ecf0f1',
    footerIconColor : '#ecf0f1',
    birthdaySelectionDropShadow : Util.createShadowProperties(0),
    countdownBadgeForeground : (customColor : string) => '#FFFFFF',
    countdownBadgeBackground : (customColor : string) => customColor,

    noMemberTextColor : (customColor : string) => '#FFFFFF',
    countdownPhotoBlankColor : (customColor : string) => customColor
}
export default DarkTheme;