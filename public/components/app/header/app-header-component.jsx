import React, { Component } from "react";

export class AppHeader extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="container-fluid header navbar navbar-expand-lg navbar-light"> 
                <h2>Charting App</h2>
            </div>
        );
    }


}