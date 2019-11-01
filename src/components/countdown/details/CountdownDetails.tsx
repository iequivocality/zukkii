import React from "react";
import Member from "../../../models/Member";
import Util from "../../../Util";

import styles from "./CountdownDetails.module.scss";

export default function CountdownDetails(props : Member) {
    let { name, prefecture, kana, height, bloodType, birthdate } = props;
    let formattedDate = Util.formatYYYYMMDDToJapaneseFormat(birthdate);
    let age = Util.getAgeFromBirthdate(birthdate);

    return (
        <div className={styles.details}>
            <div className={styles.name}>{ name }</div>
            <div className={styles.kana}>{ kana }</div>
            <div className={styles.otherDetails}>
                <div className={styles.birthdate}>
                    <div className={styles.label}>生年月日</div>
                    <div className={styles.text}>{formattedDate} ({age}歳)</div>
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
                    <div className={styles.text}>{bloodType}</div>
                </div>
            </div>
        </div>
    );
}
