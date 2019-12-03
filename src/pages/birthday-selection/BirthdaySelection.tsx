import React, { useCallback, useEffect, useContext } from 'react';
import styles from './BirthdaySelection.module.scss';
import AppState from '../../store/state/AppState';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups, loadGroup } from '../../store/actions';
import Group from '../../models/Group';
import ThemeContext from '../../contexts/themeContext';
import useRedirect from '../../hooks/useRedirect';
import AppHeader from '../../components/app-header/AppHeader';
import GroupChoice from '../../components/group-choice/GroupChoice';
import { SpringGrid, makeResponsive, SpringGridProps } from 'react-stonecutter';
import createPage from '../../hoc/createPage';
import useBreakpoint from '../../hooks/useBreakpoint';

function BirthdaySelectionPage() {
    let { theme } = useContext(ThemeContext);
    let groupChoices = useSelector((state : AppState) => state.groupChoices);
    // let groupChoices = []
    let isLoading = useSelector((state : AppState) => state.isLoading);
    let dispatch = useDispatch();
    let setGroup = useCallback((group : Group) => {
        dispatch(loadGroup(group));
    }, [dispatch]);
    let loadGroups = useCallback(() => {
        dispatch(fetchGroups());
    }, [dispatch]);
    let breakpoint = useBreakpoint();

    useEffect(() => {
        loadGroups();
        document.title = "ズッキー日本アイドルバースデーカウントダウン";
    }, []);

    useRedirect('/404', 10000, groupChoices.length <= 0);

    if (!isLoading) {
        console.log(breakpoint);
        // breakpoint === 'mobile'
        let Grid = breakpoint !== 'mobile' ? makeResponsive(SpringGrid, { maxWidth : 1100 }) : SpringGrid;
        let defaultGridProps : SpringGridProps = {
            columns : 3,
            columnWidth : 200,
            gutterWidth : 20,
            gutterHeight : 20,
            springConfig : { stiffness: 140, damping: 18 },
            itemHeight : 150
        };
        let mobileGridProps : SpringGridProps = {
            ...defaultGridProps,
            columns : 1,
            columnWidth : 240,
            itemHeight : 120
        };
        
        let gridProps = breakpoint === 'mobile' ? mobileGridProps : defaultGridProps;
        return (
            <>
                <AppHeader
                    title="ズッキー日本アイドルバースデーカウントダウン"
                    subtitle="アイドルグループ選んでください"
                    style={{ color : theme.foregroundColor }}></AppHeader>
                {
                    groupChoices.length > 0 ?
                        <main className={styles.birthdaySelection}>
                            <Grid {...gridProps}>
                                {groupChoices.map((group : Group) => {
                                    return (
                                        <div key={group.id}>
                                            <GroupChoice key={group.id} group={group} selectGroup={(group : Group) => setGroup(group)}></GroupChoice>
                                        </div>
                                    );
                                })}
                            </Grid>
                        </main>
                    :
                    <main className={styles.noGroupBirthdaySelection}>
                        <div className={styles.noGroupText}>{`ごめん。全然グループがみつかりません。`}</div>
                    </main>
                }
            </>
        );
    }
    else {
        return null;
    }
}

export default createPage(BirthdaySelectionPage);