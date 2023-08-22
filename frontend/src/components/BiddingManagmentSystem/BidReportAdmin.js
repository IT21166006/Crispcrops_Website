//import react
import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
//import axios
import axios from "axios"; 
import jsPDF from 'jspdf' ;
import 'jspdf-autotable';

export default function BidReportAdmin(){

    
            
        const [users, setUsers] = useState([]);
        const [bids , setbids] = useState([]);
        const [searchInput, setSearchInput] = useState("");

        function searchUser() {
            if (searchInput !== "") {
              axios
                .get(`http://localhost:8070/bidding/search/${searchInput}`)
                .then((res) => {
                    setUsers(res.data);
                })
                .catch((err) => {
                });
            } else {
              axios
                .get('http://localhost:8070/bidding/store')
                .then((res) => {
                    setUsers(res.data);
                })
                .catch((err) => {
                  alert(err.message);
                });
            }
          }
          
          useEffect(() => {
            const delayDebounceFn = setTimeout(() => {
              searchUser();
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
          }, [searchInput]);

        function getUsers() {
            axios
            .get("http://localhost:8070/bidding/store")
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

        function handlePdfGeneration() {
            const doc = new jsPDF();

            const title2 =[["CRIPS CROPS BIDDINGS"]]
            // Set table header
            const header = [["bidID", "item Name", "Quantity", "Price", "Farm",]];

            // Add data rows
            const data = users.map(user => [user.bidID, user.itemName, user.quantity+"kg", user.price+"LKR", user.farm]);

            // Add table to document
            doc.autoTable({ head:title2 });
            doc.autoTable({ head:header, body: data });

            // Download the PDF document
            doc.save('Bidding Report.pdf');
        }
        let total = 0;

        //fetch
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
            if (window.confirm('Do you want to delete "' + i.name + '" ?')) {
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
    

        

    return(
        <div>
            <body>
                <section id="content">
                <br>
                </br>
                <br>
                </br>
                    <main>
                        <div className="container">
                        <div className="row bid-report-admin-title">
                        <div className="row">
                            <div className="col-md-5">
                                <h2>ADMIN BID REPORT</h2>     
                            </div>
                                    <div className="col-md-4">
                                        <div className="">
                                            <input type="text" className="bid-report-search-admin" placeholder="Search" value={searchInput}
                                            onChange={(e) => setSearchInput(e.target.value)}/>
                                            <div className="" onClick={getUsers}>
                                                <div className="">
                                                    <i className=""></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            <div className="col-md-2">
                                <button  className="bid-btn-genreport-admin" onClick={handlePdfGeneration}>
                                    Generate PDF
                                </button>
                            </div>
                        </div>
                        </div>
                        </div>

                        <div className="container">
                        <div className="table">
                            <table className="table-striped">
                                <thead>
                                <tr>
                                        <th className="bid-Admin-table-head">Bid Id</th>
                                        <th className="bid-Admin-table-head">Item Name</th>
                                        <th className="bid-Admin-table-head">Quantity</th>
                                        <th className="bid-Admin-table-head">Farm</th>
                                        <th className="bid-Admin-table-head">Unit  Price</th>
                                        <th className="bid-Admin-table-head">Total Price</th>
                                        <th className="bid-Admin-table-head">Delete Option</th>
                                    <th></th>
                                </tr>
                                </thead>
                                
                                <tbody>
                                {users.map((i, index) => {
                                total = i.price*i.quantity;
                                    return (
                                        <tr key={index}>
                                        <td className="bid-Admin-table-body"> {i.bidID}</td>
                                        <td className="bid-Admin-table-body">{i.itemName}</td>
                                        <td className="bid-Admin-table-body">{i.quantity+"kg"}</td>
                                        <td className="bid-Admin-table-body">{i.farm}</td>
                                        <td className="bid-Admin-table-body">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(i.price)}</td>
                                        
                                        <td className="bid-Admin-table-body">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(total)}</td>
                                        <td className="bid-Admin-table-body" ><button type="button" className=" bid-del-Admin" onClick={()=>deletedata(i)} >DELETE</button></td>
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