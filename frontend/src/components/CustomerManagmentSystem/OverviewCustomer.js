import React, {useState} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import checkout from "./checkout.png";
import voucher from "./voucher.png";
import clipboard from "./clipboard.png";
import user from "./user.png";


export default function OverviewCustomer(){
    const navigate = useNavigate();
   
    const {id} = useParams();

    return(
        <div className="overview profile">
        <div className="row">
        <div className="col-md-3 profile-left">
        <div class="user-avatar">
            
        <img src={user}  className="user-avatar2-cus"></img>
            </div>
            
            <button type='button' className="cus-account-btn"  onClick={()=>navigate(`/accountCustomer/${id}`)}>Account</button>
            <button type='button' className="cus-overview-btn" onClick={()=>navigate(`/overviewCustomer/${id}`)}>Overview</button>
            <button type='button' className="cus-edit-btn" onClick={()=>navigate(`/UpdateCustomer/${id}`)}>Edit Details</button>
            <button type='button' className="cus-cart-btn" onClick={()=>navigate(`/changeshoppingCartCustomer/${id}`)} >Shopping Cart</button>

            </div>
            <div className="col-md-9 profile-right">
                
                <br></br>
                <br></br>
                <h3>Customer Overview</h3>
                <div className="row">
                    <div className="col-md-6 profile-right">
                        <div className="check1">
                            <img src={checkout} className="icon1-cus"></img>
                            <button className="cus-delivery-btn"> Delivery </button>
                        </div>
                    
                    <div>
                        <div className=" check2">
                            <img src={voucher}  className="icon2-cus"></img>
                            <button className="cus-offer-btn">Offers</button>
                        </div>
                    </div>
                    
                </div>
                <div className="col-md-6 profile-left">
                    <div className="check3">
                        <img src={clipboard}  className="icon3-cus"></img>
                        <a onClick={()=>navigate(`/Customerreport`)}><button className="cus-report-btn">Generate Report</button></a>
                    </div>
                   
                </div>
            </div> 
                    
        </div>
</div>
</div>
    )
}