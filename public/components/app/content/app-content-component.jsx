import React, { Component } from "react";
import { ConfigPanel } from "./../../config-panel/config-panel-component.jsx";
import { ChartingArea } from "./../../charting-area/charting-area-component.jsx";


export class AppContent extends Component {

    constructor() {
        super();
        this.state = {};
        this.updateChart = this.updateChart.bind(this);
    }

    updateChart (data){
        this.setState({
            chartMeta: data
        });
    }

    render() {
        console.log("in app render, meta: ", this.state.chartMeta);

        return (
            <div className="container-fluid app-content"> 
                <ConfigPanel updateChart={this.updateChart} ></ConfigPanel>
                <ChartingArea meta={this.state.chartMeta} ></ChartingArea>
            </div>
        );
    }


}