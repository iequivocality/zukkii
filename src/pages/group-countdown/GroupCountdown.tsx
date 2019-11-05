import React, { useCallback, useEffect, useState, CSSProperties } from 'react';
import styles from './GroupCountdown.module.scss'
import GenerationSelectionContainer from '../../components/selection/GenerationSelection';
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import { fetchGroup, openDialog, closeDialog } from '../../store/actions';
import BackButton from '../../components/backbutton/BackButton';
import MemberCountdown from '../../components/member-countdown/MemberCountdown';
import Util from '../../Util';
import useTimeout from '../../hooks/useTimeout';
import Loading from '../../components/loading/Loading';
import MemberChooser from '../../components/member-chooser/MemberChooser';
import Group from '../../models/Group';
import { IoIosFunnel } from 'react-icons/io';
import SortObject from '../../models/SortObject';
import Member from '../../models/Member';

function GroupCountdownPageComponent(props : RouteComponentProps) {
    let { isExact, params } = props.match;
    let groupParam = params['group'];
    let selectedGroup : Group = useSelector((state : AppState) => state.selectedGroup, shallowEqual)
    let members : Member[] = useSelector((state : AppState) => state.filteredMembers, shallowEqual)
    let doesGroupExist = useSelector((state : AppState) => Util.isNotNullAndNotUndefined(state.groupChoices.find((group) => ( group.id === groupParam ))), shallowEqual)
    let dispatch = useDispatch();
    let [ showNotFound, setShowNotFound ] = useState(false);
    let loadGroupFromParameter = useCallback((group : string) => {
        dispatch(fetchGroup(group));
    }, [dispatch]);
    let clickToOpenDialog = useCallback(() => {
        dispatch(openDialog());
    }, [dispatch]);
    let clickToCloseDialog = useCallback(() => {
        dispatch(closeDialog());
    }, [dispatch]);
    let [currentSort, setCurrentSort] = useState<SortObject>(null);
    let sortedMembers = Util.isNotNullAndNotUndefined(currentSort) ? members.filter((member) => {
        return member[currentSort.type] === currentSort.value
    }) : members;

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

    let sortChanged = (value : SortObject) => {
        console.log('MEMBER CHOOSE', value);
        setCurrentSort(value);
        clickToCloseDialog();
    }

    if (doesGroupExist) {
        let { name, color } = selectedGroup;
        let titleStyle : React.CSSProperties = {
            color : color
        }
        let buttonStyle : CSSProperties = {
            backgroundColor : selectedGroup.color
        }
        return (
            <>
                <MemberChooser changeSort={(value : SortObject) => { sortChanged(value) }}></MemberChooser>
                <div className={styles.sortButton} onClick={() => { clickToOpenDialog() }} style={buttonStyle}>
                    <IoIosFunnel/>分ける
                </div>
                <header className={styles.titleContainer} style={titleStyle}>
                    <BackButton to="/" style={buttonStyle}></BackButton>
                    <h2>{name}</h2>
                    <h6>アイドルバースデーカウントダウン</h6>
                    <GenerationSelectionContainer></GenerationSelectionContainer>
                </header>
                <MemberCountdown group={selectedGroup} members={sortedMembers} ></MemberCountdown>
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
export default withRouter(GroupCountdownPageComponent);