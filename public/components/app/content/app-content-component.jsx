import React, { Component } from "react";
import { ConfigPanel } from "./../../config-panel/config-panel-component.jsx";
import { ChartingArea } from "./../../charting-area/charting-area-component.jsx";


export class AppContent extends Component {

    constructor() {
        super();
        this.state = {
            docUploadInProgress: false
        };

        this.docUploadHandler = this.docUploadHandler.bind(this);
        this.docUploadStarted = this.docUploadStarted.bind(this);
    }

    docUploadHandler (data){
        console.log("data: ", data);
        this.setState({
            chartData: data,
            docUploadInProgress: false
        });
    }

    docUploadStarted (){
        this.setState({docUploadInProgress: true});
    }

    render() {
        return (
            <div className="container-fluid app-content"> 
                <ConfigPanel docUploadHandler={this.docUploadHandler} 
                docUploadStarted={this.docUploadStarted}></ConfigPanel>
                <ChartingArea data={this.state.chartData} 
                docUploadInProgress={this.state.docUploadInProgress}></ChartingArea>
            </div>
        );
    }


}