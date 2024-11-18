import { Button, Menu } from "@mantine/core";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineAccountCircle, MdOutlinePayment  } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css"


function UserMenu({userDetails}) {

    const navigate = useNavigate()

    const logoutUser = ()=>{
        localStorage.removeItem('token')
        if(!localStorage.getItem('token')){
            navigate('/auth/login')
        }
    }

    return ( 
        <>
            <Menu shadow="md">
                <Menu.Target>
                    <Button radius="12rem" color="#31363F">
                        {/* {userDetails.name.slice(0,1)} */}
                        <FaUserAlt   size={16} />
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>General</Menu.Label>
                    <Link className="userMenuLink" to="/Profile">
                        <Menu.Item leftSection={<MdOutlineAccountCircle size={20}/>}>
                            Profile
                        </Menu.Item>
                    </Link>
                    <Link className="userMenuLink" to="/Profile">
                        <Menu.Item leftSection={<MdOutlinePayment size={20}/>}>
                        Payments
                        </Menu.Item>
                    </Link>
                    <Menu.Divider/>
                    <Menu.Label>Accounts</Menu.Label>
                    <Menu.Item
                        color="red"
                        leftSection={<IoLogOut size={20} />}
                        onClick={logoutUser}
                        >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
     );
}

export default UserMenu;