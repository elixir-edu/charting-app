import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import "./../../../../libs/kendo/js/jquery.min.js";
import "./../../../../libs/kendo/js/kendo.all.min.js";


export class KendoChartingComponent extends Component {

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        console.log("this.node", this.node);
        this.renderChart();
        $(document).bind("kendo:skinChange", createChart);
    }


    componentDidUpdate() {
        this.renderChart();
    }

    renderChart() {
        console.log("this.props.data: ", this.props.data);
        $("#" + this.chartId).kendoStockChart({
            dataSource: {
                transport: {
                    read: {
                        url: "./../../../../libs/sample-data/dataviz/js/boeing-stock.json",
                        dataType: "json"
                    }
                },
                schema: {
                    model: {
                        fields: {
                            Date: { type: "date" }
                        }
                    }
                }
            },
            title: {
                text: "The Boeing Company\nNYSE:BA"
            },
            dateField: "Date",
            series: [{
                type: "candlestick",
                openField: "Open",
                highField: "High",
                lowField: "Low",
                closeField: "Close"
            }],
            categoryAxis: {
                labels: {
                    rotation: "auto"
                }
            },
            navigator: {
                series: {
                    type: "area",
                    field: "Close"
                },
                select: {
                    from: "2009/02/05",
                    to: "2011/10/07"
                },
                categoryAxis: {
                    labels: {
                        rotation: "auto"
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
            <div className="ChartContainer">
                <div id={chartId}></div>
            </div>
        );
    }

}