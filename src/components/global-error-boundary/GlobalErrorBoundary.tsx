import React, { Component, ReactNode } from 'react';

export interface GlobalErrorBoundaryProps {
    children : ReactNode
}

export interface GlobalErrorBoundaryState {
    hasError : boolean
}

export default class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
    constructor(props : GlobalErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error : any) {
        return { hasError: true };
    }

    componentDidCatch(error : any, errorInfo : any) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}