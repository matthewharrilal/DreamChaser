const mongoose = require('mongoose')

const ExperienceSchema = mongoose.Schema({
    mainEmotion: String,
    description: String,
    quantityOfDreams: Number,
    dreamId: {type: Schema.Types.ObjectId, ref: "Dream"}
});

var Experience = mongoose.model('Experience', ExperienceSchema)
module.exports = Experience;
