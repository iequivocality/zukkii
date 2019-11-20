import SortObject from '../models/SortObject';
import FilterObject from '../models/FilterObject';
import Member from '../models/Member';
import AppState from '../store/state/AppState';
import { shallowEqual, useSelector } from 'react-redux';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import FilterType from '../models/FilterType';
import Util from '../Util';
import { Constants } from '../Constants';

export default function useProcessedMembers() : [Member[], Dispatch<SetStateAction<SortObject>>, Dispatch<SetStateAction<FilterObject>>] {
    let members : Member[] = useSelector((state : AppState) => state.members, shallowEqual);
    let [ currentSort, setCurrentSort ] = useState<SortObject>(Constants.NONE_SORT);
    let [ currentFilter, setCurrentFilter ] = useState<FilterObject>(Constants.ALL_FILTER);
    let [ processedMembers, setProcessedMembers ] = useState<Member[]>([]);
    useEffect(() => {
        setProcessedMembers(members);
    }, [members]);

    useEffect(() => {
        setProcessedMembers(currentFilter.type !== FilterType.NONE ? [...members].filter((member : any) => {
            return member[currentFilter.type] === currentFilter.value
        }) : members)
    }, [members, currentFilter])

    useEffect(() => {
        setProcessedMembers(currentSort.order.key !== 'none' ? [...members].sort(Util.compareValues(currentSort.type, currentSort.order)) : members);
    }, [members, currentSort]);

    return [processedMembers, setCurrentSort, setCurrentFilter];
}