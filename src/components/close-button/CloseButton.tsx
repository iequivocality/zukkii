import React, { useMemo, useContext } from 'react';
import styles from './CloseButton.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import ThemeContext from '../../contexts/themeContext';

export interface CloseButtonProps {
    onClose : () => void
}

export default function CloseButton(props : CloseButtonProps) {
    let { onClose } = props;
    let { theme } = useContext(ThemeContext);

    return (
        useMemo(() => {
            return (
                <div className={styles.closeButton} onClick={() => onClose()}>
                    <IoIosCloseCircleOutline color={theme.foregroundColor}/>
                </div>
            )
        }, [onClose, theme.foregroundColor])
    );
}

