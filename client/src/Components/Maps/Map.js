import React from 'react'
import { GoogleMap, StandaloneSearchBox,useJsApiLoader,Marker, Autocomplete, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import {FaLocationArrow} from 'react-icons/fa'
import { useRef } from 'react';
import axios from "axios"
import REQUEST_URL from '../../Utils';
import {BiCurrentLocation} from 'react-icons/bi'
import StationsList from '../StationsList';
const containerStyle = {
  width: '50%',
  height: '100vh',
};


const MapsViewWindow = () => {
  document.body.style.backgroundColor = "#FFFFFF";
    const [lat, setLat] = useState()
    const [lng, setLns] = useState()
    const [values,setvalues]=useState()
    const [map, setMap] = useState(null)
    const [Station_data,setStation_data]=useState(null);
    const center = {
        lat:Number(lat),
        lng:Number(lng)
        };
        const Location={
            lat:30.708513,
            lng:76.802577
        }

        const StationFetch=async()=>{
          const StationData=await axios.get(`${REQUEST_URL}/station`)
          console.log(StationData.data.data)
          setStation_data(StationData.data.data)
        }
        useEffect(()=>{
          StationFetch()
 navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position.coords.latitude)
            setLat(Number(position.coords.latitude))
            setLns(Number(position.coords.longitude))
            setvalues(true)
        });
        },[])
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCgT3Xb6iluNg4IKIiiZc-nerG30hgcLn4",
        libraries:['places'],
      })
      const onLoad =useCallback((map)=> {
        // console.log("next")
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        setMap(map)
      }, [,values])
    
      const onUnmount = useCallback(function callback(map) {
          setMap(null)
        }, [])
      return ( 
          <div className='Map-container'>
            <div className='Map-controllers'>
              <button onClick={()=>{
                  map.panTo(center)
              }} className='currentplacebutton'>Current Location  <FaLocationArrow/></button>
              <h1>Station</h1>
              {Station_data!==null &&
              <StationsList stationsData={Station_data} map={map}/>
}
            </div>
      {  isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}    
          center={center}
          zoom={16}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
            <Marker position={center} icon="http://www.robotwoods.com/dev/misc/bluecircle.png" title='Current Location'/>
            {/* <Marker position={{
                lat:30.708513,
                lng:76.802577
            }}/> */}
            {Station_data!==null &&
            Station_data.map((station)=>{
              return(
                <Marker position={{
                  lat:station.lat,
                  lng:station.lng
                }}/>
              )
            })
          }
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
    ) : <></>}
    </div>
     );
}
 
export default MapsViewWindow;