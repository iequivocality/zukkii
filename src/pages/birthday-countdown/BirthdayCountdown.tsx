import React, { Fragment } from 'react';
import styles from './BirthdayCountdown.module.scss'
import Group from '../../models/Group';
import GenerationSelectionContainer from '../../components/selection/GenerationSelection';
import Countdown from '../../components/countdown/CountdownComponent';
import AppState from '../../store/state/AppState';
import { connect } from 'react-redux';
import { useParams, withRouter, RouteComponentProps, Redirect } from 'react-router';
import Member from '../../models/Member';
import { fetchMembersFromGroup } from '../../store/actions';

interface BirthdayCountdownPageProps {
    selectedGroup : Group,
    members : Array<Member>,
    loadMembersFromGroup : (group : string) => void
}

class BirthdayCountdownPageComponent extends React.Component<BirthdayCountdownPageProps & RouteComponentProps> {
    componentDidMount() {
        let { isExact, params } = this.props.match;
        if ( isExact ) {
            let group = params['group'];
            console.log("GROUP", group);
            this.props.loadMembersFromGroup(group);
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
            return (<Redirect to={'/404'}></Redirect>)
        }

        
    }
}

const mapStateToProps = (state : AppState) : Partial<BirthdayCountdownPageProps> => {
    return {
        selectedGroup : state.selectedGroup,
        members : state.members
    }
}

const mapDispatchToProps = (dispatch : any) : Partial<BirthdayCountdownPageProps> => {
    return {
        loadMembersFromGroup : (group : string) => {
            dispatch(fetchMembersFromGroup(group));
        }
    }
}

const BirthdayCountdownPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(BirthdayCountdownPageComponent));
export default BirthdayCountdownPage;

