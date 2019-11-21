import React, { useCallback, useEffect, useContext } from 'react';
import styles from './BirthdaySelection.module.scss';
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups, loadGroup } from '../../store/actions';
import Group from '../../models/Group';
import { Link } from 'react-router-dom';
import ThemeContext from '../../contexts/themeContext';
import AppFooter from '../../components/app-footer/AppFooter';
import useRedirect from '../../hooks/useRedirect';
import OrbitingObjects from '../../components/svg/OrbitingObjects';

function getGroupStyle(group : Group) {
    let groupStyle : React.CSSProperties = {
        backgroundColor: group.color,
    };
    return groupStyle
}

export default function BirthdaySelectionPage() {
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

    useRedirect('/404', 10000, groupChoices.length <= 0);

    if (!isLoading) {
        return (
            <>
                <div className={styles.titleContainer} style={{ color : themeContainer.theme.foregroundColor }}>
                    <h2>ズッキー日本アイドルバースデーカウントダウン</h2>
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
                <OrbitingObjects distance={120} numberOfCircles={75} radius={2} className={styles.hinatazakaCircle} color={"#5BBEE4"}/>
                <OrbitingObjects distance={200} numberOfCircles={100} radius={2} className={styles.nogizakaCircle} color={"#7C32A2"}/>
                <AppFooter></AppFooter>
            </>
        );
    }
    else {
        return null;
    }
}