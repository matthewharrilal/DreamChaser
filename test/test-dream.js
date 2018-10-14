const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js')
const should = chai.should();
const Dream = require('../models/dream');
var ObjectId = require('mongodb').ObjectId;


chai.use(chaiHttp)

const sampleDream = {
    title: "Test Dream",
    msg: "Test Message",
    category: "Test Category"
}

describe('Dreams', () => {
it('should index all dreams on / GET', (done) => {
    chai.request(app)
        .get('/dreams')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        })
});

it('should render new dream template on /GET', (done) => {
    chai.request(app)
        .get("/dreams/new")
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        })
});

it('should post new dream to database on /POST', (done) => {
    chai.request(app)
        .post("/dreams")
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        })
});

it('should show a specific dream document', (done) => {
    const dream = new Dream(sampleDream)
    dream.save((err, data) => {
        chai.request(app)
            .get(`/dreams/${data._id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});

it('should retrive dream edit form on /GET', (done) => {
    const newDream = new Dream(sampleDream)
    newDream.save((err, data) => {
        chai.request(app)
            .get(`dreams/${data._id}/edit`)
            .end((err, res) => {
                console.log('This is the response ' + data._id)
                res.should.have.status(200)
                res.should.be.html
                done();
            })
    });
});


it('should update a SINGLE dream on /dreams/<id> PUT', (done) => {
    var dream = new Dream(sampleDream);
    dream.save((err, data) => {
        chai.request(app)
            .put(`/dreams/${data._id}?_method=PUT`)
            .send({
                'title': 'Updating the title'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });
});

// TEST DELETE
it('should delete a SINGLE dream on /dreams/<id> DELETE', (done) => {
    var dream = new Dream(sampleDream);
    dream.save((err, data) => {
        chai.request(app)
            .delete(`/dreams/${data._id}?_method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
    });
});
});
