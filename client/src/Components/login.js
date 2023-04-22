import { useState } from "react";
import axios from "axios";
import REQUEST_URL from "../Utils";
const LoginComponent = () => {
    const [Loginemail, setLoginemail] = useState("")
    const [Loginpassword, setLoginpassword] = useState("")
    const LoginsubmitionHandler=async(e)=>{
        e.preventDefault();
        console.log(Loginemail,Loginpassword)
        const Login_data={
            Email:Loginemail,
            Password:Loginpassword
        }
        const UserLogin=await axios.post(`${REQUEST_URL}/user/login`,Login_data)
        console.log(UserLogin.data);
    }
    return ( 
        <>
        <form>
            <label>Email</label>
           <input type="text" placeholder="Email..." className="SignupEmail"  onChange={(e)=>{
            setLoginemail(e.target.value)
           }}/>
           <label>Password</label>
           <input type="text" placeholder="Password..." className="SingupPassword" onChange={(e)=>{
            setLoginpassword(e.target.value)
           }}/>
           <button onClick={(e)=>{
            LoginsubmitionHandler(e);
           }}>Login</button>
        </form>
        </>
     );
}
 
export default LoginComponent;