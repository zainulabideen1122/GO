const Vehicle = require('../models/vehicle')

const getVehicle = async(req, res)=>{
    const {vehicleID} = req.params
    const vehicle = await Vehicle.findById(vehicleID)

    if(!vehicle)
        return res.status(404).json({msg:"Vehicle doesn't exists!"})

    res.status(200).json(vehicle)
}


module.exports = {getVehicle}