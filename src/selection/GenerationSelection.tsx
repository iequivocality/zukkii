import React from "react";
import Group from "../models/Group";
import './GenerationSelection.scss';
import Member from "../models/Member";

interface GenerationSelect {
    label : string,
    value : number
}

export default class GenerationSelection extends React.Component<Group> {
    onSelectGeneration(generation : number) {
        let { members } = this.props;
        if (generation > 0) {
            let selected = members.filter((member : Member) => {
                return member.generation === generation;
            });
            console.log(selected);
        }
    }

    render() {
        let { generations, color } = this.props;
        let generationArray : Array<GenerationSelect> = [];
        generationArray.push({
            label : "ALL",
            value : 0
        });
        for( let index = 1; index <= generations; index++) {
            generationArray.push({
                label : `${index}期`,
                value : index
            });
        }

        let buttonStyle : React.CSSProperties = {
            backgroundColor: color
        };

        return (
            <div className="selection" style={buttonStyle}>
                {generationArray.map((generation : GenerationSelect) => <div className="selection-button" key={generation.value} onClick={() => this.onSelectGeneration(generation.value)}>{generation.label}</div>)}
            </div>
        );
    }
}