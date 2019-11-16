import moment from 'moment-timezone';
import { Age } from './models/Age';
import SortOrders, { SortOrder } from './models/SortOrder';

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

    static clampToColorLimits(color : number) : number {
        // return Math.round(Math.min(Math.max(0, color), 255))
        return Util.clampToLimits(color, 0, 255);
    }

    static clampToLimits(color : number, min : number, max : number) : number {
        return Math.round(Math.min(Math.max(min, color), max))
    }

    static addTransparency(hex : string, alpha : number) {
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        alpha = alpha || 1;

        let red = parseInt(hex.substr(0,2), 16);
        let green = parseInt(hex.substr(2,2), 16);
        let blue = parseInt(hex.substr(4,2), 16);

        return `rgb(${red}, ${green}, ${blue}, ${alpha})`
    }

    static desaturateColor(hex : string, percent : number) {
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        percent = percent || 0;

        let rgb = "#", red : number, green : number, blue : number;
        red = parseInt(hex.substr(0,2), 16);
        green = parseInt(hex.substr(2,2), 16);
        blue = parseInt(hex.substr(4,2), 16);

        let L = 0.3*red + 0.6*green + 0.1*blue;
        let new_r = Util.clampToColorLimits(red + percent * (L - red)).toString(16);
        let new_g = Util.clampToColorLimits(green + percent * (L - green)).toString(16);
        let new_b = Util.clampToColorLimits(blue + percent * (L - blue)).toString(16);
        return rgb
            + ("00" + new_r).substr(new_r.length)
            + ("00"+new_g).substr(new_g.length)
            + ("00"+new_b).substr(new_b.length);
    }
    
    static computeShade(hex : string, lum : number) {
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;
    
        let rgb = "#", c : any, i : number;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Util.clampToColorLimits(c + (c * lum)).toString(16);
            rgb += ("00"+c).substr(c.length);
            console.log(rgb);
        }
    
        return rgb;
    }

    static convertObjectToArray<O>(object : Object) : Array<O> {
        return Object.keys(object).map<O>(key => object[key])
    }

    static getAgeFromBirthdate(birthdate : string) : Age {
        let birthdateMoment = moment(birthdate, "YYYY-MM-DD").tz("Japan");
        let currentMoment = moment().tz("Japan");
        return {
            years : currentMoment.diff(birthdateMoment, 'years'),
            days : currentMoment.diff(birthdateMoment, 'days')
        };
    }

    static isNotNullAndNotUndefined(object : Object) {
        return object !== undefined && object !== null;
    }

    static compareValues<T = any>(key : string, order : SortOrder) {
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

    static createShadowProperties(dp : number) {
        if (dp <= 0)
        {
            return "none";
        }
    
        return "0px " + dp + "px " + dp + "px " + "rgba(0, 0, 0, .38)";
    }
}