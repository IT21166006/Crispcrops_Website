import React from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

export default function DeliveryLogin(){

    const navigate = useNavigate ();

    const[showPassword, setShowPassword] = React.useState (false)
    const[credentials, setCredentials] = React.useState({
        email:"",
        password:""
    })

    

    function onchange(e){
        setCredentials(prevData => {
            const {name, value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    function login(e){
        e.preventDefault();
        axios.post("http://localhost:8070/person/login",credentials)
        .then((res)=>{
            if(res.status == 200){
                // localStorage.setItem('person',JSON.stringify(res.data.data))
                console.log(res.data.data)
                navigate(`/profile/${res.data.data._id}`)
            }
            
        })
        .catch((err) => {
            alert(err);
        })
        console.log("logged")
        }
    
        console.log(showPassword)

    return(
        <div className="container">


            <div className="row">
                <div className="col-md-4">
                    <Link to={'/loginCustomer'}><button className="sgn-btn-log sign-row-btn-active">CUSTOMER</button></Link>
                </div>
                <div className="col-md-4">
                    <Link to={'/loginFarmer'}><button className="sgn-btn-log">FARMER</button></Link>
                </div>
                <div className="col-md-4">
                    <Link to={'/deldashboard'}><button className="sgn-btn-log active">DELEVERY PERSON</button></Link>
                </div>
            </div>

            <div className='container login'> 
                <div className='Del-login-box'>
                    <h2 className="Del-Login-title">Login</h2>
                    <div className="container">
                    <form className='Del-login-form' onSubmit={login}>
                    <div class="form-row">
                        <div className="form-group col-md-6">
                        
                            <lable className="Del-email">E-mail</lable>
                            <input type='text' placeholder='email' name='email' onChange={onchange}/>
                        </div>
                        <div className="form-group col-md-6">
                            <lable className="Del-password">Password</lable>
                            <input type='text' name='password' placeholder='password' onChange={onchange} />
                        </div>
                        </div>




                        <button id='loginBtn' className="Del-btn-Login" type='submit'>Login</button>
                        
                        <button type="button" className="Del-btn-create" onClick={()=>navigate(`/Delregister/`)}>create account</button>       
                    </form>
                    </div>
                    
                    
                      
                </div>
                
            </div>
        </div>
            
    
    );
}