import React, { useCallback, useEffect, useState } from 'react';
import styles from './GroupCountdown.module.scss'
import GenerationSelectionContainer from '../../components/selection/GenerationSelection';
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import { fetchGroup } from '../../store/actions';
import BackButton from '../../components/backbutton/BackButton';
import MemberCountdown from '../../components/member-countdown/MemberCountdown';
import Util from '../../Util';
import useTimeout from '../../hooks/useTimeout';

function GroupCountdownPageComponent(props : RouteComponentProps) {
    let { isExact, params } = props.match;
    let groupParam = params['group'];
    let selectedGroup = useSelector((state : AppState) => state.selectedGroup, shallowEqual)
    let members = useSelector((state : AppState) => state.filteredMembers, shallowEqual)
    let doesGroupExist = useSelector((state : AppState) => Util.isNotNullAndNotUndefined(state.groupChoices.find((group) => ( group.id === groupParam ))), shallowEqual)
    let dispatch = useDispatch();
    let [ showNotFound, setShowNotFound ] = useState(false);
    let loadGroupFromParameter = useCallback((group : string) => {
        dispatch(fetchGroup(group));
    }, [dispatch])

    useEffect(() => {
        if ( isExact ) {
            console.log(groupParam)
            loadGroupFromParameter(groupParam);
        }
    }, []);

    useTimeout(() => {
        if (!doesGroupExist) {
            setShowNotFound(true);
        }
    }, 5000);
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (!doesGroupExist) {
    //             setShowNotFound(true);
    //         }
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, [ showNotFound ]);

    if (doesGroupExist) {
        let { name, color } = selectedGroup;
        let titleStyle : React.CSSProperties = {
            color : color
        }
        return (
            <>
                <header className={styles.titleContainer} style={titleStyle}>
                    <BackButton to="/"></BackButton>
                    <h2>{name}</h2>
                    <h6>アイドルバースデーカウントダウン</h6>
                    <GenerationSelectionContainer></GenerationSelectionContainer>
                </header>
                <MemberCountdown group={selectedGroup} members={members} ></MemberCountdown>
            </>
        );
    }
    else {
        if (showNotFound) {
            return <Redirect to="/404"></Redirect>;
        }
        else {
            return <h6>LOADING</h6>;
        }
    }
}
export default withRouter(GroupCountdownPageComponent);