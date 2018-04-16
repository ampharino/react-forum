const mongoose = require("mongoose");
const User = require ('../models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();


chai.use(chaiHttp);

describe('Users',()=>{

    beforeEach((done) =>{
        User.remove({},(err)=>{
            done();
        })
    })
    describe('/POST users', ()=>{
        it('report error when username already exists in db', (done)=>{
            let newUser = {
                user:{
                    username:"test1",
                    password:"testpasssword"
                }
            }
            let temp = new User({username:'test1',passwordHash:'abcdef'})
            temp.save();
            chai.request(server)
                .post('/api/users')
                .send(newUser)
                .end((err,res)=>{
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('global');
                    done();
                })
        })
        it('creates new user', (done)=>{
            let newUser = {
                user:{
                    username:"test1",
                    password:"testpassword"
                }
            }
            chai.request(server)
                .post('/api/users')
                .send(newUser)
                .end((err,res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user')
                    res.body.user.should.have.property('username')
                    res.body.user.should.have.property('token')
                    done();

                })
        })

    })

})