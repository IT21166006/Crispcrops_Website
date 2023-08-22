import React,{useState} from "react";
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom";

export default function SetPrice(){

    const navigate = useNavigate();
    const {bidID} = useParams();
    const [price, setprice] = useState("");


      function setBidPrice(e){
        e.preventDefault();

        const upBidding ={
            price
        }
        axios
        .put('http://localhost:8070/bidding/update/'+bidID, upBidding)
        .then(() => {
            // console.log(response.data);
            alert("Price Updated");
            navigate('/store');
        })
        .catch((error) => {
            alert("Error with update Price");
        });
      };


    return(
        <div className="container">
            <form onSubmit={setBidPrice}>
            <input type="number" className="form-control" id="bidID" placeholder="Bid ID"
                    onChange={(e)=>{
                        setprice(e.target.value);
                    }}></input>
            <button type="submit" className="btn btn-primary">Save</button>
            <Link to={'/store'}><button className="btn btn-danger">Cancel</button></Link>

            </form>
        </div>
     )
    
    }