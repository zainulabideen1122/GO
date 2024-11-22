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
import HOC from "../../utils/hoc";
import { NavbarContext } from "../../context/NavbarContext";
import { useNavigate } from "react-router-dom";
import { validate_jwtToken } from "../../utils/functions";
import Swal from "sweetalert2";
export const locationContext = createContext()



function Home() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState()
    const {driverStatus,setDriverStatus} = useContext(NavbarContext)
    console.log({ driverStatus, setDriverStatus });
    const [isNavigationWindow, setIsNavigationWindow] = useState(false)
    const byDefualt = useRef(null)
    // const [currentLocation, setCurrentLocation] = useState(null)
    const [windowHeight, setWindowHeight] = useState(35);
    const [mapHeight, setMapHeight] = useState(`92.5vh`)
    const [dropOff, setDropOff] = useState(null);
    const [pickUp, setPickUp] = useState('test');
    const [driverLocation, setDriverLocation] = useState("")
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



    useEffect(()=>{
        console.log(selectedUsers.driver)
    }, [selectedUsers])

    useEffect(()=>{
        setDriverStatus("Away")
        if(!validate_jwtToken(setUserDetails)){
            navigate('/auth/login')
        }

        const token = localStorage.getItem('token')
        const updated = jwtDecode(token)
        setUserDetails(updated)
        if(!updated?.isInfoCompleted)
        {
            //alert("Please complete your profile to continue! \nYou are being redirected to profile page!")
            Swal.fire({
                title: "Atention Required!",
                text: "Please complete your profile to continue!",
                icon: "warning"
              });
            navigate('/Profile')
        }
    }, [])

    const driver_activateHandle = ()=>{

        console.log(userDetails.id)

        axios.get(`http://localhost:3001/user/getUser/${userDetails.id}`)
        .then(res=>{
            console.log(res.data)
            if(!res.data.isInfoCompleted)
            {
                alert("Please complete your profile to continue! \nYou are being redirected to profile page!")
                navigate('/Profile')
            }else{    
                setDriverStatus("Active");
                setIsNavigationWindow(true)
            }    
        })
        .catch(err=>{
            console.log(err)
        })
        }

    return ( 
        <>
            <div className="homeContainer">
                <div className="homeContent">

                    <LoadScript libraries={['places']} googleMapsApiKey={process.env.REACT_APP_GOOGLE_API}>
                        <Map mapHeight={mapHeight} setPickUp={setPickUp} pickUp={pickUp} dropOff={dropOff} driverLocation={driverLocation} setDriverLocation={setDriverLocation}/>
                    
                    
                    <HOC isFor="Rider">
                        <div className={`toLocation ${isNavigationWindow? 'displayNone':''}`}>
                            <input className="testingInput" type="text" placeholder="Where To go?" onClick={()=>setIsNavigationWindow(true)}/>
                        </div>
                    </HOC>
                    <HOC isFor="Driver">
                        <div className={`toLocation ${isNavigationWindow? 'displayNone':''}`}>
                            <button onClick={driver_activateHandle} 
                                className="activateBtn"
                            >
                                Activate
                            </button>
                        </div>
                    </HOC>
                    
                    
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

                        <HOC isFor="Rider">
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
                        </HOC>

                        <HOC isFor="Driver">
                            <div className="driverSlidingWindow" style={{height:`${windowHeight-5}vh`}}>
                                        <h2>No requests yet!</h2>
                                
                            </div>
                            <button onClick={()=>{
                                setDriverStatus("Away");
                                setIsNavigationWindow(false)}} 
                                className="deActivateBtn"
                            >
                                Deactivate
                            </button>
                        </HOC>

                        
                    </motion.div></LoadScript>
                </div>
            </div>
        </>
     );
}

export default Home;