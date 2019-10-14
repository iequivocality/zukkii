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