const mongoose = require('mongoose')

const DreamSchema = mongoose.Schema({
    title: String,
    msg: String,
    category: String
});

var Dream = mongoose.model('Dream', DreamSchema)
module.exports = Dream;
