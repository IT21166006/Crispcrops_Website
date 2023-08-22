import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function StockDashboard(){
    return(

        <div className="container">
            <div className="row">
                <div className="col-md-3 "></div>
                <div className="col-md-6 stk-dash-box">
                    <div>
                        <Link to={'/StockManageItems'}><button className="stk-dash-btn">MANAGE ITEMS</button></Link>
                    </div>

                    <div>
                        <Link to={'/AddStock'}><button className="stk-dash-btn">ADD ITEMS</button></Link>
                    </div>

                    <div>
                        <Link to={'/Stockreport'}><button className="stk-dash-btn">VIEW REPORT</button ></Link>
                    </div>
                </div>
                <div className="col-md-3 stk-wdth"></div>
            </div>
        </div>
    )

}


