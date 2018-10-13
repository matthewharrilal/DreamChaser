const express = require('express')
const app = express() // Instantiating Express
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
mongoose.Promise = mongoose.connect("mongodb://localhost/dreamchaser");

// Main.handlebars all other templates inherit from
app.engine('handlebars', exphbs({defaultLayout: 'main'})); // Main Template => main.handlebars
app.set('view engine', 'handlebars');

app.get('/dreams', (req, res) => {
    res.send('List all dreams here');
})

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
