//import react
import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//export function navbar
export default function Register(){
    
    const navigate = useNavigate();
    
    const [name,setname] = useState("");
    const [age,setage] = useState("");
    const [mobilenumber,setmobilenumber] = useState("");
    const [userName,setuserName] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [RePassword,setRePassword] = useState("");
    const [vehicleType,setvehicleType] = useState("");

    function passData(e){
        e.preventDefault();

        const newPerson={
            name,  
            age,
            mobilenumber,
            userName,
            email,
            password,
            RePassword,
            vehicleType
        }
        axios.post("http://localhost:8070/person/add",newPerson).then(()=>{
            alert("Succefully Passed ✅");
            navigate('/dellogin')
        })
        .catch((err)=>{
            alert("something is happening🚨")
        })

    }



    return(
        <div className="container">
            <div className="Del-Reg-title"><h2>Add deliver profile</h2></div>
            <div className="Del-Reg-box"><div><br></br></div>
            <form onSubmit={passData}>
            <div class="form-row">
                
                <div  className="form-group col-md-6">
                    <label for="InputName">Name</label>
                    <input type="text"  className="form-control"   placeholder="Name" required
                    onChange={(e)=>{
                        setname(e.target.value);
                    }}></input>
            
                </div>
                <div  className="form-group col-md-6">
                    <label for="InputUserName">User Name</label>
                    <input type="text"  className="form-control "   placeholder="Username" required
                    onChange={(e)=>{
                        setuserName(e.target.value);
                    }}></input>
                </div>
            </div>

            <div class="form-row">
                <div  className="form-group col-md-6">
                    <label for="InputAge">Age</label>
                    <input type="text" maxLength="2" className="form-control"   placeholder="Enter Age" required
                    onChange={(e)=>{
                        setage(e.target.value);
                    }}></input>
                    
                </div>
                <div  className="form-group col-md-6">
                    <label for="InputEmail">Email</label>
                    <input type="email"  className="form-control"   placeholder="example@gmail.com" required
                    onChange={(e)=>{
                        setemail(e.target.value);
                    }}></input>
                </div>
            </div>

            <div className="form-row">
                <div  className="form-group col-md-6">
                    <label for="InputMobileNo">Mobile No</label>
                    <input type="phone" maxLength="10" className="form-control"   placeholder="077xxxxxxx" required
                    onChange={(e)=>{
                        setmobilenumber(e.target.value); 
                        
                    }}></input>
                    
                </div>
                <div  className="form-group col-md-6">
                    <label for="InputPassword">Password</label>
                    <input type="password" maxLength="10" className="form-control"   placeholder="xxxxxxxxx" required
                    onChange={(e)=>{
                        setpassword(e.target.value);
                    }}></input>
                </div>
            </div>

            <div className="row">
                <div  className="form-group col-md-6">
                    <label for="InputPassword2">Re-Enter Password</label>
                    <input type="password" maxlength="10" className="form-control"   placeholder="xxxxxxx" required
                    onChange={(e)=>{
                        setRePassword(e.target.value);
                    }}></input>
                </div>

                <div  className="form-group col-md-6">
          <label for="InputVehicleType">Vehicle Type</label>
                                    <select className="form-control" name="vehicleType" onChange={(e)=>{
                    setvehicleType(e.target.value);
                  }}>
                                        <option  defaultValue hidden>Please select your Vehicle Type</option>
                                        <option value ='Motor Bike'>Motor Bike</option>
                                        <option value='Three Wheeler'>Three Wheeler</option>
                                        <option value='Lorry'>Lorry</option>
                                        
                                    </select>
                                </div>

                </div>

            <div  className="form-check">
                    <input type="checkbox"  className="form-check-input" id="exampleCheck1" required></input>
                    <label  className="form-check-label" for="exampleCheck1" >Agree to terms and conditions</label>
                </div>
            
                <button type="submit" className="del-btn-create" >Create Account</button>
                
                </form>
            </div>
        </div>

        
    )
}