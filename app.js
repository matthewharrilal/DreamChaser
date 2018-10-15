const express = require('express')
const methodOverride = require('method-override')
const app = express() // Instantiating Express
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var Dream = require('./controllers/dream.js');
var Experience = require('./controllers/experience.js')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost/dreamchaser", function() {
    console.log('Connected to MongoDB')
});

// Main.handlebars all other templates inherit from
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

// Main Template => main.handlebars
app.set('view engine', 'handlebars');
//

Dream(app)
Experience(app)


app.listen(3000, () => {
    console.log('App listening on port 3000')
})

module.exports = app;
