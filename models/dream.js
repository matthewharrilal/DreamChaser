const mongoose = require('mongoose')

const Dream = mongoose.model('Dream', {
    title: String,
    msg: String,
    category: String
});

export default Dream;
