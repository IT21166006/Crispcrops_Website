import React from "react";
import axios from "axios";
import { Link ,useNavigate,useParams} from "react-router-dom";

export default function DeliveryProfile(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [deliveryDetails, setdeliveryDetails] = React.useState({
        name: "",
        age: "",
        mobilenumber: "",
        userName: "",
        email: "",
        password: "",
        RePassword: "",
        vehicleType: ""
    });
    

    React.useEffect(() => {
        function fetchAllData(){
            axios.get('http://localhost:8070/person/get/'+id)
            .then((res) => {
                setdeliveryDetails(res.data.person)
                console.log(res.data.person)
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchAllData();
    }, [])

    //delete
    function deleteperson(id){
        axios.delete('http://localhost:8070/person/delete/' +id)
        .then(()=>{
            alert("Person Deleted.");
            navigate('/');
        }).catch((err)=>{
            console.log(err)
        })
    }


    return(
        <div>
            <div className="container">
        <div className="Del-profile-title"><h1>Delivery Profile</h1></div></div>
        <br></br>
        <div className="container">
        <div className="Del-profile-Box">
        <form className="row ">
                            <div className="col-md-6">
                                <table>
                                    <tbody>
                                        <div className="form-group">
                                            <tr>
                                                <td class="">Name : </td>
                                                <td>{deliveryDetails.name}</td>
                                            </tr>
                                        </div>
                                        <div className="form-group">
                                            <tr>
                                                <td class="">Age : </td>
                                                <td>{deliveryDetails.age}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-group">
                                            <tr>
                                                <td class="f-name">Mobile Number : </td>
                                                <td>{deliveryDetails.mobilenumber}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-group">
                                            <tr>
                                                <td class="">vehicleType : </td>
                                                <td>{deliveryDetails.nic}</td>
                                            </tr>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6">
                                <table>
                                    <tbody>
                                        <div className="form-group">
                                            <tr>
                                                <td class="">User Name : </td>
                                                <td>{deliveryDetails.userName}</td>
                                            </tr>
                                        </div>
                                        <div className="form-group">
                                            <tr>
                                                <td class="">Email : </td>
                                                <td>{deliveryDetails.email}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-group">
                                            <tr>
                                                <td class="">Password : </td>
                                                <td>{deliveryDetails.password}</td>
                                            </tr>
                                        </div> 
                                        <div className="form-group">
                                            <tr>
                                                <td class="">Re-Enter Password : </td>
                                                <td>{deliveryDetails.RePassword}</td>
                                            </tr>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" className="Del-btn-profEdt" onClick={()=>navigate(`/editnow/${deliveryDetails._id}`)} >Edit</button>
                            <button type="button" className="Del-btn-profback" onClick={()=>navigate(`/deldashboard/`)} >Back</button>
                            <button type="button" className="Del-btn-profDelete" onClick={()=>deleteperson(id)} >Delete Account</button>
                        </form>
        </div>
        </div>

        
  </div>
   


    );
}