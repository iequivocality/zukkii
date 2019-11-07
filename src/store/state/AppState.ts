import Group from "../../models/Group";
import Member from "../../models/Member";
import FilterObject from "../../models/FilterObject";
import SortObject from "../../models/SortObject";

export default interface AppState {
    readonly selectedGroup : Group,
    readonly groupChoices : Array<Group>,
    readonly members : Array<Member>,
    readonly filteredMembers : Array<Member>,
    readonly currentFilter : FilterObject,
    readonly currentSort : SortObject,
    readonly isLoading : boolean
}