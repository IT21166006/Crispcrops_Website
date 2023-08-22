import React,{useState,useEffect} from "react";
import axios from "axios"
import {Link, useParams} from "react-router-dom";

export default function SetPrice(){

    const [users, setUsers] = useState([]);
        const [searchInput, setSearchInput] = useState("");
        const {id} = useParams();

        function getBids() {
            axios
            .get("http://localhost:8070/bidding/get/"+id)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
            setSearchInput("");
        }

        useEffect(() => {
            getBids();
        }, []);


        let total = 0;


    return(
        <div>
            <body>
                <section id="content">
                <br>
                </br>
                <br>
                </br>
                    <main>
                        <div className="head-title">
                            <div className="left">
                                <h1>Crips Crops Biddings</h1>
                                <br></br>
                                        
                            </div>
                        </div>
                        <div className="container">
                        <div className="table">
                            <table className="table-striped">
                                <thead>
                                <tr>
                                        <th>Bid Id</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Farm</th>
                                    <th></th>
                                </tr>
                                </thead>
                                
                                <tbody>
                                {users.map((i, index) => {
                                total = i.quantity*i.price;
                                    return (
                                        <tr key={index}>
                                        <td>{i.bidID}</td>
                                        <td>{i.ItemName}</td>
                                        <td>{i.quantity}</td>
                                        <td>{i.price}</td>
                                        <td>{i.farm}</td>
                                        <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'LKR' }).format(total)}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            
                            </div>
                        </div>
                        
                    </main>
                </section>
                
            </body>
        </div>
     )
    
    }