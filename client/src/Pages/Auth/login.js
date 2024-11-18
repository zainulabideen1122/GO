import { useState } from "react";
import loginPosterImg from "../../media/loginPoster_2.png"
import "./index.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Google from "./googleAuth";

function Login() {

    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const currentUrl = window.location.pathname;
    const getLoginCredentials = (e)=>{
        const cred = {[e.target.id]: e.target.value}
        setCredentials((prevCreds) => ({...prevCreds, ...cred}))
    }

    const loginUser = async()=>{
        console.log(credentials)
        axios.post('http://localhost:3001/auth/login', credentials)
        .then(res=>{
            console.log(res.data)
            localStorage.setItem('token', res.data)
            navigate('/')
        })
    }


    return ( <>
        <div className="loginDiv">
            <img src={loginPosterImg}/>
            <div className="loginContainer">
                <div className="manualLogin">
                    <input type="text" placeholder="Email" id="email" value={credentials.email} onChange={getLoginCredentials}/>
                    <input type="password" placeholder="Password" id="password" value={credentials.password} onChange={getLoginCredentials}/>
                    <button onClick={loginUser}>Login</button>
                </div>
                <p className="orBreak">Or</p>
                <div className="thirdParty_login">
                    <Google/>
                    <Link to={'/auth/register'}>Don't have an account?</Link>
                </div>

            </div>
        </div>
    </> );
}

export default Login;