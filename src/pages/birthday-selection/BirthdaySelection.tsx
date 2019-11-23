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
import Theme from '../../themes/variables';
import AppHeader from '../../components/app-header/AppHeader';
import Logo from '../../components/svg/Logo';

function getGroupStyle(group : Group, theme : Theme) {
    let groupStyle : React.CSSProperties = {
        backgroundColor: group.color,
        boxShadow: theme.birthdaySelectionDropShadow
    };
    return groupStyle
}

export default function BirthdaySelectionPage() {
    let { theme } = useContext(ThemeContext);
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
        document.title = "ズッキー日本アイドルバースデーカウントダウン";
    }, []);

    useRedirect('/404', 10000, groupChoices.length <= 0);

    if (!isLoading) {
        return (
            <>
                <AppHeader
                    title="ズッキー日本アイドルバースデーカウントダウン"
                    subtitle="アイドルグループ選んでください"
                    style={{ color : theme.foregroundColor }}></AppHeader>
                <div className={styles.birthdaySelection}>
                    {groupChoices.map((group : Group) => {
                        return (
                            <Link style={getGroupStyle(group, theme)} className={styles.groupChoice} to={`/group/${group.id}`} 
                                key={group.id} onClick={() => setGroup(group)}>
                                <img alt={group.name} className={styles.groupBackground} src={`${process.env.PUBLIC_URL}/images/${group.id}/cover.jpg`}></img>
                                <div className={styles.groupName}>
                                    {group.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {/* <Logo width={300} height={300}></Logo> */}
                <AppFooter></AppFooter>
            </>
        );
    }
    else {
        return null;
    }
}