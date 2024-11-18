import logo from "../../media/GO_1_1.png"
import './index.css'
import { jwtDecode } from "jwt-decode";
import Map from "../../component/Map/map";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineDragHandle } from "react-icons/md";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import apiClient from "../../component/config/axios";
import LocationInputs from "../../component/locationInputs";
import { LoadScript } from "@react-google-maps/api";
import RideSelector from "../../component/driversList";
import { Button } from "@mantine/core";
import UserMenu from "../../component/userMenu";
import Navbar from "../../component/navbar";

export const locationContext = createContext()



function Home() {
    const token = localStorage.getItem('token')
    const userDetails = jwtDecode(token)
    const [isNavigationWindow, setIsNavigationWindow] = useState(false)
    const byDefualt = useRef(null)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [windowHeight, setWindowHeight] = useState(35);
    const [mapHeight, setMapHeight] = useState(`92.5vh`)
    const [dropOff, setDropOff] = useState(null);
    const [pickUp, setPickUp] = useState('test');
    const [content, setContent] = useState({
        locationWindow: true,
        driversList: false
    })

    const [selectedUsers, setSelectedUsers] = useState({
        rider: userDetails,
        driver: ''
    })

    
    const driversDummyData = [
        {
            id:1,
            name: 'Driver 1',
            Rating: '4/5',
        }
    ]


    useEffect(() => {
        if(!isNavigationWindow)
        {
            setMapHeight('92.5vh')
        }
        else{
            setMapHeight(`${92.5 - windowHeight+0.5}vh`)
        }
        if (isNavigationWindow && byDefualt.current) {
            byDefualt.current.focus();
        }
    }, [isNavigationWindow]);

    useEffect(() => {
        (isNavigationWindow && setMapHeight(`${92.5 - windowHeight+0.5}vh`))
    }, [windowHeight]);

    const navigationAnimation = {
        hidden: { opacity: 1, y: '100%' },
        visible: { opacity: 1, y: '0%', transition: { type: "spring", stiffness: 100, damping: 25 } },
        exit: { opacity: 1, y: '100%', transition: { type: "spring", stiffness: 100, damping: 25 } }
    };

    const handleDrag = (event, info) => {
        // Calculate new height based on the drag movement
        const newHeight = Math.min(90, Math.max(15, windowHeight - info.delta.y / window.innerHeight * 100));
        setWindowHeight(newHeight);
    };

    


    const getLatAndLng = async(place, type)=>{
        console.log(place)
        const placeId = place.value.place_id
        axios.get(`http://localhost:3001/home//place-details/${placeId}`)
        .then(res=>{
            const location = res.data.result.geometry.location
            console.log(location)
        })

    }

    useEffect(()=>{
        console.log(selectedUsers.driver)
    }, [selectedUsers])

    console.log("userssssss detail: ",userDetails)

    return ( 
        <>
            <div className="homeContainer">
                <div className="homeContent">

                    <LoadScript libraries={['places']} googleMapsApiKey={process.env.REACT_APP_GOOGLE_API}>
                        <Map mapHeight={mapHeight} setPickUp={setPickUp} pickUp={pickUp} dropOff={dropOff}/>
                    
                    
                    <div className={`toLocation ${isNavigationWindow? 'displayNone':''}`}>
                        <input className="testingInput" type="text" placeholder="Where To go?" onClick={()=>setIsNavigationWindow(true)}/>
                        
                    </div>
                    
                    
                    <motion.div
                        className={`${isNavigationWindow ? 'displayNavigationWindow customNavbar' : 'navigationWindow'}`}
                        initial="hidden"
                        animate={isNavigationWindow ? "visible" : "hidden"}
                        exit="exit"
                        variants={navigationAnimation}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        onDrag={handleDrag} 
                        style={{ height: `${windowHeight}vh` }}
                        >
                        <span 
                            className="navigatioNWindowArrow" 
                            // onClick={() => setIsNavigationWindow(false)}
                        >
                            <MdOutlineDragHandle  size={35} />
                        </span>

                        {content.locationWindow && <div className="locationsWindow">
                            {<locationContext.Provider 
                                value={{
                                    source: {value: pickUp, setValue: setPickUp},
                                    destination: {value: dropOff, setValue: setDropOff},
                                }}>
                                <LocationInputs/>
                            </locationContext.Provider>}
                            <button 
                                className="searchRideBtn" 
                                onClick={() => {
                                    if (!dropOff || !dropOff.location) {
                                        alert("Please set the pick-up or drop-off location before searching for rides.");
                                    } else {
                                        setContent(prevContent => ({ ...prevContent, locationWindow: false, driversList: true }));
                                    }
                                }}
                            >
                                Search Rides
                            </button>
                        </div>}

                        {content.driversList && <div className="driversLists" style={{overflow:'hidden'}}>
                            <RideSelector selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}/>
                            <button className="confirmRideBtn">Confirm</button>
                        </div>}
                    </motion.div></LoadScript>
                </div>
            </div>
        </>
     );
}

export default Home;