import React from "react";
import Member from "../../../models/Member";
import Util from "../../../Util";

import "./CountdownDetails.scss";

export default class CountdownDetails extends React.Component<Member>{
    render() {
        let { name, prefecture, kana, height, bloodType, birthdate } = this.props;
        let formattedDate = Util.formatYYYYMMDDToJapaneseFormat(birthdate);

        return (
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
        );
    }
}
