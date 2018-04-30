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

router.put('/karma/:id',(req,res)=>{
    Comment.findOne({_id:req.params.id}).then(comment=>{
        if(!comment){
            res.status(404).json({errors:{global:"Thread does not exist"}})
        }
        else{
            comment.karma+=req.body.vote
            let indexUp = comment.upvoted.indexOf(req.body.user)
            let indexDown = comment.downvoted.indexOf(req.body.user)
            switch(req.body.type){
                case('upvote'):
                    if(indexUp === -1){
                        comment.upvoted.push(req.body.user)
                        if(indexDown !== -1){
                            comment.downvoted.splice(indexDown,1)
                        }
                    }
                    else{
                        comment.upvoted.splice(indexUp,1)
                    }
                    break;
                case('downvote'):
                    if(indexDown === -1){
                        comment.downvoted.push(req.body.user)
                        if(indexUp !== -1){
                            comment.upvoted.splice(indexUp,1)
                        }
                    }
                    else{
                        comment.downvoted.splice(indexDown,1)
                    }
                    break;
            }
            comment.save().then(updatedComment=>{
                res.status(200).json({comment:updatedComment})
            })
        }
    })
})

router.delete('/:id', (req,res)=>{
    Comment.findOne({_id:req.params.id}).then(comment=>{
        if(!comment){
            res.status(404).json({errors:{global:'Comment does not exist'}})
        }
        else{
            comment.remove().then(()=>{
                res.status(200).json({message:'Deleted comment'})
            })
        }
    })
})

module.exports = router;