const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js')
const should = chai.should();
const Dream = require('../models/dream');
const Experience = require('../models/experience.js')
var ObjectId = require('mongodb').ObjectId;


chai.use(chaiHttp)

const sampleDream = {
    title: "Test Dream",
    msg: "Test Message",
    category: "Test Category"
}

var dreamId;

describe('SampleDream', () => {
    before(function() {
        chai.request(app)
        .post("/dreams")
        .send(sampleDream)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            const dream = Dream.findOne({title: "Test Dream"})
            dreamId = dream.id
        })
    })
});

const sampleExperience = {
    mainEmotion: "Happiness",
    description: "Hello World",
    quantityOfDreams: 2,
    dreamId: dreamId
}

// TODO: Update current tests and add new ones for full coverage
describe('Experiences', ()  => {
    // TEST INDEX
    it('should index ALL experiences on / GET', (done) => {
        chai.request(app)
        .get(`/dreams/${ObjectId(dreamId)}/experiences`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    // TEST NEW
    it('should display new form on /dreams/<id>/experiences/new GET', (done) => {
        chai.request(app)
        .get(`/dreams/${ObjectId(dreamId)}/experience/new`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    // TEST CREATE
    it('should create a SINGLE experience on /dreams/<id>/experience POST', (done) => {
        chai.request(app)
        .post(`/dreams/${ObjectId(dreamId)}/experience`)
        .send(sampleExperience)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    // TEST SHOW
    it('should show a SINGLE review on /dreams/<id>/experiences/<id> GET', (done) => {
        var experience = Experience.findOne({mainEmotion: "Happiness"})
        var experienceId = experience.id
        experience.save((err, data) => {
            chai.request(app)
            .get(`/dreams/${ObjectId(data._id)}/experiences/${ObjectId(experienceId)}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
        });
    });

    // // TEST EDIT
    // it('should edit a SINGLE review on /dreams/<id>/experiences/<id>/edit GET', (done) => {
    //     var fetchedExperience = Experience.findOne({mainEmotion: "Happiness"})
    //     var experienceId = experience.id
    //     experience.save((err, data) => {
    //         chai.request(server)
    //         .get(`/dreams/${data._id}/experiences/${experienceId}/edit`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.should.be.html;
    //             done();
    //         });
    //     });
    // });

    // // TEST UPDATE
    // it('should update a SINGLE experience on /dreams/<id>/experiences/<id> PUT', (done) => {
    //     var dream = new Review(sampleDream);
    //     dream.save((err, data)  => {
    //         chai.request(app)
    //         .put(`/dreams/${data._id}?_method=PUT`)
    //         .send({'title': 'Updating the title'})
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.should.be.html
    //             done();
    //         });
    //     });
    // });
    //
    // // TEST DELETE
    // it('should delete a SINGLE dream on /dreams/<id>/experiences/<id> DELETE', (done) => {
    //     var dream = new Review(sampleDream);
    //     dream.save((err, data)  => {
    //         chai.request(app)
    //         .delete(`/dreams/${data._id}?_method=DELETE`)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.should.be.html
    //             done();
    //         });
    //     });
    // });
});
