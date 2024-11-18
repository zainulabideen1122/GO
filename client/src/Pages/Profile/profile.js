import { jwtDecode } from "jwt-decode";
import DriverProfile from "./driverProfile";
import RiderProfile from "./riderProfile";

function Profile() {
    const token = localStorage.getItem('token')
    const userDetails = jwtDecode(token)
    console.log(userDetails)
    return ( 
        <>

            {userDetails.role === "Rider" ? <RiderProfile/>: <DriverProfile/>}
        </>
    );
}

export default Profile;