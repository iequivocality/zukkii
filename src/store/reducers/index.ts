import AppState from "../state/AppState";
import Member from "../../models/Member";
import { CHANGE_GENERATION_SELECTION, CLEAR_GENERATION_SELECTION, LOAD_GROUPS, LOAD_MEMBERS } from "../actions";

const initialState : AppState = {
    selectedGroup : null,
    members : [],
    selectedGeneration : 0,
    groupChoices : []
}

export function rootReducer(state : AppState = initialState, action : any) {
    switch (action.type) {
        case CHANGE_GENERATION_SELECTION:
            let members = initialState.members;
            return {...state, selectedGeneration : action.payload, selectedGroup : {
                ...state.selectedGroup,
                members : action.payload > 0 ? members.filter(member => member.generation === action.payload) : members
            }};
        case CLEAR_GENERATION_SELECTION:
            return {...state, selectedGeneration : 0};
        case LOAD_GROUPS:
            return {...state, groupChoices : action.payload};
        case LOAD_MEMBERS:
            return {...state, members: action.payload}
        default:
            return state
    }
}