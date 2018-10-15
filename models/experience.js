const mongoose = require('mongoose')
const Dream = require("./dream.js")

const ExperienceSchema = mongoose.Schema({
    mainEmotion: String,
    description: String,
    quantityOfDreams: Number,
    dreamId: {type: mongoose.Schema.Types.ObjectId, ref: "Dream"}
});

var Experience = mongoose.model('Experience', ExperienceSchema)
module.exports = Experience;
