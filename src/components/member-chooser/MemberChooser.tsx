import React, { useState, useCallback } from 'react';
import SortType from '../../models/SortType';
import styles from './MemberChooser.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import AppState from '../../store/state/AppState';
import { openDialog, closeDialog } from '../../store/actions';

interface MemberChooserProps {
    changeSort : (sortType : SortType) => void
}

export default function MemberChooser(props : MemberChooserProps) {
    let isOpen = useSelector((state : AppState) => state.isOpen)
    let dispatch = useDispatch();
    let clickToCloseDialog = useCallback(() => {
        dispatch(closeDialog());
    }, [dispatch]);
    
    return (
        <>
            <div className={isOpen ? styles.modalBackground : styles.modalBackgroundClose} onClick={() => clickToCloseDialog()}></div>
            <aside className={isOpen ? styles.memberChooser : styles.memberChooserClose}>
                <div className={styles.closeButton} onClick={() => clickToCloseDialog()}>
                    <IoIosCloseCircleOutline/>
                </div>
            </aside>
        </>
    );
}