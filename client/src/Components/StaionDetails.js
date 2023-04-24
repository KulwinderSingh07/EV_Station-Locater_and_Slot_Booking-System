import axios from "axios";
import { useEffect } from "react";
import REQUEST_URL from "../Utils";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PayButton from "./Payment";

const StaionDetailsSlots = () => {
    const [stationData, setStationData] = useState(null)
    const {stationID}=useParams()
    // console.log(stationID)
    const staiondatafetcher=async(req,res)=>{
        const staiton_data=await axios.get(`${REQUEST_URL}/station/${stationID}`)
        // console.log(staiton_data.data.data)
        setStationData(staiton_data.data.data)
    } 
    useEffect(()=>{
        staiondatafetcher();
    },[])

    return ( 
        <div className="StationSlotDetailHeader">
        {stationData!=null &&
            <div className="StationBasicDetail">
                <div className="StaitonDetailBody">
                    <div className="StationDetailHeader">
                        <div className="label">
                            <div>Name :</div>
                    <div >{stationData.name}</div>
                            </div>
                            <div className="label">
                            <div>Description : </div>
                    <div>{stationData.description}</div>
                    {/* <div >{stationData.name}</div> */}
                            </div>
                            <div className="label">
                            <div>Location : </div>
                    {/* <div >{stationData.name}</div> */}
                    <div>{stationData.location}</div>
                            </div>
                    </div>
                </div>
                <h1>Slots</h1>
                <div className="SlotDetails">
                    <div className="solotheadings">
                <div>Slot Starting Time </div>
                <div>Slot End Time</div>
                 <div>Slot Price </div>
                 <div>Booking Button</div>
                 <div>Booking remove</div>
                 </div>
                    {stationData.slots.map((slots)=>{
                        return(
                            <div className="slotheader">
                            <div className="slotBody">
                                <div>{slots.slot_start_timing}</div>
                                <div>{slots.slot_end_timing}</div>
                                <div>{slots.price}</div>
                                <PayButton slots={slots} stationData={stationData}/>
                            </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        }
        </div>
     );
}
 
export default StaionDetailsSlots;