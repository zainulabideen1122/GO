import { jwtDecode } from "jwt-decode";
import logo from "../media/GO_1_1.png"
import UserMenu from "./userMenu";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css"
import { FaCarAlt } from "react-icons/fa";


function Navbar() {
    const navigate = useNavigate()
    return ( 
        <>
            <div className="navbar">
                <img style={{cursor:'pointer'}} onClick={()=>navigate('/')} className="logo" src={logo}/>
                <Link to="/"><span style={{paddingRight:"5px"}}>Ride</span> <FaCarAlt /></Link>
                <div className="navProfile">
                    <UserMenu />
               </div>
            </div>
        </>
     );
}

export default Navbar;