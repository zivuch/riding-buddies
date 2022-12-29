import "../styles/Map.css";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../constants";
import axios from "axios";
import NavLoggedIn from "./NavLoggedIn";
import { AppContext } from '../App';



export default function Map() {

  const {token, setToken} = useContext(AppContext)

  function LocationMarker() {
    
    const myIcon = L.icon({
      iconUrl: '/images/here.png',
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40]
      
    });

    const [location, setLocation] = useState('')
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      const updateLocation = async (location) => {
        if(location){
          // console.log(location);
          //********** removed http://localhost:3001 **********
          await axios.post('/updatedLocation', location,{
            headers:{
              'x-access-token':token
            }
          })  
        .then(res => console.log(res.data)) 
      }} 

      map.locate().on("locationfound", function (e) { 
        
        setPosition(e.latlng);
        setLocation(e.latlng)

        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));

        updateLocation(e.latlng)

        .catch(e=>console.log(e))
      });
    }, [map]);


    // console.log(usersLocationData);

    return position === null ? null : 
    (
      <Marker position={position} icon={myIcon}>
        <Popup>
          Rider Info: <br />
          Your Current Location
        </Popup>
      </Marker>
    );
  }

  const [usersLocationData, setUsersLocationData] =useState([])

  useEffect(() => {
    const getUsersLocation = async () => {
      //********** removed http://localhost:3001 **********
      const {data} = await axios.get('/getUsersLocation',{
        headers:{
          'x-access-token':token
        }
      })
      // console.log(data)
      setUsersLocationData(data)
    }
    // console.log('useEffectWorked');
    getUsersLocation() 
    .catch(e=>console.log(e))
  },[])

  // console.log(usersLocationData);

  return (
    <>
      <NavLoggedIn/>
      <MapContainer
        center={[49.1951, 16.6068]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100vh" }}
      >
      {usersLocationData != [] ? usersLocationData.map(user =>
        {if(user.lat && user.lng ){
          return <Marker position={[user.lat, user.lng]} icon={icon}>
                  <Popup>
                    Rider Info: <br />
                    Name: {user.firstname}<br />
                    Email:{user.email}<br />
                    Gender: {user.gender}<br />
                    Motorcycle: {user.motorcycle}
                  </Popup>
                </Marker>
          }
        }
      ) : <></> }

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </>
  );
}
