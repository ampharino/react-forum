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
router.get('/:threadId',(req,res)=>{
    Comment.find({thread:req.params.threadId}).then(comments=>{
        res.status(200).json({comments:comments})
    })
})

router.put('/:id', (req,res)=>{
    Comment.findOne({_id:req.params.id}).then(comment=>{
        if(!comment){
            res.status(404).json({errors:{global:"Comment does not exist"}})
        }
        else{
            comment.body = req.body.details.body
            comment.save().then(updatedComment =>{
                res.status(200).json({comment:updatedComment})
            })
        }
    })
})

router.delete('/:id', (req,res)=>{
    Comment.findOne({_id:req.params.id}).then(comment=>{
        if(!comment){
            res.status(404).sjon({errors:{global:'Comment does not exist'}})
        }
        else{
            comment.remove().then(()=>{
                res.status(200).json({message:'Deleted comment'})
            })
        }
    })
})

module.exports = router;