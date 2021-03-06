const express = require('express')
const methodOverride = require('method-override')
const app = express() // Instantiating Express
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var Dream = require('./controllers/dream.js');
var Experience = require('./controllers/experience.js')
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.urlencoded({
    extended: true
}));


if(process.env.MONGOLAB_URI) {
  mongoose.connect(process.env.MONGOLAB_URI);
  console.log('Connected to MongoDB on this uri ' + process.env.MONGOLAB_URI)
} else {

  // Connect to local database
  console.log("WORLD ENDER DESTROYER")
  mongoose.connect("mongodb://localhost/dreamchaser");
}


// Main.handlebars all other templates inherit from
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

// Main Template => main.handlebars
app.set('view engine', 'handlebars');
//

Dream(app);
Experience(app);

var server_port = process.env.PORT || 3000;
app.listen(server_port, () => {
    console.log(`App listening on port ${server_port}`)
})

module.exports = app;
