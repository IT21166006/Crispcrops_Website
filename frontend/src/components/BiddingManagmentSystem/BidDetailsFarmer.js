import React,{useState, useEffect} from "react";
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom";

export default function BidDetailsFarmer(){

    const navigate = useNavigate();
    const {id} = useParams();
    const [price, setprice] = useState("");
    const [cusName, setcusName] = useState("");
    const [cusPhone, setcusPhone] = useState("");
    let subtotal = price;
    //const [bidedit, sebidedit] = useState("");

    const [bids , setbids] = useState({
        itemName: " ",
        price: " ",
        cusName : " ",
        cusPhone : " "
    });

    function getBids() {
        axios
          .get("http://localhost:8070/bidding/fetch/"+id)
          .then((res) => {
            setbids(res.data);
          
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    
      useEffect(() => {
        getBids();
      }, []);

    let total = bids.quantity * bids.price;


    return(
        <div className="container bid-update-box">
            <div className="row">

                <div className="container bid-title">
                    <h4>{bids.itemName}</h4>
                </div>
                <div className="col-md-12">

                    <div className="row">
                        <div className="col-md-3"></div>


                        <div className="col-md-5">


                        <div className="row">
                        <div className="col-md-6">
                            <p>PRICE :</p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                {bids.price+" LKR"}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>QUANTITY :</p>
                        </div>
                        <div className="col-md-6">
                            <p>{bids.quantity+" kg"}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <p>CONTACT :</p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                {"+94"+bids.phone}
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <p>FARM :</p>
                        </div>
                        <div className="col-md-6">
                            <p>{bids.farm}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <p>BID ID :</p>
                        </div>
                        <div className="col-md-6">
                            <p>
                                {bids.bidID}
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <p>TOTAL :</p>
                        </div>
                        <div className="col-md-6">
                            <p>{total+" LKR"}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <p>Customer Status :</p>
                        </div>
                        <div className="col-md-6">
                            <p>{bids.cusName}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <p>Contact Customer :</p>
                        </div>
                        <div className="col-md-6">
                            <p>{"+94"+bids.cusPhone}</p>
                        </div>
                    </div>


                        </div>

                        

                        <div className="col-md-4">


                    </div>
                    </div>

                    
                    <div className="row">
                           <Link to={'/createbid/'+bids.idNo}><button className="bid-btn-cencel">BACK</button></Link>
                        </div>
                </div>
            </div>
        </div>
    )
}