import FilterObject from "./models/FilterObject";
import FilterType from "./models/FilterType";

export class Constants {
    static MAX_WEEKS = 51;
    static MAX_DAYS = 6;
    static MAX_HOURS = 23;
    static MAX_MINUTES = 59;
    static MAX_SECONDS = 59;
    static ALL_FILTER : FilterObject = {
        type : FilterType.NONE,
        value : null
    }
}

export enum Units {
    WEEKS,
    DAYS,
    HOURS,
    MINUTES,
    SECONDS
}