import React, { useMemo, useContext } from "react";
import Member from "../../../models/Member";
import Util from "../../../Util";

import styles from "./CountdownDetails.module.scss";
import ThemeContext from "../../../contexts/themeContext";

export interface CountdownDetailsProps {
    member : Member,
    groupColor : string
}

export default function CountdownDetails(props : CountdownDetailsProps) {
    let { theme } = useContext(ThemeContext);
    let { name, prefecture, kana, height, bloodType, birthdate, ageByYears } = props.member;
    let formattedDate = Util.formatYYYYMMDDToJapaneseFormat(birthdate);
    let detailStyle : React.CSSProperties = {
        color : theme.countdownDetailsForeground(props.groupColor)
    }

    return (
        useMemo(() => {
            return <div className={styles.details} style={detailStyle}>
                <div className={styles.name}>{ name }</div>
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
        }, [name, prefecture, kana, height, bloodType, birthdate, ageByYears, detailStyle, formattedDate])
    );
}
