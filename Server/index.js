const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const autRouter = require('./Routes/auth')
const homeRouter = require('./Routes/home')
const userRouter = require('./Routes/user')
const vehicleRouter = require('./Routes/vehicle')
const driverLocationRouter = require('./Routes/driverLocation')
const app = express()
require('dotenv').config();

app.use(express.json());
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

mongoose.connect('mongodb://localhost:27017/go')
.then(()=>{
    console.log('Connected to db!')
})

app.use(cors(corsOptions));


app.use('/', driverLocationRouter)
app.use('/auth', autRouter)
app.use('/home', homeRouter)
app.use('/user', userRouter)
app.use('/vehicle', vehicleRouter)




app.listen(3001, ()=>{
    console.log('Server run at 3001')
})