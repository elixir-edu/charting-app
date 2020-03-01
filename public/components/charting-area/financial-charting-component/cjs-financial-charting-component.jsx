import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CanvasJSReact from './../../../../libs/canvasjs/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



export class FinancialChartingComp extends Component {

    constructor(props) {
        super(props);
        
        this.state = {};
    }

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        console.log("fin chart this.node", this.node);
        
        if(this.props.ohlc){
        }
    }


    componentDidUpdate() {
        if(this.props.ohlc){
        }
    }

    

    render() {

        // let config = this.generateConfig(this.props.data);
        let chartId = "cid-" + Math.ceil(Math.random() * 100);
        this.chartId = chartId;

        const options = {
			theme: "light2", // "light1", "light2", "dark1", "dark2"
            animationEnabled: true,
            zoomEnabled:true,
            exportEnabled: true,
            backgroundColor: "transparent",
			title:{
				text: "Intel Corporation Stock Price -  2017"
			},
			axisX: {
				valueFormatString: "DD MMM"
			},
			axisY: {
				includeZero:false,
				prefix: "$",
				title: "Price (in USD)"
			},
			data: [{
				type: "candlestick",
                showInLegend: true,
                risingColor: "green",
                fallingColor: "red",
				name: "Intel Corporation",
				yValueFormatString: "$###0.00",
				xValueFormatString: "DD MMMM YY",
				dataPoints: this.props.ohlc
			}
		  ]
		}


        return (
            <div className="Fin-ChartContainer">
                <CanvasJSChart options={options}
                    onRef={ref => this.chart = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>

        );
    }

}