import moment from 'moment-timezone';

export default class Util {
    static formatYYYYMMDDToJapaneseFormat(date : string) {
        let momentDate = moment(date, "YYYY-MM-DD");
        let currentTime = new Date();
        momentDate.hour(currentTime.getHours());
        momentDate.minute(currentTime.getMinutes())
        return momentDate.tz("Japan").format('YYYY年MM月DD日 hh mm');
    }
}