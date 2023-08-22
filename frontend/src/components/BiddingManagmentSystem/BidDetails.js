import React,{useState, useEffect} from "react";
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom";

export default function BidDetails(){

    const navigate = useNavigate();
    const {id} = useParams();
    const [setPrice, setsetPrice] = useState("");
    const [cusName, setcusName] = useState("");
    const [cusPhone, setcusPhone] = useState("");
    
    //const [bidedit, sebidedit] = useState("");

    const [bids , setbids] = useState({
        itemName: " ",
        setPrice: " ",
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

    function updateData(e){
        e.preventDefault();


        //create javascript obj
        const updateBidding = {
            setPrice,
            cusName,
            cusPhone
        }
    

        if(bids.setPrice<setPrice){
            axios.put("http://localhost:8070/bidding/update/"+id ,updateBidding).then(()=>{
            alert("BIdding Update Succsesful")
            navigate('/bidstore')
        })
        .catch((err)=>{
            alert("Somthing went wrong")
        });
        }
        else{
            alert("The bid price must be higher than the current price")
        }
    };
    let total = bids.quantity * bids.setPrice;

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
                            <p>START PRICE :</p>
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
                            <p>Currunt Price :</p>
                        </div>
                        <div className="col-md-6">
                            <p>{bids.setPrice}</p>
                        </div>
                    </div>


                        </div>

                        

                        <div className="col-md-4">


                    </div>
                    </div>

                    <form  onSubmit={updateData}>
                        <div className="row">
                        <input type="number" placeholder="Set Your Price" className="bid-update-input" required
                            onChange={(e)=>{
                                setsetPrice(e.target.value);
                            }}
                            ></input>

                        <input type="text" placeholder="Enter Your Name" className="bid-update-input" required
                            onChange={(e)=>{
                                setcusName(e.target.value);
                            }}
                            ></input>

                        <input type="number" placeholder="Enter Your Mobile Number" className="bid-update-input" required
                            onChange={(e)=>{
                                setcusPhone(e.target.value);
                            }}
                            ></input>
                        </div>
                        <div className="row">
                            <button type="submit" className="bid-btn-update">SET PRICE</button>
                        </div>
                    </form>
                    <div className="row">
                           <Link to={'/bidstore'}><button className="bid-btn-cencel">Cancel</button></Link>
                        </div>
                </div>
            </div>
        </div>
    )
}