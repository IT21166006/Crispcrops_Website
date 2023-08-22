import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import 'jspdf-autotable'


export default function FarmerReportAdmin() {
  const [farmers, setFarmers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Fetch data
  function getUsers() {
    axios
      .get("http://localhost:8070/farmer/display")
      .then((res) => {
        setFarmers(res.data);
      
      })
      .catch((err) => {
        alert(err.message);
      });
    setSearchInput("");
  }

  useEffect(() => {
    getUsers();
  }, []);

  // Delete data
  function deletedata(i) {
    if (window.confirm('Do you want to delete "' + i.fname + '" ?')) {
      axios
        .delete("http://localhost:8070/farmer/delete/" + i._id)
        .then(() => {
          getUsers();
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  // //Report Generation
  function handlePdfGeneration() {
    const doc = new jsPDF();   

    const header = [["First Name","Last Name", "Province", "Email", "Contact", "Harvest Type"]];

    const data = farmers.map(farmer => [farmer.fname , farmer.lname, farmer.province, farmer.email, farmer.cno, farmer.hType]);

    // Add to document
    doc.autoTable({head: header, body: data });

    doc.save('Farmer_List.pdf')
  }


  // Search data
  function searchUser() {
    if (searchInput !== "") {
      axios
        .get(`http://localhost:8070/farmer/search/${searchInput}`)
        .then((res) => {
            setFarmers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      axios
        .get(`http://localhost:8070/farmer/display`)
        .then((res) => {
            setFarmers(res.data);
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
  }, [searchInput]);
  
  return (
            <body>
                <section id="content">
                    <main>
                        <div className="headList">
                                <h1>Farmer List</h1>
                               <hr></hr>
                            </div>

                            <div className="searchIn">
                                                <input
                                                    type="text"
                                                    id="inlineFormInputGroup"
                                                    placeholder="Search by first name"
                                                    value={searchInput}
                                                    onChange={(e) => setSearchInput(e.target.value)}/>
                                                    </div>

                            <div className="table-data">
                                <div className="order">
                                    <div className="head">
                                        
                                        <div>
                                            <div >
                                              
                                            </div>
                                        </div>
                                </div>

                                <div className="container">
                                  <div className="report-box">
                                  <table className="table">
                                    <thead className="thead-dark">
                                      <tr className="">
                                        <th >First Name</th>
                                        <th >Last Name</th>
                                        <th>Address</th>
                                        <th>Province</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Harvest Type</th>
                                        {/* <th className="">Edit</th> */}
                                        <th className="">Delete</th>
                                      </tr>
                                    </thead>
                                    <tbody className="effect">
                                      {farmers.map((i, index) => {
                                        return (
                                          <tr key={index}>
                                            <td>{i.fname}</td>
                                            <td>{i.lname}</td>
                                            <td>{i.address}</td>
                                            <td>{i.province}</td>
                                            <td>{i.email}</td>
                                            <td>{i.cno}</td>
                                            <td>{i.hType}</td>
                                            {/* <td><a className="btn-edit" href={`/updateFarmer/${i._id}`} ><i className="fa fa-edit">&nbsp;</i></a></td> */}
                                          
                                            <td><button type="button" className="btn-dlt"><i className="fa fa-trash" onClick={(()=>deletedata(i))}></i></button></td>

                                          </tr>
                                        )
                                      })}
                                    </tbody>
                                  </table>

                                  <div className="reportGen">
                                    <button type="button" className="btn-reportGen" onClick={handlePdfGeneration}>Generate PDF</button>
                                  </div>
                                  </div>
                                  </div>
                                <br></br>
                            </div>
                        </div>
                    </main>
                </section>
            </body>
    )
}
