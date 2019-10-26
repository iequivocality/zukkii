import React, { Fragment } from 'react';
import styles from './GroupCountdown.module.scss'
import Group from '../../models/Group';
import GenerationSelectionContainer from '../../components/selection/GenerationSelection';
import AppState from '../../store/state/AppState';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import Member from '../../models/Member';
import { fetchGroup } from '../../store/actions';
import BackButton from '../../components/backbutton/BackButton';
import MemberCountdown from '../member-countdown/MemberCountdown';
import Util from '../../Util';

interface GroupCountdownProps {
    selectedGroup : Group,
    doesGroupExist : boolean,
    members : Array<Member>,
    shouldRedirect : boolean,
    loadGroupFromParameter : (group: string) => void
}

type GroupCountdownPageProps = GroupCountdownProps & RouteComponentProps;

class GroupCountdownPageComponent extends React.Component<GroupCountdownPageProps> {
    componentDidMount() {
        let { isExact, params } = this.props.match;
        if ( isExact ) {
            let group = params['group'];
            this.props.loadGroupFromParameter(group);
        }
    }

    render() {
        let { selectedGroup, members, doesGroupExist } = this.props;
        if (doesGroupExist) {
            let { name, color } = selectedGroup;
            let titleStyle : React.CSSProperties = {
                color : color
            }
            return (
                <Fragment>
                    <header className={styles.titleContainer} style={titleStyle}>
                        <BackButton to="/"></BackButton>
                        <h2>{name}</h2>
                        <h6>アイドルバースデーカウントダウン</h6>
                        <GenerationSelectionContainer></GenerationSelectionContainer>
                    </header>
                    <MemberCountdown group={this.props.selectedGroup} members={members} ></MemberCountdown>
                </Fragment>
            );
        }
        else {
            return null;
        }

        
    }
}

const mapStateToProps = (state : AppState, ownProps : GroupCountdownPageProps) : Partial<GroupCountdownPageProps> => {        
    return {
        selectedGroup : state.selectedGroup,
        members : state.filteredMembers,
        doesGroupExist : Util.isNotNullAndNotUndefined(state.selectedGroup) && Util.isNotNullAndNotUndefined(state.groupChoices.find((group) => ( group.id === state.selectedGroup.id )))
    }
}

const mapDispatchToProps = (dispatch : any) : Partial<GroupCountdownPageProps> => {
    return {
        loadGroupFromParameter : (group : string) => {
            dispatch(fetchGroup(group))
        }
    }
}

const GroupCountdownPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(GroupCountdownPageComponent));
export default GroupCountdownPage;

