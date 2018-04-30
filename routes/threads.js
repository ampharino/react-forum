const router = require('express').Router();
const Thread = require('../models/thread');

router.post('/', (req,res)=>{
    const {title,body,author} = req.body.details
    const newThread = new Thread({title,body,author});
    newThread.save()
        .then(newThread =>{
            if(newThread){
                res.status(201).json({thread:newThread});
            }
            else{
                res.status(400).json({errors:{global:"Failed to create thread"}});
            }
        })
})

router.get('/', (req,res)=>{
    Thread.find().then(threads=>{
        res.status(200).json({threads:threads});
    })

})

router.get('/:id',(req,res)=>{
    Thread.findOne({_id:req.params.id}).then(thread=>{
        if(thread){
            res.status(200).json({thread:thread})
        }
        else{
            res.status(404).json({errors:{global:"Thread not found"}});
        }
    })
})

router.put('/:id', (req,res)=>{
    Thread.findOne({_id:req.params.id}).then(thread=>{
        if(!thread){
            res.status(404).json({errors:{global:"Thread does not exist"}})
        }
        else{
            thread.body = req.body.details.body
            thread.save().then(updatedThread =>{
                res.status(200).json({thread:updatedThread})
            })
        }
    })
})

router.put('/karma/:id',(req,res)=>{
    Thread.findOne({_id:req.params.id}).then(thread=>{
        if(!thread){
            res.status(404).json({errors:{global:"Thread does not exist"}})
        }
        else{
            thread.karma+=req.body.vote
            let indexUp = thread.upvoted.indexOf(req.body.user)
            let indexDown = thread.downvoted.indexOf(req.body.user)
            switch(req.body.type){
                case('upvote'):
                    if(indexUp === -1){
                        thread.upvoted.push(req.body.user)
                        if(indexDown !== -1){
                            thread.downvoted.splice(indexDown,1)
                        }
                    }
                    else{
                        thread.upvoted.splice(indexUp,1)
                    }
                    break;
                case('downvote'):
                    if(indexDown === -1){
                        thread.downvoted.push(req.body.user)
                        if(indexUp !== -1){
                            thread.upvoted.splice(indexUp,1)
                        }
                    }
                    else{
                        thread.downvoted.splice(indexDown,1)
                    }
                    break;
            }
            thread.save().then(updatedThread=>{
                res.status(200).json({thread:updatedThread})
            })
        }
    })
})

router.delete('/:id', (req,res)=>{
    Thread.findOne({_id:req.params.id}).then(thread=>{
        if(!thread){
            res.status(404).sjon({errors:{global:'Thread does not exist'}})
        }
        else{
            thread.remove().then(()=>{
                res.status(200).json({message:'Deleted thread'})
            })
        }
    })
})
module.exports = router;
