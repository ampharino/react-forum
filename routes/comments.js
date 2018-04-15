const router = require('express').Router();
const Comment = require('../models/comment');

router.post('/',(req,res)=>{
    const {body,author,thread} = req.body.details;
    const newComment = new Comment({body,author,thread});
    newComment.save()
        .then(newComment =>{
            if(newComment){
                res.status(201).json({comment:newComment});
            }
            else{
                res.status(400).json({errors:{global:"Failed to create comment"}})
            }
        })
})
router.get('/:id',(req,res)=>{
    Comment.find({thread:req.params.id}).then(comments=>{
        res.status(200).json({comments:comments})
    })
})

module.exports = router;