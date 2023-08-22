import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function EditAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [addedit, setAddEdit] = useState({
    username: "",
    fullName: "",
    email: "",
    password: ""
  });

  // Fetch data
  useEffect(() => {
    function getAdmin() {
      axios
        .get(`http://localhost:8070/admin/get/${id}`)
        .then((res) => {
          setAddEdit(res.data.profile);
          console.log(res.data.profile);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAdmin();
  }, [id]);

  const handleChange = (e) => {
    setAddEdit({
      ...addedit,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/admin/update/${id}`, addedit)
      .then((response) => {
        alert("Admin Updated");
        navigate("/ManageItems");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="TOPIC">
          <h1>EDIT ADMIN</h1>
        </div>
        <div className="title">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="username">Username:</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  name="username"
                  value={addedit.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label htmlFor="fullName">Full Name:</label>
              </div>
              <div className="col-md-8">
                <input
                  type="text"
                  required
                  name="fullName"
                  value={addedit.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label htmlFor="password">Password:</label>
              </div>
              <div className="col-md-8">
                <input
                  type="password"
                  required
                  name="password"
                  value={addedit.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <Link to={"/ManageAdmin"}>
              <button className="btn btn-danger">Cancel</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
