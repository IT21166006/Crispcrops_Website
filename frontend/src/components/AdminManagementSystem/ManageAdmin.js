import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ManageAdmin() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Fetch data
  function getUsers() {
    axios
      .get("http://localhost:8070/admin/")
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
        .delete("http://localhost:8070/admin/delete/" + i._id)
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
        .get(`http://localhost:8070/admin/search/${searchInput}`)
        .then((res) => {
                  setUsers(res.data);
                })
                .catch((err) => {
                  alert(err.message);
                });
            } else {
              axios
                .get(`http://localhost:8070/admin`)
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchUser();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  return (
            <body className="container">
                <section id="content">
                    <main>
                       <div className="table-data">
                                <div className="order">
                                    <div className="head admn-management-title">
                                        <h3>Manage Admin</h3>
                                        <div className="col-auto">
                                            <div className="input-group mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="inlineFormInputGroup"
                                                    placeholder="Search"
                                                    value={searchInput}
                                                    onChange={(e) => setSearchInput(e.target.value)}/>
                                                <div className="input-group-prepend" onClick={getUsers}>
                                                    <div className="input-group-text">
                                                        <i className="bx bx-x"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="admn-manage-bg">
                                <table className="table-striped">
                                    <thead>
                                        <tr>
                                            <th className="admn-manage-table-head1">username</th>
                                            <th className="admn-manage-table-head">fullName</th>
                                            <th className="admn-manage-table-head">email</th>
                                            <th className="admn-manage-table-head">password</th>
                                            <th className="admn-manage-table-head"></th>
                                            <th className="admn-manage-table-head"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {users.map((i, index)=>{
                                                return(
                                                    <tr>
                                                        <td className="admn-manage-table-body">{i.username}</td>
                                                        <td className="admn-manage-table-body">{i.fullName}</td>
                                                        <td className="admn-manage-table-body">{i.email}</td>
                                                        <td className="admn-manage-table-body">{i.password}</td>
                                                        <td className="admn-manage-table-body"><Link to={`/EditAdmin/${i._id}`}><button type="button" className="admn-manage-update-btn" >Edit</button></Link></td>
                                                        <td className="admn-manage-table-body"><button type="button" className="admn-manage-delete-btn" onClick={(()=>deletedata(i))}>Remove</button></td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            </body>
    )
}
  export default ManageAdmin