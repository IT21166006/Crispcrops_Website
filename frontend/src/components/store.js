//import react
import React,{useState,useEffect} from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import jsPDF from 'jspdf';
import axios from "axios";
//import axios

//export function create bid
export default function Store(){
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [qty, setqty] = useState("");
  
    function getUsers() {
      axios
        .get("http://localhost:8070/stock/")
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
      setSearchInput("");
    }
  
    useEffect(() => {
      getUsers();
    }, []);
  
    
    let total = 0;
    let subtotal = 0;
  return (
    <body container>
        <section id="content">
          <br>
          </br>
          <br>
          </br>
            <main>
                <div className="head-title">
                    <div className="left">
                    <div className="StockTOPIC">
                        <h1>Crips Crops Report</h1>
                        </div>
                        <br></br>
                                
                    </div>
                </div>
                <div className="container">
                <div className="table">
                    <table className="table-striped">
                        <thead>
                        <tr>
                                <th className="stk-tableh">Id</th>
                                <th className="stk-tableh">Item Name</th>
                                <th className="stk-tableh">price</th>
                                <th className="stk-tableh">Date</th>
                                <th className="stk-tableh"></th>
                            <th></th>
                        </tr>
                        </thead>
                        
                        <tbody>
                        {users.map((i, index) => {
                           total = i.price+i.price*20/100;
                           subtotal = qty * total;
                            return (
                                <tr key={index}>
                                <td className="stk-tableb">{i.ItemId}</td>
                                <td className="stk-tableb">{i.ItemName}</td>
                                <td className="stk-tableb">{total+"LKR"}</td>
                                <td className="stk-tableb">{i.sdate}</td>
                                <td className="stk-tableb"><input type="number" placeholder="quantity in kg"
                                onChange={(e)=>{
                                  setqty(e.target.value);
                              }}></input></td>
                                <td className="stk-tableb"><Link to={'/Payment/'+subtotal}><button className="bid-btn-buy">Buy</button></Link></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <br></br>
                    </div>
                </div>
                
            </main>
        </section>
        
     </body>
  );
}