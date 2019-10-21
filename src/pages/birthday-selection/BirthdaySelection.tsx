import React from 'react';
import styles from './BirthdaySelection.module.scss';
import AppState from '../../store/state/AppState';
import { connect } from 'react-redux';
import { fetchGroups } from '../../store/actions';
import Group from '../../models/Group';
import { Link } from 'react-router-dom';

interface BirthdaySelectionPageProps {
    groupChoices : Array<Group>,
    loadGroups : () => void
}

class BirthdaySelectionPage extends React.Component<BirthdaySelectionPageProps> {
    componentDidMount() {
        this.props.loadGroups();
    }

    render() {
        return (
            <div className={styles.birthdaySelection}>
                {/* {JSON.stringify(this.props.groupChoices)} */}
                {this.props.groupChoices.map((group : Group) => {
                    return <Link to={`/${group.id}`}>{group.name}</Link>
                })}
            </div>
        );
    }
}

const mapStateToProps = (state : AppState) => {
    return {
        groupChoices : state.groupChoices
    }
};

const mapDispatchToProps = (dispatch : any) => {
    return {
        loadGroups : () => {
            dispatch(fetchGroups());
        }
    }
};

const BirthdaySelectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BirthdaySelectionPage)
export default BirthdaySelectionContainer;