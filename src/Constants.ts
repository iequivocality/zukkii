import FilterObject from "./models/FilterObject";
import FilterType from "./models/FilterType";
import SortObject from "./models/SortObject";
import SortType from "./models/SortType";
import { DropdownContent } from "./components/ui/dropdown/Dropdown";
import SortOrders from "./models/SortOrder";

export class Constants {
    static MAX_WEEKS = 51;
    static MAX_DAYS = 6;
    static MAX_HOURS = 23;
    static MAX_MINUTES = 59;
    static MAX_SECONDS = 59;
    static ALL_FILTER : FilterObject = {
        type : FilterType.NONE,
        value : null
    };
    static NONE_SORT : SortObject = {
        order : SortOrders.NONE,
        type : SortType.NONE
    };
    static ALL_DROPDOWN_CONTENT : DropdownContent = {
        index : 0,
        key : 'all',
        label : '全部',
        value : null
    };
}