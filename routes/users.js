const router = require('express').Router();
const User = require('../models/user')

router.post('/', (req,res)=>{
    const {username, password} = req.body.user;
    const user = new User({username});
    user.setPassword(password);
    user.save()
        .then(newUser =>
        {
            if(newUser){
                res.status(200).json({user:newUser.toAuthJSON()})
            }
            else{
                res.status(400).json({errors:{global:"Failed to create account"}});
            }

        })



})
module.exports = router;