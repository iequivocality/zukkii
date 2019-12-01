import React, { useMemo, useContext } from 'react';
import Member from '../../models/Member';
import styles from './MemberCountdown.module.scss';
import Countdown from '../countdown/CountdownComponent';
import Group from '../../models/Group';
import { SpringGrid, makeResponsive } from 'react-stonecutter';
import ThemeContext from '../../contexts/themeContext';

interface MemberCountdownProps {
    group : Group,
    members : Array<Member>
}

export default function MemberCountdown(props: MemberCountdownProps) {
    let { theme } = useContext(ThemeContext);
    let { color, id, name } = props.group;
    let { members } = props;
    let Grid = makeResponsive(SpringGrid, { maxWidth : 1100 });

    return members.length > 0 ? (
        <main className={styles.groupContainer}>
            <Grid
                columns={3} columnWidth={350} gutterWidth={20} gutterHeight={20}
                springConfig={{ stiffness: 140, damping: 18 }} itemHeight={150}>
                { members.map( member => <div key={member.id}><Countdown member={member} groupColor={color} groupId={id}></Countdown></div>) }
            </Grid> 
        </main>
    ) : (
        <main className={styles.noMemberGroupContainer}>
            <div className={styles.noMemberText} style={{ color : theme.noMemberTextColor(color) }}>
                {`ごめん。全然${name}のメンバーがみつかりません。`}
            </div>
        </main>
    )
}