import React from 'react';
import Member from '../../models/Member';
import styles from './MemberCountdown.module.scss';
import Countdown from '../countdown/CountdownComponent';
import Group from '../../models/Group';
import { SpringGrid, makeResponsive } from 'react-stonecutter';

interface MemberCountdownProps {
    group : Group,
    members : Array<Member>
}

export default function MemberCountdown(props: MemberCountdownProps) {
    let { color, id } = props.group;
    let { members } = props;
    let Grid = makeResponsive(SpringGrid, { maxWidth : 1090 })

    return (
        <main className={members.length ? styles.groupContainer : styles.noMemberGroupContainer}>
            <Grid columns={3} columnWidth={350} gutterWidth={20} gutterHeight={20}
                springConfig={{ stiffness: 83, damping: 14 }} itemHeight={140}>
            {/* <Grid> */}
                { members.map( member => <div key={member.id}><Countdown member={member} groupColor={color} groupId={id}></Countdown></div>) }
            </Grid>
        </main>
    );
}