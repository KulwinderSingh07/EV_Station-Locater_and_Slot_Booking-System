const mongoose=require("mongoose")
const user_schema=mongoose.Schema({
    Name:{
        type:String,
        default:""
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})
const UserModel=mongoose.model("UserModel",user_schema)
module.exports=UserModel
