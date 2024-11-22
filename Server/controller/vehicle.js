const Vehicle = require('../models/vehicle')

const getVehicle = async(req, res)=>{
    const {userID} = req.params
    const vehicle = await Vehicle.findOne({owner: userID})

    if(!vehicle)
        return res.status(404).json({msg:"Vehicle doesn't exists!"})
    console.log('get vehicle called')
    console.log(vehicle)
    res.status(200).json(vehicle)
}


module.exports = {getVehicle}