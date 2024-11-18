const express = require('express')
const {Login,Register, GoogleAuth} = require('../controller/auth.js')
const router = express.Router()


router.post('/login', Login)
router.post('/register', Register)
router.post('/googleAuth', GoogleAuth)



module.exports = router