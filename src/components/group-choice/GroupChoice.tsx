import React, { useContext, useState } from 'react';
import Group from '../../models/Group';
import Theme from '../../themes/variables';
import { Link } from 'react-router-dom';
import ThemeContext from '../../contexts/themeContext';
import styles from './GroupChoice.module.scss';
import useHover from '../../hooks/useHover';
import { Motion, spring, SpringHelperConfig, PlainStyle } from 'react-motion';
import OrbitingObjects from '../svg/OrbitingObjects';

function getGroupStyle(group : Group, theme : Theme) {
    let groupStyle : React.CSSProperties = {
        backgroundColor: group.color,
        boxShadow: theme.birthdaySelectionDropShadow,
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/${group.id}/cover.jpg)`
    };
    return groupStyle
}

function scale(scale : number) {
    return `scale3d(${scale}, ${scale}, ${scale})`;
}

function hoverBackgroundStyle(group : Group, interpolatingStyles : PlainStyle) {
    return {
        backgroundColor: group.color,
        transform: scale(interpolatingStyles.scale) }
}

function hoverTextStyle(interpolatingStyles : PlainStyle) {
    return {
        transform: scale(interpolatingStyles.scale), opacity : interpolatingStyles.opacity }
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
        stiffness : 140,
        damping: 14,
        precision: 0.5
    }

    let [showText, setShowText] = useState(false);

    return (
        <Link ref={ref} style={getGroupStyle(group, theme)} className={styles.groupChoice} to={`/group/${group.id}`} 
            key={group.id} onClick={() => selectGroup(group)}>
            <Motion defaultStyle={{ scale : 0 }} style={{ scale : hovered ? spring(1.01, config) : spring(0) }} onRest={() => {
                setShowText(hovered);
            }}>
                {interpolatingStyles => (
                <div className={styles.hoverRect} style={hoverBackgroundStyle(group, interpolatingStyles)}>
                </div>)}
            </Motion>
            <Motion defaultStyle={{ scale : 4, opacity : 0 }}
                    style={{ scale : hovered && showText ? spring(1, { damping : 10 }) : spring(4), opacity : hovered && showText ? spring(1) : spring(0) }}>
                {textInterpolatingStyles => (
                    <div className={styles.hoverText} style={hoverTextStyle(textInterpolatingStyles)}>
                        <div className={styles.groupTitle}>
                            {group.name}
                        </div>
                        <div className={styles.groupSubtitle}>
                            {group.en}
                        </div>
                    </div>
                )}
            </Motion>
            <Motion defaultStyle={{ right : -100 }}
                    style={{ right : hovered && showText ? spring(-35) : spring(-100) }}>
                {interpolatingStyles => (
                    <OrbitingObjects style={{ right : `${interpolatingStyles.right}%` }} className={styles.orbiting} numberOfCircles={25} color="#FFF" distance={60} radius={2}></OrbitingObjects>
                )}
            </Motion>
        </Link>
    );
}