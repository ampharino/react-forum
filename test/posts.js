
const Thread = require ('../models/thread');
const Comment = require('../models/comment');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();


chai.use(chaiHttp);

describe('Threads+Comments',()=>{
    afterEach((done) =>{
        Thread.remove({},()=>{
            Comment.remove({},()=>{
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
            temp2.save().then(()=>{
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
    it('should delete thread',done=>{
        let newThread ={
            details:{
                title:'Testing 1',
                body:'Hello world',
                author:'test1'
            }
        }
        let temp = new Thread(newThread.details)
        temp.save().then(thread=>{
            chai.request(server)
                .delete(`/api/threads/${thread._id}`)
                .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message')
                    done();

                })
        })
    })
    it('should delete comment',done=>{
        let newThread ={
            details:{
                title:'Testing 1',
                body:'Hello world',
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
                    .delete(`/api/comments/${comment._id}`)
                    .end((err,res)=>{
                        res.should.have.status(200);
                        res.body.should.be.a('object')
                        res.body.should.have.property('message')
                        done();
                    })
            })
        })
    })
    it('should update thread',done=>{
        let newThread ={
            details:{
                title:'Testing 1',
                body:'Hello world',
                author:'test1'
            }
        }
        let updateThread = {
            details:{
                title:'Testing 1',
                body:'Updated hello world',
                author:'test1'
            }
        }
        let temp = new Thread(newThread.details)
        temp.save().then(thread=>{
            chai.request(server)
                .put(`/api/threads/${thread._id}`)
                .send(updateThread)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('thread')
                    res.body.thread.should.have.property('body')
                    chai.assert.strictEqual(res.body.thread.body,'Updated hello world','Body not updated')
                    done();

                })
        })
    })
    it('should update comment',done=> {
        let newThread = {
            details: {
                title: 'Testing 1',
                body: 'Hello world',
                author: 'test1'
            }
        }
        let newComment = {
            details: {
                body: 'hello this is a test',
                author: 'test1',
            }
        }
        let updateComment = {
            details: {
                body: 'hello this is updated',
                author: 'test1'
            }
        }
        let temp = new Thread(newThread.details)
        temp.save().then(thread => {
            newComment.details.thread = thread._id
            let temp2 = new Comment(newComment.details)
            temp2.save().then(comment => {
                chai.request(server)
                    .put(`/api/comments/${comment._id}`)
                    .send(updateComment)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('comment')
                        res.body.comment.should.have.property('body')
                        chai.assert.strictEqual(res.body.comment.body, 'hello this is updated')
                        done();
                    })
            })


        })
    })


})