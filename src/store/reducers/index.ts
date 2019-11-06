import AppState from "../state/AppState";
import { LOAD_GROUPS, LOAD_MEMBERS, LOAD_GROUP, FILTER_MEMBERS } from "../actions";
import { Constants } from "../../Constants";
import Util from "../../Util";
import FilterType from "../../models/FilterType";
import FilterObject from "../../models/FilterObject";

const initialState : AppState = {
    selectedGroup : null,
    members : [],
    groupChoices : [],
    filteredMembers : [],
    currentFilter : Constants.ALL_FILTER
}

export function rootReducer(state : AppState = initialState, action : any) : AppState {
    switch (action.type) {
        case LOAD_GROUP:
            return {...state, selectedGroup : action.payload};
        case LOAD_GROUPS:
            return {...state, groupChoices : action.payload};
        case LOAD_MEMBERS:
            return {...state, members : action.payload, filteredMembers : action.payload};
        case FILTER_MEMBERS:
            let sort : FilterObject = action.payload;
            let filteredMembers = Util.isNotNullAndNotUndefined(sort) && sort.type !== FilterType.NONE ? state.members.filter((member) => {
                return member[sort.type] === sort.value
            }) : state.members;
            return {...state, currentFilter : sort, filteredMembers }
        default:
            return state
    }
}