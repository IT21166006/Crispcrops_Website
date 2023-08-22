import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from "axios";
import { Link } from "react-router-dom";

import 'jspdf-autotable';

function handlePdfGeneration() {
  const doc = new jsPDF();
  doc.autoTable({ html: '#my-table' });
  doc.save('example.pdf');
}

export default function GenreportCustomer() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
    const data = users.map(user => [user.first_name, user.last_name, user.phone_no, user.address, user. province, user.age, user.email, ]);

    // Add table to document
    doc.autoTable({ head: header, body: data });

    // Download the PDF document
    doc.save('report.pdf');
  }



  function deletecustomer(i) {
    if (window.confirm('Do you want to delete "' + i.name + '" ?')) {
      axios
        .delete("http://localhost:8070/customer/delete/" + i._id)
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
        .get(`http://localhost:8070/customer/search/${searchInput}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      axios
        .get(`http://localhost:8070/customer/`)
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
    <div>
      <div className = "cus-search">
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
      <button className="cus-pdf-btn" type="button"  onClick={handlePdfGeneration}>Generate PDF</button>
      
      <div className="container">
      <div className="cus-generate-box">
      <table className="table ">
        
        <thead className="thead-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>province</th>
            <th>Age</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((i, index) => {
            return (
              <tr className="cus-or" key={index}>
                <td>{i.first_name}</td>
                <td>{i.last_name}</td>
                <td>{i.phone_no}</td>
                <td>{i.address}</td>
                <td>{i.province}</td>
                <td>{i.age}</td>
                <td>{i.email}</td>
                <td><a className="cus-edit-btn-icon" href={`/updateCustomer/${i._id}`}><i className="fas fa-edit"></i></a></td>
                <td><button type="button" className="cus-delete-btn-icon"><i className="fa fa-trash" onClick={(()=>deletecustomer(i))}></i></button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>

    </div>
    </div>
    </div>
  );
}