import { useEffect, useState } from "react";
import axios from "axios";
import REQUEST_URL from "../Utils";
import SetCookie from "../Hooks/setCookie";
import GetCookie from "../Hooks/getCookie";
import { useNavigate } from "react-router-dom";
const LoginComponent = () => {
    document.body.style.backgroundColor = "#232B2B";
    const navigate=useNavigate()
    const [Loginemail, setLoginemail] = useState("")
    const [Loginpassword, setLoginpassword] = useState("")
    const LoginsubmitionHandler=async(e)=>{
        e.preventDefault();
        // console.log(Loginemail,Loginpassword)
        const Login_data={
            Email:Loginemail,
            Password:Loginpassword,
            Token:GetCookie()
        }
        const UserLogin=await axios.post(`${REQUEST_URL}/user/login`,Login_data)
        // console.log(UserLogin.data.cookie);
        SetCookie({value:UserLogin.data.cookie})
        console.log(GetCookie())
        console.log(UserLogin.data)
        if(UserLogin.data.logedin==true){
            navigate("/Map")
        }
    }
    const loginCheck=async()=>{
        // e.preventDefault();
        const UserLogin=await axios.post(`${REQUEST_URL}/user/login`,{
            Token:GetCookie()
        })
        // console.log(UserLogin.data.cookie);
        SetCookie({value:UserLogin.data.cookie})
        console.log(GetCookie())
        console.log(UserLogin.data)
        if(UserLogin.data.logedin==true){
            navigate("/Map")
        }
    }
    useEffect(()=>{
        loginCheck()
    },[])
    return ( 
        
        <div className="leaveform">
          <h2>LOGIN</h2>
          <form className="form">
            <label>Email</label>
            <input
              className="login-email-input"
              placeholder="Enter Registerd Emial..."
              onChange={(e)=>{
                setLoginemail(e.target.value)
              }}
            ></input>
            <label>Password</label>
            <input
              className="login-password-input"
              placeholder="Enter Password..."
              onChange={(e)=>{
                setLoginpassword(e.target.value)
              }}
            ></input>
            <button
              onClick={(e) => {
                LoginsubmitionHandler(e);
              }}
            >
              LogIn
            </button>
          </form>
            <a href="/User/Singup">Singup</a>
      </div>
             );
}
 
export default LoginComponent;