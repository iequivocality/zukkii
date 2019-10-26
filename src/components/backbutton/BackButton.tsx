import React from 'react';
import { LinkProps, Link } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default class BackButton extends React.Component<LinkProps> {
    render() {
        return (
            <Link {...this.props} className={styles.backButton}><IoIosArrowRoundBack/>Back</Link>
        );
    }
}