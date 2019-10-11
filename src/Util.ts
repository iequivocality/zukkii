import moment from 'moment-timezone';

export default class Util {
    static formatYYYYMMDDToJapaneseFormat(date : string) {
        let momentDate = moment(date, "YYYY-MM-DD").tz("Japan");
        console.log(moment.tz.names())
        return momentDate.format('YYYY年MM月DD日');
    }
}