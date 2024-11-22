const User = require('../models/user')
const {Driver} = require('../models/roles')
const Vehicle = require('../models/vehicle')
const {getJWTToken} = require('../controller/auth')

const getUser = async(req, res)=>{
    const {userID} = req.params
    const user = await User.findById(userID)
    res.status(200).json(user)
}

const getDriver = async(req, res)=>{
    const {userID} = req.params;

    const driver = await Driver.findById(userID)
    console.log("get driver called")
    res.status(200).json(driver)
}

const updateDriver = async(req, res)=>{
    const {userID} = req.params
    const {formDetails, vehicleData} = req.body

    // console.log(userID)
    // console.log(combined)

    const updatedDriver = await Driver.findByIdAndUpdate(
        userID,
        {$set: formDetails},
        {new: true, runValidators: true}
    );

    if(!updatedDriver){
        return res.status(404).json({msg: "Driver not found!"})
    }

    const newVehicle = await Vehicle.create({
        ...vehicleData, 
        owner: userID
    })


    updatedDriver.advancedInfo.vehicleId = newVehicle._id
    updatedDriver.isInfoCompleted = true
    await updatedDriver.save();

    console.log(updatedDriver)

    const updatedToken =  getJWTToken(updatedDriver)

    res.status(200).json({driver: updatedDriver, vehicle: newVehicle, newToken: updatedToken})
}

module.exports = {getUser,getDriver, updateDriver}