import Group from "../../models/Group";
import Member from "../../models/Member";
import FilterObject from "../../models/FilterObject";

export default interface AppState {
    readonly selectedGroup : Group,
    readonly groupChoices : Array<Group>,
    readonly members : Array<Member>,
    readonly currentFilter : FilterObject,
    readonly isLoading : boolean
}