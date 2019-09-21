import React, { Component } from "react";
import { ChartingComponent } from "./charting-component/charting-component.jsx";

export class ChartingArea extends Component {

    constructor( props ) {
        super(props);
        this.isDataUploadInProgress = props.docUploadInProgress;
        this.isDataAvailable = false;
    }

    componentWillReceiveProps (nextProps){
        this.isDataAvailable = false;
        this.isDataUploadInProgress = nextProps.docUploadInProgress;

        if(!nextProps.docUploadInProgress && nextProps.data){
            this.isDataAvailable = true;
        }
    }

    loadHBar() {
        // var ctx = this.node.querySelector('#myChart').getContext('2d');
        // console.log("ctx", ctx);

        // var mixedChart = new Chart(ctx, {
        //     type: 'horizontalBar',
        //     data: {
        //         datasets: [{
        //             label: 'Bar Dataset',
        //             borderColor: 'rgb(255, 99, 132)',
        //             data: [0, 10, 5, 2, 20, 30, 45]
        //         }],
        //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        //     },
        //     options: { }
        // });
    }

    render() {

        let chartAreaContent;
        if(this.isDataUploadInProgress){
            chartAreaContent = <div className="loader-container">
                    <div className="loader"></div>
                    <h3 className="loader-msg">Data upload in progress...</h3>
                </div>;
        }
        else if (this.isDataAvailable){
            chartAreaContent = <ChartingComponent data={this.props.data}></ChartingComponent>;
        }
        else{
            chartAreaContent = <h2 className="chart-display-label"> Your chart gets displayed here...</h2>;
        }


        return (
            <div className="col-md-9 charting-area" >
                {chartAreaContent}
            </div>
        );
    }


}