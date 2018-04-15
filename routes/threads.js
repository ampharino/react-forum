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
module.exports = router;
