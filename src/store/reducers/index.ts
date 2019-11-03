import AppState from "../state/AppState";
import { CHANGE_GENERATION_SELECTION, CLEAR_GENERATION_SELECTION, LOAD_GROUPS, LOAD_MEMBERS, LOAD_GROUP, OPEN_DIALOG, CLOSE_DIALOG } from "../actions";

const initialState : AppState = {
    selectedGroup : null,
    members : [],
    selectedGeneration : 0,
    groupChoices : [],
    filteredMembers : [],
    isOpen : false
}

export function rootReducer(state : AppState = initialState, action : any) {
    switch (action.type) {
        case CHANGE_GENERATION_SELECTION:
            let members = state.members;
            return {...state,
                selectedGeneration : action.payload, 
                filteredMembers : action.payload > 0 ? members.filter(member => member.generation === action.payload) : state.members
            };
        case CLEAR_GENERATION_SELECTION:
            return {...state, selectedGeneration : 0};
        case LOAD_GROUP:
            return {...state, selectedGroup : action.payload};
        case LOAD_GROUPS:
            return {...state, groupChoices : action.payload};
        case LOAD_MEMBERS:
            return {...state, members : action.payload, filteredMembers : action.payload};
        case OPEN_DIALOG:
            return {...state, isOpen : true}
        case CLOSE_DIALOG:
            return {...state, isOpen : false}
        default:
            return state
    }
}