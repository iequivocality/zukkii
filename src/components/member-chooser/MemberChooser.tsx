import React, { useCallback, useContext, useState } from 'react';
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

export interface MemberChooserState {
    prefecture : number,
    bloodType : number,
    generation : number,
    ageByDays : number,
    height : number
}

export default function MemberChooser(props : MemberChooserProps) {
    let { isOpen, onChoose, filter, sort } = props;
    let themeContainer = useContext(ThemeContext);
    let selectedGroup = useSelector((state : AppState) => state.selectedGroup);
    let members = useSelector((state : AppState) => state.members);
    let memberPrefectures = members.map(member => member.prefecture);
    let [ currentState, setCurrentState ] = useState<MemberChooserState>({
        prefecture : 0,
        bloodType : 0,
        generation : 0,
        ageByDays : 0,
        height : 0
    });
    let prefectureValues = PREFECTURES.filter(prefecture => {
        return memberPrefectures.findIndex(mPre => mPre === prefecture.jp) > -1;
    })
    let doFilter = useCallback((filterType : FilterType, value : any, index? : number) => {
        if (filterType === FilterType.PREFECTURE) {
            setCurrentState({
                prefecture : index,
                bloodType : 0,
                generation : 0,
                ageByDays : 0,
                height : 0
            });
            filter(value !== null ? { type : filterType, value : (value as Prefecture).jp } : Constants.ALL_FILTER);
        }
        else if (filterType === FilterType.BLOOD_TYPE) {
            filter(value !== null ? { type : filterType, value : (value as BloodType).type } : Constants.ALL_FILTER);
            setCurrentState({
                prefecture : 0,
                bloodType : index,
                generation : 0,
                ageByDays : 0,
                height : 0
            });
        }
        else if (filterType === FilterType.GENERATION) {
            filter(value && (value as GenerationSelect).value !== 0 ? { type : filterType, value : (value as GenerationSelect).value } : Constants.ALL_FILTER);
            setCurrentState({
                prefecture : 0,
                bloodType : 0,
                generation : index,
                ageByDays : 0,
                height : 0
            });
        }

        onChoose();
    }, []);

    let doSort = useCallback((order : SortOrder, type : SortType, index : number) => {
        if (type === SortType.HEIGHT) {
            setCurrentState({
                prefecture : 0,
                bloodType : 0,
                generation : 0,
                ageByDays : 0,
                height : index
            });
        }
        else if (type === SortType.AGE_BY_DAYS) {
            setCurrentState({
                prefecture : 0,
                bloodType : 0,
                generation : 0,
                ageByDays : index,
                height : 0
            });
        }
        sort({ type, order });
        onChoose();
    }, []);

    return (
        <div className={styles.memberChooserContainer}>
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
                        <div className={styles.memberChooserFieldContainer}>
                            <div style={{ color : themeContainer.theme.foregroundColor }}>フィルターたら類い<br/>選んでください</div>
                            <CloseButton onClose={() => { onChoose() }}></CloseButton>
                        </div>
                        <div className={styles.memberChooserFieldContainer}>
                            <div className={styles.memberChooserContainerLabel} style={{ color : themeContainer.theme.foregroundColor }}>都道府県</div>
                            <div className={styles.memberChooserContainerForm}>
                                <Dropdown<Prefecture>
                                    selectedValue={currentState.prefecture}
                                    all width={150} color={selectedGroup.color}
                                    contents={prefectureValues}
                                    onSelect={(value : Prefecture, index : number) => { doFilter(FilterType.PREFECTURE, value, index) }}
                                    style={{ fontFamily : 'SawarabiGothic,sans-serif', zIndex : 40 }}
                                    mapContentToDropdown={(content : Prefecture, index: number) => ( { index, key : content.en.toLowerCase(), label : content.jp, value : content } )}/>
                            </div>
                        </div>
                        <div className={styles.memberChooserFieldContainer}>
                            <div className={styles.memberChooserContainerLabel} style={{ color : themeContainer.theme.foregroundColor }}>歳</div>
                            <div className={styles.memberChooserContainerForm}>
                                <Dropdown<SortOrder>
                                    icon selectedValue={currentState.ageByDays}
                                    width={150} color={selectedGroup.color}
                                    contents={SortOrders.toArray()}
                                    onSelect={(value : SortOrder, index : number) => { doSort(value, SortType.AGE_BY_DAYS, index) }}
                                    style={{ fontFamily : 'SawarabiGothic,sans-serif', zIndex : 35 }}
                                    mapContentToDropdown={(content : SortOrder, index : number) => ( { index, key : content.key, label : content.jp, value : content, iconComponent : content.icon } )}/>
                            </div>
                        </div>
                        <div className={styles.memberChooserFieldContainer}>
                            <div className={styles.memberChooserContainerLabel} style={{ color : themeContainer.theme.foregroundColor }}>身長</div>
                            <div className={styles.memberChooserContainerForm}>
                                <Dropdown<SortOrder>
                                    icon selectedValue={currentState.height}
                                    width={150} color={selectedGroup.color}
                                    contents={SortOrders.toArray()}
                                    onSelect={(value : SortOrder, index : number) => { doSort(value, SortType.HEIGHT, index) }}
                                    style={{ fontFamily : 'SawarabiGothic,sans-serif', zIndex : 30 }}
                                    mapContentToDropdown={(content : SortOrder, index : number) => ( { index, key : content.key, label : content.jp, value : content, iconComponent : content.icon } )}/>
                            </div>
                        </div>
                        <div className={styles.memberChooserFieldContainer}>
                            <div className={styles.memberChooserContainerLabel} style={{ color : themeContainer.theme.foregroundColor }}>身長</div>
                            <div className={styles.memberChooserContainerForm}>
                                <Dropdown<BloodType>
                                    all
                                    selectedValue={currentState.bloodType}
                                    width={150} color={selectedGroup.color}
                                    contents={BLOOD_TYPES}
                                    onSelect={(value : BloodType, index : number) => { doFilter(FilterType.BLOOD_TYPE, value, index) }}
                                    style={{ fontFamily : 'SawarabiGothic,sans-serif', zIndex : 25 }}
                                    mapContentToDropdown={(content : BloodType, index : number) => ( { index, key : content.type, label : content.jp, value : content } )}/>
                            </div>
                        </div>
                        <div className={styles.memberChooserFieldContainer}>
                            <div className={styles.memberChooserContainerLabel} style={{ color : themeContainer.theme.foregroundColor }}>期</div>
                            <div className={styles.memberChooserContainerForm}>
                                <GenerationSelection
                                    selectedValue={currentState.generation}
                                    onGenerationSelect={(value : GenerationSelect, index : number) => { doFilter(FilterType.GENERATION, value, index) }}
                                ></GenerationSelection>
                            </div>
                        </div>
                    </aside>
                ) }
            </Motion>
        </div>
    );
}