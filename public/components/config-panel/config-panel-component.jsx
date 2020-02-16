import React, { Component } from "react";
import $ from 'jquery';

import { ChartTypeChooser } from "./chart-type-chooser/chart-type-chooser-component.jsx";
import AVDataService from "../../services/av-data.service.js";

export class ConfigPanel extends Component {

    constructor(props) {
        super(props);
        this.compRef = React.createRef();

        this.state = {
            selectedChartType: "Volume Profile",
            symbolList: null,
            selectedInterval: "5 Mins"
        };
        
        this.symbolSearchTBHandler = this.symbolSearchTBHandler.bind(this);
        this.symbolSelectHandler = this.symbolSelectHandler.bind(this);

        this.chartTypeSelectHandler = this.chartTypeSelectHandler.bind(this);
    }

    componentDidMount(){
        const compRef = this.compRef.current;
        $(compRef).on("mousedown", ".symbol-dd-item", this.symbolSelectHandler);
    }

    symbolSearchTBHandler(e){
        this.setState({symbol: e.target.value});
        AVDataService.getSymbolList(e.target.value)
        .then(list => this.updateSymbolList(list));
    }

    symbolSelectHandler(e){
        let symbol = $(e.currentTarget).attr('symbol');
        this.setState({
            symbolList : null,
            symbol: symbol
        });
        this.props.updateChart({
            symbol: symbol,
            chartType: this.state.chartType
        });
    }

    chartTypeSelectHandler(type){
        this.setState({chartType: type});
    }

    updateSymbolList(list){
        this.setState({symbolList : list});
    }

    getSymbolList(){
        if(this.state.symbolList){
            
            let list = this.state.symbolList.map(item => {
                return (
                    <a href="#" key={item.symbol} symbol={item.symbol} className="symbol-dd-item dropdown-item pl-0 pr-0">
                        <span className="col-3 d-inline-flex">{item.symbol}</span>
                        <span className="col-7 d-inline-flex text-truncate">{item.name}</span>
                        <span className="col-2 d-inline-flex text-truncate">{item.exchange}</span>
                    </a>
                )
            });

            return (
                <div className="symbol-list dropdown">
                    <div className="dropdown-menu show" aria-labelledby="dropdownMenuLink">
                        {list}
                    </div>
                </div>
                
            )
        }else{
            return null;
        }
    }

    getIntervalDD(){
        return (
            <div className="dropdown">
                <button className="btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        )
    }

    getSelectorIpGroup(){
        return (
            <div className="dropdown">
                <button className="btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div ref={this.compRef} className="ca-config-panel config-panel col-md-3 bg-light"> 
                <ChartTypeChooser chartTypeSelectHandler={this.chartTypeSelectHandler}></ChartTypeChooser>
                
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" >Chart Type</span>
                    </div>
                    {this.getIntervalDD()}
                </div>
                
                <div className="input-group input-group-sm mb-3" >
                    <input type="text" id="symbolSearchBox" className="form-control text-muted" onChange={this.symbolSearchTBHandler}
                        placeholder="Symbol: SBIN" aria-label="Symbol" aria-describedby="basic-addon2" value={this.state.symbol}/>
                </div>
                {this.getSymbolList()}

                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" >Interval</span>
                    </div>
                    {this.getIntervalDD()}
                </div>
                
            </div>
        );
    }


}