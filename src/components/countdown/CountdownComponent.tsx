import React, { Component } from 'react'
import styles from './CountdownComponent.module.scss'
import Util from '../../Util';
import moment from 'moment';
import Member from '../../models/Member';
import CountdownDetails from './details/CountdownDetails';
import CountdownUnitComponent from './units/CountdownUnitComponent';
import { Constants } from '../../Constants';

interface CountdownState {
    week : number,
    day : number,
    hour:  number,
    minute : number, 
    second : number
}

interface CountdownProps {
    member : Member,
    groupId : number,
    groupColor : string,
}

export default class Countdown extends Component<CountdownProps, CountdownState> {
    loadInterval : any;

    constructor(props : CountdownProps) {
        super(props);

        this.state = {
            week : 0,
            day : 0,
            hour:  0,
            minute : 0, 
            second : 0
        }
    }

    componentDidMount() {
        let { birthdate } = this.props.member;
        let targetDate = moment.tz(birthdate, "YYYY-MM-DD", "Japan");
        targetDate.year(moment().tz("Asia/Tokyo").year());

        if (Util.checkIfCurrentDateIsBeforeBirthday(targetDate)) {
			targetDate.add(1, 'y')
		}

        this.loadInterval = setInterval(() => {
			let currentDate = moment().tz("Asia/Tokyo");
            let duration = moment.duration(targetDate.diff(currentDate)); 
            let asDays = duration.asDays();
			this.setState({
				week : Math.floor(asDays / 7),
				day : Math.floor(asDays % 7),
				hour:  duration.hours(),
				minute : duration.minutes(),
				second : duration.seconds()
			});
		}, 1000);
    }
    
    render() {
        let { week, day, hour, minute, second } = this.state;
        let { groupColor, groupId, member } = this.props;

        let photoStyle : React.CSSProperties = {
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/${groupId}/${member.id}.jpg)`
        }

        let countdownStyle : React.CSSProperties = {
            backgroundColor : groupColor
        }

        return (
            <div className={styles.countdownContainer} style={countdownStyle}>
                <div className={styles.profile}>
                    <div className={styles.photoContainer}>
                        <div className={styles.photo} style={photoStyle}></div>
                    </div>
                    <CountdownDetails {...this.props.member}></CountdownDetails>
                </div>
                <div className={styles.countdown}>
                    <CountdownUnitComponent value={week} unit="週" maxValue={Constants.MAX_WEEKS} color={groupColor}></CountdownUnitComponent>
                    <CountdownUnitComponent value={day} unit="日" maxValue={Constants.MAX_DAYS} color={groupColor}></CountdownUnitComponent>
                    <CountdownUnitComponent value={hour} unit="時" maxValue={Constants.MAX_HOURS} color={groupColor}></CountdownUnitComponent>
                    <CountdownUnitComponent value={minute} unit="分" maxValue={Constants.MAX_MINUTES} color={groupColor}></CountdownUnitComponent>
                    <CountdownUnitComponent value={second} unit="秒" maxValue={Constants.MAX_SECONDS} color={groupColor}></CountdownUnitComponent>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        clearInterval(this.loadInterval);
    }
}