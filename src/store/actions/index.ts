import Group from "../../models/Group";
import FirebaseApp from "../../data/firebase";
import Util from "../../Util";
import Member from "../../models/Member";

// import { Action } from "redux";

// export enum SelectionGenerationActions {
//     CHANGE_GENERATION_SELECTION = "CHANGE_GENERATION",
//     CLEAR_GENERATION_SELECTION = "CLEAR_GENERATION_SELECTION"
// }


// export interface ChangeGenerationSelectionAction extends Action<SelectionGenerationActions.CHANGE_GENERATION_SELECTION> {
//     payload : number
// }

// export interface ClearGenerationSelectionAction extends Action<SelectionGenerationActions.CLEAR_GENERATION_SELECTION> {
// }

// export type SelectionGenerationActionTypes = ChangeGenerationSelectionAction | ClearGenerationSelectionAction;

export const CHANGE_GENERATION_SELECTION = "CHANGE_GENERATION";
export const CLEAR_GENERATION_SELECTION = "CLEAR_GENERATION_SELECTION";
export const LOAD_GROUPS = "LOAD_GROUPS";
export const LOAD_MEMBERS = "LOAD_MEMBERS";

export function changeGeneration(gen : number) {
    return {
      type: CHANGE_GENERATION_SELECTION,
      payload : gen
    }
}

export function clearGeneration() {
    return {
        type : CLEAR_GENERATION_SELECTION
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

export function fetchGroups() {
    return function (dispatch : any) {
        FirebaseApp.database().ref('groups').once('value').then<firebase.database.DataSnapshot>((snapshot : firebase.database.DataSnapshot) => {
            let groups = Util.convertObjectToArray<Group>(snapshot.val());
            console.log('unfiltered: ', groups);
            // let filteredMembers = members.filter((value : Member) => {
            //   return Object.keys(value.group).findIndex(( value : string ) => ( value === 'hinatazaka')) > -1;
            // });
            // console.log('filtered: ', filteredMembers);
            dispatch(loadGroups(groups))
            return snapshot;
        });
    }
}

export function fetchMembersFromGroup(group : string) {
    return function (dispatch : any) {
        FirebaseApp.database().ref('members').once('value').then<firebase.database.DataSnapshot>((snapshot : firebase.database.DataSnapshot) => {
            let members = Util.convertObjectToArray<Member>(snapshot.val());
            console.log('unfiltered: ', members);
            let filteredMembers = members.filter((value : Member) => {
              return Object.keys(value.group).findIndex(( value : string ) => ( value === group)) > -1;
            });
            dispatch(loadMembers(members))
            return snapshot;
        });
    }
}