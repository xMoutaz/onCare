const passportJWT = require('passport-jwt');
const passport = require("passport");

const ExtractJWT = passportJWT.ExtractJwt;
const StrategyJWT = passportJWT.Strategy;
const User = require("../models/user");

passport.use(
    new StrategyJWT({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET
    },
    function (jwtPayload, done)  {
        console.log(jwtPayload);
        return User.findOne({where:{id: jwtPayload.id}}
            ).then((user) => {
                return done(null, user)
            }).catch((err) => {
                return done(err)
            })
    }), 
);