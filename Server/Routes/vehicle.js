const express = require('express')
const vehicleController = require('../controller/vehicle')
const router = express.Router()

router.get('/getVehicle/:userID',vehicleController.getVehicle)




module.exports = router