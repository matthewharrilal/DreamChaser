const Experience = require('../models/experience')
const Dream = require('../models/dream.js')
var ObjectId = require('mongodb').ObjectId

module.exports = function(app) {

    app.get('/dreams/:id/experiences', (req, res) => {
        const dreamId = req.params.id
        Experience.find({
            dreamId: req.params.id
        }).then(experiences => {
            res.render('experiences-index', {
                experiences,
                dreamId
            })
        }).catch((err) => {
            console.log(err)
        })
    });

    app.get('/dreams/:dreamId/experiences/:id', (req, res) => {
        console.log(req.params.id)
        Experience.find({
                _id: req.params.id
            }).then((experience) => {
                console.log('The EXPERIENCE ' + experience)
                res.render('experience-show', {
                    experience
                })
            })
            .catch((err) => {
                console.log(err.message)
            })

    });

    app.post("/dreams/:id/experience", (req, res) => {
        // res.send('Hello World')
        console.log('Initiating posting an experience')
        Experience.create(req.body).then((experience) => {
            console.log(Object.entries(req.body))
            // res.redirect(`/dreams/${req.params.id}/experiences`)
            res.redirect(`/dreams`)
        }).catch((err) => {
            console.log(err.message)
        })
    });

    app.get("/dreams/:id/experience/new", (req, res) => {
        // res.send('Hello World')
        const dreamId = req.params.id
        res.render('experience-new', {
            dreamId: req.params.id
        })
    });


}
