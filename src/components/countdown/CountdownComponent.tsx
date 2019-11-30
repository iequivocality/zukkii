import React, { useState, useContext, useRef } from 'react'
import styles from './CountdownComponent.module.scss'
import Util from '../../Util';
import moment from 'moment';
import Member from '../../models/Member';
import CountdownDetails from './details/CountdownDetails';
import CountdownUnitComponent from './units/CountdownUnitComponent';
import { Constants } from '../../Constants';
import useInterval from '../../hooks/useInterval';
import ThemeContext from '../../contexts/themeContext';
import useHover from '../../hooks/useHover';
import useOnScreen from '../../hooks/useOnScreen';
import BalloonGroup from '../balloon-group/BalloonGroup';

interface CountdownProps {
    member : Member,
    groupId : string,
    groupColor : string,
}

export default function Countdown(props : CountdownProps) {
    let { theme } = useContext(ThemeContext);
    let [ week, setWeek ] = useState(0);
    let [ day, setDay ] = useState(0);
    let [ hour, setHour ] = useState(0);
    let [ minute, setMinute ] = useState(0);
    let [ second, setSecond ] = useState(0);
    let [ ref, isHover ] = useHover<HTMLDivElement>();
    let isOnScreen = useOnScreen(ref, '5px');

    let { groupColor, groupId, member } = props;

    let photoStyle : React.CSSProperties = {
        backgroundColor : groupColor,
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/${groupId}/${member.id}.jpg)`
    }

    let countdownStyle : React.CSSProperties = {
        backgroundColor : isHover ? theme.countdownContainerHoverBackground(theme.countdownContainerBackground(groupColor)) : theme.countdownContainerBackground(groupColor),
        color : theme.countdownContainerForeground(groupColor),
        boxShadow : theme.countdownContainerDropShadow
    }

    let { birthdate } = props.member;
    let targetDate = moment.tz(birthdate, "YYYY-MM-DD", "Japan");
    targetDate.year(moment().tz("Asia/Tokyo").year());

    if (Util.checkIfCurrentDateIsBeforeBirthday(targetDate)) {
        targetDate.add(1, 'y')
    }

    useInterval(() => {
        if (isOnScreen) {
            if (!Util.checkIsBirthday(targetDate)) {
                let currentDate = moment().tz("Asia/Tokyo");
                let duration = moment.duration(targetDate.diff(currentDate)); 
                let asDays = duration.asDays();
                setWeek(Math.floor(asDays / 7));
                setDay(Math.floor(asDays % 7));
                setHour(duration.hours());
                setMinute(duration.minutes());
                setSecond(duration.seconds());
            }
        }
    }, 1000);

    return (<div className={styles.countdownContainer} style={countdownStyle} ref={ref}>
        {Util.checkIsBirthday(targetDate) && <BalloonGroup parentElement={ref}></BalloonGroup>}
        <div className={styles.profile}>
            <div className={styles.photoContainer}>
                <div className={styles.photo} style={photoStyle}></div>
            </div>
            <CountdownDetails member={member} groupColor={groupColor}></CountdownDetails>
        </div>
        {
            <div className={styles.countdown}>
                <CountdownUnitComponent value={week} unit="週" maxValue={Constants.MAX_WEEKS} color={groupColor}></CountdownUnitComponent>
                <CountdownUnitComponent value={day} unit="日" maxValue={Constants.MAX_DAYS} color={groupColor}></CountdownUnitComponent>
                <CountdownUnitComponent value={hour} unit="時" maxValue={Constants.MAX_HOURS} color={groupColor}></CountdownUnitComponent>
                <CountdownUnitComponent value={minute} unit="分" maxValue={Constants.MAX_MINUTES} color={groupColor}></CountdownUnitComponent>
                <CountdownUnitComponent value={second} unit="秒" maxValue={Constants.MAX_SECONDS} color={groupColor}></CountdownUnitComponent>
            </div>
        }
    </div>)
}