import React, { Fragment } from 'react';
import styles from './GroupCountdown.module.scss'
import Group from '../../models/Group';
import GenerationSelectionContainer from '../../components/selection/GenerationSelection';
import Countdown from '../../components/countdown/CountdownComponent';
import AppState from '../../store/state/AppState';
import { connect } from 'react-redux';
import { useParams, withRouter, RouteComponentProps, Redirect } from 'react-router';
import Member from '../../models/Member';
import { fetchMembersFromGroup, fetchGroup } from '../../store/actions';
import { Link } from 'react-router-dom';
import BackButton from '../../components/backbutton/BackButton';

interface GroupCountdownProps {
    selectedGroup : Group,
    doesGroupExist : boolean,
    members : Array<Member>,
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
        if (this.props.selectedGroup) {
            let { name, color, id } = this.props.selectedGroup;
            let members = this.props.members;
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
                    <main className={styles.groupContainer}>
                    { members.map( member => <Countdown key={member.id} member={member} groupColor={color} groupId={id}></Countdown>) }
                    </main>
                </Fragment>
            );
        }
        else {
            // return (<Redirect to={'/404'}></Redirect>)
            return null;
        }

        
    }
}

const mapStateToProps = (state : AppState, ownProps : GroupCountdownPageProps) : Partial<GroupCountdownPageProps> => {        
    return {
        selectedGroup : state.selectedGroup,
        members : state.members
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

