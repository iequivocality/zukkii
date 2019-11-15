import React, { useCallback, useContext } from 'react';
import styles from './MemberChooser.module.scss';
import { useSelector } from 'react-redux';
import AppState from '../../store/state/AppState';
import { Motion, spring } from 'react-motion';
import Dropdown from '../ui/dropdown/Dropdown';
import PREFECTURES from '../../data/prefectures';
import { Constants } from '../../Constants';
import FilterType from '../../models/FilterType';
import SortType from '../../models/SortType';
import SortOrders, { SortOrder } from '../../models/SortOrder'
import SortObject from '../../models/SortObject';
import FilterObject from '../../models/FilterObject';
import BLOOD_TYPES, { BloodType } from '../../data/bloodtypes';
import Prefecture from '../../models/Prefecture';
import CloseButton from '../close-button/CloseButton';
import GenerationSelection, { GenerationSelect } from '../selection/GenerationSelection';
import ThemeContext from '../../contexts/themeContext';

export interface MemberChooserProps {
    isOpen : boolean,
    onChoose : () => void,
    filter : (f : FilterObject) => void,
    sort : (s : SortObject) => void
}

export default function MemberChooser(props : MemberChooserProps) {
    let { isOpen, onChoose, filter, sort } = props;
    let themeContainer = useContext(ThemeContext);
    let selectedGroup = useSelector((state : AppState) => state.selectedGroup);
    let members = useSelector((state : AppState) => state.members);
    let memberPrefectures = members.map(member => member.prefecture);
    let prefectureValues = PREFECTURES.filter(prefecture => {
        return memberPrefectures.findIndex(mPre => mPre === prefecture.jp) > -1;
    })
    let doFilter = useCallback((filterType : FilterType, value : any) => {
        if (filterType === FilterType.PREFECTURE) {
            filter(value !== null ? { type : filterType, value : (value as Prefecture).jp } : Constants.ALL_FILTER);
        }
        else if (filterType === FilterType.BLOOD_TYPE) {
            filter(value !== null ? { type : filterType, value : (value as BloodType).type } : Constants.ALL_FILTER);
        }
        else if (filterType === FilterType.GENERATION) {
            filter(value && (value as GenerationSelect).value != 0 ? { type : filterType, value : (value as GenerationSelect).value } : Constants.ALL_FILTER);
        }
        onChoose();
    }, []);

    let doSort = useCallback((order : SortOrder, type : SortType) => {
        sort({ type, order });
        onChoose();
    }, []);

    return (
        <>
            <Motion defaultStyle={{ x : 0 }} style={{ x : isOpen ? spring(0.4) : spring(0) }}>
                {
                    interpolatingStyle => (
                        <div className={isOpen ? styles.modalBackground : styles.modalBackgroundClose} style={{
                            opacity: interpolatingStyle.x, backgroundColor : selectedGroup.color
                        }} onClick={() => onChoose()}></div>
                    )
                }
            </Motion>
            <Motion defaultStyle={{ x : -250 }} style={{ x : isOpen ? spring(0) : spring(-250) }}>
                { interpolatingStyle => (
                    <aside className={styles.memberChooser} style={{
                        right: interpolatingStyle.x + 'px', backgroundColor : themeContainer.theme.backgroundColor
                    }}>
                        <div className={styles.memberChooserContainer}>
                            <div style={{ color : themeContainer.theme.foregroundColor }}>SELECT</div>
                            <CloseButton onClose={() => { onChoose() }} color={themeContainer.theme.foregroundColor}></CloseButton>
                        </div>
                        <div className={styles.memberChooserContainer}>
                            <div className={styles.memberChooserContainerLabel} style={{ color : themeContainer.theme.foregroundColor }}>都道府県</div>
                            <div className={styles.memberChooserContainerForm}>
                                <Dropdown<Prefecture>
                                    all width={150} color={selectedGroup.color}
                                    contents={prefectureValues}
                                    onSelect={(value : Prefecture) => { doFilter(FilterType.PREFECTURE, value) }}
                                    style={{ fontFamily : 'SawarabiGothic,sans-serif', zIndex : 40 }}
                                    mapContentToDropdown={(content : Prefecture) => ( { key : content.en.toLowerCase(), label : content.jp, value : content } )}/>
                            </div>
                        </div>
                        <div className={styles.memberChooserContainer}>
                            <div className={styles.memberChooserContainerLabel} style={{ color : themeContainer.theme.foregroundColor }}>歳</div>
                            <div className={styles.memberChooserContainerForm}>
                                <Dropdown<SortOrder>
                                    icon
                                    width={150} color={selectedGroup.color}
                                    contents={SortOrders.toArray()}
                                    onSelect={(value : SortOrder) => { doSort(value, SortType.AGE_BY_DAYS) }}
                                    style={{ fontFamily : 'SawarabiGothic,sans-serif', zIndex : 35 }}
                                    mapContentToDropdown={(content : SortOrder) => ( { key : content.key, label : content.jp, value : content, iconComponent : content.icon } )}/>
                            </div>
                        </div>
                        <div className={styles.memberChooserContainer}>
                            <div className={styles.memberChooserContainerLabel} style={{ color : themeContainer.theme.foregroundColor }}>身長</div>
                            <div className={styles.memberChooserContainerForm}>
                                <Dropdown<SortOrder>
                                    icon
                                    width={150} color={selectedGroup.color}
                                    contents={SortOrders.toArray()}
                                    onSelect={(value : SortOrder) => { doSort(value, SortType.HEIGHT) }}
                                    style={{ fontFamily : 'SawarabiGothic,sans-serif', zIndex : 30 }}
                                    mapContentToDropdown={(content : SortOrder) => ( { key : content.key, label : content.jp, value : content, iconComponent : content.icon } )}/>
                            </div>
                        </div>
                        <div className={styles.memberChooserContainer}>
                            <div className={styles.memberChooserContainerLabel} style={{ color : themeContainer.theme.foregroundColor }}>身長</div>
                            <div className={styles.memberChooserContainerForm}>
                                <Dropdown<BloodType>
                                    all
                                    width={150} color={selectedGroup.color}
                                    contents={BLOOD_TYPES}
                                    onSelect={(value : BloodType) => { doFilter(FilterType.BLOOD_TYPE, value) }}
                                    style={{ fontFamily : 'SawarabiGothic,sans-serif', zIndex : 25 }}
                                    mapContentToDropdown={(content : BloodType) => ( { key : content.type, label : content.jp, value : content } )}/>
                            </div>
                        </div>
                        <div className={styles.memberChooserContainer}>
                            <div className={styles.memberChooserContainerLabel} style={{ color : themeContainer.theme.foregroundColor }}>期</div>
                            <div className={styles.memberChooserContainerForm}>
                                <GenerationSelection
                                    onGenerationSelect={(value : GenerationSelect) => { doFilter(FilterType.GENERATION, value) }}
                                ></GenerationSelection>
                            </div>
                        </div>
                    </aside>
                ) }
            </Motion>
        </>
    );
}