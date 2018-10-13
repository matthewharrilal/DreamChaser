const express = require('express')
const app = express() // Instantiating Express
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var Dream = require('./models/dream.js')
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
})); // Main Template => main.handlebars
app.set('view engine', 'handlebars');

app.get('/dreams', (req, res) => {
    Dream.find().then(dreams => {
        console.log('These are all the dreams ' + dreams)
        res.render('dreams-index', {
            dreams
        })
    }).catch(err => {
        console.log(err)
    })
});

// Submission for new dream form
app.get('/dreams/new', (req, res) => {
    res.render('dream-new', {})
});

app.get('dreams/:id', (req, res) => {
    Dream.findById(req.params.id).then((dream) => {
         res.render('reviews-show', {dream})
    }).catch((err) => {
        console.log(err.message)
    })
});

app.post('/dreams', (req, res) => {
    Dream.create(req.body).then((dream) => {
        console.log(Object.entries(req.body))
        res.redirect('/dreams')
    }).catch((err) => {
        console.log(err.message)
    })
});

app.listen(3000, () => {
    console.log('App listening on port 3000')
})

module.exports = mongoose;
