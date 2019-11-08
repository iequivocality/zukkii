import React, { useCallback, useEffect, useState, CSSProperties } from 'react';
import styles from './GroupCountdown.module.scss'
import GenerationSelectionContainer from '../../components/selection/GenerationSelection';
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Redirect, useRouteMatch } from 'react-router';
import { fetchGroup, filterMembers, sortMembers } from '../../store/actions';
import BackButton from '../../components/backbutton/BackButton';
import MemberCountdown from '../../components/member-countdown/MemberCountdown';
import Util from '../../Util';
import useTimeout from '../../hooks/useTimeout';
import Loading from '../../components/loading/Loading';
import MemberChooser from '../../components/member-chooser/MemberChooser';
import Group from '../../models/Group';
import { IoIosFunnel } from 'react-icons/io';
import Member from '../../models/Member';
import SortObject from '../../models/SortObject';
import SortType, { SortOrder } from '../../models/SortType';

export default function GroupCountdownPageComponent() {
    let { isExact, params } = useRouteMatch();
    let [ openChooser, setOpenChooser ] = useState(false);
    let groupParam = params['group'];
    let isLoading = useSelector((state : AppState) => state.isLoading, shallowEqual)
    let selectedGroup : Group = useSelector((state : AppState) => state.selectedGroup, shallowEqual);
    let currentSort : SortObject = useSelector((state : AppState) => state.currentSort, shallowEqual);
    let members : Member[] = useSelector((state : AppState) => state.filteredMembers, shallowEqual);
    let doesGroupExist = useSelector((state : AppState) => Util.isNotNullAndNotUndefined(state.groupChoices.find((group) => ( group.id === groupParam ))), shallowEqual) 
    let dispatch = useDispatch();
    let [ showNotFound, setShowNotFound ] = useState(false);
    let loadGroupFromParameter = useCallback((group : string) => {
        dispatch(fetchGroup(group));
    }, [dispatch]);

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
    }, 10000, [showNotFound]);
    console.log('TYPE:', currentSort.type);
    console.log('ORDER:', currentSort.order); 
    // let sortedMembers = members;
    // if (currentSort.type !== SortType.NONE) {
    //     console.log("NOT NONE");
    //     sortedMembers = members.sort(Util.compareValues(currentSort.type, currentSort.order));
    // }

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
                <MemberChooser isOpen={openChooser} onChoose={() => { setOpenChooser(false) }}></MemberChooser>
                <div className={styles.sortButton} onClick={() => { setOpenChooser(true) }} style={buttonStyle}>
                    <IoIosFunnel/>分ける
                </div>
                <header className={styles.titleContainer} style={titleStyle}>
                    <BackButton to="/" style={buttonStyle}></BackButton>
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
            return <Loading></Loading>;
        }
    }
}