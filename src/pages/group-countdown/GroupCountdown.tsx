import React, { useCallback, useEffect, useState, CSSProperties } from 'react';
import styles from './GroupCountdown.module.scss'
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { fetchGroup } from '../../store/actions';
import BackButton from '../../components/back-button/BackButton';
import MemberCountdown from '../../components/member-countdown/MemberCountdown';
import Util from '../../Util';
import useProcessedMembers from '../../hooks/useProcessedMembers';
import MemberChooser from '../../components/member-chooser/MemberChooser';
import Group from '../../models/Group';
import { IoIosFunnel } from 'react-icons/io';
import useRedirect from '../../hooks/useRedirect';
import createPage from '../../hoc/createPage';

function GroupCountdownPageComponent() {
    let { isExact, params } = useRouteMatch();
    let [ openChooser, setOpenChooser ] = useState(false);
    let [processedMembers, setCurrentSort, setCurrentFilter] = useProcessedMembers();
    let groupParam = params['group'];
    let isLoading = useSelector((state : AppState) => state.isLoading, shallowEqual)
    let selectedGroup : Group = useSelector((state : AppState) => state.selectedGroup, shallowEqual);
    let doesGroupExist = useSelector((state : AppState) => Util.isNotNullAndNotUndefined(state.groupChoices.find((group) => ( group.id === groupParam ))), shallowEqual) 
    let dispatch = useDispatch();
    let loadGroupFromParameter = useCallback((group : string) => {
        dispatch(fetchGroup(group));
    }, [dispatch]);
    
    useEffect(() => {
        if ( isExact ) {
            loadGroupFromParameter(groupParam);
        }
    }, []);
    useRedirect('/404', 10000, !doesGroupExist);

    if (!isLoading && doesGroupExist && selectedGroup !== null) {
        let { name, color } = selectedGroup;
        let titleStyle : React.CSSProperties = {
            color : color
        }
        let buttonStyle : CSSProperties = {
            backgroundColor : selectedGroup.color
        }
        return (
            <>
                <MemberChooser
                    filter={(f) => setCurrentFilter(f)}
                    sort={(s) => setCurrentSort(s)}
                    isOpen={openChooser} onChoose={() => { setOpenChooser(false) }}></MemberChooser>
                <div className={styles.sortButton} onClick={() => { setOpenChooser(true) }} style={buttonStyle}>
                    <IoIosFunnel/>分ける
                </div>
                <header className={styles.titleContainer} style={titleStyle}>
                    <BackButton to="/" style={buttonStyle}></BackButton>
                    <h2>{name}</h2>
                    <h6>アイドルバースデーカウントダウン</h6>
                </header>
                <MemberCountdown group={selectedGroup} members={processedMembers} ></MemberCountdown>
                {/* <AppFooter></AppFooter> */}
            </>
        );
    }
    else {
        return null;
    }
}

export default createPage(GroupCountdownPageComponent);

