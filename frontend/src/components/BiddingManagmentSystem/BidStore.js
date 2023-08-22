//import react
import React,{useState,useEffect} from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
//import axios
import axios from "axios"; 

//export function create bid
export default function BidStore(){
    
    const {id} = useParams();

    const navigate = useNavigate()

    const [bids , setbids] = useState([]);
  
    
    // Fetch data
    function getBids() {
      axios
        .get("http://localhost:8070/bidding/store")
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




    //delete
    function deletedata(i) {
        if (window.confirm('Do you want to delete "' + i.itemName + '"')) {
          axios
            .delete("http://localhost:8070/bidding/delete/" + i._id)
            .then(() => {
              getBids();
            })
            .catch((err) => {
              alert(err);
            });
        }
      }

      let total = 0;

    
    return(
        <div>
            <div class="bid-image-bg-hd">
                <h1>CRIPS CROPS BIDS</h1>
                <h4>Buy and Sell you wont</h4>
            </div>

            
            <div className="container">
                
            <div className="row bid-mar">
                <div className="col-md-12 ">
                    <div className="row">
                        <main>
                                <div>
                                    <div>
                                    <table>

                                    <thead>
                                        <tr>
                                                <th className="bid-details-width-head">Bid Id</th>
                                                <th className="bid-details-width-head">Item Name</th>
                                                <th className="bid-details-width-head">Unit  Price</th>
                                                <th className="bid-details-width-head">Quantity</th>
                                                <th className="bid-details-width-head">Farm</th>
                                                <th className="bid-details-width-head">Totat Price</th>
                                                <th className="bid-details-width-head">Contact</th>
                                                <th className="bid-details-width-head">Details</th>
                                        </tr>
                                    </thead>

                                        <tbody className="bid-details">
                                                {bids.map((i, index)=>{
                                                    total = i.price*i.quantity;
                                                    return(
                                                        <tr>
                                                            <td className="bid-details-width">{i.bidID}</td>
                                                            <td className="bid-details-width">{i.itemName}</td>
                                                            <td className="bid-details-width">{i.price+"LKR"}</td>
                                                            <td className="bid-details-width">{i.quantity+"kg"}</td>
                                                            <td className="bid-details-width">{i.farm}</td>
                                                            <td className="bid-details-width">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(total)}</td>
                                                            <td className="bid-details-width">{i.idNo}</td>
                                                            <td className="bid-details-width" ><Link to={`/biddetails/${i._id}`}><button type="button" className="bid-btn-showmore">SET PRICE</button></Link></td>
                                                            
                                                        </tr>
                                                    )
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>                            
            </div>
        </div>
    </div>
    )
}
