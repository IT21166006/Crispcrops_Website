import React from "react";
import axios from "axios";
import { useParams, useNavigate, } from "react-router-dom";

export default function UpdateFarmer(){
    const [farmer, setFarmer] = React.useState({
        fname:"",
        lname: "",
        address: "",
        province: "",
        cno: "",
        email: "",
        nic: "",
        hType: ""
    });

    console.log(farmer)
    const navigate = useNavigate();

    function singleUser(e){
        setFarmer(prevData => {
            const {name, value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    const farmerID = useParams();
    const {id} = useParams();

    console.log(farmerID.id);

    React.useEffect(()=> {
        function fetchData(){
            axios.get('http://localhost:8070/farmer/get/' +farmerID.id)
            .then((res) => {
                setFarmer(res.data.farmer);
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchData();
    }, []);

    function updateData(e){
        e.preventDefault();
        axios.put('http://localhost:8070/farmer/update/' +farmerID.id, farmer)
        .then(() => {
            alert("Successfully Updated.");
            navigate('/profileFarmer/'+farmerID.id);
        }).catch((err) => {
            alert(err);
        })
    }
    return(
        <div className="container updateFarmer">
            <div className="row">
                <div className="col-md-12 update-allFarmer">
                    <h3 className="update-headingFarmer">Edit Farmer Details</h3>
                    <form className="row update-formFarmer" onSubmit={updateData}>
                        <div className="col-md-5 form-leftFarmer">
                        <div className="form-groupFarmerEdt">
                                    <input type="text" className="form-control" value={farmer.fname} name="fname" onChange={singleUser} />
                                </div>
                                <div className="form-groupFarmerEdt">
                                    <input type="text" className="form-control" value={farmer.address} name="address" onChange={singleUser} />
                                </div>
                                <div className="form-groupFarmerEdt">
                                    <input type="number" minlength="10" maxlength="10" name="cno" className="form-control" value={farmer.cno} onChange={singleUser} />
                                </div>
                                <div className="form-groupFarmerEdt">
                                    <input type="text" className="form-control" value={farmer.nic} name="nic" onChange={singleUser} />
                                </div>
                                <div className="cancel">
                            <button type="button" className="btnFarmerEdt" onClick={()=>navigate(`/profileFarmer/${id}`)}>Cancel</button>
                        </div>
                        </div>
                        <div className="col-md-5 form-rightFarmer">
                        <div className="form-groupFarmerEdt">
                                    <input type="text" className="form-control"value={farmer.lname} name="lname" onChange={singleUser} />
                                </div>
                                <div className="form-groupFarmerEdt">
                                    <select className="form-control" name="province" onChange={singleUser} value={farmer.province} required>
                                        <option value='' defaultValue hidden>Select your province</option>
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
                                <div className="form-groupFarmerEdt">
                                    <input type="email" className="form-control" value={farmer.email}/>
                                </div>
                                <div className="form-groupFarmerEdt">
                                    <select className="form-control" name="hType" onChange={singleUser} value={farmer.hType}>
                                        <option defaultValue hidden>Select your Harvest Type</option>
                                        <option value='Fruits'>Fruits</option>
                                        <option value='Vegetables'>Vegetables</option>
                                    </select>
                                </div>
                                <div className="edit">
                            <button type="submit" className="btnFarmerEdt"  >Update</button>
                        </div>
                        </div>
                        

                    </form>
                </div>
            </div>
        </div>
    )
}