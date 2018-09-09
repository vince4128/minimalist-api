const   express = require("express"),
        router  = express.Router({mergeParams:true});

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
    router.post('/signin', requireSignin, Authentication.signin);
    router.post('/signup', Authentication.signup);
};