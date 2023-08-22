import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from 'react-router-dom';
import avatar from "./user.png";

export default function FarmerProfile(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [farmerDetails, setFarmerDetails] = React.useState({
        fname: "",
        lname: "",
        address: "",
        province: "",
        cno: "",
        email: "",
        nic: "",
        hType: ""
    });

    React.useEffect(() => {
        function fetchAllData(){
            axios.get('http://localhost:8070/farmer/get/'+id)
            .then((res) => {
                setFarmerDetails(res.data.farmer)
                console.log(res.data.farmer)
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchAllData();
    }, [])

    //delete
    function deleteFarmer(id){
        axios.delete('http://localhost:8070/farmer/delete/' +id)
        .then(()=>{
            alert("Farmer Deleted.");
            navigate('/loginFarmer');
        }).catch((err)=>{
            console.log(err)
        })
    }

    let idNo =farmerDetails.nic;

    return(
        <div className="container farmerProfile">
        <div className="row">
        <div className="col-md-3 farmerProfile-left">
        <div class="user-avatarFarmer">
            <img src={avatar} height="150px"/>
            </div>
            <button type='button' className="button-farmerDash" onClick={()=>navigate(`/dashboardFarmer/${id}`)}>Dashboard</button>
            <button type='button' className="button-farmerEdt" onClick={()=>navigate(`/updateFarmer/${id}`)}>Edit Details</button>
            <button type='button' className="button-farmerChange" onClick={()=>navigate(`/changePwdFarmer/${id}`)} >Change Password</button>
            <button type='button' className="button-farmerDelete" onClick={()=>deleteFarmer(id)}>Delete Account</button>
            <Link to={'/createbid/'+idNo}><button type='button' className="button-farmerDelete">Add New Bid</button></Link>
            </div>
            <div className="col-md-9 farmerProfile-right">
                        <h3 className="farmerProfile-heading">Farmer Details</h3>
                        <form className="row farmerProfile-form">
                            <div className="col-md-6">
                                <table>
                                    <tbody>
                                        <div className="form-groupFarmer">
                                            <tr>
                                                <td class="f-name">First Name : </td>
                                                <td>{farmerDetails.fname}</td>
                                            </tr>
                                        </div>
                                        <div className="form-groupFarmer">
                                            <tr>
                                                <td class="f-name">Address : </td>
                                                <td>{farmerDetails.address}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-groupFarmer">
                                            <tr>
                                                <td class="f-name">Mobile Number : </td>
                                                <td>{farmerDetails.cno}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-groupFarmer">
                                            <tr>
                                                <td class="f-name">NIC : </td>
                                                <td>{farmerDetails.nic}</td>
                                            </tr>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6">
                                <table>
                                    <tbody>
                                        <div className="form-groupFarmer">
                                            <tr>
                                                <td class="f-name">Last Name : </td>
                                                <td>{farmerDetails.lname}</td>
                                            </tr>
                                        </div>
                                        <div className="form-groupFarmer">
                                            <tr>
                                                <td class="f-name">Province : </td>
                                                <td>{farmerDetails.province}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-groupFarmer">
                                            <tr>
                                                <td class="f-name">E mail : </td>
                                                <td>{farmerDetails.email}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-groupFarmer">
                                            <tr>
                                                <td class="f-name">Harvest Type : </td>
                                                <td>{farmerDetails.hType}</td>
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