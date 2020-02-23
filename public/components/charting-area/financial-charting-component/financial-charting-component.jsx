import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DateTime } from "luxon";
/* import { Chart } from "chart.js/dist/Chart.bundle.min"; */
import "chartjs-plugin-zoom/dist/chartjs-plugin-zoom.min";
import "chartjs-chart-financial/docs/chartjs-chart-financial";



export class FinancialChartingComp extends Component {

    constructor(props) {
        super(props);
        
        this.state = {};
    }

    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        console.log("fin chart this.node", this.node);
        
        if(this.props.ohlc){
            this.renderChart(this.props.ohlc)
        }
    }


    componentDidUpdate() {
        if(this.props.ohlc){
            this.chart && this.chart.destroy();
            this.renderChart(this.props.ohlc)
        }
    }

    renderChart(data) {

        debugger;

        var barCount = 60;
        var initialDateStr = '01 Apr 2017 00:00 Z';

        var ctx = this.node.querySelector('#' + this.chartId).getContext('2d');
        ctx.canvas.width = 1000;
        ctx.canvas.height = 150;

        let randomData = this.getRandomData(initialDateStr, barCount) ;
        console.log("random Data: ", randomData);
        console.log("actual Data: ", data);

        this.chart = new Chart(ctx, {
            type: 'candlestick',
            data: {
                datasets: [{
                    label: 'Elixir Learnings',
                    data: data
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        afterBuildTicks: function (scale, ticks) {
                            var majorUnit = scale._majorUnit;
                            var firstTick = ticks[0];
                            var i, ilen, val, tick, currMajor, lastMajor;

                            val = DateTime.fromMillis(ticks[0].value);
                            if ((majorUnit === 'minute' && val.second === 0)
                                || (majorUnit === 'hour' && val.minute === 0)
                                || (majorUnit === 'day' && val.hour === 9)
                                || (majorUnit === 'month' && val.day <= 3 && val.weekday === 1)
                                || (majorUnit === 'year' && val.month === 0)) {
                                firstTick.major = true;
                            } else {
                                firstTick.major = false;
                            }
                            lastMajor = val.get(majorUnit);

                            for (i = 1, ilen = ticks.length; i < ilen; i++) {
                                tick = ticks[i];
                                val = DateTime.fromMillis(tick.value);
                                currMajor = val.get(majorUnit);
                                tick.major = currMajor !== lastMajor;
                                lastMajor = currMajor;
                            }
                            return ticks;
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

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    randomBar(date, lastClose) {
        let randomNumber = this.randomNumber;
        var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
        var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
        var high = randomNumber(Math.max(open, close), Math.max(open, close) * 1.1).toFixed(2);
        var low = randomNumber(Math.min(open, close) * 0.9, Math.min(open, close)).toFixed(2);
        return {
            t: date.valueOf(),
            o: open,
            h: high,
            l: low,
            c: close
        };
    
    }

    getRandomData(dateStr, count) {
        var date = DateTime.fromRFC2822(dateStr);
        var data = [this.randomBar(date, 30)];
        while (data.length < count) {
            date = date.plus({days: 1});
            if (date.weekday <= 5) {
                data.push(this.randomBar(date, data[data.length - 1].c));
            }
        }
        return data;
    }

    render() {

        // let config = this.generateConfig(this.props.data);
        let chartId = "cid-" + Math.ceil(Math.random() * 100);
        this.chartId = chartId;


        return (
            <div className="Fin-ChartContainer">
                <canvas id={chartId}></canvas>
            </div>
        );
    }

}