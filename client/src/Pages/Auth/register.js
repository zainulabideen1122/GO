import RegisterPoster from "../../media/registerPoster.png"
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import Google from "./googleAuth";


function Register() {

    const [credentials, setCredentials] = useState({})
    const navigate = useNavigate()
    const currentUrl = window.location.pathname;

    const getRegisterData = (e)=>{
        const cred = {[e.target.id]: e.target.value};
        setCredentials((prev)=>({...prev, ...cred}))
    }

    const signUpRequest = async(role)=>{
        await axios.post('http://localhost:3001/auth/register', {credentials, role:role})
        .then(res=>{
            console.log(res.data)
            localStorage.setItem('token', res.data)
            navigate('/')
        })
        
    }

    const signUpUser = ()=>{
        console.log(credentials)
        if(currentUrl.includes('driver'))
            signUpRequest("Driver")
        else
            signUpRequest("Rider")
    }

    return ( <>
        <div className="loginDiv">
            {/* <img src={RegisterPoster}/> */}
            <motion.img
            src={RegisterPoster} 
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type:"spring",stiffness: 100,duration: 0.5 }}
            />
            <div className="registerContainer">
                <div className="manualLogin">
                    <input type="text" placeholder={(currentUrl=== '/auth/register'?'':"Driver's")+" Name"} id="name" value={credentials.name} onChange={getRegisterData}/>
                    <input type="text" placeholder={ (currentUrl=== '/auth/register'?'':"Driver's")+" Email"} id="email" value={credentials.email} onChange={getRegisterData}/>
                    <input type="password" placeholder="Password" id="password" value={credentials.password} onChange={getRegisterData}/>
                    <button onClick={signUpUser}>Sign Up</button>
                    {currentUrl==="/auth/register"? <Link to="/auth/register/driver">Sign-up as a Driver?</Link>:null}
                    {currentUrl==="/auth/register/driver"? <Link to="/auth/register">Sign-up as a Rider?</Link>:null}
                </div>
                <p className="orBreak">Or</p>
                <div className="thirdParty_login">
                    <Google />
                    <Link to={'/auth/login'}>Already have an account?</Link>
                </div>

            </div>
        </div>
    </> );
}

export default Register;