const express = require('express')

const router = express.Router()
const userController = require('../controller/user')

router.get('/getUser/:userID', userController.getUser)
router.get('/getDriver/:userID', userController.getDriver)
router.post('/updateDriver/:userID', userController.updateDriver)




module.exports = router