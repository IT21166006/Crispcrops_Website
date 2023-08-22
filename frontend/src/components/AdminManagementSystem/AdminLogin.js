//import react
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//export function
export default function AdminLogin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  console.log(credentials);

  function onchange(e) {
    setCredentials((prevData) => {
      const { name, value } = e.target;
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function login(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8070/admin/loginAdmin", credentials)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("admin", res.data.data);
          console.log(res.data.data);
          navigate(`/AdminDashboard/${res.data.data._id}`);
        }
      })
      .catch((err) => {
        alert(err);
      });
    console.log("logged");
  }

  console.log(showPassword);

  return (
    <div className="container">
      <div className="row">
        <div className="admn-log-title">
          <h2>ADMIN LOG-IN<br /></h2>
        </div>
      </div>
      <div className="row admn-log-box">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <form onSubmit={login}>
            <div className="">
              <div className="row">
                <input
                  className="admn-login-input"
                  type="email"
                  placeholder="email"
                  onChange={onchange}
                  name="email"
                ></input>
              </div>
              <div className="row">
                <input
                  className="admn-login-input"
                  type="password"
                  placeholder="Password"
                  onChange={onchange}
                  name="password"
                ></input>
              </div>
              <div className="row">
                <button id="loginBtn" className="admn-login-btn" type="submit">
                  LOG-IN
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}
