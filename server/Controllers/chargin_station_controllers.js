const Station_Model = require("../Models/ChragingStation_Model");
const UserModel = require("../Models/User_Model");
const jwt=require("jsonwebtoken")
const jwt_key=process.env.jWT_SECRET_KEY

const input_chargin_station=async(req,res)=>{
    try{
        const chargin_station_data=req.body;
        const StationDocument=await Station_Model.create(chargin_station_data);
        res.json({
            message:"Created",
            data:StationDocument
        })
    }
    catch(err){
        res.json({
            message:err.message,
            created:false
        })
    }
}
const GetAllStation=async(req,res)=>{
    try{
    const allStationData=await Station_Model.find();
    res.json({
        data:allStationData,
        message:"Chargin Staiton are fetched",
        fetched:true
    })
    }
    catch(err){
        res.json({
            message:err.message,
            fetched:false
        })
    }
}

const Unique_station=async(req,res)=>{
    try{
    const station_id=req.params.id;
    const StationDocument=await Station_Model.findById(station_id);
    res.json({
        message:"Station found",
        data:StationDocument,
        staion_fetched:true
    })
}
catch(err){
    res.json({
        station_fetched:false,
        message:err.message
    })
}
}

const Slot_Booking_Station=async(req,res)=>{
    try{
    const station_id=req.params.stationID;
    const Req_token=req.cookies.loged
    const user_id=jwt.verify(Req_token,jwt_key).payload
    const {slot_start_timing}=req.body;
    const StationDocument=await Station_Model.findById(station_id)
    console.log(StationDocument)
    const slotObject=StationDocument.slots.map((slot)=>{
        console.log(slot_start_timing)
        if(slot.slot_start_timing==slot_start_timing){
            console.log(slot)
            slot.booker_id=user_id
            slot.booked=true
        } 
    })
    StationDocument.save();
    res.json({
        data:StationDocument,
        booked:true
    })
    }catch(err){
        res.json({
            message:err.message,
            booked:false
        })
    } 

}
const Remove_Booking=async(req,res)=>{
    try{
        const station_id=req.params.stationID;
        const {slot_start_timing}=req.body;
        const StationDocument=await Station_Model.findById(station_id)
        const slotObject=StationDocument.slots.map((slot)=>{
            if(slot.slot_start_timing==slot_start_timing){
                slot.booker_id=null
                slot.booked=false
            }
        })
        StationDocument.save();
        res.json({
            data:StationDocument,
            BookingRemoved:true
        })
        }catch(err){
            res.json({
                message:err.message,
                BookingRemoved:false
            })
        } 
}
module.exports={input_chargin_station,GetAllStation,Unique_station,Slot_Booking_Station,Remove_Booking}
