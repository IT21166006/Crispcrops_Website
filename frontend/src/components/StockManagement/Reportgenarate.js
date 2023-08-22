import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import axios from "axios";
import { Link } from "react-router-dom";



import 'jspdf-autotable';

export default function Stockreport() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

  function handlePdfGeneration() {
    const doc = new jsPDF();

    // Set table header
    const header = [["Id", "famer Name", "Item Name", "Quantity", "Buying Unit price", "Date",]];

    // Add data rows
    const data = users.map(user => [user.ItemId, user.famer, user.ItemName, user.quantity, user.price,user.sdate,user.total]);

    // Add table to document
    doc.autoTable({ head: header, body: data });

    // Download the PDF document
    doc.save('Stocks.pdf');
  }
  let total = 0;
  return (
    <body>
        <section id="content">
          <br>
          </br>
          <br>
          </br>
            <main>
                <div className="head-title">
                    <div className="left">
                    <div className="StockTOPIC">
                        <h1>Crips Crops Report</h1>
                        </div>
                        <br></br>
                                
                    </div>
                </div>
                <div className="container">
                <div className="table">
                    <table className="table-striped">
                        <thead>
                        <tr>
                                <th className="stk-tableh">Id</th>
                                <th className="stk-tableh">Famer Name</th>
                                <th className="stk-tableh">Item Name</th>
                                <th className="stk-tableh">Quantity</th>
                                <th className="stk-tableh">Buying Unit price</th>
                                <th className="stk-tableh">Date</th>
                                <th className="stk-tableh">total</th>
                            <th></th>
                        </tr>
                        </thead>
                        
                        <tbody>
                        {users.map((i, index) => {
                           total = i.quantity*i.price;
                            return (
                                <tr key={index}>
                                <td className="stk-tableb">{i.ItemId}</td>
                                <td className="stk-tableb">{i.famer}</td>
                                <td className="stk-tableb">{i.ItemName}</td>
                                <td className="stk-tableb">{i.quantity}</td>
                                <td className="stk-tableb">{i.price}</td>
                                <td className="stk-tableb">{i.sdate}</td>
                                <td className="stk-tableb">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(total)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <br></br>
                    <button  className='btn btn-primary' onClick={handlePdfGeneration}>
                    Generate PDF
                </button>
                    </div>
                </div>
                
            </main>
        </section>
        
     </body>
  );
}