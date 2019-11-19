import React, { useCallback, useEffect, useContext } from 'react';
import styles from './BirthdaySelection.module.scss';
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups, loadGroup } from '../../store/actions';
import Group from '../../models/Group';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import ThemeContext from '../../contexts/themeContext';
import AppFooter from '../../components/app-footer/AppFooter';
import useRedirect from '../../hooks/useRedirect';

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
                <AppFooter></AppFooter>
            </>
        );
    }
    else {
        return <Loading></Loading>
    }
}