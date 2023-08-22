import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


export default function EditPayment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paymentEdit, setPaymentEdit] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    expDate: ""
  });

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/payment/get/${id}`);
        setPaymentEdit(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch payment data.");
      }
    };
    
    fetchPayment();
  }, [id]);
  

  const handleChange = (e) => {
    setPaymentEdit({
      ...paymentEdit,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/payment/update/${id}`, paymentEdit)
      .then((response) => {
        alert("Payment Updated");
        navigate("/paymentView");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <div>
      <br />
      <div className="container">
        <div className="e-pay-title-edit">
          <h1>EDIT Payment Details</h1>
        </div>
        <div className="pay-box-edit">
          <form onSubmit={handleSubmit}>
            <div className="row ">
              <div className="col-md-4">
                <label className="pay-edit-text">Name:</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="pay-edit-input"
                  required
                  name="name"
                  value={paymentEdit.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label className="pay-edit-text">Phone:</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="pay-edit-input"
                  required
                  name="phone"
                  value={paymentEdit.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label className="pay-edit-text">Address:</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="pay-edit-input"
                  required
                  name="address"
                  value={paymentEdit.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label className="pay-edit-text">City:</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="pay-edit-input"
                  required
                  name="city"
                  value={paymentEdit.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label className="pay-edit-text">Date:</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  className="pay-edit-input"
                  required
                  name="expDate"
                  value={paymentEdit.expDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="pay-btn-edit-submit"  onClick={()=>navigate(`/Paymentview`)}>
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
  )
}