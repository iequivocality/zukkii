import SortObject from '../models/SortObject';
import FilterObject from '../models/FilterObject';
import Member from '../models/Member';
import AppState from '../store/state/AppState';
import { shallowEqual, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import FilterType from '../models/FilterType';
import Util from '../Util';

export default function useProcessedMembers(currentSort : SortObject, currentFilter : FilterObject) : Member[] {
    let members : Member[] = useSelector((state : AppState) => state.members, shallowEqual);
    let [ processedMembers, setProcessedMembers ] = useState<Member[]>([]);
    useEffect(() => {
        setProcessedMembers(members);
    }, [members]);

    useEffect(() => {
        setProcessedMembers(currentFilter.type !== FilterType.NONE ? [...members].filter((member : any) => {
            return member[currentFilter.type] === currentFilter.value
        }) : members)
    }, [currentFilter])

    useEffect(() => {
        setProcessedMembers(currentSort.order.key !== 'none' ? [...members].sort(Util.compareValues(currentSort.type, currentSort.order)) : members);
    }, [currentSort]);

    return processedMembers;
}