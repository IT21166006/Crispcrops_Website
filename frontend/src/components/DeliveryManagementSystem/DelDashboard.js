import React from "react";
import delivery_guy from "./delivery_guy.png";
import { useNavigate, Link } from "react-router-dom";

export default function DelDashboard(){

    const navigate = useNavigate()
    return(
        <div className="container">

            
            <div className="row">
                <div className="col-md-4">
                    <Link to={'/loginCustomer'}><button className="sgn-btn-log ">USER</button></Link>
                </div>
                <div className="col-md-4">
                    <Link to={'/loginFarmer'}><button className="sgn-btn-log ">FARMER</button></Link>
                </div>
                <div className="col-md-4">
                    <Link to={'/deldashboard'}><button className="sgn-btn-log sign-row-btn-active">DELEVERY PERSON</button></Link>
                </div>
            </div>



            <div className="Del-dash-box" >
        <div className="container dash">
            
                <h1 className="col-md-5 del-dash-title">
                    ONLINE DELIVERY
                </h1>
                
            <div className="row">
                
                <div className="col-md-5 db-btn-whitebox">
                    <div className="container">
                      <form action="">
                      <button type="button" className="del-btn-dashboard" onClick={()=>navigate(`/dellogin`)}>Create Account</button>
                      </form>
                      <form action=".">
                      <button type="submit" class="del-btn-dashboard" onClick={()=>navigate(`/order`)}>All orders</button>
                      </form>
                      <form action=".">
                      <button type="button" class="del-btn-dashboard" onClick={()=>navigate(`/Delreport`)}>Generate Report</button>
                      </form>
                    </div>
                </div>
                <div className="col-md-5 deliveryimg">
                    <img src = {delivery_guy} width="500px"></img>

                </div>
            </div>
        </div> 
        </div>
        </div>
    );

}