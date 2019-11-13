declare module 'react-stonecutter' {
    import React, { CSSProperties, ReactElement, Component, ComponentClass, ReactChild } from 'react';

    export interface GridCommonProps {
        columns: number,
        columnWidth: number,
        gutterWidth?: number,
        gutterHeight?: number,
        component?: string,
        layout?: Function,
        enter?: Function,
        entered?: Function,
        exit?: Function,
        perspective?: number,
        lengthUnit?: number,
        angleUnit?: string,
        itemHeight?: number,
        children : Array<ReactChild> | ReactChild
    }

    export interface SpringGridConfig {
        stiffness?: number,
        damping?: number,
        precision?: number
    }

    export interface SpringGridProps extends GridCommonProps {
        springConfig?: SpringGridConfig
    }

    export interface SpringGridState {
        styles: CSSProperties,
        gridWidth: number,
        gridHeight: number
    }

    export declare class SpringGrid extends Component<SpringGridProps, SpringGridState> {}
}