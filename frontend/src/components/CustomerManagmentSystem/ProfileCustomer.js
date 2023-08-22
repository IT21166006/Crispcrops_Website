import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from 'react-router-dom';
import user from "./user.png";

export default function ProfileCustomer(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [customerDetails, setCustomerDetails] = React.useState({
        first_name: "",
        last_name: "",
        phone_no: "",
        address: "",
        distric: "",
        age: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    React.useEffect(() => {
        function fetchAllData(){
            axios.get('http://localhost:8070/customer/get/'+id)
            .then((res) => {
                setCustomerDetails(res.data.customer)
                console.log(res.data.customer)
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchAllData();
    }, [])

    //delete
    function deleteCustomer(id){
        axios.delete('http://localhost:8070/customer/delete/' +id)
        .then(()=>{
            alert("Customer Deleted.");
            navigate('/');
        }).catch((err)=>{
            console.log(err)
        }) 
    }

    
    return(
        <div className="container cus-profile">
        <div className="row">
        <div className="col-md-3 cus-profile-left">
        <div class="user-avatar-cus">
        <img src={user}  className="user-avatar-cus"></img>
            </div>
            <button type='submit' className="cus-account-btn" >Account</button>
            <button type='button' className="cus-overview-btn" onClick={()=>navigate(`/overviewCustomer/${id}`)} >Overview</button>
            <button type='button' className="cus-edit-btn" onClick={()=>navigate(`/updateCustomer/${id}`)}>Edit Details</button>
            <button type='button' className="cus-cart-btn" onClick={()=>navigate(`/shoppingcartCustomer/${id}`)} >Shopping Cart</button>
            <button type='button' className="cus-delete-btn" onClick={()=>deleteCustomer(id)}>Delete Account</button>
            </div>
            <div className="col-md-9 cus-profile-right">
                        <h3 className="cus-profile-heading">Customer Profile Details</h3>
                        <form className="row cus-profile-form">
                            <div className="col-md-6">
                                <table>
                                    <tbody>
                                        <div className="form-group-cus">
                                            <tr>
                                                <td class="fname">First Name : </td>
                                                <td>{customerDetails.first_name}</td>
                                            </tr>
                                        </div>
                                        <div className="form-group-cus">
                                            <tr>
                                                <td class="lname">Last Name : </td>
                                                <td>{customerDetails.last_name}</td>
                                            </tr>
                                        </div>
                                        <div className="form-group-cus">
                                            <tr>
                                                <td class="phone_no">Phone Number : </td>
                                                <td>{customerDetails.phone_no}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-group-cus">
                                            <tr>
                                                <td class="address">Address : </td>
                                                <td>{customerDetails.address}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-group-cus">
                                            <tr>
                                                <td class="province">Province : </td>
                                                <td>{customerDetails.province}</td>
                                            </tr>
                                        </div> 
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6">
                                <table>
                                    <tbody>
                                        <div className="form-group-cus">
                                            <tr>
                                                <td class="f-name">Age : </td>
                                                <td>{customerDetails.age}</td>
                                            </tr>
                                        </div>
                                        <div className="form-group-cus">
                                            <tr>
                                                <td class="email">E mail : </td>
                                                <td>{customerDetails.email}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-group-cus">
                                            <tr>
                                                <td class="password">Password : </td>
                                                <td>{customerDetails.password}</td>
                                            </tr>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                        </form>
            </div>
        </div>
</div>
    )
}