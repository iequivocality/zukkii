import React, { useMemo } from 'react';
import styles from './CloseButton.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export interface CloseButtonProps {
    onClose : () => void,
    color : string
}

export default function CloseButton(props : CloseButtonProps) {
    let { onClose, color } = props;

    return (
        useMemo(() => {
            return (
                <div className={styles.closeButton} onClick={() => onClose()}>
                    <IoIosCloseCircleOutline color={color}/>
                </div>
            )
        }, [onClose])
    );
}

