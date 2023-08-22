import React, {useState} from "react";
import axios from "axios";
import { Link , useParams , useNavigate} from "react-router-dom";

export default function AdminDashboard(){

    const {id} = useParams();
    const navigate = useNavigate();

    const [adminDetails, setadminDetails] = React.useState({
        fullName: " ",
        username: " "
    });

    React.useEffect(() => {
        function fetchAllData(){
            axios.get('http://localhost:8070/admin/get/'+id)
            .then((res) => {
                setadminDetails(res.data.admin)
                console.log(res.data.admin)
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchAllData();
    }, [])

    return(
        <div className="container">
            <div className="row">
                <p>WELLCOME {adminDetails.fullName}</p>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Link to={'/StockDashboard'}><button className="admn-btn-dash admn-btn-dash-stock">STOCK</button></Link>
                </div>
                <div className="col-md-6">
                    <Link to={'/genaratereportbidAdmin'}><button className="admn-btn-dash admn-btn-dash-bid">BIDS</button></Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Link to={'/adminfarmerreport'}><button className="admn-btn-dash admn-btn-dash-farmer">FARMER</button></Link>
                </div>
                <div className="col-md-6">
                    <Link to={'/reportGenCus'}><button className="admn-btn-dash admn-btn-dash-customer">CUSTOMER</button></Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Link to={'/adminDelreport'}><button className="admn-btn-dash admn-btn-dash-delevery">DELEVERY PERSON</button></Link>
                </div>
                <div className="col-md-6">
                    <Link to={'/report'}><button className="admn-btn-dash admn-btn-dash-payment">PAYMENTS</button></Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Link to={'/createadmin'}><button className="admn-btn-dash admn-btn-dash-payment">ADD NEW ADMIN</button></Link>
                </div>
                <div className="col-md-6">
                    <Link to={'/ManageAdmin'}><button className="admn-btn-dash admn-btn-dash-payment">MANAGE ADMIN</button></Link>
                </div>
            </div>
        </div>

    )

}