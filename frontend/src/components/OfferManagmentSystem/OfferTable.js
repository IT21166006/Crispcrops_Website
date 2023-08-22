import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Offertable() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Fetch data
  function getUsers() {
    axios
      .get("http://localhost:8070/offers/")
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

  // Delete data
  function deletedata(i) {
    if (window.confirm('Do you want to delete "' + i.offername + '" ?')) {
      axios
        .delete("http://localhost:8070/offers/delete/" + i._id)
        .then(() => {
          getUsers();
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  // Search data
  function searchUser() {
    if (searchInput !== "") {
      axios
        .get(`http://localhost:8070/offers/search/${searchInput}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      axios
        .get(`http://localhost:8070/offers`)
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
  }, [searchInput]);
  
  return (
    <div className="container" class="align-middle">
            <body>
              
                <section id="content">
                    <main>
                        <div className="head-title">
                            <div className="left">
                               <center> <h1 className="  manageoffertitle">MANAGE OFFERS</h1></center>
                                
                            </div>
                            
                            </div>

                            <div className="table-data" style={{ width: '100%', paddingRight: '20px' }}>
                                <div className="order">
                                    <div className="head">
                                        <h3>Search Your Offer By Name</h3>
                                        <div class="col-auto">
                                            <div class="input-group mb-2">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="inlineFormInputGroup"
                                                    placeholder="Search"
                                                    value={searchInput}
                                                    onChange={(e) => setSearchInput(e.target.value)}/>
                                                <div class="input-group-prepend" onClick={getUsers}>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <br></br>
                                <br></br>

                                <h3>Offer Table</h3>
                                <br></br>


                                <table className="table">
                                
                                    <thead>
                                        <tr>
                                            <th><h3>Offer Id</h3></th>
                                            <th><h3>Offer Name</h3></th>
                                            <th><h3>Offer Type</h3></th>
                                            <th><h3>Offer Persontage</h3></th>
                                            <th><h3>Offer Start Date</h3></th>
                                            <th><h3>Offer End Date</h3></th>
                                            <th><h3>Offer Description</h3></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {users.map((i, index)=>{
                                                return(
                                                    <tr>



                                                        <td>{i.offerid}</td>
                                                        <td>{i.offername}</td>
                                                        <td>{i.offertype}</td>
                                                        <td>{i.offerpersontage}</td>
                                                        <td>{i.venuestartdate}</td>
                                                        <td>{i.venueenddate}</td>
                                                        <td>{i.offerdiscription}</td>


                                                        
                                                        <td><Link to={`/updateoffer/${i._id}`}><button type="button" className="btn btn-outline-success btn-sm" >Edit</button></Link></td>
                                                        
                                                        <td><button type="button" className="btn btn-outline-danger btn-sm" onClick={(()=>deletedata(i))}>Remove</button></td>
                                                    </tr>
                                                    
                                                )
                                            })}
                                    </tbody>
                                </table>
                                
                                <br></br>

                                <td><Link to={`/offerpdf`}><button type="button" className="btn btn-outline-success btn-sm" >Report Genaration</button></Link></td>

                                <td><div className="newofferbtn">
                            <Link to={"/createoffer"} ><button type="button" className="btn btn-outline-success btn-sm">  
                                <i className="bx bx-user-plus"></i>
                                <span className="text">Create Offer</span>
                                </button>
                            </Link>
                            </div></td>
                            </div>
                        </div>
                    </main>
                </section>
            </body>
            </div>
    )
}
  export default Offertable