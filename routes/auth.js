const router = require('express').Router();
const User = require('../models/user')

router.post('/', (req,res)=>{
    const {credentials} = req.body;
    User.findOne({username:credentials.username}).then(user =>{
        if(user && user.isValidPassword(credentials.password)){
            res.status(200).json({user:user.toAuthJSON()});
        }
        else{
            res.status(400).json({errors:{global:"Invalid credentials"}});
        }
    })

})
module.exports = router;