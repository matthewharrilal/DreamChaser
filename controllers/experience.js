const Experience = require('../models/experience')
var ObjectId = require('mongodb').ObjectId

module.exports = function(app) {
    // app.get("/experiences", (req, res) => {
    //     '''Retrieves a collection of experiences'''
    // });

    app.get("/helloWorld", (req,res) => {
        res.send('Hello World')
        // const dreamId = req.params.id
        // res.render('experience-new', {dreamId})
    });


}
