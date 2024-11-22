const express = require('express')

const router = express.Router()
const userController = require('../controller/user')
const vehicleController = require('../controller/vehicle')

router.get('/getUser/:userID', userController.getUser)
router.get('/getDriver/:userID', userController.getDriver)
router.post('/updateDriver/:userID', userController.updateDriver)
router.get('/getVehicle/:userID',vehicleController.getVehicle)



module.exports = router