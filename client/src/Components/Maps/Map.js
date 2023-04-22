import React from 'react'
import { GoogleMap, StandaloneSearchBox,useJsApiLoader,Marker, Autocomplete, LoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import {FaLocationArrow} from 'react-icons/fa'
const containerStyle = {
  width: '50%',
  height: '100vh',
};


const MapsViewWindow = () => {
    const [lat, setLat] = useState()
    const [lng, setLns] = useState()
    const [values,setvalues]=useState()
    const center = {
        lat:Number(lat),
        lng:Number(lng)
        };
        useEffect(()=>{
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
    
      const [map, setMap] = React.useState(null)
    
      const onLoad = React.useCallback((map)=> {
        console.log("next")
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [,values])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
      
      return ( 
          <div className='Map-container'>
            {/* <LoadScript googleMapsApiKey= "AIzaSyCgT3Xb6iluNg4IKIiiZc-nerG30hgcLn4" libraries={['places']}> */}
            <div className='Map-controllers'>
                {/* <Autocomplete> */}
                <input type='text' placeholder='Destination...'/>
                {/* </Autocomplete>  */}
            <button onClick={()=>{
                map.panTo(center)
            }}><FaLocationArrow/></button>
            </div>
            {/* </LoadScript> */}
      {  isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}    
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
            <Marker position={center}/>
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
    ) : <></>}
    </div>
     );
}
 
export default MapsViewWindow;