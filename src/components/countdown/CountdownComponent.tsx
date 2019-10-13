import React, { Component } from 'react'
import './CountdownComponent.scss'
import Util from '../../Util';
import moment from 'moment';
import Member from '../../models/Member';

interface CountdownState {
    formattedDate : string,
    week : number,
    day : number,
    hour:  number,
    minute : number, 
    second : number
}

export default class Countdown extends Component<Member, CountdownState> {
    loadInterval : any;

    constructor(props : Member) {
        super(props);

        this.state = {
            formattedDate : Util.formatYYYYMMDDToJapaneseFormat(props.birthdate),
            week : 0,
            day : 0,
            hour:  0,
            minute : 0, 
            second : 0
        }
    }

    componentDidMount() {
        let { birthdate } = this.props;
        var targetDate = moment.tz(birthdate, "YYYY-MM-DD", "Japan");
        targetDate.year(moment().tz("Asia/Tokyo").year());

        if (Util.checkIfCurrentDateIsBeforeBirthday(targetDate)) {
			targetDate.add(1, 'y')
		}

        this.loadInterval = setInterval(() => {
			var currentDate = moment().tz("Asia/Tokyo");
			var duration = moment.duration(targetDate.diff(currentDate)); 
			this.setState({
				week : Math.floor(duration.asDays() / 7),
				day : Math.floor(duration.asDays() % 7),
				hour:  duration.hours(),
				minute : duration.minutes(), 
				second : duration.seconds()
			});
		}, 1000);
    }
    
    render() {
        let { name, prefecture, kana, height, bloodType, photoPath } = this.props;
        let { formattedDate, week, day, hour, minute, second } = this.state;

        let style : React.CSSProperties = {
            backgroundImage: `url(${photoPath})`
        }

        return (
            <div className="countdown-container">
                <div className="profile">
                    <div className="photo" style={style}></div>
                    <div className="details">
                        <div className="name">{ name }</div>
                        <div className="kana">{ kana }</div>
                        <div className="other-details">
                            <div className="birthdate">
                                <div className="label">生年月日</div>
                                <div className="text">{formattedDate}</div>
                            </div>
                            <div className="prefecture">
                                <div className="label">出身地</div>
                                <div className="text">{prefecture}</div>
                            </div>
                            <div className="height">
                                <div className="label">身長</div>
                                <div className="text">{height}</div>
                            </div>
                            <div className="bloodType">
                                <div className="label">血液型</div>
                                <div className="text">{bloodType}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="countdown">

                </div>
                {/* <div className="countdown-name">{ name }</div>
                <div className="countdown-kana">{ kana }</div>
                 */}
            </div>
        );
    }

    componentWillMount() {
        clearInterval(this.loadInterval);
    }
}