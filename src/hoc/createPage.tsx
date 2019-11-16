import React, { Component, ComponentClass, SFC } from "react";
import AppFooter from "../components/app-footer/AppFooter";

export default function createPage<P = {}>(PageComponent : SFC) {
    return class extends Component {
        constructor(props : P) {
            super(props);
        }

        render() {
            return (
                <>
                    <PageComponent {...this.props}></PageComponent>
                    <AppFooter></AppFooter>
                </>
            );
        }
    }
}