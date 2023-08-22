import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from "axios";
import { Link ,useNavigate,useParams } from "react-router-dom";




import 'jspdf-autotable';
function handlePdfGeneration() {
  
  const doc = new jsPDF();
  doc.autoTable({ html: '#my-table' });
  doc.save('example.pdf');
}

export default function DeliveryReportAdmin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  function getUsers() {
    axios
      .get("http://localhost:8070/person/display")
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
    const header = [["name", "mobilenumber", "userName", "email", "vehicleType"]];

    // Add data rows
    const data = users.map(user => [user.name , user.mobilenumber, user.userName, user.email, user.vehicleType]);

    // Add table to document
    doc.autoTable({ head: header, body: data });

    // Download the PDF document
    doc.save('Dilivery.pdf');

    // Delete data
  

  }

  function deleteDelevery(i) {
    if (window.confirm('Do you want to delete "' + i.name + '" ?')) {
      axios
        .delete("http://localhost:8070/person/delete/" + i._id)
        .then(() => {
          getUsers();
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  //search function
  function searchUser() {
    if (searchInput !== "") {
      axios
        .get(`http://localhost:8070/person/search/${searchInput}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      axios
        .get(`http://localhost:8070/person/display`)
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
        <div className='container'><div className='Del-Gen-Report2-box'>
        <div className='row'>
            <div className='col-md-4'>
                <div className='Del-title'><h4>DELEVERY REPORT</h4></div>
            </div>
            <div className='col-md-4'>
            <div className="input-group md-2">
                        <input
                          type="text"
                          className="Del-Search2"
                          id="inlineFormInputGroup"
                          placeholder="Search"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}/>
                          <div className="input-group-prepend" onClick={getUsers}></div>
                    </div>
            </div>
            <div className='col-md-4'>
                <button type="button" class="Del-Generate-btn2" onClick={handlePdfGeneration}>
                Generate PDF
                </button>
            </div>
        </div>
        </div></div>



           
      <div className="container">
      <div className="Del-report-box2">
      <table className="table Del-table2">
        <thead className="thead-dark">
          <tr className="">
            <th >Name</th>
            
            <th>Mobile Number</th>
            <th>User Name</th>
            <th>Email</th>
            
            <th>Vehicle Type</th>
            
            <th className="">Delete</th>
          </tr>
        </thead>
        <tbody className=""> {/* effect */}
          {users.map((i, index) => {
            return (
              <tr key={index}>
                <td>{i.name}</td>
                
                <td>{i.mobilenumber}</td>
                <td>{i.userName}</td>
                <td>{i.email}</td>
                
                <td>{i.vehicleType}</td>
                
                
                <td><button type="button" className="DelReport-btn-delete" onClick={(()=>deleteDelevery(i))}>Delete</button></td>

      
                
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
      </div> 

      
    </div>
  );
}




