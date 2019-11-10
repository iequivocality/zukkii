import React, { useCallback, useState, useEffect } from "react";
import styles from './GenerationSelection.module.scss';
import { useDispatch, useSelector } from "react-redux";
import AppState from "../../store/state/AppState";
import { Constants } from "../../Constants";
import { filterMembers } from "../../store/actions";
import FilterType from "../../models/FilterType";
import ButtonGroup from "../button-group/ButtonGroup";

export interface GenerationSelect {
    label : string,
    value : number
}

export interface GenerationSelectionProps {
    onGenerationSelect : (generation : GenerationSelect) => void
}

export default function GenerationSelection(props : GenerationSelectionProps) {
    let { onGenerationSelect } = props;
    let group = useSelector(( state : AppState ) => state.selectedGroup);
    let [selected, setSelected] = useState<GenerationSelect>(null);
    let [generationArray, setGenerationArray] = useState<GenerationSelect[]>([]);
    let onSelectGeneration = useCallback((generation : GenerationSelect) => {
        onGenerationSelect(generation);
        setSelected(generation);
    }, []);

    useEffect(() => {
        let { generations } = group;
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
        setGenerationArray(generationArray);
        setSelected(generationArray[0]);

    }, [group]);

    return (
        <ButtonGroup<GenerationSelect>
            backgroundColor={group.color}
            contents={generationArray}
            selectedItemStyle={{ backgroundColor : "#FFFFFF", color : group.color }}
            mapToButton={(gs : GenerationSelect) => {
                return {
                    key : gs.value,
                    onClick : (gs : GenerationSelect) => onSelectGeneration(gs),
                    selected : gs.value === selected.value,
                    value : gs,
                    label : gs.label
                }
            }}/>
    );
}