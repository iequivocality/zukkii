import React, { useContext } from 'react';
import Group from '../../models/Group';
import Theme from '../../themes/variables';
import { Link } from 'react-router-dom';
import ThemeContext from '../../contexts/themeContext';
import styles from './GroupChoice.module.scss';
import useHover from '../../hooks/useHover';
import { Motion, spring, SpringHelperConfig } from 'react-motion';

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
    let [ ref, hovered ] = useHover();
    let config : SpringHelperConfig = {
        stiffness : 200,
        damping: 10
    }

    return (
        <Link ref={ref} style={getGroupStyle(group, theme)} className={styles.groupChoice} to={`/group/${group.id}`} 
            key={group.id} onClick={() => selectGroup(group)}>
            <Motion defaultStyle={{ scale : 0 }} style={{ scale : hovered ? spring(1, config) : spring(0, config) }}>
                {interpolatingStyles => (<div className={styles.hoverRect} style={{ backgroundColor: group.color, transform: `scale3d(${interpolatingStyles.scale}, ${interpolatingStyles.scale}, ${interpolatingStyles.scale})` }}>
                <div className={styles.groupTitle}>
                    {group.name}
                </div>
                <div className={styles.groupSubtitle}>
                    {group.en}
                </div>
            </div>)}
            </Motion>
        </Link>
    );
}