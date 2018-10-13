const express = require('express')
const app = express() // Instantiating Express
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
import Dream from '/models/dream.js'

mongoose.Promise = mongoose.connect("mongodb://localhost/dreamchaser");

// Main.handlebars all other templates inherit from
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
})); // Main Template => main.handlebars
app.set('view engine', 'handlebars');

app.get('/dreams', (req, res) => {
    Dream.find().then(reviews => {
        res.render('dreams-index', {
            dreams
        })
    }).catch(err => {
        console.log(err)
    })
});

// Submission for new dream form
app.get('/reviews/new', (req,res) => {
    res.render('reviews-new', {})
});

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
