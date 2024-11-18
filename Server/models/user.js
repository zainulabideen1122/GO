const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: 'Rider',
        enum : ["Rider", "Driver", "Admin"]
    },
    isInfoCompleted: {
        type: Boolean,
        default: false
    }
}, { discriminatorKey: "role", timestamps: true })

const User = mongoose.model('User', userSchema)


module.exports = User




// advancedInfo: {
//     phone: {
//         type: String,
//         required: false,
//     },
//     address: {
//         type: String,
//         required: false,
//     },
//     vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
//     driverLicenceVerified: {
//         type: Boolean,
//     },
//     rating: {
//         value: { type: Number, default: 0 }, // Average rating
//         count: { type: Number, default: 0 }, // Total number of ratings received
//     },
//     rides: {
//         completed: { type: Number, default: 0 },
//         canceled: { type: Number, default: 0 },
//     },

// }