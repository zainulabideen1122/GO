const DriverLocation = require('../models/driverLocation')

const CreateDriver = async(req, res)=>{
    const {driverID} = req.params
    const location = req.body

    console.log(driverID, location)
    const isDriverLocation = await DriverLocation.findOne({driverID: driverID})
    if(isDriverLocation)
    {
        console.log("user exists!")
       return res.status(400).json({msg: "User already exists!"}) 
    }

    const driverloc = new DriverLocation({
        driverID: driverID,
        location:{
            type: "Point",
            coordinates: [location.lng,location.lat]
        }
    })
    await driverloc.save()
    console.log(driverloc)
    res.status(200).json(driverloc)
}


module.exports = {CreateDriver}