import React, {useEffect} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import jsPDF from 'jspdf';
import 'jspdf-autotable'

export default function FarmerDash(){

    const [stocks, setStocks] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const [deletebtn, setdeletebtn] = React.useState(false);

    const navigate = useNavigate();
    console.log(search);

    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8070/stock/')
            .then((res)=>{
                setStocks(res.data)
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[deletebtn]);

      // Search data
  function searchUser() {
    if (search !== "") {
      axios
        .get(`http://localhost:8070/stock/search/${search}`)
        .then((res) => {
            setStocks(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      axios
        .get(`http://localhost:8070/stock/`)
        .then((res) => {
            setStocks(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchUser();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

    // //Report Generation
  function handlePdfGeneration() {
    const doc = new jsPDF();   

    const header = [["Date","Farmer Name", "Item Name", "Stock Qty(KG)", "Unit price Rs:", "Item ID"]];

    const data = stocks.map(stock => [stock.sdate ,stock.famer, stock.ItemName, stock.quantity, stock.price, stock.ItemId]);

    // Add to document
    doc.autoTable({head: header, body: data });

    doc.save('Harvest_all_farmers.pdf')
  }

    

    return(
        <div className="container dashboardFarmer">
            <div className="row">
                <div className="col-md-12 dashboard-allFarmer">
                <h3 className="dash-headingFarmer">Farmer Dashboard</h3>
                <div className="searchInpFarmer">
                                                <input
                                                    type="text"
                                                    id="inlineFormInputGroup"
                                                    placeholder="Search"
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}/>
                                                    </div>
                    <div className="tableFarmer">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Farmer Name</th>
                                    <th>Item Name</th>
                                    <th>Stock Qty(KG):</th>
                                    <th>Unit price Rs.</th>
                                    <th>Item ID</th>
                                </tr>
                            </thead>
                           <tbody>
                            {stocks.map((i,index) => {
                                return(
                                    <tr key={index}>
                                        <td>{i.sdate}</td>
                                        <td>{i.famer}</td>
                                        <td>{i.ItemName}</td>
                                        <td>{i.quantity}</td>
                                        <td>{i.price}</td>
                                        <td>{i.ItemId}</td>
                                    </tr>
                                )
                            })}
                           </tbody>
                        </table>
                    </div>
                    <div className="reportFarmer">
                        <button type="button" className="g-reportFarmer" onClick={handlePdfGeneration}>Generate Report</button>
                    </div>
                    <div className="biddingFarmer">
                        <Link to={'/createbid'}><button type="button" className="c-biddingFarmer">Biddings</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}