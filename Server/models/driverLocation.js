const mongoose = require('mongoose')

const driverLocationSchema = new mongoose.Schema({
    driverID: { type: String, required: true },
    location: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
        },
        coordinates: {
          type: [Number], //[longitude, latitude]
          required: true,
        }
    },
    isAvailable: { type: Boolean, default: false }
})

driverLocationSchema.index({location: "2dsphere"});

const DriverLocation = mongoose.model("DriverLocation", driverLocationSchema);

module.exports = DriverLocation