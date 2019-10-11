import React, { Component } from 'react'
import './Countdown.scss'
import Util from '../../Util';

interface CountdownProps {
    name: string,
    birthdate: string
}

interface CountdownState {
    formattedDate : string
}

export default class Countdown extends Component<CountdownProps, CountdownState> {
    constructor(props : CountdownProps) {
        super(props);

        this.state = {
            formattedDate : Util.formatYYYYMMDDToJapaneseFormat(props.birthdate)
        }
    }
    
    render() {
        let { name } = this.props;
        let { formattedDate } = this.state

        return (
            <div className="countdown-container">
                <div className="countdown-name">{ name }</div>
                <div className="countdown-birthdate">{ formattedDate }</div>
            </div>
        );
    }
}