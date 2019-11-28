import React, { useMemo } from 'react';
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
    let { color, id, name } = props.group;
    let { members } = props;
    let Grid = makeResponsive(SpringGrid, { maxWidth : 1100 });

    return (
        useMemo(() => {
            return <main className={members.length ? styles.groupContainer : styles.noMemberGroupContainer}>
                { members.length > 0 ? 
                <Grid
                    columns={3} columnWidth={350} gutterWidth={20} gutterHeight={20}
                    springConfig={{ stiffness: 140, damping: 18 }} itemHeight={150}>
                    { members.map( member => <div key={member.id}><Countdown member={member} groupColor={color} groupId={id}></Countdown></div>) }
                </Grid> : <div className={styles.noMemberText}>
                    {`ごめん。全然${name}のメンバーがみつかりません。`}
                </div> }
            </main>
        }, [members])
    );
}