import React, { Component } from "react";


export class ChartTypeChooser extends Component{




    render() {
        return (
            <div className="chart-chooser"> 

                <h3>Select Chart Type</h3>


                <div className="form-check">
                    <input type="radio" className="form-check-input" id="materialGroupExample1" name="groupOfMaterialRadios" defaultChecked={true}/>
                    <label className="form-check-label" htmlFor="materialGroupExample1">Volume Profile</label>
                </div>

                <div className="form-check">
                    <input type="radio" className="form-check-input" id="materialGroupExample2" name="groupOfMaterialRadios"/>
                    <label className="form-check-label disabled md-disabled" htmlFor="materialGroupExample2">Market Profile</label>
                </div>

                <div className="form-check">
                    <input type="radio" className="form-check-input" id="materialGroupExample3" name="groupOfMaterialRadios"/>
                    <label className="form-check-label disabled md-disabled" htmlFor="materialGroupExample3">Order Flow</label>
                </div>


            </div>
        );
    }


}