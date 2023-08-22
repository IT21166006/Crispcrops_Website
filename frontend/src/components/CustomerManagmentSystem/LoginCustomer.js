import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function LoginCustomer(){

    const navigate = useNavigate ();

    const[showPassword, setShowPassword] = React.useState (false)
    const[credentials, setCredentials] = React.useState({
        email:"",
        password:""
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
        axios.post("http://localhost:8070/customer/loginCustomer",credentials)
        .then((res)=>{
            if(res.status == 200){
                localStorage.setItem('customer',res.data.data)
                console.log(res.data.data)
                navigate(`/profileCustomer/${res.data.data._id}`)
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
                    <Link to={'/deldashboard'}><button className="sgn-btn-log">DELEVERY PERSON</button></Link>
                </div>
            </div>



                <div className='container cus-login'> 

                    <div className='cus-login-dp'>
                        <h2 className="cus-loging-header"><br></br>CUSTOMER LOG-IN</h2>
                        <form className='cus-login-form' onSubmit={login}>
                            <div className="form-group">
                                <lable className='cus-email'>E-mail</lable>
                                <input type='text' placeholder='email' name='email' required onChange={onchange}/>
                            </div>
                            <div className="form-group">
                                <lable className='cus-password'>Password</lable>
                                <input type='password' name='password' placeholder='password' required onChange={onchange} />
                            </div>
                            
                            <button id='loginBtn' className="cus-login-btn" type='submit'>Login</button>       
                        </form>
                        
                        <div className="form-group">
                            <p className="text-center">Don't have account? <a onClick={()=>navigate(`/Customerregister`)} id="signup">Sign up here<br></br></a><br></br></p>
                        </div>
                    </div>

                    </div>
            </div>
        )
}