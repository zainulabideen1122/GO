const express = require('express')
const router = express.Router()
const {GetPlaceDetails} = require('../controller/home')

router.get('/place-details/:placeID', GetPlaceDetails)


module.exports = router