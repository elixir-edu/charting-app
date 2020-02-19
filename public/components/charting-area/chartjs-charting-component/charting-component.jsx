import React, { Component } from 'react';
/* import ChartDataService from "./chartDataService"; */
import ReactDOM from 'react-dom';
import { Chart } from "chart.js/dist/Chart.bundle.min";
import AVDataService from "../../../services/av-data.service.js";


export class VolProfChartingComp extends Component {

    constructor(props) {
        super(props);
        this.state = {};
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
                }
            }
        });
    }


    render() {

        // let config = this.generateConfig(this.props.data);
        let chartId = "cid-" + Math.ceil(Math.random() * 100);
        this.chartId = chartId;


        return (
            <div className="ChartContainer">
                <canvas id={chartId}></canvas>
                <canvas id={chartId+'-ohlc'}></canvas>
            </div>
        );
    }

}