import React from "react";
import { useNavigate } from "react-router-dom";


export default function Allorders(){
    const navigate = useNavigate()
    return(

        <div>
        
        <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Order ID</th>
      <th scope="col">Address</th>
      <th scope="col">Quantity</th>
      <th scope="col">Date & Time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

        <form action="">
                      <button type="button" className="btn-dashboard" onClick={()=>navigate(`/add`)}>add icon </button>
                     
                      </form>



        </div>


    );
}