const UserModel = require("../Models/User_Model");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const jwt_key=process.env.jWT_SECRET_KEY

const signup_controller=async(req,res)=>{
    try{
    const user_data=req.body;
    console.log(user_data)
    const UserCheck=await UserModel.findOne({Email:user_data.Email})
    if(UserCheck) throw new Error("User already registered")
    const hasedPassword=await bcrypt.hash(user_data.Password,10)
    const UserDocument=await UserModel.create({...user_data,Password:hasedPassword})
    const token=jwt.sign({payload:UserDocument._id},jwt_key)
    res.cookie("loged_in",token)
    res.status(200).json({
        message:"user has registered",
        registered:true,
        cookie:token
    })
    }catch(err){
        res.status(400).json({
            message:err.message,
            registered:false
        })
    }
}

const signin_controller=async(req,res)=>{
    try{
        const Login_Data=req.body
        console.log(Login_Data)
        // console.log(req.cookies)
        const Req_token=Login_Data.Token
        // console.log(Req_token)
        if(Req_token){
            const user_id=jwt.verify(Req_token,jwt_key).payload
            const UserDocument=await UserModel.findById(user_id)
            if(!UserDocument) throw new Error("User not found");
                res.cookie("loged",Req_token)
                console.log("chal reha")
                res.status(200).json({
                    logedin:true,
                    cookie:Req_token,
                    role:UserDocument.role
                })
        }
        else{
        const UserDocument=await UserModel.findOne({Email:Login_Data.Email})
        console.log(UserDocument)
        if(!UserDocument) throw new Error("Signup first")
        const token=jwt.sign({payload:UserDocument._id},jwt_key)
        res.cookie("loged",token,{expires:new Date(Date.now()+5654654654)})
        res.status(200).json({
            message:"User Loged In",
            loged:true,
            cookie:token,
            role:UserDocument.role
        })
    }
    }
    catch(err){
        res.status(409).json({
            message:err.message,
            loged:false
        })
    }
}

const GetSpecificUserController=async (req,res)=>{
    try{
        // console.log("hell")
        console.log(req.body)
        const {token}=req.body
        if(!token) throw new Error("JWT token missing")
        const user_id=jwt.verify(token,jwt_key).payload
        const UserDocument=await UserModel.findById(user_id)
        if(!UserDocument) throw new Error("User data not fetched")
        res.status(200).json({
            message:"User found",
            data:UserDocument
        })
    }catch(err){
        res.status(404).json({
            message:err.message,
            user_found:false
        })
    }
}

const UpdateUserData=async(req,res)=>{
    try{
    const Updation_data=req.body;
    if(!Updation_data) throw new Error("Data for profile updation not passed")
    const token=req.cookies.loged_in
    const user_id=jwt.verify(token,jwt_key).payload
    // console.log(user_id)
    const User_document_updation=await UserModel.findByIdAndUpdate(user_id,Updation_data)
    res.status(200).json({
        message:"User has been updated",
        data:User_document_updation,
        updated:true
    })
    }catch(err){
        res.status(404).json({
            message:err.message,
            updated:false
        })
    }
}

module.exports={signup_controller,signin_controller,GetSpecificUserController,UpdateUserData}