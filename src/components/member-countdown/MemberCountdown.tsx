import React from 'react';
import Member from '../../models/Member';
import styles from './MemberCountdown.module.scss';
import Countdown from '../countdown/CountdownComponent';
import Group from '../../models/Group';
import { SpringGrid } from 'react-stonecutter';

interface MemberCountdownProps {
    group : Group,
    members : Array<Member>
}

export default function MemberCountdown(props: MemberCountdownProps) {
    let { color, id } = props.group;
    let { members } = props;

    return (
        <main className={members.length ? styles.groupContainer : styles.noMemberGroupContainer}>
            <SpringGrid columns={3} columnWidth={350} gutterWidth={20} gutterHeight={20}
                springConfig={{ stiffness: 110, damping: 26 }} itemHeight={140}>
                { members.map( member => <div key={member.id}><Countdown member={member} groupColor={color} groupId={id}></Countdown></div>) }
            </SpringGrid>
        </main>
    );
}