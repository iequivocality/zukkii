import AppState from "../state/AppState";
import { LOAD_GROUPS, LOAD_MEMBERS, LOAD_GROUP, FILTER_MEMBERS, LOADING_STARTED, LOADING_FINISHED, SORT_MEMBERS } from "../actions";
import { Constants } from "../../Constants";
import Util from "../../Util";
import FilterType from "../../models/FilterType";
import FilterObject from "../../models/FilterObject";
import SortObject from "../../models/SortObject";
import Member from "../../models/Member";

const initialState : AppState = {
    selectedGroup : null,
    members : [],
    groupChoices : [],
    filteredMembers : [],
    currentFilter : Constants.ALL_FILTER,
    currentSort : Constants.NONE_SORT,
    isLoading : false
}

export function rootReducer(state : AppState = initialState, action : any) : AppState {
    switch (action.type) {
        case LOAD_GROUP:
            return {...state, selectedGroup : action.payload};
        case LOAD_GROUPS:
            return {...state, groupChoices : action.payload};
        case LOAD_MEMBERS:
            let membersAddedAge = (action.payload as Array<Member>).map(( member : Member ) => ({...member, age : Util.getAgeFromBirthdate(member.birthdate)}))
            return {...state, members : membersAddedAge, filteredMembers : membersAddedAge};
        case FILTER_MEMBERS:
            let filter : FilterObject = action.payload;
            let filteredMembers = Util.isNotNullAndNotUndefined(filter) && filter.type !== FilterType.NONE ? state.members.filter((member) => {
                return member[filter.type] === filter.value
            }) : state.members;
            return {...state, currentFilter : filter, filteredMembers }
        case SORT_MEMBERS:
            let sort : SortObject = action.payload;
            return {...state, currentSort : sort};
        case LOADING_STARTED:
            return {...state, isLoading : true}
        case LOADING_FINISHED:
            return {...state, isLoading : false}
        default:
            return state
    }
}