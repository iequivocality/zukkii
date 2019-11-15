import Theme from "./variables";
import Util from "../Util";

const DarkTheme : Theme = {
    backgroundColor : '#111111',
    foregroundColor : '#ecf0f1',
    countdownContainerBackground : (customColor : string) => '#333333',
    countdownContainerForeground : (customColor : string) => customColor,
    countdownDetailsForeground : (customColor : string) => Util.desaturateColor(customColor, 0.3),
    countdownUnitBackground : (customColor : string) => Util.desaturateColor(customColor, 0.3),
    countdownValueAndUnitForeground : '#E1E1E1'
}
export default DarkTheme;