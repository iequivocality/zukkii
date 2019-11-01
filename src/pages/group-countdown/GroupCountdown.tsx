import React, { Fragment, useCallback, useEffect } from 'react';
import styles from './GroupCountdown.module.scss'
import GenerationSelectionContainer from '../../components/selection/GenerationSelection';
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { fetchGroup } from '../../store/actions';
import BackButton from '../../components/backbutton/BackButton';
import MemberCountdown from '../../components/member-countdown/MemberCountdown';
import Util from '../../Util';

function GroupCountdownPageComponent(props : RouteComponentProps) {
    let selectedGroup = useSelector((state : AppState) => state.selectedGroup)
    let members = useSelector((state : AppState) => state.filteredMembers)
    let doesGroupExist = useSelector((state : AppState) => Util.isNotNullAndNotUndefined(state.selectedGroup) && Util.isNotNullAndNotUndefined(state.groupChoices.find((group) => ( group.id === state.selectedGroup.id ))))
    let dispatch = useDispatch();
    let loadGroupFromParameter = useCallback((group : string) => {
        dispatch(fetchGroup(group));
    }, [dispatch])
    let { isExact, params } = props.match;

    useEffect(() => {
        if ( isExact ) {
            let group = params['group'];
            console.log(group)
            loadGroupFromParameter(group);
            // dispatch(fetchGroup(group))
        }
        
    }, []);

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
                <MemberCountdown group={selectedGroup} members={members} ></MemberCountdown>
            </Fragment>
        );
    }
    else {
        return null;
    }
}
export default withRouter(GroupCountdownPageComponent);

