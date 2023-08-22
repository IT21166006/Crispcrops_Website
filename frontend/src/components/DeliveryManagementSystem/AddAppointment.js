
import React,{useState} from "react";
import axios from "axios";

 



export default function AddAppointment(){
     
    
    const [orderid,setorderid] = useState("");
    const [quantity,setquantity] = useState("");
    const [deliverytype,setdeliverytype] = useState("");
    const [dateTime,setdateTime] = useState("");
    const [address,setaddress] = useState("");
    const [deliverName,setdeliverName] = useState("");
    const [mobileNo,setmobileNo] = useState("");

    function passData(e){
        e.preventDefault();

        const newAppointment={
            orderid,  
            quantity,
            deliverytype,
            dateTime,
            address,
            deliverName,
            mobileNo
          
        }
        axios.post('http://localhost:8070/appointment/addAppointment',newAppointment).then(()=>{
            alert("Succefully Passed ✅");
            
        })
        .catch((err)=>{
            alert("something is happening🚨")
        })
    }

    return(

        <div>
          <div className="container">
            
         <div className="square">
          <form onSubmit={passData}>

            <div className="row">
              <div className="col-25 ">
              <label for="orderID">Order ID</label>

              </div>

              <div className="col-25">
                <input type="text" id="orderid" name="" placeholder="00001"
                onChange={(e)=>{
                  setorderid(e.target.value);
              }}></input>
              </div>


              <div className="col-25">
                <label for="lname">Delivery person's Name</label>
              </div>

              <div className="col-25">
                <input type="text" id="quantity" name="" placeholder="Nuwan"
                onChange={(e)=>{
                  setdeliverName(e.target.value);
              }}></input>
              </div>
            </div>



            <div className="row">
              <div className="col-25">
                <label for="orderID">Quantity</label>
              </div>

              <div className="col-25">
                <input type="text" id="deliverytype" placeholder="12kg"
                onChange={(e)=>{
                  setquantity(e.target.value);
              }}></input>
              </div>


              <div className="col-25">
                <label for="Mobile">Mobile No</label>
              </div>

              <div className="col-25">
                <input type="number" maxLength={10} id="" name="" placeholder="077xxxxxxx"
                onChange={(e)=>{
                  setmobileNo(e.target.value);
              }}></input>
              </div>
            </div>



            <div className="row">
              <div className="col-25">
                <label for="type">Delivery Type</label>
              </div>
              <div className="col-25">
                <select id="address" name="" onChange={(e)=>{
                  setdeliverytype(e.target.value);
              }}>
                  <option value="Motor Bike">Motor Bike</option>
                  <option value="Threewheelar">Threewheelar</option>
                  <option value="Lorry">Lorry</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label for="type">Accepted Date & Time</label>
              </div>
              <div className="col-25">
              <input type="date" id="" name=""
              onChange={(e)=>{
                setdateTime(e.target.value);
            }}></input>
              
              </div>
              <div className="col-25">
              <input type="time" id="deliverName" name=""></input>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label for="subject">address</label>
              </div>
              <div className="col-75">
                <textarea id="mobileNo" name="subject" placeholder="No 12, 
            Samagi Mawatha,
            Pannipitiya" 
            onChange={(e)=>{
              setaddress(e.target.value);
          }} ></textarea>
              </div>
            </div>



            <div className="row">
              <button type="submit"  className="add-btn">Add</button>
            </div>

          </form>
            </div>
            
            </div>
                    </div>
    );
}