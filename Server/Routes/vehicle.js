const express = require('express')
const vehicleController = require('../controller/vehicle')
const router = express.Router()

router.get('/getVehicle/:vehicleID',vehicleController.getVehicle)




module.exports = router