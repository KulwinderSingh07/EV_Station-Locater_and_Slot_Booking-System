const express=require("express")
const router=express.Router()
const {GetAllStation,input_chargin_station, Unique_station, Slot_Booking_Station, Remove_Booking}=require("../Controllers/chargin_station_controllers")
router.route("/register").post(input_chargin_station)
router.route("/").get(GetAllStation)
router.route("/:id").get(Unique_station)
router.route("/bookslot/:stationID").patch(Slot_Booking_Station)
router.route("/removeslot/:stationID").patch(Remove_Booking)
module.exports=router