import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AppState from "../../store/state/AppState";
import ButtonGroup from "../button-group/ButtonGroup";
import Dropdown from "../ui/dropdown/Dropdown";
import FilterType from "../../models/FilterType";

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
    let [generationArray, setGenerationArray] = useState<GenerationSelect[]>([]);
    let onSelectGeneration = useCallback((generation : GenerationSelect) => {
        onGenerationSelect(generation);
    }, []);

    useEffect(() => {
        let { generations } = group;
        let generationArray : Array<GenerationSelect> = [];
        for( let index = 1; index <= generations; index++) {
            generationArray.push({
                label : `${index}期`,
                value : index
            });
        }
        setGenerationArray(generationArray);
    }, [group]);

    return (
        <Dropdown<GenerationSelect>
            all
            width={150} color={group.color}
            contents={generationArray}
            onSelect={(value : GenerationSelect) => { onSelectGeneration(value) }}
            style={{ fontFamily : 'SawarabiGothic, sans-serif', zIndex : 25 }}
            mapContentToDropdown={(content : GenerationSelect) => ( { key : content.value + '', label : content.label, value : content } )}/>
    );
}