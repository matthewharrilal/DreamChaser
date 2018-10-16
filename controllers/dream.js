const Dream = require('../models/dream.js')
var ObjectId = require('mongodb').ObjectId


module.exports = function(app) {
    app.get('/dreams', (req, res) => {
        Dream.find().then(dreams => {
            console.log('These are all the dreams ' + req.body)
            res.render('dreams-index', {
                dreams
            })
            // res.send(dreams);
        }).catch(err => {
            console.log(err)
        })
        // res.send('Hello World')
    });

    // Submission for new dream form
    app.get('/dreams/new', (req, res) => {
        res.render('dream-new', {})
    });

    app.post('/dreams', (req, res) => {
        console.log("QQQQQQQQQQ =>>>>>>>> " + req.body.title)
        Dream.create(req.body).then((dream) => {
            console.log("======>>>>>> " + dream)
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
        console.log('This is the dream that the user want to update ' + req.params.id)
        Dream.findByIdAndUpdate(req.params.id, req.body)
            .then(dream => {
                console.log('DREAM =>>>> ' + dream)
                res.redirect("/dreams")
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

    app.delete('/dreams/:id', (req, res) => {
        console.log("DELETE dream")
        Dream.findByIdAndRemove(req.params.id).then((dream) => {
            res.redirect('/dreams');
        }).catch((err) => {
            console.log(err.message);
        })
    });

}
