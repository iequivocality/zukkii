import Group from "../../models/Group";

export default interface AppState {
    selectedGroup : Group,
    selectedGeneration : number
    groupChoices : Array<Group>
}