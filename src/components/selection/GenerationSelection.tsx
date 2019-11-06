import React, { useCallback } from "react";
import styles from './GenerationSelection.module.scss';
import { useDispatch, useSelector } from "react-redux";
import AppState from "../../store/state/AppState";
import { Constants } from "../../Constants";
import { filterMembers } from "../../store/actions";
import FilterType from "../../models/FilterType";

interface GenerationSelect {
    label : string,
    value : number
}

export default function GenerationSelection() {
    let group = useSelector(( state : AppState ) => state.selectedGroup);
    let selectedGeneration = useSelector(( state : AppState ) => state.currentFilter.type === FilterType.GENERATION ? Number.parseInt(state.currentFilter.value) : 0);
    let dispatch = useDispatch();
    let onSelectGeneration = useCallback((generation : number) => {
        if (generation > 0) {
            dispatch(filterMembers({ type : FilterType.GENERATION, value : generation }))
        }
        else {
            dispatch(filterMembers(Constants.ALL_FILTER))
        }
    }, [])

    let { generations, color } = group;
    let generationArray : Array<GenerationSelect> = [];
    generationArray.push({
        label : "全部",
        value : 0
    });
    for( let index = 1; index <= generations; index++) {
        generationArray.push({
            label : `${index}期`,
            value : index
        });
    }

    return (
        <div className={styles.selection} style={{ backgroundColor: color }}>
            {generationArray.map((generation : GenerationSelect) => 
                <div className={styles.selectionButton}
                    key={generation.value}
                    style={generation.value === selectedGeneration ? { backgroundColor : "#FFFFFF", color : color } : null}
                    onClick={() => onSelectGeneration(generation.value)}>{generation.label}</div>)}
        </div>
    );
}