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

export default function Genreport() {
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
    const data = users.map(user => [user.name , user.mobilenumber, user.userName, user.email,  user.vehicleType]);

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
      
      
       <button className="Del-Home-btn" onClick={()=>navigate(`/deldashboard/`)}>Home</button>           
      <button type="button" class="Del-Generate-btn" onClick={handlePdfGeneration}>
              Generate PDF
            </button>
            

            <div className="container">
              <div className="col-auto">
                    <div className="input-group md-2">
                        <input
                          type="text"
                          className="Del-Search"
                          id="inlineFormInputGroup"
                          placeholder="Search"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}/>
                          <div className="input-group-prepend" onClick={getUsers}></div>
                    </div>
              </div>
            </div>



           
      <div className="container">
      <div className="Del-report-box">
      <table className="table Del-table">
        <thead className="thead-dark">
          <tr className="">
            <th >Name</th>
            
            <th>Mobile Number</th>
            <th>User Name</th>
            <th>Email</th>
            
            <th>Vehicle Type</th>
            <th className="">Edit</th>
            <th className="">Delete</th>
          </tr>
        </thead>
        <tbody > {/* effect */}
          {users.map((i, index) => {
            return (
              <tr className="del-table" key={index}>
                <td className="del-table">{i.name}</td>
                
                <td className="del-table">{i.mobilenumber}</td>
                <td className="del-table">{i.userName}</td>
                <td className="del-table">{i.email}</td>
                
                <td className="del-table">{i.vehicleType}</td>
                <td className="del-table"><a className="DelReport-btn-edit" href={`/editnow/${i._id}`} ><i className="fas fa-edit">&nbsp;</i></a></td>
                {/*<td><button type="button" className=""><i className="fas fa-edit" onClick={(()=>deleteDelevery(i))} ></i> */ }
                <td><button type="button" className="DelReport-btn-delete"><i className="fa fa-trash" onClick={(()=>deleteDelevery(i))}></i></button></td>

      
                
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




