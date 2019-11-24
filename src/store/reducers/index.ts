import AppState from "../state/AppState";
import { LOAD_GROUPS, LOAD_MEMBERS, LOAD_GROUP, LOADING_STARTED, LOADING_FINISHED } from "../actions";
import { Constants } from "../../Constants";
import Util from "../../Util";
import Member from "../../models/Member";

const initialState : AppState = {
    selectedGroup : null,
    members : [],
    groupChoices : [],
    isLoading : false,
    currentFilter : Constants.ALL_FILTER
}

const addAgeToMember = (member : Member) : Member => {
    let computedAge = Util.getAgeFromBirthdate(member.birthdate);
    return {
        ...member,
        ageByDays : computedAge.days,
        ageByYears : computedAge.years
    }
}

export function rootReducer(state : AppState = initialState, action : any) : AppState {
    switch (action.type) {
        case LOAD_GROUP:
            let previousGroup = state.selectedGroup;
            let members = previousGroup && action.payload.id == previousGroup.id ? state.members : [];
            return {...state, selectedGroup : action.payload, members : members};
        case LOAD_GROUPS:
            return {...state, groupChoices : action.payload};
        case LOAD_MEMBERS:
            let membersAddedAge = (action.payload as Array<Member>).map<Member>(addAgeToMember)
            return {...state, members : membersAddedAge};
        case LOADING_STARTED:
            return {...state, isLoading : true}
        case LOADING_FINISHED:
            return {...state, isLoading : false}
        default:
            return state
    }
}