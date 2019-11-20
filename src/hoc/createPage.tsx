import React, { Component, FC } from "react";
import AppFooter from "../components/app-footer/AppFooter";

export default function createPage<P = {}>(PageComponent : FC) {
    return class extends Component {
        constructor(props : P) {
            super(props);
        }

        render() {
            return (
                <>
                    <main className="app-body">
                        <PageComponent {...this.props}></PageComponent>
                    </main>
                    <AppFooter></AppFooter>
                </>
            );
        }
    }
}