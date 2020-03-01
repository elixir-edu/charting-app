import React, { Component } from "react";
import AVDataService from "../../services/av-data.service.js";
import { VolProfChartingComp } from "./vol-prof-charting-component/cjs-vol-prof-charting-component.jsx";
/* import { KendoChartingComponent } from "./kendo-charting-component/kendo-charting-component.jsx"; */

export class ChartingArea extends Component {

    constructor( props ) {
        super(props);

        this.state= {
            isDataFetchInProgress: false,
            isDataAvailable: false
        };
        
    }
    
    UNSAFE_componentWillReceiveProps(props){
        let meta = props.meta;
        if (meta && meta.symbol){
            this.setState({isDataFetchInProgress: true});

            AVDataService.getVolProfileData(meta.symbol, meta.interval)
                .then(data => { 
                    console.log("vol prof data: ", data);
                    this.setState({
                        isDataFetchInProgress: false,
                        isDataAvailable: true,
                        chartData: data.volProfile,
                        ohlcData: data.ohlc
                    });
                });
        }
    }

    render() {

        let chartAreaContent;
        chartAreaContent = <VolProfChartingComp meta={this.props.meta} 
                                    data={this.state.chartData} ohlcData={this.state.ohlcData}></VolProfChartingComp>;
        /* if(this.state.isDataFetchInProgress){
            chartAreaContent = <div className="loader-container">
                    <div className="loader"></div>
                    <h3 className="loader-msg">Data upload in progress...</h3>
                </div>;
        }
        
        else if (this.state.isDataAvailable){
            chartAreaContent = <VolProfChartingComp meta={this.props.meta} 
                                    data={this.state.chartData} ohlcData={this.state.ohlcData}></VolProfChartingComp>;
        }
        else{
            chartAreaContent = <h2 className="chart-display-label"> Your chart gets displayed here...</h2>;
        } */


        return (
            <div className="col-9 charting-area d-flex flex-column" >
                {chartAreaContent}
            </div>
        );
    }


}