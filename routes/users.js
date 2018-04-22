const router = require('express').Router();
const User = require('../models/user')
const Thread = require('../models/thread')
const Comment = require('../models/comment')

router.post('/', (req,res)=>{
    const {username, password} = req.body.user;
    User.findOne({username:username},(err,user) => {
        if (user) {
            res.status(400).json({errors: {global: "username already exists"}});

        }
        else {
            const newUser = new User({username});
            newUser.setPassword(password);
            newUser.save()
                .then(newUser => {
                    if (newUser) {
                        res.status(201).json({user: newUser.toAuthJSON()})
                    }
                    else {
                        res.status(400).json({errors: {global: "Failed to create account"}});
                    }

                })
        }
    })

})

router.get('/:username', (req,res)=>{
    User.findOne({username:req.params.username}).then(user =>{
        if(!user){
            res.status(404).json({errors:{global:'user does not exist'}})
        }
        else{
            Thread.find({author:req.params.username}).then(threads=>{
                Comment.find({author:req.params.username}).then(comments=>{
                    res.status(200).json({threads:threads,comments:comments})
                })

            })
        }
    })

})
module.exports = router;