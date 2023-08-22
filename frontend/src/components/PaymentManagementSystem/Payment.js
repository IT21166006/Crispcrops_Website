import React, { useState } from "react";
import axios from "axios";
import {useParams, useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const {subtotal} = useParams();


  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [Date, setDate] = useState("");

  function setData(e) {
    e.preventDefault();

    const newPayment = {
      name,
      phone,
      subtotal,
      Date,
    };

    axios
      .post("http://localhost:8070/payment/add", newPayment)
      .then(() => {
        alert("Successfully Saved ✅");
        navigate('/store')
      })
      .catch((err) => {
        alert("Not Saved ❗");
      });
  }

  return (
    <div className="container">
      <br></br>
      <div className="pay-title-edit">
        <h1>Easy Payment with Your credit card</h1>
      </div>
      <section className="pay-form-box">
        <div className="row fullform">
          <div className="col-md-2"></div>
          <form className="col-md-7" onSubmit={setData}>
            <div>
              <p className="pay-sub-total">Your Sub total is {subtotal} LKR</p>
              <p>Pleace fill this form for complete your order.</p>
            </div>
            <input type="text" className="row pay-input-box" placeholder="Full Name " 
            onChange={(e)=>{
              setname(e.target.value);
          }}></input>
            <input type="number" className="row pay-input-box" placeholder="Mobile Number "
            onChange={(e)=>{
              setphone(e.target.value);
          }}></input>
            <input type="date" className="row pay-input-box" placeholder="date " 
            onChange={(e)=>{
              setDate(e.target.value);
          }}></input>
          <button>Add Payment</button>
          </form>
          <div className="col-md-2"></div>
        </div>
      </section>
      <hr></hr>
    </div>
  );
}
