import { useState } from "react"
import axios from "axios"
// import dotenv from "dotenv"
import REQUEST_URL from "../Utils"
const SignupForm = () => {
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
        <>
        <form>
            <label>Name</label>
            <input type="text" placeholder="Name..." className="SignupName" onChange={(e)=>{
                setName(e.target.value);
            }}/>
            <label>Email</label>
           <input type="email" placeholder="Email..." className="SignupEmail" required={true} onChange={(e)=>{
            setEmail(e.target.value)
           }}/>
           <label>Password</label>
           <input type="password" placeholder="Password..." className="SingupPassword" required={true} onChange={(e)=>{
            setPassword(e.target.value)
           }}/>
           <button onClick={(e)=>{
            submitionHandler(e);
           }}>SignUp</button>
        </form>
        </>
     );
}
 
export default SignupForm;