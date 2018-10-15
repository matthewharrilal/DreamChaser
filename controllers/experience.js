const Experience = require('../models/experience')
var ObjectId = require('mongodb').ObjectId

module.exports = function(app) {
    app.get("/experiences", (req, res) => {
        '''Retrieves a collection of experiences'''
    });

    app.get("/dreams/:id/experiences/new", (req,res) => {
        '''Retrieves form for adding a new experience to a dream'''
        const dreamId = req.params.id
        res.render('experience-new', {dreamId})
    });


}
