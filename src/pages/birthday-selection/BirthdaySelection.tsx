import React, { useCallback, useEffect, useContext } from 'react';
import styles from './BirthdaySelection.module.scss';
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups, loadGroup } from '../../store/actions';
import Group from '../../models/Group';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import ThemeContext from '../../contexts/themeContext';

interface BirthdaySelectionPageProps {
    groupChoices : Array<Group>,
    loadGroups : () => void,
    setGroup : (group : Group) => void,
}

function getGroupStyle(group : Group) {
    let groupStyle : React.CSSProperties = {
        backgroundColor: group.color,
    };
    return groupStyle
}

export default function BirthdaySelectionPage(props: BirthdaySelectionPageProps) {
    let themeContainer = useContext(ThemeContext);
    let groupChoices = useSelector((state : AppState) => state.groupChoices);
    let isLoading = useSelector((state : AppState) => state.isLoading);
    let dispatch = useDispatch();
    let setGroup = useCallback((group : Group) => {
        dispatch(loadGroup(group));
    }, [dispatch]);
    let loadGroups = useCallback(() => {
        dispatch(fetchGroups());
    }, [dispatch]);

    useEffect(() => {
        loadGroups();
    }, []);

    console.log("SEEC", themeContainer)

    if (!isLoading) {
        return (
            <>
                <div className={styles.titleContainer} style={{ color : themeContainer.theme.foregroundColor }}>
                    <h2>アイドルバースデーカウントダウン</h2>
                    <h4>アイドルグループ選んでください</h4>
                </div>
                <div className={styles.birthdaySelection}>
                    {groupChoices.map((group : Group) => {
                        return (
                            <Link style={getGroupStyle(group)} className={styles.groupChoice} to={`/group/${group.id}`} 
                                key={group.id} onClick={() => setGroup(group)}>
                                <img alt={group.name} className={styles.groupBackground} src={`${process.env.PUBLIC_URL}/images/${group.id}/cover.jpg`}></img>
                                <div className={styles.groupName}>
                                    {group.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </>
        );
    }
    else {
        return <Loading></Loading>
    }
}