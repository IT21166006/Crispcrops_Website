import React, { Component } from "react";
import axios from "axios";
//import './paymentView.css';
import 'jspdf-autotable';

class Paymentview extends Component{
    constructor(props){
        super(props);

        this.state = {
            posts:[],
            filterData:[]
           
            
        };
    }

    componentDidMount(){
        this.retrievePosts();
    }

    retrievePosts(){
        axios.get("http://localhost:8070/payment/posts").then(res =>{
            if(res.data.success){
                this.setState({
                    posts:res.data.existingPosts,
                    filterData:res.data.existingPosts
                })
                console.log(this.state.posts)
            }
            
           
        })
    }
//delete
   
onDelete = (id) =>{
    axios.delete(`http://localhost:8070/payment/delete/${id}`).then((res)=>{alert("Card details Deleted 🥶🥶!");
            
    this.retrievePosts();
       
        
    });


}
//search
filterData(posts,searchkey){
    const result = posts.filter((post) =>
    
    post.name.toLowerCase().includes(searchkey)||
    post.cardNo.toLowerCase().includes(searchkey)||
    post.city.toLowerCase().includes(searchkey)
    )
    this.setState({posts:result})
}

handleSerchArea =(e)=>{
    const searchkey =e.currentTarget.value;

    axios.get("http://localhost:8070/payment/posts").then(res =>{
        if(res.data.success){
            this.filterData(res.data.existingPosts,searchkey)
        }
        })
    }





render(){

        return(
            <div className="container">
                
                <h1 class="text-center">Payment Details</h1>
                <br></br>
                
                <a className="btn btn-primary" href="/report" >
                                        <i className="far fa-info-alt"></i>&nbsp;Get Report
                                    </a>
                
               <div className="col-lg-3 mt-2 mb-2">
                    <input className="form-control " type="search" placeholder="Search" name="Search" onChange={this.handleSerchArea}></input>
                    
                    </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Address</th>
                            <th scope='col'>City</th>
                            <th scope="col">Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((posts,index)=>(
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{posts.name}</td>
                                <td>{posts.phone}</td>
                                <td>{posts.address}</td>
                                <td>{posts.city}</td>
                                
                               
                                <td>
                                    <a className="btn btn-success" href={`/editpayment/${posts._id}`} >
                                        <i className="fas fa-edit"></i>&nbsp;Edit
                                    </a>&nbsp;
                                    <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(posts._id)}>
                                        <i className="far fa-trash-alt"></i>&nbsp;Delete
                                    </a>
                                </td>


                            </tr>
                        ))}
                    </tbody>

                </table>
                <a className="btn btn-dark" href="/Payment" style={{background: 'linear-gradient(0deg, rgba(50,245,0,0.6503851540616247) 0%, rgba(0,130,5,1) 75%);'}}>
                                        <i className="far fa-info-alt"></i>&nbsp;Back
                                    </a><br></br><br></br>               
                                    
                <br></br><br></br><br></br><br></br>
                
        
            </div> 
              
        )        
        
    }
}
export default Paymentview;
