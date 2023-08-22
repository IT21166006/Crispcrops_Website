// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';

import jsPDF from 'jspdf';
import axios from "axios";
import { Link } from "react-router-dom";
// import reportImage from './crispcrops.png';

import 'jspdf-autotable';

export default function OfferPdf() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

  function handlePdfGeneration() {
    const doc = new jsPDF();

    // Set title
    doc.setFontSize(20);
    doc.text("Offer Report", 10, 20);

    // Set table header
    const header = [["Offer Id", "Offer Name", "Offer Type", "Offer Percentage", "Offer Start Date", "Offer End Date", "Offer Description"]];

    // Add data rows
    const data = users.map(user => [user.offerid, user.offername, user.offertype, user.offerpersontage, user.venuestartdate, user.venueenddate, user.offerdiscription]);

    // Add image
    const imgWidth = 30; // Adjust the width of the image as needed
    const imgHeight = 30; // Adjust the height of the image as needed
    // doc.addImage(reportImage, "PNG", 10, 30, imgWidth, imgHeight);



    // Add table to document
    doc.autoTable({ head: header, body: data, startY: 120 });

    // Download the PDF document
    doc.save('offers.pdf');
  }

  return (
    <div className='container'>
      <table className="table-striped">
        <thead>
          <tr>
            <th className='ofr-table-head'>Offer Id</th>
            <th className='ofr-table-head'>Offer Name</th>
            <th className='ofr-table-head'>Offer Type</th>
            <th className='ofr-table-head'>Offer Persontage</th>
            <th className='ofr-table-head'>Offer Start Date</th>
            <th className='ofr-table-head'>Offer End Date</th>
            <th className='ofr-table-head'>Offer Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((i, index) => {
            return (
              <tr key={index}>
                <td className='ofr-table-body'>{i.offerid}</td>
                <td className='ofr-table-body'>{i.offername}</td>
                <td className='ofr-table-body'>{i.offertype}</td>
                <td className='ofr-table-body'>{i.offerpersontage}</td>
                <td className='ofr-table-body'>{i.venuestartdate}</td>
                <td className='ofr-table-body'>{i.venueenddate}</td>
                <td className='ofr-table-body'>{i.offerdiscription}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <button className="btn btn-primary" onClick={handlePdfGeneration}>
        Generate PDF
      </button>
    </div>
  );
}
