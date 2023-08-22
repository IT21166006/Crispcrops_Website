import React,{useState, useEffect} from "react";
import axios from "axios"
import farm_img1 from "./farm1.jpg";
import farm_img2 from "./farm2.jpg";
import farm_img3 from "./farm3.jpg";
import store_img from "./store.jpg";
import bidstore_img from "./bidstore.jpg";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function Home(){
    return(
        <div>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active caroucel-height">
                        <img class="d-block w-100 " alt="CRIPS CROPS" src={farm_img1} a></img>
                    </div>
                    <div class="carousel-item caroucel-height">
                        <img class="d-block w-100" src={farm_img2} alt="Second slide"></img>
                    </div>
                    <div class="carousel-item caroucel-height">
                        <img class="d-block w-100 "  src={farm_img3} alt="Third slide"></img>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            <div className="container">

                <div className="Home-text-align-title">
                    <h3>CRISP CROPS BUYING AND SELLING</h3>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to={'/store'}><button className="home-btn">STORE</button></Link>
                    </div>
                    <div className="col-md-6">
                        <Link to={'/bidstore'}><button className="home-btn">BIDS</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}