import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { locationContext} from "../Pages/Home/home"
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function LocationInputs() {
    const {source, destination} = useContext(locationContext)
    console.log("zainnnn", source)

    const getLatAndLng = async(place, type)=>{
        if(place)
        {
            const placeId = place.value.place_id
            axios.get(`http://localhost:3001/home//place-details/${placeId}`)
            .then(res=>{
                const location = res.data.result.geometry.location
                if(type==='pickUp'){
                    source.setValue({
                        name: {label: place.label, value: place.value},
                        location: location
                    })
                }
                else{
                    destination.setValue({
                        name: {label: place.label, value: place.value},
                        location: location
                    })
                }
            })
        }

    }

    useEffect(() => {
        if (source.value && source.value.location) {
            const fetchLocation = async () => {
                try {
                    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${source.value.location.lat},${source.value.location.lng}&key=${process.env.REACT_APP_GOOGLE_API}`;
                    const response = await axios.get(apiUrl);

                    if (response.data.status === "OK") {
                        const formattedAddress = response.data.results[0].formatted_address;
                        source.setValue({
                            ...source.value,
                            name: { label: formattedAddress, value: formattedAddress }
                        });
                    } else {
                        console.error("Error fetching location data:", response.data);
                    }
                } catch (error) {
                    console.error("Error fetching location:", error);
                }
            };

            fetchLocation();
        }
    }, [source.value.location]);  // Use source.value.location as the dependency
    
    const loader = ()=>{
        setTimeout(() => {
            
        }, 3000);
    }

    return ( 
        <>

        <label>PickUp</label><br></br>
            <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_GOOGLE_API}
                selectProps={{
                    value: source.value.name,
                    onChange: (place) => {
                        getLatAndLng(place, "pickUp");
                        source.setValue(place);  // Update the pickup location
                    },
                    placeholder: "Pick Up Location",
                    isClearable: true,
                    components: { DropdownIndicator: false },
                }}
            />
            <br></br>
            <label>DropOff</label><br></br>
            <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_GOOGLE_API}
                selectProps={{
                    value: destination.name,
                    onChange: (place) => {
                        getLatAndLng(place, "dropOff");
                        destination.setValue(place);  // Update the dropoff location
                    },
                    placeholder: "Drop Off Location",
                    isClearable: true,
                    components: { DropdownIndicator: false },
                }}
            />
        </>
     );
}

export default LocationInputs;