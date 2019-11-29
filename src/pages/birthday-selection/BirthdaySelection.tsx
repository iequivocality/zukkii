import React, { useCallback, useEffect, useContext } from 'react';
import styles from './BirthdaySelection.module.scss';
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups, loadGroup } from '../../store/actions';
import Group from '../../models/Group';
import ThemeContext from '../../contexts/themeContext';
import AppFooter from '../../components/app-footer/AppFooter';
import useRedirect from '../../hooks/useRedirect';
import AppHeader from '../../components/app-header/AppHeader';
import GroupChoice from '../../components/group-choice/GroupChoice';
import { SpringGrid, makeResponsive } from 'react-stonecutter';
import createPage from '../../hoc/createPage';

function BirthdaySelectionPage() {
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
        let Grid = makeResponsive(SpringGrid, { maxWidth : 900 });
        return (
            <>
                <AppHeader
                    title="ズッキー日本アイドルバースデーカウントダウン"
                    subtitle="アイドルグループ選んでください"
                    style={{ color : theme.foregroundColor }}></AppHeader>
                <div className={groupChoices.length > 0 ? styles.birthdaySelection : styles.noGroupBirthdaySelection}>
                    {groupChoices.length > 0 ? 
                        <Grid
                            columns={4} columnWidth={200} gutterWidth={20} gutterHeight={20}
                            springConfig={{ stiffness: 140, damping: 18 }} itemHeight={150}>
                            {groupChoices.map((group : Group) => {
                                return (
                                    <div key={group.id}>
                                        <GroupChoice key={group.id} group={group} selectGroup={(group : Group) => setGroup(group)}></GroupChoice>
                                    </div>
                                );
                            })}
                        </Grid>
                    
                    : <div className={styles.noGroupText}>{`ごめん。全然グループがみつかりません。`}</div>}
                </div>
            </>
        );
    }
    else {
        return null;
    }
}

export default createPage(BirthdaySelectionPage);