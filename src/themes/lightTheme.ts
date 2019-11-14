import Theme from "./variables";
import Util from "../Util";

const LightTheme : Theme = {
    backgroundColor : '#E9EBEE',
    foregroundColor : '#2c3e50',
    countdownContainerBackground : (customColor : string) => customColor,
    countdownContainerForeground : (customColor : string) => '#E1E1E1',
    countdownDetailsForeground : (customColor : string) => '#FFFFFF',
    countdownUnitBackground : (customColor : string) => Util.computeShade(customColor, -0.3),
    countdownValueAndUnitForeground : '#FFFFFF'
}
export default LightTheme;