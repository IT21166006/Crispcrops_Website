import React from "react";
import axios from "axios";
import { useParams, useNavigate, useState, Link } from "react-router-dom";

export default function UpdateCustomer(){
    const [customer, setCustomer] = React.useState({
        first_name:"",
        last_name: "",
        phone_no: "",
        address: "",
        province: "",
        age: "",
        email: "",
        password: "",
        confirm_password: ""
    });
    
    console.log(customer)
    const navigate = useNavigate();

    function singleUser(e){
        setCustomer(prevData => {
            const {name, value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    const customerID = useParams();

    console.log(customerID.id);

    React.useEffect(()=> {
        function fetchData(){
            axios.get('http://localhost:8070/customer/get/' +customerID.id)
            .then((res) => {
                setCustomer(res.data.customer);
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchData();
    }, []);

    function updateData(e){
        e.preventDefault();
        axios.put('http://localhost:8070/customer/update/' +customerID.id, customer)
        .then(() => {
            alert("Successfully Updated.");
            navigate('/profileCustomer/' +customerID.id);
        }).catch((err) => {
            alert(err);
        })
    }
    return(
        <div className="container cus-update">
            <div className="row">
                <div className="col-md-12 cus-update-dp">
                    <h3 className="cus-update-heading">Edit Customer Details</h3>
                    <form className="row cus-update-form" onSubmit={updateData}>
                            <div className="col-md-6">
                            <div className="form-group-cus">
                                <input type="text" className="form-control" value={customer.first_name} placeholder="First Name " name="first_name" onChange={singleUser}  />
                            </div>
                            <div className="form-group-cus">
                                <input type="text" className="form-control" value={customer.last_name} placeholder="Last Name " name="last_name" onChange={singleUser}  />
                            </div>
                            <div className="form-group-cus">
                                <input type="number" minlength="10" maxlength="10" className="form-control" value={customer.phone_no} placeholder="Phone No " name="phone_no" onChange={singleUser} />
                            </div>
                            <div className="form-group-cus">
                                <input type="text" className="form-control" value={customer.address} placeholder="Address " name="address" onChange={singleUser}  />
                            </div>
                            <div className="form-group-cus">
                                        <select className="form-control" value={customer.province} name="province"  onChange={singleUser}  >
                                            <label>please select your province</label>
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
                                <input type="text" className="form-control" value={customer.age} placeholder="Age " name="age" onChange={singleUser}  />
                            </div>
                            <div className="form-group-cus">
                                <input type="text" className="form-control" value={customer.email} placeholder="Email " name="email" onChange={singleUser}  />
                            </div>
                            <div className="form-group-cus">
                                <input type="password" className="form-control" value={customer.password} placeholder="Password " name="password" onChange={singleUser}  />
                            </div>
                            <div className="form-group-cus">
                                <input type="password" className="form-control" value={customer.confirm_password} placeholder="Confirm Password " name="confirm_password" onChange={singleUser}  />
                            </div>
                            <div className="save">
                                <button type="submit" className="cus-btn">Save</button>
                                </div>
                            <div className="cancel">
                                <Link to={'/loginCustomer'}><button type="button" className="cus-btn">Cancel</button></Link>
                                </div>
                                
                                </div>
                        </form>
                    </div>
                    
             </div>
            </div>
        


    )
}
