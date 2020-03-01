import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AVDataService from "../../../services/av-data.service.js";

import CanvasJSReact from './../../../../libs/canvasjs/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import { FinancialChartingComp } from "../financial-charting-component/cjs-financial-charting-component.jsx";

export class VolProfChartingComp extends Component {

    constructor(props) {
        super(props);
        this.state = {ohlc: props.ohlcData};
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
    }

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        console.log("this.node", this.node);
        
        /* if(this.props.data){
            this.renderVolProf(this.props.data)
        } */
        
    }

    toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }

    /* UNSAFE_componentWillReceiveProps(props){
        if(props.ohlcData){
            this.setState({ohlc: props.ohlcData});
        }
    } */

    /* componentDidUpdate() {
        if(this.props.data){
            // this.chart && this.chart.destroy();
            this.renderVolProf(this.props.data)
        }
    } */

   /*  renderVolProf(data){

        return;

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
    } */


    render() {

        // let config = this.generateConfig(this.props.data);
        let chartId = "cid-" + Math.ceil(Math.random() * 100);
        this.chartId = chartId;

        const options = {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Evening Sales in a Restaurant"
            },
            axisX: {
                valueFormatString: "DDD"
            },
            axisY: {
                prefix: "$"
            },
            toolTip: {
                shared: true
            },
            legend:{
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            data: [{
                type: "rangeBar",
                name: "Meals",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2018, 5, 25), y: [0, 56] },
                    { x: new Date(2018, 5, 26), y: [0, 45] },
                    { x: new Date(2018, 5, 27), y: [0, 71] },
                    { x: new Date(2018, 5, 28), y: [0, 41] },
                    { x: new Date(2018, 5, 29), y: [0, 60] },
                    { x: new Date(2018, 5, 30), y: [0, 75] },
                    { x: new Date(2018, 6, 1), y: [0, 98] }
                ]
            },
            {
                type: "rangeBar",
                name: "Snacks",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2018, 5, 25), y: [100, 186] },
                    { x: new Date(2018, 5, 26), y: [100, 195] },
                    { x: new Date(2018, 5, 27), y: [100, 171] },
                    { x: new Date(2018, 5, 28), y: [100, 158] },
                    { x: new Date(2018, 5, 29), y: [100, 160] },
                    { x: new Date(2018, 5, 30), y: [100, 165] },
                    { x: new Date(2018, 6, 1), y: [100, 189] }
                ]
            }/*,
            {
                type: "stackedBar",
                name: "Drinks",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2018, 5, 25), y: 48 },
                    { x: new Date(2018, 5, 26), y: 45 },
                    { x: new Date(2018, 5, 27), y: 41 },
                    { x: new Date(2018, 5, 28), y: 55 },
                    { x: new Date(2018, 5, 29), y: 80 },
                    { x: new Date(2018, 5, 30), y: 85 },
                    { x: new Date(2018, 6, 1), y: 83 }
                ]
            } ,
            {
                type: "stackedBar",
                name: "Dessert",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2018, 5, 25), y: 61 },
                    { x: new Date(2018, 5, 26), y: 55 },
                    { x: new Date(2018, 5, 27), y: 61 },
                    { x: new Date(2018, 5, 28), y: 75 },
                    { x: new Date(2018, 5, 29), y: 80 },
                    { x: new Date(2018, 5, 30), y: 85 },
                    { x: new Date(2018, 6, 1), y: 105 }
                ]
            },
            {
                type: "stackedBar",
                name: "Takeaway",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2018, 5, 25), y: 52 },
                    { x: new Date(2018, 5, 26), y: 55 },
                    { x: new Date(2018, 5, 27), y: 20 },
                    { x: new Date(2018, 5, 28), y: 35 },
                    { x: new Date(2018, 5, 29), y: 30 },
                    { x: new Date(2018, 5, 30), y: 45 },
                    { x: new Date(2018, 6, 1), y: 25 }
                ]
            } */]
        }
        return (
            <div className="ChartContainer d-flex flex-column">
                <CanvasJSChart className="d-flex flex-grow-1 chart-vol-prof" options = {options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            
                <FinancialChartingComp className="chart-vol-prof-ohlc" id={chartId+'-ohlc'} ohlc={this.state.ohlc}></FinancialChartingComp>

            </div>
        );
    }

}
