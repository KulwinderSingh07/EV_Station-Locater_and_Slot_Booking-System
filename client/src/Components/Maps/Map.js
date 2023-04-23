import React from 'react'
import { GoogleMap, StandaloneSearchBox,useJsApiLoader,Marker, Autocomplete, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import {FaLocationArrow} from 'react-icons/fa'
import { useRef } from 'react';
// import { GoogleMap } from '@react-google-maps/api';
// import 
import {BiCurrentLocation} from 'react-icons/bi'
const containerStyle = {
  width: '50%',
  height: '100vh',
};


const MapsViewWindow = () => {
    const [lat, setLat] = useState()
    const [lng, setLns] = useState()
    const [values,setvalues]=useState()
    const [map, setMap] = useState(null)
      /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const center = {
        lat:Number(lat),
        lng:Number(lng)
        };
        const Location={
            lat:30.708513,
            lng:76.802577
        }
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
        var pointA = new google.maps.LatLng(51.7519, -1.2578)
      var pointB = new google.maps.LatLng(50.8429, -0.1313)
      
      async function calculateRoute() {
        if (originRef.current.value === '' || destiantionRef.current.value === '') {
          return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
          origin:pointA,
          destination:pointB,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        })

        setDirectionsResponse(results)
        // setDistance(results.routes[0].legs[0].distance.text)
        // setDuration(results.routes[0].legs[0].duration.text)
      }
      return ( 
          <div className='Map-container'>
            <div className='Map-controllers'>
                {/* <Autocomplete> */}
                <input type='text' placeholder='Destination...' ref={originRef}/>
                {/* </Autocomplete> */}
                {/* <{}/> */}
            <button onClick={()=>{
                map.panTo(center)
            }}><FaLocationArrow/></button>
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
            <Marker position={{
                lat:30.708513,
                lng:76.802577
            }} onClick={calculateRoute}/>
            {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse}/>
            )}
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
    ) : <></>}
    </div>
     );
}
 
export default MapsViewWindow;