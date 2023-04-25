import { useState } from "react"
import axios from "axios"
// import dotenv from "dotenv"
import REQUEST_URL from "../Utils"
const SignupForm = () => {
    document.body.style.backgroundColor = "#232B2B";
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const submitionHandler=async(e)=>{
        e.preventDefault();
        console.log(`${REQUEST_URL}/user`)
        const UserSingup=await axios.post(`${REQUEST_URL}/user/register`,{
            Name,
            Email,
            Password
        })
        console.log(UserSingup);
    }
    return ( 
        <div className="leaveform singupform">
            <h2>Sign Up</h2>
          <form className="form">
            <label>Name</label>
            <input className="signup-name-input" placeholder="Name" onClick={(e)=>{
            setName(e.target.value)
            }}></input>
            <label>Email</label>
            <input className="signup-email-input" placeholder="Email" onChange={(e)=>{
                setEmail(e.target.value)
            }}></input>
            <label>Password</label>
            <input
              className="signup-password-input"
              placeholder="Password"
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            ></input>
            {/* <label>Confrim Password</label>
            <input
              className="signup-cpassword-input"
              placeholder="Re-Enter Password"
            ></input> */}
            <button
              onClick={(e) => {
                submitionHandler(e);
              }}
            >
              Signup
            </button>
          </form>
          <a href="/">Login</a>
        </div>
     );
}
 
export default SignupForm;