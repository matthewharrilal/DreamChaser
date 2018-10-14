const express = require('express')
const methodOverride = require('method-override')
const app = express() // Instantiating Express
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var Dream = require('./models/dream');
var ObjectId = require('mongodb').ObjectId
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
//
app.get('/dreams', (req, res) => {
    Dream.find().then(dreams => {
        // console.log('These are all the dreams ' + dreams)
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

app.post('/dreams', (req, res) => {
    Dream.create(req.body).then((dream) => {
        console.log(Object.entries(req.body))
        res.redirect('/dreams')
    }).catch((err) => {
        console.log(err.message)
    })
});

app.get('/dreams/:id', (req, res) => {
    console.log('This is the id ' + req.params.id)
    Dream.findById({
        _id: ObjectId(req.params.id)
    }).then((dream) => {
        console.log('This is the fetched dream ' + dream)
        res.render('dream-show', {
            dream: dream
        })
    }).catch((err) => {
        console.log(err.message)
    })
    // res.send('Hello world')
});

app.put('/dreams/:id', (req, res) => {
  Dream.findOneAndUpdate(req.params.id, req.body)
    .then(dream => {
      console.log('DREAM =>>>> ' + dream)
      res.redirect(`/dreams/${dream._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})


app.get('/dreams/:id/edit', (req, res) => {
    console.log('This is the id ' + req.params.id)
    Dream.findById({
        _id: ObjectId(req.params.id)
    }).then((dream) => {
        console.log('This is the edited dream ' + dream)
        res.render('dreams-edit', {
            dream: dream
        })
    }).catch((err) => {
        console.log(err.message)
    })
    // res.send('Hello world')
});


app.listen(3000, () => {
    console.log('App listening on port 3000')
})

module.exports = mongoose;
