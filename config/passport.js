var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJWT  = require('passport-jwt').ExtractJwt;

var User        = require('../models/User');
var config      = require('../config/database');

module.exports  = function (passport) {
    var opts ={};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeader();
    opts.secretOrKey    = config.secret;
    passport.use(new JwtStrategy(opts,function (jwt_payload, done) {
        User.findOne({id: jwt_payload.id},function (err,user) {
            if (err) return done(err,false);
            if (user) {return done(null,user)}
            else {
                return done(null,false);
            }

        })
    }))
}