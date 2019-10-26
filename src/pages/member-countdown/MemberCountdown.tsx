import React from 'react';
import Member from '../../models/Member';
import styles from './MemberCountdown.module.scss';
import Countdown from '../../components/countdown/CountdownComponent';
import Group from '../../models/Group';

interface MemberCountdownProps {
    group : Group,
    members : Array<Member>
}

export default class MemberCountdown extends React.Component<MemberCountdownProps> {
    render() {
        let { color, id } = this.props.group;
        let { members } = this.props;

        return (
            <main className={styles.groupContainer}>
                { members.map( member => <Countdown key={member.id} member={member} groupColor={color} groupId={id}></Countdown>) }
            </main>
        );
    }
}