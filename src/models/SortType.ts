
export class SortOrders {
    static NONE : SortOrder = { key : 'none', jp : '無い', en : 'NONE' };
    static ASCENDING : SortOrder = { key : 'asc', jp : '昇順', en : 'ASC' };
    static DESCENDING : SortOrder = { key : 'desc', jp : '降順', en : 'DESC' };

    static toArray() : SortOrder[] {
        return [ SortOrders.NONE, SortOrders.ASCENDING, SortOrders.DESCENDING];
    }
}

export interface SortOrder {
    key : 'none' | 'asc' | 'desc',
    jp : string,
    en : string
}

enum SortType {
    AGE = 'age',
    HEIGHT = 'height',
    NONE = 'none'
}

export default SortType;