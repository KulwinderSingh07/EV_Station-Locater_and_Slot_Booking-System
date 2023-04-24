const express=require("express")
const router=express.Router()
const {signup_controller,signin_controller,GetSpecificUserController,UpdateUserData}=require("../Controllers/User")
router.route("/register").post(signup_controller)
router.route("/login").post(signin_controller)
router.route("/unique").post(GetSpecificUserController).patch(UpdateUserData)
module.exports=router