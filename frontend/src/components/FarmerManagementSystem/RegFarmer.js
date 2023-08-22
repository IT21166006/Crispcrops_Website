import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function AddFarmer() {

    
    const navigate = useNavigate();
    const [farmer, setFarmer] = React.useState({
        fname: "",
        lname: "",
        address: "",
        province: "",
        cno: "",
        email: "",
        nic: "",
        hType: "",
        pwd: "",
        cpwd: ""
    });

    console.log(farmer);

    function onChange(e){
        setFarmer(prevData => {
            const {name, value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    function submit(e){
        e.preventDefault();
        axios.post('http://localhost:8070/farmer/add', farmer)
        .then(() => {
            alert("Farmer Added!");
            navigate('/loginFarmer')
        })
        .catch((err) => {
            alert(err);
        })
        console.log("Submit")
    }

    return(
        <div className="container farmerRegister">
        <div className="row">
        <div className="col-md-3 farmerRegister-left">
                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                <h3>Welcome</h3>
                <p>Online Fruits and Vegetables Buying and Selling.</p>
                <input type="button" className="login-btn" onClick={()=>navigate(`/loginFarmer`)} value="Login"/><br/>
            </div>
            <div className="col-md-9 farmerRegister-right">
                        <h3 className="farmerRegister-heading">Register as a Farmer</h3>
                        <form className="row register-form" onSubmit={submit}>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="First Name *" name="fname" onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Address *" name="address" onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="number" minlength="10" maxlength="10" name="cno" className="form-control" placeholder="Your Phone *" onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="number" pattern="([0-9]{9}[v])|([0-9]{12})" className="form-control" maxLength="12" placeholder="NIC *" name="nic" onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password *" name="pwd" onChange={onChange} required/>
                                </div>
                            </div>
                            <div className="col-md-6">
                            <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Last Name *" name="lname" onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <select className="form-control" name="province" onChange={onChange} required>
                                        <option  defaultValue hidden>Please select your Province</option>
                                        <option value ='Central'>Central</option>
                                        <option value='Eastern'>Eastern</option>
                                        <option value='North Central'>North Central</option>
                                        <option value='Northern'>Northern</option>
                                        <option value='North West'>North Western</option>
                                        <option value='Sabaragamuwa'>Sabaragamuwa</option>
                                        <option value='Southern'>Southern</option>
                                        <option value='Uva'>Uva</option>
                                        <option value='Western'>Western</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="Your Email *" name="email" onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <select className="form-control" name="hType" onChange={onChange}>
                                        <option defaultValue hidden>Please select your Harvest Type</option>
                                        <option value='Fruits'>Fruits</option>
                                        <option value='Vegetables'>Vegetables</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control"  placeholder="Confirm Password *" name="cpwd" onChange={onChange} required/>
                                </div>
                                <button type="submit" className="btn-farmerRegSubmit">Register</button>
                            </div>
                        </form>
                    
            </div>
        </div>
</div>
    )
}

export default AddFarmer;