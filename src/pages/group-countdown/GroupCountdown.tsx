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
import AppHeader from '../../components/app-header/AppHeader';
import useBreakpoint from '../../hooks/useBreakpoint';

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

    useEffect(() => {
        if (selectedGroup !== null) {
            document.title = selectedGroup.name + " - アイドルバースデーカウントダウン";
        }
    }, [selectedGroup])

    useRedirect('/404', 10000, !doesGroupExist);
    let breakpoint = useBreakpoint();

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
                { breakpoint !== 'mobile' ? (
                    <>
                        <BackButton to="/" style={buttonStyle}></BackButton>
                        <div className={styles.sortButton} onClick={() => { setOpenChooser(true) }} style={buttonStyle}>
                            <IoIosFunnel/>分ける
                        </div>
                    </>
                ) : null}
                <AppHeader title={name} subtitle="アイドルバースデーカウントダウン" style={titleStyle}></AppHeader>
                <MemberCountdown group={selectedGroup} members={processedMembers} ></MemberCountdown>
            </>
        );
    }
    else {
        return null;
    }
}

export default createPage(GroupCountdownPageComponent);

