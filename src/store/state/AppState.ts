import Group from "../../models/Group";
import Member from "../../models/Member";

export default interface AppState {
    readonly selectedGroup : Group,
    readonly selectedGeneration : number
    readonly groupChoices : Array<Group>,
    readonly members : Array<Member>,
    readonly filteredMembers : Array<Member>,
    readonly isOpen : boolean
}