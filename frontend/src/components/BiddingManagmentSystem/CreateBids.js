//import react
import React,{useState,useEffect} from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
//import axios
import axios from "axios"; 

//export function create bid
export default function CreateBids(){
    
    const {id} = useParams();
    const {idNo} = useParams();

    const navigate = useNavigate()
    //create variebles to inputs
    const [itemName, setitemName] = useState("");
    const [bidID, setbidID] = useState("");
    const [quantity, setquantity] = useState("");
    // const [idNo, setidNo] = useState("");
    const [price, setprice] = useState("");
    const [farm, setfarm] = useState("");
    const [phone, setphone] = useState("");

    const [bidedit, setbidedit] = useState({
        Price: ''

    });


    const [bids , setbids] = useState([]);
  
    
    // Fetch data
    function getBids() {
      axios
        .get("http://localhost:8070/bidding/select_own/"+idNo)
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



    //Create new Bid
    function sendData(e){
        e.preventDefault();



        //create javascript obj
        const newBidding = {
            itemName,
            bidID,
            quantity,
            idNo,
            price,
            farm,
            phone
        }

        //pass data to backend
        axios.post("http://localhost:8070/bidding/create",newBidding).then(()=>{
            alert("BIdding create Succsesful")
        })
        .catch((err)=>{
            alert("Somthing went wrong")
        });
    };

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

      //update

      const handleChange = (e) => {
        setbidedit({
          ...setbidedit,
          [e.target.name]: e.target.value
        });
      };
    
    return(
        <div>
            <div class="bid-image-bg-hd">
                <h1>CRIPS CROPS BIDS</h1>
                <h4>Buy and Sell you wont</h4>
            </div>
            <div className="container">
                
            <div className="row">
                <div className="col-md-3">
                    <br/>
                    <form onSubmit={sendData}>
                    
                    <div className="bid-create-form-head">
                        <h4>CREATE NEW BID</h4>
                    </div>
                    <div className="bid-create-form">
                        <div className="form-group">
                            <input type="text" className="bid-create"   placeholder="Item Name" required
                            onChange={(e)=>{
                                setitemName(e.target.value);
                            }}></input>
                        </div>

                        <div className="form-group">
                            <input type="number" className="bid-create" maxLength={3}  placeholder="Bid ID" 
                            onChange={(e)=>{
                                setbidID(e.target.value);
                            }}></input>
                        </div>

                        <div className="form-group">
                            <input type="number" className="bid-create" placeholder="Quantity(kg)"
                            onChange={(e)=>{
                                setquantity(e.target.value);
                            }}></input>
                        </div>

                        <div className="form-group">
                            <input type="number" className="bid-create" placeholder="ID No" maxLength={12} value={idNo}
                            // onChange={(e)=>{
                            //     setidNo(e.target.value)
                            // }}
                            ></input>
                        </div>

                        <div className="form-group">
                            <input type="number" className="bid-create" placeholder="Mobile Number" maxLength="10" 
                            onChange={(e)=>{
                                setphone(e.target.value)
                            }}
                            ></input>
                        </div>
        
                        <div className="form-group">
                            <input type="number" className="bid-create"  placeholder="Price per kg"
                            onChange={(e)=>{
                                setprice(e.target.value);
                            }}></input>
                        </div>

                        <div className="form-group">
                            <input type="text"className="bid-create" placeholder="Farm"
                            onChange={(e)=>{
                                setfarm(e.target.value);
                            }}></input>
                        </div>
                        <button type="submit" className="bid-create-btn">CREATE BID</button>
                        </div>
                    </form>
                    <div className="row">
                            <button type="submit" onClick={()=>navigate(`/genaratereportbid/${idNo}`)} className="bid-create-btn">GENARATE REPORT</button>
                        </div>
                </div>

                <div className="col-md-8 ">
                    <div className="row">
                        <main>
                                <div>
                                    <div>
                                    <table>

                                    <thead>
                                        <tr>
                                                <th className="bid-details-width-bidID">Bid Id</th>
                                                <th className="bid-details-width">Item Name</th>
                                                <th className="bid-details-width">Unit  Price</th>
                                                <th className="bid-details-width">Quantity</th>
                                                <th className="bid-details-width">Details</th>
                                                <th className="bid-details-width">Delete</th>
                                        </tr>
                                    </thead>

                                        <tbody className="bid-details">
                                                {bids.map((i, index)=>{
                                                    return(
                                                        <tr>
                                                            <td className="bid-details-width-bidID">{i.bidID}</td>
                                                            <td className="bid-details-width">{i.itemName}</td>
                                                            <td className="bid-details-width">{i.price+"LKR"}</td>
                                                            <td className="bid-details-width">{i.quantity+"kg"}</td>
                                                            <td className="bid-details-width" ><Link to={`/biddetailsfarmer/${i._id}`}><button type="button" className="bid-btn-showmore">SHOW MORE</button></Link></td>
                                                            <td className="bid-details-width" ><button type="button" className="bid-btn-delete" onClick={()=>deletedata(i)} >DELETE</button></td>
                                                            
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
