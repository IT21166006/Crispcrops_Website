//import react
import React,{useEffect, useState, Link} from "react";
//import axios
import axios from "axios"; 
//router dom
import {useNavigate,useParams} from "react-router-dom";

//export function get bid details
export default function CreateBids(){

    const navigate = useNavigate()
    const{bidID} = useParams();
    //const [bidID, setbidID] = useState();

    const [bidDetails, setbidDetails] = React.useState({
        itemName: "",
        bidID: "",
        quantity: "",
        price: "",
        farm: "",
        idNo:""
    })

     /*React.useEffect(() => {
         function getBid(){
             axios.get('http://localhost:8070/bidding/select/'+bidID.ID)
            .then((res) => {
                 setbidDetails(res.data.bidding)
                 console.log(res.data.bidding)
             }).catch((err) => {
                 console.log(err);
             });
         }
         getBid();
     }, [])*/

     const [Users , setUsers] = useState([]);
  
    
     // Fetch data
     function getBids() {
       axios
         .get("http://localhost:8070/bidding/select"+bidID)
         .then((res) => {
           setUsers(res.data);
         
         })
         .catch((err) => {
           alert(err.message);
         });
     }
   
     useEffect(() => {
       getBids();
     }, []);

    return(
        <div>
          <body>
                <section id="content">
                    <main>
                            <div className="table-data">
                                <div className="order">
                                <table className="table-striped">
                                    <thead>
                                        <tr>
                                            <th>Bid ID</th>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Farm</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {Users.map((i, index)=>{
                                                return(
                                                    <tr>
                                                        <td>{i.bidID}</td>
                                                        <td>{i.itemName}</td>
                                                        <td>{i.quantity}</td>
                                                        <td>{i.price}</td>
                                                        <td>{i.farm}</td>
                                                        <td><Link to={`/setprice/${i._id}`}><button type="button" className="btn btn-outline-success btn-sm" >Edit</button></Link></td>

                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </section>
            </body>
        </div>
    )
}