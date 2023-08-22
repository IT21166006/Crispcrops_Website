//import react
import React,{useState,useEffect} from "react";
import {Link,useParams} from "react-router-dom";
//import axios
import axios from "axios"; 
import jsPDF from 'jspdf' ;
import 'jspdf-autotable';

export default function BidReport(){

    
        const {idNo} = useParams();    
        const [users, setUsers] = useState([]);
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
                .get(`http://localhost:8070/bidding/select_own/${idNo}`)
                .then((res) => {
                    setUsers(res.data);
                })
                .catch((err) => {
                //   alert(err.message);
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
            .get(`http://localhost:8070/bidding/select_own/${idNo}`)
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

        

    return(
        <div className="container">
            <body>
                <section id="content">
                <br>
                </br>
                <br>
                </br>
                    <main>
                        <div className="row bid-report-head">
                            <div className="col-md-5">
                                <h2>Crips Crops Bidding Report</h2>     
                            </div>
                            <div className="col-md-4">
                                <div className="">
                                        <div className="">
                                            <input type="text" className="bid-report-search" placeholder="Search" value={searchInput}
                                            onChange={(e) => setSearchInput(e.target.value)}/>
                                            <div className="" onClick={getUsers}>
                                                <div className="">
                                                    <i className=""></i>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <button  className="bid-btn-reportdownload" onClick={handlePdfGeneration}>
                                    Generate PDF
                                </button>
                            </div>
                            <br></br>
                        </div>
                        <div className="row">
                            <br></br>
                        </div>
                            

                        <div className="container">
                        <div className="">
                            <table className="">
                                <thead>
                                <tr>
                                        <th className="bid-report-table">Bid Id</th>
                                        <th className="bid-report-table">Item Name</th>
                                        <th className="bid-report-table">Quantity</th>
                                        <th className="bid-report-table">Farm</th>
                                        <th className="bid-report-table">Unit  Price</th>
                                        <th className="bid-report-table">Total Price</th>
                                    <th></th>
                                </tr>
                                </thead>
                                
                                <tbody>
                                {users.map((i, index) => {
                                total = i.price*i.quantity;
                                    return (
                                        <tr key={index}>
                                        <td className="bid-report-table-body">{i.bidID}</td>
                                        <td className="bid-report-table-body">{i.itemName}</td>
                                        <td className="bid-report-table-body">{i.quantity+"kg"}</td>
                                        <td className="bid-report-table-body">{i.farm}</td>
                                        <td className="bid-report-table-body">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(i.price)}</td>
                                        
                                        <td className="bid-report-table-body">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(total)}</td>
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