import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageItems() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Fetch data
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

  // Delete data
  function deletedata(i) {
    if (window.confirm('Do you want to delete "' + i.name + '" ?')) {
      axios
        .delete("http://localhost:8070/stock/delete/" + i._id)
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
        .get(`http://localhost:8070/stock/search/${searchInput}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      getUsers();
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchUser();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);
  let total = 0;

  return (
    <div className="container">
      <div className="">
      <body>
                <section id="content">
                    <main>
                        <div className="">
                            <div className="left">
                              <br></br>
                              <div className="StockTOPIC">
                                <h1>Manage Items</h1>
                                </div>
                                <ul className="breadcrumb">
                                    
                                </ul>
                            </div>
                            <Link to={"/AddStock"} className="btn btn-success stk-button">
                            <i class='bx bxs-add-to-queue' ></i>
                                <span className="text">Add Stock</span>
                            </Link>
                            <Link to={"/Stockreport"} className="btn btn-warning">
                              <i class='bx bxs-report'></i>
                                <span className="text">Reportgenarate</span>
                            </Link>
                            </div>

                            <div className="">
                                <div className="order">
                                    <div className="head">
                                        <h3>Manage Item</h3>
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
                                                    <div class="input-group-text">
                                                        <i class="bx bx-x"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>

                                <table className="">
                                    <thead>
                                        <tr>
                                            <th className="stk-tableh">ID</th>
                                            <th className="stk-tableh">Famer Name</th>
                                            <th className="stk-tableh">Item Name</th>
                                            <th className="stk-tableh">Quantity (Max=100)</th>
                                            <th className="stk-tableh"> Reoder Level (KG)</th>
                                            <th className="stk-tableh">Buying Unit price (LKR)</th>
                                            <th className="stk-tableh">Date</th>
                                            <th className="stk-tableh">Total</th>
                                            <th className="stk-tableh"></th>
                                            <th className="stk-tableh"></th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {users.map((i, index)=>{
                                               total = i.quantity*i.price;
                                                return(
                                                    <tr>
                                                        <td className="stk-tableb">{i.ItemId}</td>
                                                        <td className="stk-tableb">{i.famer}</td>
                                                        <td className="stk-tableb">{i.ItemName}</td>
                                                        <td className="stk-tableb">{i.quantity}</td>
                                                        <td className="stk-tableb">{100-i.quantity}</td>
                                                        <td className="stk-tableb">{i.price}</td>
                                                        <td className="stk-tableb">{i.sdate}</td>
                                                        <td className="stk-tableb">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(total)}</td>
                                                        <td className="stk-tableb"><Link to={`/EditStock/${i._id}`}><button type="button" className=" btn btn-success" >Update</button></Link></td>
                                                        <td className="stk-tableb"><button type="button" className="btn btn-danger" onClick={(()=>deletedata(i))}>Remove</button></td>
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
    </div>
    )
}
  export default ManageItems