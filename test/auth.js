const mongoose = require("mongoose");
const User = require ('../models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();


chai.use(chaiHttp);


describe('Authentication', ()=>{
    describe('/POST auth', ()=>{
        it('login', (done)=>{
            chai.request(server)
                .post('/api/auth')
                .send({credentials:{username:'test1',password:'testpassword'}})
                .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('user')
                    res.body.user.should.have.property('username')
                    res.body.user.should.have.property('token')
                    done();
                })
        })
        it('fail login', (done)=>{
            chai.request(server)
                .post('/api/auth')
                .send({credentials:{username:'test1',password:'testpassword1'}})
                .end((err,res)=>{
                    res.should.have.status(400)
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors')
                    res.body.errors.should.have.property('global')
                    done();
                })
        })
    })
})