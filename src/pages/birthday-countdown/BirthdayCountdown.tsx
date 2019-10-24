import React, { Fragment } from 'react';
import styles from './BirthdayCountdown.module.scss'
import Group from '../../models/Group';
import GenerationSelectionContainer from '../../components/selection/GenerationSelection';
import Countdown from '../../components/countdown/CountdownComponent';
import AppState from '../../store/state/AppState';
import { connect } from 'react-redux';
import { useParams, withRouter, RouteComponentProps, Redirect } from 'react-router';
import Member from '../../models/Member';
import { fetchMembersFromGroup, fetchGroup } from '../../store/actions';
import { Link } from 'react-router-dom';

interface BirthdayCountdownProps {
    selectedGroup : Group,
    doesGroupExist : boolean,
    members : Array<Member>,
    loadGroupFromParameter : (group: string) => void
}

type BirthdayCountdownPageProps = BirthdayCountdownProps & RouteComponentProps;

class BirthdayCountdownPageComponent extends React.Component<BirthdayCountdownPageProps> {
    componentDidMount() {
        let { isExact, params } = this.props.match;
        if ( isExact ) {
            let group = params['group'];
            this.props.loadGroupFromParameter(group);
        }
    }

    render() {
        if (this.props.doesGroupExist) {
            let { name, color, id } = this.props.selectedGroup;
            let members = this.props.members;
            let titleStyle : React.CSSProperties = {
                color : color
            }
            return (
                <Fragment>
                    <header className={styles.titleContainer} style={titleStyle}>
                        <Link to="/">Back</Link>
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

const mapStateToProps = (state : AppState, ownProps : BirthdayCountdownPageProps) : Partial<BirthdayCountdownPageProps> => {    
    let { params } = ownProps.match;
    let group = params['group'];
    
    return {
        selectedGroup : state.selectedGroup,
        members : state.members,
        doesGroupExist : (state.groupChoices.length > 0 && state.groupChoices.map(group => (group.id)).includes(group)) || (state.selectedGroup !== null && state.selectedGroup.id === group)
    }
}

const mapDispatchToProps = (dispatch : any) : Partial<BirthdayCountdownPageProps> => {
    return {
        loadGroupFromParameter : (group : string) => {
            dispatch(fetchGroup(group))
        }
    }
}

const BirthdayCountdownPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(BirthdayCountdownPageComponent));
export default BirthdayCountdownPage;

