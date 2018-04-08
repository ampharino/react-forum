const passport = require('passport');
const secrets = require('./secrets');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const jwtOptions ={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:secrets.token
}


passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            user.comparePassword(password, (err,isMatch)=>{
                if(err){
                    return done(err);
                }
                if(!isMatch){
                    return done(null, false, { message: 'Incorrect password.' });
                }
            })
            return done(null, user);
        });
    }
));


passport.use(new JwtStrategy(
    jwtOptions, function(payload,done){
        console.log(payload);
        User.findById(payload._id,(err,user)=>{
            if(err){
                return done(err,false);
            }
            if(user){
                done(null,user);
            }
            else{
                done(null,false);
            }
        })
    })
)
