import React, { Component } from "react";
import $ from 'jquery';

import AVDataService from "../../services/av-data.service.js";

export class ConfigPanel extends Component {

    constructor(props) {
        super(props);
        this.compRef = React.createRef();

        this.state = {
            chartType: "Volume Profile",
            symbolList: null,
            selectedInterval: "5 Minutes"
        };
        
        this.symbolSearchTBHandler = this.symbolSearchTBHandler.bind(this);
        this.symbolSelectHandler = this.symbolSelectHandler.bind(this);

        this.getIntervalDD = this.getIntervalDD.bind(this);
        this.chartTypeSelectionHandler = this.chartTypeSelectionHandler.bind(this);
        this.intervalSelectionHandler = this.intervalSelectionHandler.bind(this);
    }

    componentDidMount(){
        const compRef = this.compRef.current;
        $(compRef).on("mousedown", ".symbol-dd-item", this.symbolSelectHandler);
        $(compRef).on("mousedown", ".chart-type-dd .dropdown-item", this.chartTypeSelectionHandler);
        $(compRef).on("mousedown", ".interval-dd .dropdown-item", this.intervalSelectionHandler);
    }

    symbolSearchTBHandler(e){
        this.setState({symbol: e.target.value});
        /*AVDataService.getSymbolList(e.target.value)
        .then(list => this.updateSymbolList(list));*/
    }

    symbolSelectHandler(e){
        let symbol = $(e.currentTarget).attr('symbol');
        this.setState({
            symbolList : null,
            symbol: symbol
        });
        this.props.updateChart({
            symbol: symbol,
            chartType: this.state.chartType,
            interval: this.state.selectedInterval
        });
    }

    chartTypeSelectionHandler(e){
        this.setState({chartType: $(e.currentTarget).attr('itemvalue')});
    }

    intervalSelectionHandler(e){
        this.setState({selectedInterval: $(e.currentTarget).attr('itemvalue')});
        this.props.updateChart({
            symbol: this.state.symbol,
            chartType: this.state.chartType,
            interval: this.state.selectedInterval
        });
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
        let items = ["1 Minute", "5 Minutes", "15 Minutes", "30 Minutes", "1 Hour", "Daily", "Weekly", "Monthly"];
        return this.getDDInputgroup("Interval", (this.state.selectedInterval || items[0]), items, "ca-ipgrp-dd interval-dd");
    }

    getChartTypeDDInputgroup(){
        let items = ["Volume Profile", "Market Profile", "Order Flow"];
        return this.getDDInputgroup("Chart Type", (this.state.chartType || items[0]), items, "ca-ipgrp-dd chart-type-dd");
    }

    getDDInputgroup(label, ddTitle, ddItems, cls, handler){
        
        let ddList = ddItems.map(item => {
                return <a href="#" key={item} itemvalue={item} className="dropdown-item">{item}</a>;
            });
        
        return (
            <div className={"input-group input-group-sm mb-3 "+cls}>
                <div className="input-group-prepend">
                    <span className="input-group-text" >{label}</span>
                </div>
                <div className="dropdown">
                    <button className="btn-sm btn-light border btn-secondary dropdown-toggle pl-15" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {ddTitle}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {ddList}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div ref={this.compRef} className="ca-config-panel config-panel col-md-3 bg-light"> 
                
                {this.getChartTypeDDInputgroup()}
                
                <div className="input-group input-group-sm mb-3" >
                    <input type="text" id="symbolSearchBox" className="form-control text-muted" onChange={this.symbolSearchTBHandler}
                        placeholder="Symbol: SBIN" aria-label="Symbol" aria-describedby="basic-addon2" value={this.state.symbol}/>
                </div>
                
                {this.getSymbolList()}
                {this.getIntervalDD()}
            </div>
        );
    }


}