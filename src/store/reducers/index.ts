import AppState from "../state/AppState";
import { CHANGE_GENERATION_SELECTION, CLEAR_GENERATION_SELECTION, LOAD_GROUPS, LOAD_MEMBERS, LOAD_GROUP } from "../actions";

const initialState : AppState = {
    selectedGroup : null,
    members : [],
    selectedGeneration : 0,
    groupChoices : [],
    filteredMembers : []
}

export function rootReducer(state : AppState = initialState, action : any) {
    switch (action.type) {
        case CHANGE_GENERATION_SELECTION:
            let members = state.members;
            if (action.payload > 0) {
                console.log(members.filter(member => member.generation === action.payload))
            }
            else {
                console.log(members)
            }
            // console.log(members.filter(member => member.generation === action.payload))
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
            return {...state, members: action.payload, filteredMembers : action.payload};
        default:
            return state
    }
}