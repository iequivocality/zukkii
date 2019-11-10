import React from 'react';
import Member from '../../models/Member';
import styles from './MemberCountdown.module.scss';
import Countdown from '../countdown/CountdownComponent';
import Group from '../../models/Group';

interface MemberCountdownProps {
    group : Group,
    members : Array<Member>
}

export default function MemberCountdown(props: MemberCountdownProps) {
    let { color, id } = props.group;
    let { members } = props;

    return (
        <main className={members.length ? styles.groupContainer : styles.noMemberGroupContainer}>
            { members.map( member => <Countdown key={member.id} member={member} groupColor={color} groupId={id}></Countdown>) }
        </main>
    );
}