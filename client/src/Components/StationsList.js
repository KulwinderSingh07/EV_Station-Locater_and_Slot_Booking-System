import {useNavigate} from "react-router-dom"
const StationsList = ({stationsData,map}) => {
    // console.log("hello",stationsData)

    const navigator=useNavigate();
    return ( 
        <div className="StationDataList_Heading">
        {stationsData && stationsData.map((station)=>{
            // console.log(station)
            return(
                <div className="stationlist">
                <div className="stationbody">
                  <span>Name : {station.name}</span>
                  <span>Description : {station.description}</span>
                  <span>Location : {station.location}</span>
                  <span>
                    <button
                    onClick={()=>{
                        map.panTo({
                            lat:station.lat,
                            lng:station.lng
                        })
                    }}
                    >Pan Map
                    </button>
                    <button onClick={()=>{
                        navigator(`/Map/${station._id}`)
                    }}>Slots</button>
                  </span>
                </div>
              </div>
            );
        })}
        </div>
        );
    }
 
export default StationsList;