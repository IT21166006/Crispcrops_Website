//import react
import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
//import axios
import axios from "axios"; 
import jsPDF from 'jspdf' ;
import 'jspdf-autotable';

export default function CustomerReportAdmin(){

            
        const [users, setUsers] = useState([]);
        const [bids , setbids] = useState([]);
        const [searchInput, setSearchInput] = useState("");

        function searchUser() {
            if (searchInput !== "") {
              axios
                .get(`http://localhost:8070/customer/search/${searchInput}`)//search
                .then((res) => {
                    setUsers(res.data);
                })
                .catch((err) => {
                });
            } else {
              axios
                .get('http://localhost:8070/customer/') //fetch
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
            .get("http://localhost:8070/customer/")
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

            // Set table header
    const header = [["first_name", "last_name", "phone_no", "address", "province", "age", "email"]];

    // Add data rows
    const data = users.map(user => [user.first_name, user.last_name, user.phone_no, user.address, user.province, user.age, user.email, ]);

    // Add table to document
    doc.autoTable({ head: header, body: data });

    // Download the PDF document
    doc.save('report.pdf');
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
                .delete("http://localhost:8070/customer/delete/"+ i._id)
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
                                <h2>ADMIN CUSTOMER REPORT</h2>     
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
                                        <th className="bid-Admin-table-head">First Name</th>
                                        <th className="bid-Admin-table-head">Last Name</th>
                                        <th className="bid-Admin-table-head">Phone No</th>
                                        <th className="bid-Admin-table-head">Address</th>
                                        <th className="bid-Admin-table-head">Province</th>
                                        <th className="bid-Admin-table-head">Age</th>
                                        <th className="bid-Admin-table-head">Email</th>
                                        <th className="bid-Admin-table-head">Delete</th>
                                    <th></th>
                                </tr>
                                </thead>
                                
                                <tbody>
                                {users.map((i, index) => {
                                    return (
                                        <tr key={index}>
                                        <td className="bid-Admin-table-body">{i.first_name}</td>
                                        <td className="bid-Admin-table-body">{i.last_name}</td>
                                        <td className="bid-Admin-table-body">{i.phone_no}</td>
                                        <td className="bid-Admin-table-body">{i.address}</td>
                                        <td className="bid-Admin-table-body">{i.province}</td>
                                        <td className="bid-Admin-table-body">{i.age}</td>
                                        <td className="bid-Admin-table-body">{i.email}</td>
                                       
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