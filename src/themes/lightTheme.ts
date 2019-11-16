import Theme from "./variables";
import Util from "../Util";

const LightTheme : Theme = {
    backgroundColor : '#E9EBEE',
    foregroundColor : '#2c3e50',
    countdownContainerBackground : (customColor : string) => customColor,
    countdownContainerForeground : (customColor : string) => '#E1E1E1',
    countdownContainerHoverBackground : (customColor : string) => customColor,
    countdownContainerHoverForeground : (customColor : string) => customColor,
    countdownContainerDropShadow : Util.createShadowProperties(2),
    countdownDetailsForeground : (customColor : string) => '#FFFFFF',
    countdownUnitBackground : (customColor : string) => Util.desaturateColor(customColor, 0.3),
    countdownValueAndUnitForeground : '#FFFFFF',
    footerBackground : '#E9EBEE',
    footerForeground : '#2c3e50',
    footerIconColor : '#2c3e50'
}
export default LightTheme;