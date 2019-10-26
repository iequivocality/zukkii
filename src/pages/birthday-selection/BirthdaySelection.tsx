import React, { Fragment } from 'react';
import styles from './BirthdaySelection.module.scss';
import AppState from '../../store/state/AppState';
import { connect } from 'react-redux';
import { fetchGroups, loadGroup } from '../../store/actions';
import Group from '../../models/Group';
import { Link } from 'react-router-dom';

interface BirthdaySelectionPageProps {
    groupChoices : Array<Group>,
    loadGroups : () => void,
    setGroup : (group : Group) => void,
}

class BirthdaySelectionPage extends React.Component<BirthdaySelectionPageProps> {
    componentDidMount() {
        this.props.loadGroups();
    }

    render() {
        return (
            <Fragment>
                <div className={styles.titleContainer}>
                    <h4>アイドルグループ選んでください</h4>
                </div>
                <div className={styles.birthdaySelection}>
                    {/* {JSON.stringify(this.props.groupChoices)} */}
                    {this.props.groupChoices.map((group : Group) => {
                        return (
                            <Link style={this.getGroupStyle(group)} className={styles.groupChoice} to={`/group/${group.id}`} 
                                key={group.id} onClick={() => this.props.setGroup(group)}>
                                <img alt={group.name} className={styles.groupBackground} src={`${process.env.PUBLIC_URL}/images/${group.id}/cover.jpg`}></img>
                                <div className={styles.groupName}>
                                    {group.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Fragment>
        );
    }

    getGroupStyle(group : Group) {
        let groupStyle : React.CSSProperties = {
            backgroundColor: group.color,
        };
        return groupStyle
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
        },
        setGroup : (group : Group) => {
            dispatch(loadGroup(group));
        }
    }
};

const BirthdaySelectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BirthdaySelectionPage)
export default BirthdaySelectionContainer;