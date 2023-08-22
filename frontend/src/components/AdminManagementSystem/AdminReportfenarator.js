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

export default function AdminRepogen() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

  function handlePdfGeneration() {
    const doc = new jsPDF();



    // Set table header
    const header = [["username", "fullName", "email", "password"]];

    // Add data rows
    const data = users.map(user => [user.username, user.fullName, user.email, user.password]);

    // Add table to document
    doc.autoTable({ head: header, body: data });

    // Download the PDF document
    doc.save('offers.pdf');
  }

  return (
    <div>
      <table className="table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Password</th>
            
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((i, index) => {
            return (
              <tr key={index}>
                <td>{i.username}</td>
                <td>{i.fullName}</td>
                <td>{i.email}</td>
                <td>{i.password}</td>
              
                
              </tr>
            )
          })}
        </tbody>
      </table>

      <button onClick={handlePdfGeneration}>
        Generate Customer PDF
      </button>
    </div>
  );
}