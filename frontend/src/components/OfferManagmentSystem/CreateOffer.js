import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function CreateOffer() {
  const [offerid, setofferid] = useState("");
  const [offername, setOffername] = useState("");
  const [offertype, setOffertype] = useState("");
  const [offerpersontage, setofferpersontage] = useState("");
  const [venuestartdate, setvenuestartdate] = useState("");
  const [venueenddate, setvenueenddate] = useState("");
  const [offerdiscription, setofferdiscription] = useState("");
  const [existingOfferIds, setExistingOfferIds] = useState([]);//new change 2
  const [errorMessage, setErrorMessage] = useState("");//changed


   // Function to check if offerid already exists
   const isOfferIdUnique = (id) => {
    return !existingOfferIds.includes(id);
  };//new change 2

  function passData(e){
    e.preventDefault();



    // Perform validation
    if (venuestartdate === "" || venueenddate === "") {
      setErrorMessage("Please enter both offer start date and end date.");
      return;
    }

    if (venuestartdate > venueenddate) {
      setErrorMessage("Offer end date must be greater than or equal to offer start date.");
      return;
    }   //changed

    if (offerid.length !== 4) {
      setErrorMessage("Offer ID must be 4 digits.");
      return;
    } //new changed


    if (offerpersontage.length !== 2) {
      setErrorMessage("Offer persontage must be 3 digits.");
      return;
    } //new changed

    // if (offerpersontage.length >= 100) {
    //   setErrorMessage("Offer persontage must be less than or equel 100 digits.");
    //   return;
    // }//new changed


    if (!isOfferIdUnique(offerid)) {
      setErrorMessage("Offer ID is already in use. Please enter a unique ID.");
      return;
    }  //new change 2


    

    const newOffer={
      offerid,
      offername,
      offertype,
      offerpersontage,
      venuestartdate,
      venueenddate,
      offerdiscription
      }

      axios.post("http://localhost:8070/offers/add",newOffer).then(()=>{     
        alert("Pass is Success")
         // Add the offerid to the existingOfferIds array
         setExistingOfferIds((prevIds) => [...prevIds, offerid]);
      })
      .catch((err)=>{
        alert("Something went wrong")
      })
      
    }
    return(
      <div className="container">
          <div className="logform">
          <form onSubmit={passData}>
          <div class="form-row">
              <div  className="form-group col-md-6">
                  <label for="InputName">Offer id:</label>
                  <input type="number"  className="form-control" id="InputId"  placeholder="Offerid" required
                  onChange={(e)=>{
                    setofferid(e.target.value);
                  }}></input>

                 {offerid.length !== 4 && (
                <div className="error">Offer ID must be 4 digits.</div>
              )}
              {!isOfferIdUnique(offerid) && (
                <div className="error">Offer ID is already in use.</div>
              )}
        
              </div>


              <div  className="form-group col-md-6">
                  <label for="InputUserName">Offer Name</label>
                  <input type="text"  className="form-control" id="InputUserOffername"  placeholder="offername" required
                  onChange={(e)=>{
                    setOffername(e.target.value);
                  }}></input>
              </div>
          </div>

          <div class="form-row">
              <div  className="form-group col-md-6">
                  <label for="InputAge">Offer Persontage:</label>
                  <input type="number"  className="form-control" id="Inputofferpersontage"  placeholder="Enter Persontage" required
                  onChange={(e)=>{
                    setofferpersontage(e.target.value);
                  }}></input>

                {offerpersontage.length !== 2  && (
                <div className="error">Offer Persontage must be 2 digits.</div>
              )}
        
                  
              </div>
              <div  className="form-group col-md-6">
                  <label for="text">Offer Start Date:<p></p></label>
                  <input type="date"  className="ofr-date" id="Inputstartdate"  placeholder="startdate" 
                  onChange={(e)=>{
                    setvenuestartdate(e.target.value);
                  }}></input>
              </div>
          </div>

          <div class="form-row">
              <div  className="form-group col-md-6">
                  <label for="InputMobileNo">Offer End Date:<p></p></label>
                  <input type="date" className="ofr-date" id="Inputenddate"  placeholder="enddate" required
                  onChange={(e)=>{
                    setvenueenddate(e.target.value);
                  }}></input>
                  
              </div>

              <div  className="form-group col-md-6">
                  <label for="InputPassword">Offer Description:</label>
                  <input type="text"  className="form-control" id="Inputofferdiscription"  placeholder="offerdiscription" 
                  onChange={(e)=>{
                    setofferdiscription(e.target.value);
                  }}></input>
              </div>
          </div>

          

          <div className="form-group">
          <label for="Inputtype">Offer Type:</label>
                                    <select className="form-control" name="offertype" onChange={(e)=>{
                    setOffertype(e.target.value);
                  }}>
                                        <option  defaultValue hidden>Please select your Offer Type</option>
                                        <option value ='New'>New</option>
                                        <option value='Old'>Old</option>
                                        <option value='Future'>Future</option>      
                                    </select>
                                </div>
              

          <div className="row">
            <div className="col-md-6">
              <button type="submit" class="btn btn-primary">Create Offer </button>
              
              
    </div></div>

              
              </form>
          </div>
      </div>
  )
}