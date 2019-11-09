import React from 'react';
import { ReactNode } from "react";
import { IoIosArrowRoundUp, IoIosArrowRoundDown, IoIosRemove, IoIosRemoveCircleOutline, IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from 'react-icons/io';

export default class SortOrders {
    static NONE : SortOrder = { key : 'none', jp : '無い', en : 'NONE', icon : (<IoIosRemoveCircleOutline/>) };
    static ASCENDING : SortOrder = { key : 'asc', jp : '昇順', en : 'ASC', icon : (<IoIosArrowDropupCircle/>) };
    static DESCENDING : SortOrder = { key : 'desc', jp : '降順', en : 'DESC', icon : (<IoIosArrowDropdownCircle/>) };

    static toArray() : SortOrder[] {
        return [ SortOrders.NONE, SortOrders.ASCENDING, SortOrders.DESCENDING];
    }
}

export interface SortOrder {
    key : 'none' | 'asc' | 'desc',
    jp : string,
    en : string,
    icon : ReactNode
}