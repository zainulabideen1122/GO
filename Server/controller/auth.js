const jwt = require('jsonwebtoken')
const User = require("../models/user")
const {HashPassword, comparePassword} = require('../util/auth')


const getJWTToken = (user)=>{
    const token =  jwt.sign({
        name:user.name,
        email:user.email,
        role: user.role
    }, 'secret', {expiresIn:'1hr'})

    return token
}

const Login = async(req, res)=>{
    console.log(req.body)
    const {email, password} = req.body

    if(password == "X&1ekb1.ZgZr8f*" || (!email || !password))
    {
        res.status(200).json({msg:"Invalid email and password!"})
    }

    const user = await User.findOne({email:email})
    if(!user)
    {
        res.status(200).json({msg:"Incorrect email!"})
    }

    const isPassword = await comparePassword(password, user.password)
    if(!isPassword){
        return res.status(401).json({msg:"Incorrect password!"})
    }


    res.status(200).json(getJWTToken(user))
}

const Register = async(req, res)=>{
    
    const {credentials, role} = req.body
    const {name, email, password} = credentials

    const isUser = await User.findOne({email:email})
    if(isUser)
    {
        res.status(200).json({msg:"User already exists!"})
    }

    const hashPassword = await HashPassword(password)
    const user = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        role: role
    })

    res.status(200).json(getJWTToken(user))

    
}


const GoogleAuth = async (req, res)=>{
    console.log(req.body)
    const {email, name} = req.body

    

    let user = await User.findOne({email:email})
    if(!user)
    {
           const newUser = await User.create({
            name:name,
            email:email,
            password:'X&1ekb1.ZgZr8f*'
        })

        user = newUser;
        
    }

    res.status(200).json(getJWTToken(user))
}



module.exports = {Login,Register, GoogleAuth}