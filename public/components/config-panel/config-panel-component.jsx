import React, { Component } from "react";
import { MyDropzone } from "./file-upload/my-uploader.jsx";
import { ChartTypeChooser } from "./chart-type-chooser/chart-type-chooser-component.jsx";

export class ConfigPanel extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount(){
        // console.log("this.gridDataService: ", this.gridDataService);
    }

    render() {
        return (
            <div className="ca-config-panel config-panel col-md-3 bg-light"> 
                        
                <h3>Upload xlsx</h3>
                <MyDropzone docUploadHandler={this.props.docUploadHandler} 
                docUploadStarted={this.props.docUploadStarted}></MyDropzone>
                <ChartTypeChooser></ChartTypeChooser>

            </div>
        );
    }


}