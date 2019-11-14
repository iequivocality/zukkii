import Theme from "./variables";
import Util from "../Util";

const DarkTheme : Theme = {
    backgroundColor : '#111111',
    foregroundColor : '#ecf0f1',
    countdownContainerBackground : (customColor : string) => '#1C1C1C',
    countdownContainerForeground : (customColor : string) => customColor,
    countdownDetailsForeground : (customColor : string) => Util.computeShade(customColor, -0.05),
    countdownUnitBackground : (customColor : string) => Util.computeShade(customColor, -0.3),
    countdownValueAndUnitForeground : '#E1E1E1'
}
export default DarkTheme;