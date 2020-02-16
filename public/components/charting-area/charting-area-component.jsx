import React, { Component } from "react";
import AVDataService from "../../services/av-data.service.js";
import { ChartJSChartingComponent } from "./chartjs-charting-component/charting-component.jsx";
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

            AVDataService.getVolProfileData(meta.symbol)
                .then(data => { 
                    this.setState({
                        isDataFetchInProgress: false,
                        isDataAvailable: true,
                        chartData: data
                    });
                });
        }
    }

    render() {

        let chartAreaContent;
        /* chartAreaContent = <ChartJSChartingComponent meta={this.props.meta}></ChartJSChartingComponent>; */
        if(this.state.isDataFetchInProgress){
            chartAreaContent = <div className="loader-container">
                    <div className="loader"></div>
                    <h3 className="loader-msg">Data upload in progress...</h3>
                </div>;
        }
        
        else if (this.state.isDataAvailable){
            chartAreaContent = <ChartJSChartingComponent meta={this.props.meta} 
                                    data={this.state.chartData}></ChartJSChartingComponent>;
        }
        else{
            chartAreaContent = <h2 className="chart-display-label"> Your chart gets displayed here...</h2>;
        }


        return (
            <div className="col-9 charting-area" >
                {chartAreaContent}
            </div>
        );
    }


}