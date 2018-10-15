const Experience = require('../models/experience')
var ObjectId = require('mongodb').ObjectId

module.exports = function(app) {
    app.get("/experiences", (req, res) => {
        '''Retrieves a collection of experiences'''
    });

    
}
