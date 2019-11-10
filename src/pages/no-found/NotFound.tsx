import React from "react";
import styles from './NotFound.module.scss'
import BackButton from "../../components/back-button/BackButton";

export default function NotFoundComponent() {
    return (
        <main className={styles.main}>
            <BackButton to="/"></BackButton>
            <h1>NOT FOUND</h1>
            <h4>ページがみつかりません。</h4>
        </main>
    );
}