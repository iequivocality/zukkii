import React, { useContext } from "react";
import styles from './NotFound.module.scss'
import BackButton from "../../components/back-button/BackButton";
import ThemeContext from "../../contexts/themeContext";
import createPage from "../../hoc/createPage";

function NotFoundComponent() {
    const themeContainer = useContext(ThemeContext);

    return (
        <div className={styles.notFoundContainer} style={{ color : themeContainer.theme.foregroundColor }}>
            <BackButton to="/"></BackButton>
            <h1>NOT FOUND</h1>
            <h4>ページがみつかりません。</h4>
        </div>
    );
}

export default createPage(NotFoundComponent);