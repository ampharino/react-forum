const mongoose = require("mongoose");
const Thread = require ('../models/thread');
const Comment = require('../models/comment');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();


chai.use(chaiHttp);

describe('Threads+Comments',()=>{
    afterEach((done) =>{
        Thread.remove({},(err)=>{
            Comment.remove({},(err)=>{
                done();
            })
        })
    })

    it('should create a new thread',(done)=>{
        let newThread = {
            details:{
                title:"Testing 1",
                body:"Hello world",
                author:'test1'
            }
        }
        chai.request(server)
            .post('/api/threads')
            .send(newThread)
            .end((err,res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('thread')
                done();

            })
    })
    it('should return thread with specified id',(done)=>{
        let newThread = {
            details:{
                title:"Testing 1",
                body:"Hello world",
                author:'test1'
            }
        }
        let temp = new Thread(newThread.details)
        temp.save().then(thread=>{
            chai.request(server)
                .get(`/api/threads/${thread._id}`)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('thread')
                    done();
                })
        })
    })
    it('should create a new comment',done=>{
        let newThread = {
            details:{
                title:"Testing 1",
                body:"Hello world",
                author:'test1'
            }
        }
        let newComment ={
            details:{
                body:'hello this is a test',
                author:'test1',
            }
        }
        let temp = new Thread(newThread.details)
        temp.save().then(thread=>{
            newComment.details.thread = thread._id
            chai.request(server)
                .post('/api/comments')
                .send(newComment)
                .end((err,res)=>{
                    res.should.have.status(201);
                    res.body.should.be.a('object')
                    res.body.should.have.property('comment')
                    done();
                })
        })

    })
    it('should return a single comment',done=>{
        let newThread = {
            details:{
                title:"Testing 1",
                body:"Hello world",
                author:'test1'
            }
        }
        let newComment ={
            details:{
                body:'hello this is a test',
                author:'test1',
            }
        }
        let temp = new Thread(newThread.details)
        temp.save().then(thread=>{
            newComment.details.thread = thread._id
            let temp2 = new Comment(newComment.details)
            temp2.save().then(comment=>{
                chai.request(server)
                    .get(`/api/comments/${thread._id}`)
                    .end((err,res)=>{
                        res.should.have.status(200);
                        res.body.should.be.a('object')
                        res.body.should.have.property('comments')
                        res.body.comments.should.have.length(1)
                        done();
                    })
            })
        })
    })

})