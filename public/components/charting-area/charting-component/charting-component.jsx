import React, { Component } from 'react';
import ChartDataService from "./chartDataService";
import ReactDOM from 'react-dom';
import { Chart } from "chart.js/dist/Chart.bundle.min";


export class ChartingComponent extends Component {

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        console.log("this.node", this.node);
        this.renderChart();
    }


    componentDidUpdate() {
        this.renderChart();
    }

    renderChart() {
        console.log("this.props.data: ", this.props.data);
        if (this.props.data) {
            let uploadedData = ChartDataService.translateData(this.props.data.data);
            console.log("priceQtyMap: ", uploadedData);

            let priceArr = Object.keys(uploadedData);
            let qtyArr = Object.values(uploadedData);

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
    }


    render() {

        // let config = this.generateConfig(this.props.data);
        let chartId = "cid-" + Math.ceil(Math.random() * 100);
        this.chartId = chartId;


        return (
            <div className="ChartContainer">
                <canvas id={chartId}></canvas>
            </div>
        );
    }

}