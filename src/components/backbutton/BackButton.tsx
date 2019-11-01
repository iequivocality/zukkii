import React from 'react';
import { LinkProps, Link } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function BackButton(props : LinkProps) {
    return (
        <Link {...props} className={styles.backButton}><IoIosArrowRoundBack/>Back</Link>
    );
}