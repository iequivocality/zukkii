import Group from "../../models/Group";
import FirebaseApp from "../../data/firebase";
import Util from "../../Util";
import Member from "../../models/Member";

export const CHANGE_GENERATION_SELECTION = "CHANGE_GENERATION";
export const CLEAR_GENERATION_SELECTION = "CLEAR_GENERATION_SELECTION";
export const LOAD_GROUP = "LOAD_GROUP";
export const LOAD_GROUPS = "LOAD_GROUPS";
export const LOAD_MEMBERS = "LOAD_MEMBERS";
export const FILTER_MEMBERS = "FILTER_MEMBERS";
export const SORT_MEMBERS = "SORT_MEMBERS"
export const LOADING_STARTED = "LOADING_STARTED";
export const LOADING_FINISHED = "LOADING_FINISHED";

export function loadGroup(group : Group) {
    return {
        type : LOAD_GROUP,
        payload : group
    }
}

export function loadGroups(groupChoices : Array<Group>) {
    return {
        type : LOAD_GROUPS,
        payload : groupChoices
    }
}

export function loadMembers(members : Array<Member>) {
    return {
        type : LOAD_MEMBERS,
        payload : members
    }
}

export function loadingStarted() {
    return {
        type : LOADING_STARTED
    }
}

export function loadingFinished() {
    return {
        type : LOADING_FINISHED
    }
}

export function fetchGroup(groupName : string) {
    return (dispatch : any) => {
        dispatch(loadingStarted());
        FirebaseApp.database().ref('groups').once('value').then<firebase.database.DataSnapshot>((snapshot : firebase.database.DataSnapshot) => {
            
            let groups = Util.convertObjectToArray<Group>(snapshot.val());
            let filteredGroup = groups.filter((value : Group) => {
              return value.id === groupName;
            });
            let selectedGroup = groups.find((value : Group) => {
                return value.id === groupName;
            });
            if (Util.isNotNullAndNotUndefined(selectedGroup)) {
                dispatch(loadGroup(filteredGroup.length > 0 ? filteredGroup[0] : null))
                dispatch(fetchMembersFromGroup(groupName));
            }
            else {
                console.log("NOT FOUND")
            }
            dispatch(loadingFinished());
            return snapshot;
        });
    }
}

export function fetchGroups() {
    return (dispatch : any) => {
        dispatch(loadingStarted());
        FirebaseApp.database().ref('groups').once('value').then<firebase.database.DataSnapshot>((snapshot : firebase.database.DataSnapshot) => {
            let groups = Util.convertObjectToArray<Group>(snapshot.val());
            dispatch(loadGroups(groups));
            dispatch(loadingFinished());
            return snapshot;
        });
    }
}

export function fetchMembersFromGroup(group : string) {
    return function (dispatch : any) {
        dispatch(loadingStarted());
        FirebaseApp.database().ref('members').once('value').then<firebase.database.DataSnapshot>((snapshot : firebase.database.DataSnapshot) => {
            let members = Util.convertObjectToArray<Member>(snapshot.val());
            let filteredMembers = members.filter((value : Member) => {
              return Object.keys(value.group).findIndex(( value : string ) => ( value === group)) > -1;
            });
            dispatch(loadMembers(filteredMembers));
            dispatch(loadingFinished());
            return snapshot;
        });
    }
}