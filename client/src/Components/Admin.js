import axios from "axios";
import GetCookie from "../Hooks/getCookie";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashBoard = () => {
    document.body.style.backgroundColor = "#FFFFFF";

    const [adminid, Setadminid] = useState()
    const [adminData,setAdminData]=useState();
    const [stationdata, setStationdata] = useState(null)
    const navigator=useNavigate()
    const AdminInfoFetcher=async()=>{
        const token=GetCookie();
        const AdminData=await axios.post("http://localhost:3001/user/unique",{
            token
        })
        setAdminData(AdminData.data.data)
        Setadminid(AdminData.data.data._id)
    }
    const stationDataFunction=async ()=>{
        const StationData=await axios.get(`http://localhost:3001/station/stationList/${adminid}`)
        setStationdata(StationData.data.data)
        console.log(StationData)
    }
    useEffect(()=>{
        stationDataFunction()
    },[adminid])

    useEffect(()=>{
        AdminInfoFetcher()
    },[])
    return (
         <div className="StationSlotDetailHeader">
        {stationdata!=null &&
            <div className="StationBasicDetail">
                <div className="StaitonDetailBody">
                    <div className="StationDetailHeader">
                        <div className="label">
                            <div>Name :</div>
                    <div >{adminData.Name}</div>
                            </div>
                            <div className="label">
                            <div>Description : </div>
                    <div>{adminData.Email}</div>
                    {/* <div >{stationData.name}</div> */}
                            </div>
                    </div>
                </div>
                <h1>Stations List</h1>
                <div className="SlotDetails">
                    <div className="solotheadings">
                <div>Station Name</div>
                <div>Description</div>
                 <div>Location </div>
                 <div>Check Out</div>
                 </div>

                 {stationdata && stationdata.map((station)=>{
            // console.log(station)
            return(
                <div className="stationlist">
                <div className="stationbody stationadmin">
                  <span>{station.name}</span>
                  <span>{station.description}</span>
                  <span>{station.location}</span>
                  <span>
                    <button onClick={()=>{
                        navigator(`/Map/${station._id}`)
                    }}>Check Out</button>
                  </span>
                </div>
              </div>
            );
        })}
                </div>
            </div>
        }
        </div>
     );
}
 
export default AdminDashBoard;