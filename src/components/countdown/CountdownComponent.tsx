import React, { Component } from 'react'
import styles from './CountdownComponent.module.scss'
import Util from '../../Util';
import moment from 'moment';
import Member from '../../models/Member';
import Group from '../../models/Group';
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
    group : Group 
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
        let { group, member } = this.props;

        let photoStyle : React.CSSProperties = {
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/${group.id}/${member.id}.jpg)`
        }

        let countdownStyle : React.CSSProperties = {
            backgroundColor : this.props.group.color
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
                    <CountdownUnitComponent value={week} unit="週" maxValue={Constants.MAX_WEEKS} color={group.color}></CountdownUnitComponent>
                    <CountdownUnitComponent value={day} unit="日" maxValue={Constants.MAX_DAYS} color={group.color}></CountdownUnitComponent>
                    <CountdownUnitComponent value={hour} unit="時" maxValue={Constants.MAX_HOURS} color={group.color}></CountdownUnitComponent>
                    <CountdownUnitComponent value={minute} unit="分" maxValue={Constants.MAX_MINUTES} color={group.color}></CountdownUnitComponent>
                    <CountdownUnitComponent value={second} unit="秒" maxValue={Constants.MAX_SECONDS} color={group.color}></CountdownUnitComponent>
                </div>
            </div>
        );
    }

    componentWillMount() {
        clearInterval(this.loadInterval);
    }
}