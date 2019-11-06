import React, { useCallback } from 'react';
import styles from './MemberChooser.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import AppState from '../../store/state/AppState';
import { filterMembers } from '../../store/actions';
import { Motion, spring } from 'react-motion';
import Dropdown from '../ui/dropdown/Dropdown';
import PREFECTURES, { Prefecture } from '../../data/prefectures';
import { Constants } from '../../Constants';
import FilterType from '../../models/FilterType';

export interface MemberChooserProps {
    isOpen : boolean,
    onChoose : () => void
}

export default function MemberChooser(props : MemberChooserProps) {
    let { isOpen, onChoose } = props;
    let members = useSelector((state : AppState) => state.members);
    let memberPrefectures = members.map(member => member.prefecture);
    let prefectureValues = PREFECTURES.filter(prefecture => {
        return memberPrefectures.findIndex(mPre => mPre === prefecture.jp) > -1;
    })
    let dispatch = useDispatch();
    let doSort = useCallback((value : Prefecture) => {
        if (value !== null) {
            dispatch(filterMembers({
                type : FilterType.PREFECTURE,
                value : value.jp
            }));
        }
        else {
            dispatch(filterMembers(Constants.ALL_FILTER));
        }
        onChoose()
    }, []);
    
    return (
        <>
            <Motion defaultStyle={{ x : 0 }} style={{ x : isOpen ? spring(0.65) : spring(0) }}>
                {
                    interpolatingStyle => (
                        <div className={isOpen ? styles.modalBackground : styles.modalBackgroundClose} style={{
                            opacity: interpolatingStyle.x
                        }} onClick={() => onChoose()}></div>
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
                            <div className={styles.closeButton} onClick={() => onChoose()}>
                                <IoIosCloseCircleOutline/>
                            </div>
                        </div>
                        <div className={styles.memberChooserContainer}>
                            <div className={styles.memberChooserContainerLabel}>都道府県</div>
                            <div className={styles.memberChooserContainerForm}>
                                <Dropdown<Prefecture>
                                    all width={100}
                                    contents={prefectureValues}
                                    onSelect={(value : Prefecture) => { doSort(value) }}
                                    style={{ fontFamily : 'KosugiMaru,sans-serif' }}
                                    mapContentToDropdown={(content : Prefecture) => ( { key : content.en.toLowerCase(), label : content.jp, value : content } )}/>
                            </div>
                        </div>
                    </aside>
                ) }
            </Motion>
        </>
    );
}