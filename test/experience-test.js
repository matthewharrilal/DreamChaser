const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js')
const should = chai.should();
const Dream = require('../models/dream');
const Experience = require('../models/experience.js')
var ObjectId = require('mongodb').ObjectId;


chai.use(chaiHttp)
