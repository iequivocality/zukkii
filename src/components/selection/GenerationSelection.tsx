import React from "react";
import Group from "../../models/Group";
import styles from './GenerationSelection.module.scss';
import { connect } from "react-redux";
import AppState from "../../store/state/AppState";
import { changeGeneration } from "../../store/actions";

interface GenerationSelect {
    label : string,
    value : number
}

interface GenerationSelectionProps {
    group : Group,
    selectedGeneration : number,
    onSelectGeneration : (generation : number) => void
}

class GenerationSelection extends React.Component<GenerationSelectionProps> {
    onSelectGeneration(generation : number) {
        let { onSelectGeneration } = this.props;
        onSelectGeneration(generation);
        if (generation > 0) {
            onSelectGeneration(generation);
        }
    }

    render() {
        let { generations, color } = this.props.group;
        let { selectedGeneration } = this.props;
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

        let selectedStyle : React.CSSProperties = {
            backgroundColor : "#FFFFFF",
            color : color   
        }

        return (
            <div className={styles.selection} style={buttonStyle}>
                {generationArray.map((generation : GenerationSelect) => 
                    <div className={styles.selectionButton}
                        key={generation.value}
                        style={generation.value === selectedGeneration ? selectedStyle : null}
                        onClick={() => this.onSelectGeneration(generation.value)}>{generation.label}</div>)}
            </div>
        );
    }
}

const mapStateToProps = (state : AppState) : Partial<GenerationSelectionProps> => {
    return {
        group : state.selectedGroup,
        selectedGeneration : state.selectedGeneration
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