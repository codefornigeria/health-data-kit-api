var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

/*
 * Local strategy - Used for the admin login
 */

var organizationStrategy =  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function (username, password, done){
    authenticate(username, password, done);
});

var saasStrategy =  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function (username, password, done){
    saasAuthenticate(username, password, done);
});

passport.use( 'organization.local' , organizationStrategy);

passport.use( 'saas.local' , saasStrategy);


var authenticate = function (username, password, done) {
    
    User.findOne({email: username, isDeleted: false}).populateAll().then(function (user){
        if (!user) {
            return done(null, false, {message: username + ' does not exist', data: {}});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Incorrect password', data: {}});
        }
        return done(null, user);
    })
    .catch(function (err){
        console.log('logging error')
        console.log(err)
        return done(err);
    });
}

var saasAuthenticate = function (username, password, done) {
 //   console.log(username)
 //   console.log(password)
    Saas.findOne({email: username, isDeleted: false}).populateAll().then(function (user){
        if (!user) {
            return done(null, false, {message: username + ' does not exist', data: {}});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Incorrect password', data: {}});
        }
        // if (!user.emailVerified || !user.phoneVerified) {
        //     return done(null, false, {message: "Please verify your email / phone number to login", data: {user: user}});
        // }
        return done(null, user);
    })
    .catch(function (err){
        return done(err);
    });
}
