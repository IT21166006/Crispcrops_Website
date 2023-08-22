import React, { useState } from "react";
import axios from "axios";
export default function ProfileAdmin() {
    
    const [username, setusername] = useState("");
    const [fullName, setfullName] = useState("");
    const [email, setemail] = useState("");
    const [adminID, setadminID] = useState("");
    const [password, setpassword] = useState("");

    console.log(username)
  
    function passData(e){
        e.preventDefault(); // prevent the normal behaviour of submitting the submitbutton
        
        const adminTwo = { 
            username,
            fullName,
            email,
            adminID,
            password
  
        }
        
  
        axios.post("http://Localhost:8070/admin/add",adminTwo).then(()=>{  
            alert("profile added Successfully")
        }).catch((err)=>{
            alert(err)
        })
  
    }
  
    return (
        <div>
        <div className="container ">
        <div className="admn-log-title"><h1>Admin Profile</h1></div>
        <div className="admn-profile-bg">
          <form onSubmit={passData}>
  
            <div className="row">
            <div className="col-md-3"></div>
              <div className="col-md-3">
                <label className="admn-lable-log">Username:</label>
              </div>
              <div className="col-md-3">

                <input type="text" className="admn-input-log" placeholder="Enter username"  required 
                
                onChange={(e)=>{ //if type a value in the input field, that value will insert to the state
                  setusername(e.target.value); 
    
                }}/>


              </div>
              <div className="col-md-3"></div>
            </div>


            <div className="row">
            <div className="col-md-3"></div>
              <div className="col-md-3">
                <label className="admn-lable-log">Full Name:</label>
              </div>
              <div className="col-md-3">


                <input type="fullname" className="admn-input-log" placeholder="Enter full name" required
                onChange={(e)=>{
                  setfullName(e.target.value);
    
                }} />


              </div>
              <div className="col-md-3"></div>
            </div>


            <div className="row">
            <div className="col-md-3"></div>
              <div className="col-md-3">
                <label className="admn-lable-log">Email:</label>
              </div>
              <div className="col-md-3">

                <input type="text" className="admn-input-log" placeholder="Enter email" required
                onChange={(e)=>{
                  setemail(e.target.value);
    
                }} />


              </div>
              <div className="col-md-3"></div>
            </div>


            <div className="row">
            <div className="col-md-3"></div>
              <div className="col-md-3">
                <label className="admn-lable-log">adminID</label>
              </div>
              <div className="col-md-3">

                <input type="adminID" className="admn-input-log" placeholder="Enter admin id" required
                onChange={(e)=>{
                  setadminID(e.target.value);
    
                }} />


              </div>
              <div className="col-md-3"></div>
            </div>


            <div className="row">
            <div className="col-md-3"></div>
              <div className="col-md-3">
                <label className="admn-lable-log">Password:</label>
              </div>
              <div className="col-md-3">


                <input type="password" className="admn-input-log" placeholder="Enter password" required
                onChange={(e)=>{
                  setpassword(e.target.value);
    
                }} />


              </div>
              <div className="col-md-3"></div>
            </div>


            <div className="row">
            <div className="col-md-3"></div>
              <div className="col-md-6">
                <button type="submit"  className="admn-log-btn">ADD NEW</button>
              </div>
              <div className="col-md-3"></div>
            </div>
        
          </form>
          </div>
        </div>
        </div>
  )
  }