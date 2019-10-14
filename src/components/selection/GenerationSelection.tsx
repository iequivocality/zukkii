import React from "react";
import Group from "../../models/Group";
import './GenerationSelection.scss';
import Member from "../../models/Member";
import { connect } from "react-redux";
import AppState from "../../store/state/AppState";
import { changeGeneration } from "../../store/actions";

interface GenerationSelect {
    label : string,
    value : number
}

interface GenerationSelectionProps {
    group : Group,
    onSelectGeneration : (generation : number) => void
}

class GenerationSelection extends React.Component<GenerationSelectionProps> {
    onSelectGeneration(generation : number) {
        let { members } = this.props.group;
        let { onSelectGeneration } = this.props;
        onSelectGeneration(generation);
        if (generation > 0) {
            // let selected = members.find((member : Member) => {
            //     return member.generation === generation;
            // });
            // console.log(selected);
            onSelectGeneration(generation);
        }
    }

    render() {
        let { generations, color } = this.props.group;
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

const mapStateToProps = (state : AppState) : Partial<GenerationSelectionProps> => {
    return {
        group : state.selectedGroup
    }
}

const mapDispatchToProps = (dispatch : any) : Partial<GenerationSelectionProps> => {
    return {
        onSelectGeneration : (generation : number) => {
            dispatch(changeGeneration(generation))
        }
    }
}

const GenerationSelectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GenerationSelection);

export default GenerationSelectionContainer;