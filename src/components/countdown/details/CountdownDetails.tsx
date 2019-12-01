import React, { useContext } from "react";
import Member from "../../../models/Member";
import Util from "../../../Util";

import styles from "./CountdownDetails.module.scss";
import ThemeContext from "../../../contexts/themeContext";
import { IoIosLink } from "react-icons/io";
import Badge from "../../badge/Badge";

export interface CountdownDetailsProps {
    member : Member,
    groupColor : string
}

export default function CountdownDetails(props : CountdownDetailsProps) {
    let { theme } = useContext(ThemeContext);
    let { name, prefecture, kana, height, bloodType, birthdate, ageByYears, blog, generation } = props.member;
    let formattedDate = Util.formatYYYYMMDDToJapaneseFormat(birthdate);
    let detailStyle : React.CSSProperties = {
        color : theme.countdownDetailsForeground(props.groupColor)
    }

    return (
        <div className={styles.details} style={detailStyle}>
            <div className={styles.name}>
                { name }
                <div className={styles.links}>
                    {/* <div style={{ fontSize : '10px', height : '100%' }}>{generation}期生</div> */}
                    <Badge style={{ backgroundColor : theme.countdownBadgeBackground(props.groupColor), color : theme.countdownBadgeForeground(props.groupColor) }}>{generation}期生</Badge>
                    <a href={blog} target="_blank" rel="noopener noreferrer">
                        <IoIosLink></IoIosLink>
                    </a>
                </div>
            </div>
            <div className={styles.kana}>{ kana }</div>
            <div className={styles.otherDetails}>
                <div className={styles.birthdate}>
                    <div className={styles.label}>生年月日</div>
                    <div className={styles.text}>{formattedDate} ({ageByYears}歳)</div>
                </div>
                <div className={styles.prefecture}>
                    <div className={styles.label}>出身地</div>
                    <div className={styles.text}>{prefecture}</div>
                </div>
                <div className={styles.height}>
                    <div className={styles.label}>身長</div>
                    <div className={styles.text}>{height}cm</div>
                </div>
                <div className={styles.bloodType}>
                    <div className={styles.label}>血液型</div>
                    <div className={styles.text}>{bloodType}型</div>
                </div>
            </div>
        </div>
    );
}
