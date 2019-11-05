import React, { useState, useCallback } from 'react';
import SortType from '../../models/SortType';
import styles from './MemberChooser.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import AppState from '../../store/state/AppState';
import { openDialog, closeDialog } from '../../store/actions';
import { Motion, spring } from 'react-motion';
import Dropdown from '../ui/dropdown/Dropdown';
import PREFECTURES, { Prefecture } from '../../data/prefectures';
import SortObject from '../../models/SortObject';

interface MemberChooserProps {
    changeSort : (sortType : SortObject) => void
}

export default function MemberChooser(props : MemberChooserProps) {
    let isOpen = useSelector((state : AppState) => state.isOpen)
    let dispatch = useDispatch();
    let clickToCloseDialog = useCallback(() => {
        dispatch(closeDialog());
    }, [dispatch]);
    
    return (
        <>
            <Motion defaultStyle={{ x : 0 }} style={{ x : isOpen ? spring(0.65) : spring(0) }}>
                {
                    interpolatingStyle => (
                        <div className={isOpen ? styles.modalBackground : styles.modalBackgroundClose} style={{
                            opacity: interpolatingStyle.x
                        }} onClick={() => clickToCloseDialog()}></div>
                    )
                }
            </Motion>
            <Motion defaultStyle={{ x : -250 }} style={{ x : isOpen ? spring(0) : spring(-250) }}>
                { interpolatingStyle => (
                    <aside className={styles.memberChooser} style={{
                        right: interpolatingStyle.x + 'px'
                    }}>
                        <div className={styles.memberChooserContainer}>
                            <div>SELECT</div>
                            <div className={styles.closeButton} onClick={() => clickToCloseDialog()}>
                                <IoIosCloseCircleOutline/>
                            </div>
                        </div>
                        <div className={styles.memberChooserContainer}>
                            <div className={styles.memberChooserContainerLabel}>都道府県</div>
                            <div className={styles.memberChooserContainerForm}>
                                <Dropdown<Prefecture>
                                    width={100}
                                    placeholder={'都道府県'}
                                    contents={PREFECTURES}
                                    onSelect={(value : Prefecture) => { props.changeSort({ type : SortType.PREFECTURE, value : value.jp }) }}
                                    mapContentToDropdown={(content : Prefecture) => ( { label : content.jp, value : content } )}/>
                            </div>
                        </div>
                    </aside>
                ) }
            </Motion>
        </>
    );
}