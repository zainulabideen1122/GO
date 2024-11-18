const User = require('../models/user')

const riderSchema = new mongoose.Schema({
    advancedInfo: {
        phone: { type: String },
        address: { type: String },
        favoriteLocations: [{ type: String }], // Example specific to riders
    },
});



const driverSchema = new mongoose.Schema({
    advancedInfo: {
        phone: { type: String },
        address: { type: String },
        vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
        driverLicenceVerified: { type: Boolean },
        rating: {
            value: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
        },
        rides: {
            completed: { type: Number, default: 0 },
            canceled: { type: Number, default: 0 },
        },
    },
});

// const adminSchema = new mongoose.Schema({
//     advancedInfo: {
//         adminLevel: { type: String, enum: ["Super", "Moderator"], default: "Moderator" },
//     },
// });

// const Admin = BaseUser.discriminator("Admin", adminSchema);




const Rider = User.discriminator("Rider", riderSchema);
const Driver = BaseUser.discriminator("Driver", driverSchema);


module.exports = {Rider, Driver}
