import React from "react";

export default function PasswordChange(){

    // const [password, setPassword] = React.useState({
    //     cPwd:"",
    //     newPawd: "",
    //     reNewPwd: ""
    // });
    //     console.log(password)
    //     const navigate = useNavigate();
    
    //     function singleUser(e){
    //         setFarmer(prevData => {
    //             const {name, value} = e.target;
    //             return{
    //                 ...prevData,
    //                 [name] : value
    //             }
    //         })
    //     }
        
    //     const farmerID = useParams();

    // console.log(farmerID.id);

    // // React.useEffect(()=> {
    // //     function fetchData(){
    // //         axios.get('http://localhost:8070/farmer/get/' +farmerID.id)
    // //         .then((res) => {
    // //             setFarmer(res.data.farmer);
    // //         }).catch((err) => {
    // //             console.log(err);
    // //         });
    // //     }
    // //     fetchData();
    // // }, []);

    // function updateData(e){
    //     e.preventDefault();
    //     axios.put('http://localhost:8070/farmer/updatePWd/' +farmerID.id, farmer)
    //     .then(() => {
    //         alert("Successfully Updated Password.");
    //         navigate('/farmerProfile/'+farmerID.id);
    //     }).catch((err) => {
    //         alert(err);
    //     })
    // }

    return(
        <div className="container farmerPassword">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 password-allFmr">
                    <h3 className="pwd-headingFmr">Change Password</h3>
                    <form className="change-pwdFmr" >
                        <div className="form-group">
                            <label className="cur-pwdFarmer">Current Password</label>
                            <input type="text" className="form-control" placeholder="Current Password"required></input>
                        </div>
                        <div className="form-group">
                            <label className="new-pwdFarmer">New Password</label>
                            <input type="text" className="form-control" placeholder="New Password" required></input>
                        </div>
                        <div className="form-group">
                            <label className="rnew-pwdFarmer">Re-Enter New Password</label>
                            <input type="text" className="form-control" placeholder="Re-Enter New Password*" required></input>
                        </div>
                       
                        <button type="button" className="btn-cancelPwdFmr">Cancel</button>
                        <button type="button" className="btn-changePwdFmr">Confirm</button>    
                        
                    </form>
                </div>
                
            </div>
        </div>
    )
}