//import react
import React,{useState} from "react";
import map from "./map.png";
import {useNavigate } from "react-router-dom";


//export function navbar
export default function Footer(){
    const navigate = useNavigate()
    return(
        <div>
            <div className="row footer-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-3">
                            
                            <div className="row">
                                <h4>Crisp Crops</h4>
                            </div>
                            <div>
                                <a href="https://www.google.com/maps/place/19+AB10,+Kaduwela/data=!4m6!3m5!1s0x3ae256fddeee7ea7:0xc419a016ca7a6885!7e2!8m2!3d6.9376131999999995!4d79.9657225?utm_source=mstt_1&entry=gps&g_ep=CAESCTExLjc0LjMwMRgAIIgnKgBCAkxL">
                                    <img src={map} height="230px"></img>
                                </a>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="row footer-item">
                                <h4>Menu</h4>
                            </div>
                            <div className="row footer-item">
                                <a onClick={()=>navigate(`/store`)}>Store</a>
                            </div>

                            <div className="row footer-item">
                                <a onClick={()=>navigate(`/bidstore`)}>Bidds</a>
                            </div>

                            <div className="row footer-item">
                                <a onClick={()=>navigate(`/loginCustomer`)}>Log-in</a>
                            </div>

                            <div className="row footer-item">
                                <a onClick={()=>navigate(`/`)}>Terms & conditions</a>
                            </div>

                            <div className="row footer-item">
                                <a onClick={()=>navigate(`/`)}>Privecy Policy</a>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="row footer-item">
                                <h4>Contact Us</h4>
                            </div>
                            <div className="row footer-item">
                                <a>
                                    <i class="fa fa-map"></i>
                                </a>
                                <p> CRISP CROPS SELLINGS<br></br>No 345/1 , New Kandy Road,<br></br>Kothalawala , Kaduwela.</p>
                            </div>
                            <div className="row footer-item">
                                <a>
                                    <i class="fa fa-phone"></i>
                                </a>
                                +9474-9869-89-86
                            </div>
                            <div className="row footer-item">
                                <a>
                                    <i class="fa fa-envelope"></i>
                                </a>
                                crispcropssells@gmail.com
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                    </div>
                    <div className="row">
                       <div className="col-md-3"></div>
                       <div className="col-md-6">
                            <a className="btsp-icon">
                                <i class="fa fa-facebook"></i>
                            </a>
                            <a className="btsp-icon">
                                <i class="fa fa-linkedin"></i>
                            </a>
                            <a className="btsp-icon">
                                <i class="fa fa-twitter"></i>
                            </a>
                       </div>
                       <div className="col-md-3"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <p>copyright © 2023 All right reserved | CRISP CROPS SELLING(pvt)ltd</p>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}