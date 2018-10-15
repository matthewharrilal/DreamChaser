const mongoose = require('mongoose')
const Experience = require("./experience.js")

const DreamSchema = mongoose.Schema({
    title: String,
    msg: String,
    category: String,
    experience: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }
});

var Dream = mongoose.model('Dream', DreamSchema)
module.exports = Dream;
