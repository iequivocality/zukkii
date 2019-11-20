import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AppState from "../../store/state/AppState";
import Dropdown from "../ui/dropdown/Dropdown";

export interface GenerationSelect {
    label : string,
    value : number
}

export interface GenerationSelectionProps {
    onGenerationSelect : (generation : GenerationSelect, index : number) => void,
    selectedValue : number
}

export default function GenerationSelection(props : GenerationSelectionProps) {
    let { onGenerationSelect, selectedValue } = props;
    let group = useSelector(( state : AppState ) => state.selectedGroup);
    let [generationArray, setGenerationArray] = useState<GenerationSelect[]>([]);
    let onSelectGeneration = useCallback((generation : GenerationSelect, index : number) => {
        onGenerationSelect(generation, index);
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
            selectedValue={selectedValue}
            width={150} color={group.color}
            contents={generationArray}
            onSelect={(value : GenerationSelect, index : number) => { onSelectGeneration(value, index) }}
            style={{ fontFamily : 'SawarabiGothic, sans-serif', zIndex : 20 }}
            mapContentToDropdown={(content : GenerationSelect, index : number) => ( { index, key : content.value + '', label : content.label, value : content } )}/>
    );
}