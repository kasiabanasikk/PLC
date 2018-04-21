let mongoose = require("mongoose");

let driverSchema = new mongoose.Schema({
    name: String,
    screen: Number,
    DI: Number,
    DO: Number,
    AI: Number,
    AO: Number,
    IP: String,
    price: Number,
    lang: String
});

module.exports = mongoose.model("Driver", driverSchema, "Driver");