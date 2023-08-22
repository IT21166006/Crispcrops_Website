import React from "react";
import axios from "axios";
import { useParams, useNavigate,Link } from "react-router-dom";


export default function UpdateOffer(){

    
    const [offers, setOffer] = React.useState({
        offerid:"",
        offername: "",
        offertype: "",
        offerpersontage: "",
        venuestartdate: "",
        venueenddate: "",
        offerdiscription: ""
       
    });


  
    console.log(offers)
    const navigate = useNavigate();

    function singleUser(e){
        setOffer(prevData => {
            const {name, value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    const offerId = useParams();

    
    console.log(offerId.id);

    React.useEffect(()=> {
        function fetchData(){
            axios.get('http://localhost:8070/offers/get/'+offerId.id)
            .then((res) => {
                // setOffer(res.data.Offer);
                setOffer(res.data.offers)
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchData();
    }, []);

    function updateData(e){
        e.preventDefault();
        axios.put('http://localhost:8070/offers/update/' +offerId.id, offers)
      
        .then(() => {
            alert("Successfully Updated.");
            navigate('/updateoffer/'+offerId.id);
        }).catch((err) => {
            alert(err);
        })
    }
    return(
        <div className="container update">
            <div className="row">
                <div className="col-md-12 update-all">
                    <h3 className="update-heading">Edit Offer Details</h3>
                    <form className="row update-form" onSubmit={updateData}>
                        <div className="col-md-5 form-left">
                        <div className="form-group">
                            <lable>Offer Id:</lable>
                                    <input type="number" className="form-control" value={offers.offerid} name="offerid" onChange={singleUser} />
                                </div>
                                <div className="form-group">
                                <lable>Offer Name:</lable>
                                    <input type="text" className="form-control" value={offers.offername} name="offername" onChange={singleUser} />
                                </div>
                                <div className="form-group">
                                <lable>Offer Persontage:</lable>
                                    <input type="number"  name="offerpersontage" className="form-control" value={offers.offerpersontage} onChange={singleUser} />
                                </div>
                                <div className="form-group">
                                <lable>Offer Start Date:</lable>
                                    <input type="date" className="form-control" value={offers.venuestartdate} name="venuestartdate" onChange={singleUser} />
                                </div>
                                
                                <div className="cancel">
                            <Link to={'/offertable'}><button type="button" className="btn btn-primary">Cancel</button></Link>
                        </div>
                        </div>
                        <div className="col-md-5 form-right">
                        <div className="form-group">
                        <lable>Offer Description:</lable>
                                    <input type="text" className="form-control" value={offers.offerdiscription} name="offerdiscription" onChange={singleUser} />
                                </div>
                                <div className="form-group">
                                    <select className="form-control" name="offertype" onChange={singleUser} value={offers.offertype} required>
                                        <option value='' defaultValue hidden>Select Offer Type</option>
                                        <option value ='New'>New</option>
                                        <option value='Future'>Future</option>
                                        <option value='Old'>Old</option>
                    
                                    </select>
                                </div>
                                <div className="form-group">
                                <lable>Offer End Date:</lable>
                                    <input type="date" className="form-control" value={offers.venueenddate} name="venueenddate" onChange={singleUser} />
                                </div>
                                
                                
                                <div className="edit">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                        </div>
                        

                    </form>
                </div>
            </div>
        </div>
    )
}