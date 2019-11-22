import React, { CSSProperties, useContext } from "react";
import styles from "./AppHeader.module.scss";
import ThemeContext from "../../contexts/themeContext";

export interface AppHeaderProps {
    title : string,
    subtitle : string,
    style? : CSSProperties
}

export default function AppHeader(props : AppHeaderProps) {
    let { title, subtitle, style } = props;
    let { theme } = useContext(ThemeContext);

    return (
        <div className={styles.titleContainer} style={{color : theme.headerForeground, ...style}}>
            <h2>{title}</h2>
            <h4>{subtitle}</h4>
        </div>
    );
}