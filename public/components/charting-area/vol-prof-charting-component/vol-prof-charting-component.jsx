import React, { Component } from 'react';
/* import ChartDataService from "./chartDataService"; */
import ReactDOM from 'react-dom';
import { Chart } from "chart.js/dist/Chart.bundle.min";
import "chartjs-plugin-zoom/dist/chartjs-plugin-zoom.min";
import AVDataService from "../../../services/av-data.service.js";
import { FinancialChartingComp } from "./../financial-charting-component/financial-charting-component.jsx";


export class VolProfChartingComp extends Component {

    constructor(props) {
        super(props);
        this.state = {ohlc: props.ohlcData};
    }

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        console.log("this.node", this.node);
        /* this.renderChart(); */
        
        if(this.props.data){
            this.renderVolProf(this.props.data)
        }
        
        /* let symbol = this.props && this.props.meta && this.props.meta.symbol;
        console.log("in comp did mount symbol", symbol);
        AVDataService.getVolProfileData(symbol)
        .then(data => {this.renderVolProf(data)}); */
    }

    UNSAFE_componentWillReceiveProps(props){
        if(props.ohlcData){
            this.setState({ohlc: props.ohlcData});
        }
    }

    componentDidUpdate() {
        if(this.props.data){
            /*this.chart && this.chart.destroy();*/
            this.renderVolProf(this.props.data)
        }
    }

    renderVolProf(data){

        let priceArr = Object.keys(data);
        let qtyArr = Object.values(data);

        var ctx = this.node.querySelector('#' + this.chartId).getContext('2d');

        var mixedChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                datasets: [{
                    label: 'Bar Dataset',
                    borderColor: '#000000',
                    backgroundColor: "#000000",
                    data: qtyArr
                }],
                labels: priceArr
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20
                        }
                    }]
                },
                plugins: {
                    zoom: {
                        // Container for pan options
                        pan: {
                            // Boolean to enable panning
                            enabled: true,
        
                            // Panning directions. Remove the appropriate direction to disable 
                            // Eg. 'y' would only allow panning in the y direction
                            mode: 'xy'
                        },
        
                        // Container for zoom options
                        zoom: {
                            // Boolean to enable zooming
                            enabled: true,
        
                            // Zooming directions. Remove the appropriate direction to disable 
                            // Eg. 'y' would only allow zooming in the y direction
                            mode: 'xy',
                        }
                    }
                }
            }
        });
    }


    render() {

        // let config = this.generateConfig(this.props.data);
        let chartId = "cid-" + Math.ceil(Math.random() * 100);
        this.chartId = chartId;


        return (
            <div className="ChartContainer d-flex flex-column">
                <canvas className="d-flex flex-grow-1" id={chartId}></canvas>
                <FinancialChartingComp id={chartId+'-ohlc'} ohlc={this.state.ohlc}></FinancialChartingComp>
                
            </div>
        );
    }

}