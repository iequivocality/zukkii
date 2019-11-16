import Theme from "./variables";
import Util from "../Util";

const DarkTheme : Theme = {
    backgroundColor : '#111111',
    foregroundColor : '#ecf0f1',
    countdownContainerBackground : (customColor : string) => '#333333',
    countdownContainerForeground : (customColor : string) => customColor,
    countdownContainerHoverBackground : (customColor : string) => Util.computeShade(customColor, 0.5),
    countdownContainerHoverForeground : (customColor : string) => customColor,
    countdownContainerDropShadow : Util.createShadowProperties(0),
    countdownDetailsForeground : (customColor : string) => Util.desaturateColor(customColor, 0.3),
    countdownUnitBackground : (customColor : string) => Util.desaturateColor(customColor, 0.3),
    countdownValueAndUnitForeground : '#E1E1E1',
    footerBackground : Util.computeShade('#111111', 2)
}
export default DarkTheme;