
import React,{useState, useEffect} from "react";
import axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom";

export default function EditStock(){

    const navigate = useNavigate();
    const {id} = useParams();
    const [stockedit, setstocks] = useState({
                ItemId: '',
                famer: '',
                ItemName: '',
                quantity: '',
                price: '',
                sPrice: '',
                sdate: ''
     
    });

    //Fetch data
    useEffect(()=>{
        function getstocks (){
            axios.get("http://localhost:8070/stock/get/"+id)
            .then((res)=>{
                 setstocks(res.data.data);
                console.log(res.data.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getstocks();
    },[])

    const handleChange = (e) => {
        setstocks({
          ...stockedit,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(stock); // or save the data to your backend
        axios
        .put('http://localhost:8070/stock/update/'+id, stockedit)
        .then((response) => {
            // console.log(response.data);
            alert("Stock Updated");
            navigate('/ManageItems');
        })
        .catch((error) => {
            console.log(error);
        });
      };


    return(
        <div><br></br>
    <div className="container">
        <div className="StockTOPIC">
    <h1>EDIT STOCK</h1>
    </div>
    <div className="Stocktitle">
    <div className="additemg">
    <form onSubmit={handleSubmit} >
        <div className="row">
            <div className="col-md-4">
                <label for>Famer Name :</label>
            </div>
            <div className="col-md-8">
                <input type="text"className="stk-input-insert" required name="famer" value={stockedit.famer}
                onChange={handleChange}></input>
            </div>
        </div>

        <div className="row">
            <div className="col-md-4">
                <label for>Item Name:</label>
            </div>
            <div className="col-md-8">
                <input type="text" className="stk-input-insert"required name="ItemName" value={stockedit.ItemName}
                onChange={handleChange}></input>
            </div>
        </div>

        <div className="row">
            <div className="col-md-4">
                <label for> Quantity:</label>
            </div>
            <div className="col-md-8">
                <input type="text"className="stk-input-insert"required name="quantity" value={stockedit.quantity}
                onChange={handleChange}></input>
            </div>
        </div>

        <div className="row">
            <div className="col-md-4">
                <label for>Buying price:</label>
            </div>
            <div className="col-md-8">
                <input type="text"className="stk-input-insert" required name="price" value={stockedit.price}
                onChange={handleChange}></input>
            </div>
        </div>
       
        <div className="row">
            <div className="col-md-4">
                <label for>Date:</label>
            </div>
            <div className="col-md-8">
                <input type="Date"className="stk-input-insert"required name="sdate" value={stockedit.sdate}
                onChange={handleChange}>
                </input>
            </div> 
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
        <Link to={'/StockManageItems'}><button className="btn btn-danger">Cancel</button></Link>
    </form>
    </div>
    </div>
    </div>
    </div>
     )
    
    }