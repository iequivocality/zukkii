import React, { useContext } from 'react';
import Group from '../../models/Group';
import Theme from '../../themes/variables';
import { Link } from 'react-router-dom';
import ThemeContext from '../../contexts/themeContext';
import styles from './GroupChoice.module.scss';

function getGroupStyle(group : Group, theme : Theme) {
    let groupStyle : React.CSSProperties = {
        backgroundColor: group.color,
        boxShadow: theme.birthdaySelectionDropShadow,
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/${group.id}/cover.jpg)`
    };
    return groupStyle
}

export interface GroupChoiceProps {
    group: Group,
    selectGroup: (group : Group) => void
}

export default function GroupChoice(props : GroupChoiceProps) {
    let { theme } = useContext(ThemeContext);
    let { group, selectGroup } = props;

    return (
        <Link style={getGroupStyle(group, theme)} className={styles.groupChoice} to={`/group/${group.id}`} 
            key={group.id} onClick={() => selectGroup(group)}>
            <div className={styles.hoverRect} style={{ backgroundColor: group.color }}>
                <div className={styles.groupTitle}>
                    {group.name}
                </div>
                <div className={styles.groupSubtitle}>
                    {group.en}
                </div>
            </div>
        </Link>
    );
}