const mongoose = require('mongoose')


const vehicleSchema = mongoose.Schema({
    type: { type: String, required: true }, 
    make: { type: String, required: true }, 
    model: { type: String, required: true },
    year: { type: Number, required: true },
    registrationNumber: { type: String, required: true },
    color: { type: String }, 
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle