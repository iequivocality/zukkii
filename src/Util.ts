import moment from 'moment-timezone';
import { SortOrder, SortOrders } from './models/SortType';

export default class Util {
    static formatYYYYMMDDToJapaneseFormat(date : string) {
        let momentDate = moment(date, "YYYY-MM-DD");
        return momentDate.tz("Japan").format('YYYY年MM月DD日');
    }

    static checkIfCurrentDateIsBeforeBirthday(targetDate : moment.Moment) {
		let now = moment().tz("Japan");
        return targetDate.isBefore(now, 'day');
    }

    static checkIsBirthday(targetDate : moment.Moment) {
        let now = moment().tz("Japan");
        return targetDate.isSame(now, 'day');
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

    static convertObjectToArray<O>(object : Object) : Array<O> {
        return Object.keys(object).map<O>(key => object[key])
    }

    static getAgeFromBirthdate(birthdate : string) : number {
        let birthdateMoment = moment(birthdate, "YYYY-MM-DD").tz("Japan");
        let currentMoment = moment().tz("Japan");
        return currentMoment.diff(birthdateMoment, 'years');
    }

    static isNotNullAndNotUndefined(object : Object) {
        return object !== undefined && object !== null;
    }

    static compareValues<T = any>(key : string, order : SortOrder) {
        console.log('KEY:', key)
        return (a : T, b : T) => {
            if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }
            let varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
            let varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

            let comparison : number = 0;
            if (varA > varB) {
                comparison = 1;
            }
            else if (varA < varB) {
                comparison = -1;
            }
            return order.key === SortOrders.DESCENDING.key ? comparison * -1 : comparison;
        }
    } 
}