const express = require('express')

const router = express.Router()
const driverLocationController = require('../controller/driverLocation')


router.post('/driverLocation/create/:driverID', driverLocationController.CreateDriver)


module.exports = router