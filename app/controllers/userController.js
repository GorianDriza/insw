var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    LocalStrategy = require('passport-local').Strategy,
    passport = require('passport'),
    flash = require('connect-flash');

module.exports = function (app) {
  app.use('/', router);
};



 router.post('/student/create', passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register/student',
    failureFlash : true 
  }));



 router.post('/login',passport.authenticate('login',{
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  }));


router.get('/list', function(req, res){

  User.find(function(err,users){
    if(err)
      res.send(err);
    res.send(users);
 });

});


router.get('/email-verification/:token', function(req, res){

  User.findOne({'verificationToken':req.params.token},function(err,user){
    if(err)
      res.send(err);

    user.authenticated = true;

    user.save(function(err){
      if(err)
        console.log(err);

      res.render('homepage',{message:'Account Verified, please login'});
    });

 });

});

