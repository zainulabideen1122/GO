import { jwtDecode } from "jwt-decode";
import logo from "../media/GO_1_1.png"
import UserMenu from "./userMenu";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css"
import { FaCarAlt } from "react-icons/fa";
import HOC from "../utils/hoc";
import { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";



function Navbar() {
    const navigate = useNavigate()
    const {driverStatus} = useContext(NavbarContext)
    return ( 
        <>
            <div className="navbar">
                <img style={{cursor:'pointer'}} onClick={()=>navigate('/')} className="logo" src={logo}/>
                <Link to="/"><span style={{paddingRight:"5px"}}>Ride</span> <FaCarAlt /></Link>
                <div className="navProfile">
                    <HOC isFor="Driver">
                        <div className="navbar_driverStatus">
                            <div className={`driverStatus_icon ${driverStatus==="Away"?'driverStatus_away_icon':'driverStatus_active_icon'} `}></div>
                            <span className="driverStatus_text">
                                {driverStatus}
                            </span>
                        </div>
                    </HOC>
                    <UserMenu />
               </div>
            </div>
        </>
     );
}

export default Navbar;