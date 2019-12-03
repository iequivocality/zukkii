import React, { ReactChild, useContext, useEffect } from 'react';
import ThemeContext from '../../contexts/themeContext';
import './AppContainer.scss';

export interface AppContainerProps {
    children : Array<ReactChild> | ReactChild
}

export default function AppContainer(props : AppContainerProps) {
    let themeContainer = useContext(ThemeContext);
    let { children } = props;

    useEffect(() => {
        document.body.style.backgroundColor = themeContainer.theme.backgroundColor;
    }, [themeContainer])

    return (
        <div className="app-container">
            { children }
        </div>
    );
}