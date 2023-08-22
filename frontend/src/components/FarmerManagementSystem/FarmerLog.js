import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function LoginFarmer(){

    const navigate = useNavigate ();

    const[showPassword, setShowPassword] = React.useState (false)
    const[credentials, setCredentials] = React.useState({
        email : " ",
        pwd : " ",
        email : " "
    })

    console.log(credentials)

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
        axios.post("http://localhost:8070/farmer/loginFarmer",credentials)
        .then((res)=>{
            if(res.status == 200){
                localStorage.setItem('farmer',res.data.data)
                console.log(res.data.data)
                navigate(`/profileFarmer/${res.data.data._id}`)
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
                    <Link to={'/loginCustomer'}><button className="sgn-btn-log ">CUSTOMER</button></Link>
                </div>
                <div className="col-md-4">
                    <Link to={'/loginFarmer'}><button className="sgn-btn-log sign-row-btn-active">FARMER</button></Link>
                </div>
                <div className="col-md-4">
                    <Link to={'/deldashboard'}><button className="sgn-btn-log">DELEVERY PERSON</button></Link>
                </div>
            </div>


                <div className='container farmerLogin'> 
                
                
                <div className='farmerLogin-all'>
                    <h2 className="farmerLog-heading">Farmer Login</h2>
                    <form className='farmerLogin-form' onSubmit={login}>
                        <div className="form-group">
                            <lable className='farmer_email'>E-mail</lable>
                            <input type='text' placeholder='Enter your email' name='email' onChange={onchange}/>
                        </div>
                        <div className="form-group">
                            <lable className='farmer_pwd'>Password</lable>
                            <input type='password' name='pwd' placeholder='password' onChange={onchange} />
                        </div>
                        <div className="fpwd">
                          <p className="text-center">Don't You Have Account? <a href="http://localhost:3000/registerFarmer" id="signup">Sign Up Here</a></p>
                       </div>
                        
                        <button id='loginBtn' className="btn-farmerLogin" type='submit'>Login</button>       
                    </form>
                    
                </div>
                
            </div>
            </div>
            
    
        )
}