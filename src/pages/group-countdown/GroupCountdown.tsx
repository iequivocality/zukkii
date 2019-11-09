import React, { useCallback, useEffect, useState, CSSProperties, useRef, Dispatch, SetStateAction } from 'react';
import styles from './GroupCountdown.module.scss'
import GenerationSelectionContainer from '../../components/selection/GenerationSelection';
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Redirect, useRouteMatch } from 'react-router';
import { fetchGroup } from '../../store/actions';
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
import FilterObject from '../../models/FilterObject';
import FilterType from '../../models/FilterType';
import { Constants } from '../../Constants';

function useProcessedMembers(currentSort : SortObject, currentFilter : FilterObject) : Member[] {
    let members : Member[] = useSelector((state : AppState) => state.members, shallowEqual);
    let [ processedMembers, setProcessedMembers ] = useState<Member[]>([]);
    useEffect(() => {
        setProcessedMembers(members);
    }, [members]);

    useEffect(() => {
        setProcessedMembers(currentFilter.type !== FilterType.NONE ? [...members].filter((member) => {
            return member[currentFilter.type] === currentFilter.value
        }) : members)
    }, [currentFilter])

    useEffect(() => {
        setProcessedMembers(currentSort.order.key !== 'none' ? [...members].sort(Util.compareValues(currentSort.type, currentSort.order)) : members);
    }, [currentSort]);

    return processedMembers;
}

export default function GroupCountdownPageComponent() {    
    let { isExact, params } = useRouteMatch();
    let [ openChooser, setOpenChooser ] = useState(false);
    let [ currentFilter, setCurrentFilter ] = useState<FilterObject>(Constants.ALL_FILTER);
    let [ currentSort, setCurrentSort ] = useState<SortObject>(Constants.NONE_SORT);
    let processedMembers = useProcessedMembers(currentSort, currentFilter);
    let groupParam = params['group'];
    let isLoading = useSelector((state : AppState) => state.isLoading, shallowEqual)
    let selectedGroup : Group = useSelector((state : AppState) => state.selectedGroup, shallowEqual);
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

    console.log("USE PROCESSED:", useProcessedMembers(currentSort, currentFilter));

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
                    <GenerationSelectionContainer></GenerationSelectionContainer>
                </header>
                <MemberCountdown group={selectedGroup} members={processedMembers} ></MemberCountdown>
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