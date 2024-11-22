import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const LatLng_to_location = async (location) => {
    try {
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.REACT_APP_GOOGLE_API}`;
        const response = await axios.get(apiUrl);

        if (response.data.status === "OK") {
            const formattedAddress = response.data.results[0].formatted_address;
            return formattedAddress
        } else {
            return "Unknown Location!"
        }
    } catch (error) {
        return "Unknown Location!"
    }
};


export const validate_jwtToken = (setUserDetails)=>{
    const token = localStorage.getItem('token')
    if (token) {
        try {
            setUserDetails(jwtDecode(token));
            return true
        } catch (error) {
            console.error("Invalid token:", error.message);
            return null;
        }
    } else {
        console.warn("No token found");
        return null;
    }
}