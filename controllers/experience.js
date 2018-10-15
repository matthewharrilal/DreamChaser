const Experience = require('../models/experience')
var ObjectId = require('mongodb').ObjectId

module.exports = function(app) {

    app.get('/dreams/:id/experiences', (req, res) => {
        Experience.find().then(experiences => {
            // console.log('These are all the dreams ' + dreams)
            // res.render('experiences-index', {
            //     experiences
            // })
            res.send('Hello World')
        }).catch(err => {
            console.log(err)
        })
    });

    app.post("/dreams/:id/experience", (req, res) => {
        console.log('Initiating posting an experience')
        Experience.create(req.body).then((experience) => {
            console.log(Object.entries(req.body))
            res.send('Succesful')
        }).catch((err) => {
            console.log(err.message)
        })
    });

    app.get("/dreams/:id/experience/new", (req, res) => {
        // res.send('Hello World')
        const dreamId = req.params.id
        res.render('experience-new', {
            dreamId
        })
    });


}
