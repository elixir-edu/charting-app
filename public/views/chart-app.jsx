import React, { Component } from "react";
import { AppHeader } from "./../components/app/header/app-header-component.jsx";
import { AppFooter } from "./../components/app/footer/app-footer-component.jsx";
import { AppContent } from "./../components/app/content/app-content-component.jsx";

export class ChartApp extends Component {

    constructor() {
        super();
        this.state = {
            title: ""
        };
    }

    render() {
        return (
            <div className="ChartApp">
                <AppHeader></AppHeader>
                <AppContent></AppContent>
                <AppFooter></AppFooter>
            </div>
        );
    }


}