import React, {useState} from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function AddStock(){

   //Create variable to inputs

const [famer,setfamer] =useState("");
const [ItemName,setItemname] =useState("");
const [ItemId,setItemId] =useState("");
const [quantity,setquantity] =useState("");
const [price,setprice] =useState("");
const [sPrice,setSprice] =useState("")
const [sdate,setsdate] =useState("");
const navigate = useNavigate();

//send data to backend
 
function sendData(e){
    e.preventDefault();

    const newstock = {
        famer,
        ItemName,
        ItemId,
        quantity,
        price,
        sPrice,
        sdate

    }
    //pass data to backend
  axios.post("http://localhost:8070/stock/add",newstock).then(()=>{
    alert("stock add succesful");
    navigate('/ManageItems')
  }).catch((err)=>{
    alert("unsuccesfull")
  })

}

    return(
        <div>
            <br></br>
            
        <div className="container">
        <div className="StockTOPIC">
                <h1>ADD STOCK</h1>
            </div>
            <div className="Stocktitle">
                <div className="additemg">

            <form onSubmit={sendData}>
                <div className="row">
                    <div className="col-md-4">
                        <label className="stk-lable-insert">Id :</label>
                    </div>
                    <div className="col-md-8">
                        <input type="text" className="stk-input-insert" maxLength={5} required 
                        onChange={(e)=>{
                            setItemId(e.target.value);
                        }}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <label className="stk-lable-insert">Famer Name :</label>
                    </div>
                    <div className="col-md-8">
                        <input type="text" className="stk-input-insert" maxLength={20} required 
                        onChange={(e)=>{
                            setfamer(e.target.value);
                        }}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <label className="stk-lable-insert">Item Name :</label>
                    </div>
                    <div className="col-md-8">
                        <input type="text"className="stk-input-insert" required maxLength={20}
                        onChange={(e)=>{
                            setItemname(e.target.value);
                        }}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <label className="stk-lable-insert">Quantity :</label>
                    </div>
                    <div className="col-md-8">
                        <input type="text"className="stk-input-insert" required 
                        onChange={(e)=>{
                            setquantity(e.target.value);
                        }}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <label className="stk-lable-insert">Buying Unit price :</label>
                    </div>
                    <div className="col-md-8">
                        <input type="text"className="stk-input-insert" required
                        onChange={(e)=>{
                            setprice(e.target.value);
                        }}></input>
                    </div>
                </div>
               

                <div className="row">
                    <div className="col-md-4">
                        <label className="stk-lable-insert">Date :</label>
                    </div>
                    <div className="col-sm-2 col-form-label">
                        <input type="date" className="stk-input-insert"required
                        onChange={(e)=>{
                            setsdate(e.target.value);
                        }}></input>
                    </div>
                    
                </div>
                <Link to={'/StockManageItems'}><button className="stk-btn-cancel">Cancel</button></Link>
                 <button type="Submit" className="stk-btn-add">submit</button>
            </form>
            </div>
            </div>
        </div>
        </div>
    )
}
