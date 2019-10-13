import moment from 'moment-timezone';

export default class Util {
    static formatYYYYMMDDToJapaneseFormat(date : string) {
        let momentDate = moment(date, "YYYY-MM-DD");
        // let currentTime = new Date();
        // momentDate.hour(currentTime.getHours());
        // momentDate.minute(currentTime.getMinutes());
        return momentDate.tz("Japan").format('YYYY年MM月DD日');
    }

    static checkIfCurrentDateIsBeforeBirthday(targetDate : moment.Moment) {
		var now = moment().tz("Asia/Tokyo");
        return targetDate.isBefore(now, 'day');
    }
    
    static computeShade(hex : string, lum : number) {

        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;
    
        let rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }
    
        return rgb;
    }
}