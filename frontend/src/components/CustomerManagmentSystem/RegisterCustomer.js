import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegCustomer() {

    const navigate = useNavigate();
    const [customer, setCustomer] = React.useState({ 
        first_name: "",
        last_name: "",
        phone_no: "",
        address: "",
        province: "",
        age: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    console.log(customer);

    function onChange(e){
        setCustomer(prevData => {
            const {name, value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    function submit(e){
        e.preventDefault();
        axios.post('http://localhost:8070/customer/add', customer)
        .then(() => {
            alert("Customer Added!");
            navigate('/loginCustomer')
        })
        .catch((err) => {
            alert(err);
        })
        console.log("Submit")
    }


   

    return(
        <div className="container cus_register">
            <div className="row" >
                <div className="col-md-3 cus_register-left"> 
                    <h3>Welcome</h3>
                    <p>Online Fruits and Vegetables Buying System</p>
                    <input type="button" className="cus_login-btn" onClick={()=>navigate(`/loginCustomer`)} value="Login"/> <br/>
                </div>
                    <div className="col-md-9 cus_register-right">
                        <h3 className="cus_register-heading">Register As A Customer</h3> 
                        <form className="row cus_register-form" onSubmit={submit}>
                            <div className="col-md-6">
                            <div className="form-group-cus">
                                <input type="text" className="form-control" placeholder="First Name " name="first_name" onChange={onChange}  required/>
                            </div>
                            <div className="form-group-cus">
                                <input type="text" className="form-control" placeholder="Last Name " name="last_name" onChange={onChange}  required/>
                            </div>
                            <div className="form-group-cus">
                                <input type="tel" minlength="10" maxlength="10" className="form-control" placeholder="Phone No" name="phone_no" onChange={onChange}  required/>
                            </div>
                            <div className="form-group-cus">
                                <input type="text" className="form-control" placeholder="Address " name="address" onChange={onChange}  required/>
                            </div>
                            <div className="form-group-cus">
                                        <select className="form-control" name="province"  onChange={onChange}  required>
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
                            </div>
                            <div className="col-md-6">
                            <div className="form-group-cus">
                                <input type="number" className="form-control" placeholder="Age " name="age" onChange={onChange}  required/>
                            </div>
                            <div className="form-group-cus">
                                <input type="text" className="form-control" placeholder="Email " name="email" onChange={onChange}  required/>
                            </div>
                            <div className="form-group-cus">
                                <input type="password" className="form-control" placeholder="Password " name="password" onChange={onChange}  required/>
                            </div>
                            <div className="form-group-cus">
                                <input type="password" className="form-control" placeholder="Confirm Password " name="confirm_password" onChange={onChange}  required/>
                            </div>
                            
                                <button type="submit" className="btn-register-cus">Register</button>
                                </div>
                        </form>
                    </div>
                    
             </div>
            </div>
        


    )
}
