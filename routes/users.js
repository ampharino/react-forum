const router = require('express').Router();
const User = require('../models/user')

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
                        res.status(200).json({user: newUser.toAuthJSON()})
                    }
                    else {
                        res.status(400).json({errors: {global: "Failed to create account"}});
                    }

                })
        }
    })

})
module.exports = router;