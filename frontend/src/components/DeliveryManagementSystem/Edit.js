import React from "react";
import axios from "axios";
import {useParams,useNavigate} from 'react-router-dom';

export default function Edit(){
    const [person, setperson] = React.useState({
        name:"",
        userName: "",
        age: "",
        email: "",
        mobilenumber: "",
        password: "",
        vehicleType: "",
        RePassword: ""
    });

    console.log(person)
    const navigate = useNavigate();

    function singleUser(e){
        setperson(prevData => {
            const {name, value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    const personID = useParams();

    
    console.log(personID.id);

    React.useEffect(()=> {
        function fetchData(){
            axios.get('http://localhost:8070/person/get/' +personID.id)
            .then((res) => {
                setperson(res.data.person);
            }).catch((err) => {
                console.log(err);
            });
        }
        fetchData();
    }, []);

    function updateData(e){
        e.preventDefault();
        axios.put('http://localhost:8070/person/update/' +personID.id, person)
        .then(() => {
            alert("Successfully Updated.");
            navigate('/profile/'+personID.id);
        }).catch((err) => {
            alert(err);
        })
    }


    return(
        <div>
            <div>
        <div className="container">
        <div className="Del-editprofile-title"><h1>Edit Profile</h1></div></div>
        <br></br>
        <div className="container">
        <form className="Del-edit-box" onSubmit={updateData}>

        <div class="form-row">
            <div class="form-group col-md-3">
            <label for="orderID">Name:</label>
            </div>

            <div class="form-group col-md-3">
            <input type="text" id="fname" name="name" value={person.name} onChange={singleUser}></input>
            </div>
        
        
            <div class="form-group col-md-3">
            <label for="lname">User Name:</label>
            </div>

            <div class="form-group col-md-3">
            <input type="text" id="name" name="userName" value={person.userName} onChange={singleUser}></input>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-3">
            <label for="orderID">Age:</label>
            </div>

            <div class="form-group col-md-3">
            <input type="number" id="fname" name="age" value={person.age} onChange={singleUser}></input>
            </div>
        
        
            <div class="form-group col-md-3">
            <label for="lname">Email:</label>
            </div>

            <div class="form-group col-md-3">
            <input type="text" id="name" name="email" value={person.email} onChange={singleUser}></input>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-3">
            <label for="orderID">Mobile No:</label>
            </div>

            <div class="form-group col-md-3">  
            <input type="phone" maxLength="10"  name="mobilenumber" value={person.mobilenumber} onChange={singleUser}></input>
            </div>
        
        
            <div class="form-group col-md-3">
            <label for="lname">Password</label>
            </div>

            <div class="form-group col-md-3">
            <input type="text" id="name" name="password" value={person.password} onChange={singleUser}></input>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-3">
            <label for="orderID">Vehicle Type</label>
            </div>

            <div class="form-group col-md-3">
            <input type="text" id="fname" name="vehicleType" value={person.vehicleType} onChange={singleUser}></input>
            </div>
        
        
            <div class="form-group col-md-3">
            <label for="lname">Re Enter Password</label>
            </div>

            <div class="form-group col-md-3">
            <input type="text" id="name" name="RePassword" value={person.RePassword} onChange={singleUser}></input>
            </div>
        </div>

        <br></br>

        <form action="">
            <button type="button" className="Del-btn-editSave" onClick={updateData} >Save</button>
        </form>

    
        </form>
        </div>

        
  </div>
        </div>
    )
}