//import react
import React,{useState} from "react";
import crispcrops from "./crispcrops.png";
import {useNavigate } from "react-router-dom";


//export function navbar
export default function Header(){
    const navigate = useNavigate()
    return(
        <div>
        <body class="goto-here header-bg-mar">
            <div class="up py-1 color-bg">
            <div class="container">
                <div class="row no-gutters d-flex align-items-start align-items-center px-md-0">
                    <div class="col-lg-12 d-block">
                        <div class="row d-flex">
                            <div class="col-md pr-4 d-flex topper align-items-center">
                                <div class="icon mr-2 d-flex justify-content-center align-items-center"><span class="icon-phone2"></span></div>
                                
                            </div>
                            <div class="col-md pr-4 d-flex topper align-items-center">
                                <div class="icon mr-2 d-flex justify-content-center align-items-center"><span class="icon-paper-plane"></span></div>
                                <span class="text">cripscropssells@gmail.com</span>
                            </div>
                            <div class="col-md-5 pr-4 d-flex topper align-items-center text-lg-right">
                                <span class="text">365 days delivery &amp; Free Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-md navbar-light ftco_navbar color-nav ftco-navbar-light" id="ftco-navbar">
            <div class="container">
            <a class="navbar-brand" onClick={()=>navigate(`/home`)}><img src={crispcrops} height="50px"></img></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="oi oi-menu"></span> Menu
            </button>

            <div class="collapse navbar-collapse" id="ftco-nav">
                <ul class="navbar-nav ml-auto">
                <li class="nav-item"><a class="nav-link" onClick={()=>navigate(`/Home`)}><h5>Home</h5></a></li>
                <li class="nav-item"><a onClick={()=>navigate(`/bidstore`)} class="nav-link"><h5>Biddings</h5></a></li>
                <li class="nav-item"><a onClick={()=>navigate(`/store`)} class="nav-link"><h5>Store</h5></a></li>
                <li class="nav-item"><a onClick={()=>navigate(`/offertable`)} class="nav-link"><h5>Offers</h5></a></li>
                <li class="nav-item"><a onClick={()=>navigate(`/loginCustomer`)} class="nav-link"><h5>SIGN-IN</h5></a> </li>
                </ul>
            </div>
            </div>
        </nav>
        </body>
    </div>
    
    )
}