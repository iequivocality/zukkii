import Group from "../../models/Group";
import Member from "../../models/Member";

export default interface AppState {
    selectedGroup : Group,
    selectedGeneration : number
    groupChoices : Array<Group>,
    members : Array<Member>
}