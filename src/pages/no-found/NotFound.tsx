import React, { useContext } from "react";
import styles from './NotFound.module.scss'
import BackButton from "../../components/back-button/BackButton";
import ThemeContext from "../../contexts/themeContext";
import createPage from "../../hoc/createPage";
import Util from "../../Util";

function NotFoundComponent() {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={styles.notFoundContainer} style={{ color : theme.foregroundColor }}>
            <BackButton to="/" style={{ backgroundColor: Util.computeShade(theme.backgroundColor, 1), color : theme.foregroundColor }}></BackButton>
            <h1>NOT FOUND</h1>
            <h4>ページがみつかりません。(▰˘︹˘▰)</h4>
        </div>
    );
}

export default createPage(NotFoundComponent);